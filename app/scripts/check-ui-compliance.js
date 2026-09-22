/**
 * EduPlus Nordic Lagom UI Compliance Checker — T20
 *
 * Enforces:
 *  1. No rounded corners (other than rounded-none) — 0px geometry rule
 *  2. No curved SVG path commands (C, S, Q, A and lowercase equivalents)
 *  3. No Recharts non-linear interpolation (type must be "linear")
 *  4. No neon / glow / pulse colors from the old pre-Nordic palette
 *  5. No arbitrary hex colors outside the approved OKLCH semantic token set
 *
 * Exits 1 if any ERROR is found; warnings are informational only.
 *
 * Inline suppression:
 *  - `// ui-ignore` on the same line
 *  - `// ui-ignore-next-line` on the preceding line
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Config ────────────────────────────────────────────────────────────────────

const SRC_DIR = path.resolve(__dirname, '../src');

/** Paths that are entirely exempt from compliance checks. */
const IGNORE_PATHS = [
  /node_modules/,
  /dist/,
  /\.test\./,
  /\.spec\./,
  /check-ui-compliance/,
  /vite-env\.d\.ts/,
  // shadcn/ui primitives ship with their own geometry; they're third-party source.
  // Only narrow exemption — feature code in src/ is still checked.
  /src[/\\]components[/\\]ui[/\\]/,
  /src[/\\]components[/\\]magicui[/\\]/,
];

/**
 * Approved hex values used as inline style color values (not Tailwind classes).
 * These are the OKLCH-derived hex equivalents of our semantic tokens.
 * All others must use Tailwind semantic token classes (text-foreground, etc.).
 */
const APPROVED_HEX_INLINE = new Set([
  // Login page background split (approved design decision)
  '#0E131A',
  '#F5F0E8',
  // Calendly widget colors (third-party config, not CSS)
  '#B8860B',
  '#ffffff',
  '#1a1a1a',
]);

// ── Regexes ──────────────────────────────────────────────────────────────────

// SVG path `d` attribute containing Bezier/arc curve commands.
// Matches C, S, Q, A and their lowercase equivalents after a whitespace/digit.
const SVG_CURVE_CMD_RE = /\bd=["'][^"']*[CSQAcsqa][^"']*/;

// rounded-* classes that are NOT rounded-none (geometry violation).
const ROUNDED_BAD_RE = /\brounded(?:-(?!none\b)[a-zA-Z0-9]+)+\b|\brounded\b(?!-none)/;

// Recharts LineChart / AreaChart type prop that isn't "linear".
// e.g. type="monotone" or type="natural" — both are prohibited curves.
const RECHARTS_NONLINEAR_RE = /\btype=["'](monotone|natural|basis|cardinal|catmullRom|step|stepBefore|stepAfter)["']/;

// Old neon / cyberpunk color values that should no longer appear.
// We check for them in Tailwind arbitrary classes and inline styles.
const NEON_COLORS_RE = /(?:#7[Dd][Ff]9[Ff]{2}|#4[Aa][Ff]626|neon|#[Ff]{2}0{2}[Ff]{2}|#00[Ff]{2}[Ff]{2}|#[Ff]{2}[Ff]{2}00)/i;

// Arbitrary hex in Tailwind class: bg-[#abc123], text-[#abc123], border-[#abc123]
const HEX_TAILWIND_RE = /\b(?:bg|text|border|ring|outline|fill|stroke)-\[#([0-9a-fA-F]{3,6})\]/g;

// Inline style borderRadius with a non-zero value.
// Explicitly allow '0', '0px', "0", "0px" — those are compliant.
const BORDER_RADIUS_STYLE_RE = /borderRadius\s*:\s*['"](?!0(?:px)?['"])[^'"]+['"]/;

// ── State ─────────────────────────────────────────────────────────────────────

let totalErrors = 0;
let totalWarnings = 0;

// ── Helpers ───────────────────────────────────────────────────────────────────

const c = {
  red:    (s) => `\x1b[31m${s}\x1b[0m`,
  green:  (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan:   (s) => `\x1b[36m${s}\x1b[0m`,
  gray:   (s) => `\x1b[90m${s}\x1b[0m`,
  bold:   (s) => `\x1b[1m${s}\x1b[0m`,
};

function err(rel, ln, msg, hint) {
  console.log(`${c.red('❌ ERROR')} ${msg} — ${c.cyan(rel)}:${c.yellow(ln)}`);
  if (hint) console.log(c.gray(`   Hint: ${hint}\n`));
  totalErrors++;
}

function warn(rel, ln, msg, hint) {
  console.log(`${c.yellow('⚠️  WARN')} ${msg} — ${c.cyan(rel)}:${c.yellow(ln)}`);
  if (hint) console.log(c.gray(`   Hint: ${hint}\n`));
  totalWarnings++;
}

function shouldIgnore(filePath) {
  return IGNORE_PATHS.some((re) => re.test(filePath.replace(/\\/g, '/')));
}

function collectFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      collectFiles(full, out);
    } else if (/\.(tsx?|css)$/.test(entry) && !shouldIgnore(full)) {
      out.push(full);
    }
  }
  return out;
}

// ── Per-file checker ──────────────────────────────────────────────────────────

function checkFile(filePath) {
  const src = fs.readFileSync(filePath, 'utf-8');
  const lines = src.split('\n');
  const rel = path.relative(path.resolve(__dirname, '..'), filePath);

  lines.forEach((line, i) => {
    const ln = i + 1;

    // Inline suppression
    if (line.includes('// ui-ignore') || line.includes('/* ui-ignore */')) return;
    if (i > 0 && lines[i - 1].includes('// ui-ignore-next-line')) return;

    // ── 1. Geometry: curved SVG path commands ─────────────────────────────
    if (SVG_CURVE_CMD_RE.test(line)) {
      err(rel, ln, 'Curved SVG path command (C/S/Q/A)',
        'Replace with L, H, V, Z straight-line commands only.');
    }

    // ── 2. Geometry: rounded corners ─────────────────────────────────────
    const roundedMatches = line.match(ROUNDED_BAD_RE);
    if (roundedMatches) {
      err(rel, ln, `Prohibited rounded class "${c.bold(roundedMatches[0])}"`,
        'Use rounded-none or remove. 0px geometry is required.');
    }

    // ── 3. Geometry: inline borderRadius > 0 ─────────────────────────────
    if (BORDER_RADIUS_STYLE_RE.test(line)) {
      err(rel, ln, 'Non-zero inline borderRadius in style prop',
        'Set borderRadius to "0" or "0px", or remove the property.');
    }

    // ── 4. Recharts non-linear interpolation ─────────────────────────────
    if (RECHARTS_NONLINEAR_RE.test(line)) {
      const m = line.match(RECHARTS_NONLINEAR_RE);
      err(rel, ln, `Recharts curve type "${c.bold(m[1])}" is not linear`,
        'Use type="linear" on all Recharts Line/Area elements.');
    }

    // ── 5. Neon / old-palette colors ─────────────────────────────────────
    if (NEON_COLORS_RE.test(line)) {
      err(rel, ln, 'Neon/legacy color detected',
        'Replace with semantic OKLCH tokens from index.css (e.g. text-primary, text-foreground).');
    }

    // ── 6. Unapproved hex in Tailwind classes ─────────────────────────────
    for (const m of line.matchAll(HEX_TAILWIND_RE)) {
      const hex = `#${m[1].toUpperCase()}`;
      // Allow OKLCH-token-derived values via /alpha — those are semantic
      // Allow opacity modifiers (bg-[#abc]/50 is still a hex class)
      if (!APPROVED_HEX_INLINE.has(hex) && !APPROVED_HEX_INLINE.has(`#${m[1].toLowerCase()}`)) {
        warn(rel, ln, `Arbitrary hex Tailwind class "${c.bold(m[0])}"`,
          'Prefer semantic token classes (text-foreground, bg-primary, etc.). If this hex is a valid token equivalent, add it to APPROVED_HEX_INLINE in the checker.');
      }
    }
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  console.log(c.cyan('\n[Nordic Lagom UI Compliance — T20] ') + 'Scanning src/...\n');

  const files = collectFiles(SRC_DIR);
  files.forEach(checkFile);

  console.log(c.cyan('─────────────────────────────────────────────'));
  console.log(`Scanned:  ${files.length} files`);
  console.log(`Errors:   ${totalErrors > 0 ? c.red(totalErrors) : c.green(0)}`);
  console.log(`Warnings: ${totalWarnings > 0 ? c.yellow(totalWarnings) : c.green(0)}\n`);

  if (totalErrors > 0) {
    console.log(c.red('❌ UI compliance check failed — resolve errors above.'));
    process.exit(1);
  }
  console.log(c.green('✓ UI compliance check passed.'));
  process.exit(0);
}

main();
