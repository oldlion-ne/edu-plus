import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SRC_DIR = path.resolve(__dirname, '../src');
const IGNORE_PATHS = [
  /node_modules/,
  /dist/,
  /\.test\./,
  /check-ui-compliance\.js/,
  /main\.tsx/,
  /vite-env\.d\.ts/,
  /src[\\/]components[\\/]ui/, // Ignore shadcn UI primitives

];

// Nordic Lagom colors must come from semantic theme tokens.
const APPROVED_HEX = [];

// Prohibited rounded corners pattern
// Matches any word starting with rounded (e.g. rounded, rounded-md, rounded-t-lg)
const ROUNDED_CLASSES_REGEX = /\brounded(?:-[a-zA-Z0-9]+)*\b/g;

// Hardcoded standard Tailwind color overrides (e.g., bg-red-500, text-blue-600, etc.)
const TAILWIND_COLOR_OVERRIDE_REGEX = /\b(bg|text|border)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(?:50|100|200|300|400|500|600|700|800|900|950)\b/g;

// Custom hex color classes (e.g., bg-[#ff0000])
const HEX_CLASS_REGEX = /\b(?:bg|text|border)-\[#([0-9a-fA-F]{3,6})\]/g;

// Interactive tags regex that matches <a, <button, <Link, <NavLink (with word boundary)
const INTERACTIVE_TAG_REGEX = /<(button|a|Link|NavLink)\b/;

// Style attributes checker
const INLINE_STYLE_REGEX = /style=\{\{\s*[^}]+\s*\}\}/g;
const PROHIBITED_MOTION_REGEX = /\banimate-(?:pulse|ping|bounce|chat-glow)\b/g;
const PROHIBITED_GLOW_REGEX = /\b(?:drop-)?shadow-\[0_0_(?!0_1px)[^\]]+\]/g;
const PROHIBITED_INTERFACE_MONO_REGEX = /\bfont-mono\b/g;
const PROHIBITED_HUD_COPY_REGEX = /\b(?:SYSTEM_|UTC_COORD|NEXUS|MATRIX|STREAM|SCAN)[A-Z0-9_]*/g;

let totalErrors = 0;
let totalWarnings = 0;

// Text Formatter using ANSI escape sequences
const colors = {
  red: (str) => `\x1b[31m${str}\x1b[0m`,
  green: (str) => `\x1b[32m${str}\x1b[0m`,
  yellow: (str) => `\x1b[33m${str}\x1b[0m`,
  cyan: (str) => `\x1b[36m${str}\x1b[0m`,
  gray: (str) => `\x1b[90m${str}\x1b[0m`,
  bold: (str) => `\x1b[1m${str}\x1b[0m`,
};

function shouldIgnorePath(filePath) {
  return IGNORE_PATHS.some((regex) => regex.test(filePath));
}

function getFiles(dir, filesList = []) {
  if (!fs.existsSync(dir)) return filesList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, filesList);
    } else {
      if (!shouldIgnorePath(name) && (name.endsWith('.tsx') || name.endsWith('.ts') || name.endsWith('.css'))) {
        filesList.push(name);
      }
    }
  }
  return filesList;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const relativePath = path.relative(path.resolve(__dirname, '..'), filePath);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Check for inline ignore comments
    if (line.includes('/* ui-ignore */') || line.includes('// ui-ignore-next-line')) {
      return;
    }
    if (index > 0 && lines[index - 1].includes('// ui-ignore-next-line')) {
      return;
    }

    // 1. Check for rounded classes (Strict Error)
    const roundedMatches = [...line.matchAll(ROUNDED_CLASSES_REGEX)];
    roundedMatches.forEach((match) => {
      const className = match[0];
      // Only error if it does not end with '-none'
      if (!className.endsWith('-none')) {
        console.log(`${colors.red('❌ ERROR')} Prohibited rounded corners class "${colors.bold(className)}" found in ${colors.cyan(relativePath)}:${colors.yellow(lineNumber)}`);
        console.log(colors.gray(`   Line ${lineNumber}: ${line.trim()}`));
        console.log(colors.gray(`   Fix: Replace with "rounded-none" or remove completely.\n`));
        totalErrors++;
      }
    });

    // 2. Check for standard Tailwind color overrides (Strict Error)
    const colorOverrideMatches = [...line.matchAll(TAILWIND_COLOR_OVERRIDE_REGEX)];
    colorOverrideMatches.forEach((match) => {
      const className = match[0];
      console.log(`${colors.red('❌ ERROR')} Prohibited standard Tailwind color override "${colors.bold(className)}" found in ${colors.cyan(relativePath)}:${colors.yellow(lineNumber)}`);
      console.log(colors.gray(`   Line ${lineNumber}: ${line.trim()}`));
      console.log(colors.gray(`   Fix: Use theme variable rules / design tokens (e.g. text-[#E6EDF3] or text-[#7DF9FF]).\n`));
      totalErrors++;
    });

    // 3. Check for custom hex colors not in approved list (Strict Error)
    const hexMatches = [...line.matchAll(HEX_CLASS_REGEX)];
    hexMatches.forEach((match) => {
      const hex = '#' + match[1].toUpperCase();
      if (!APPROVED_HEX.includes(hex)) {
        const className = match[0];
        console.log(`${colors.red('❌ ERROR')} Prohibited custom hex class "${colors.bold(className)}" found in ${colors.cyan(relativePath)}:${colors.yellow(lineNumber)}`);
        console.log(colors.gray(`   Line ${lineNumber}: ${line.trim()}`));
        console.log(colors.gray(`   Fix: Replace with an approved theme color (${APPROVED_HEX.join(', ')}).\n`));
        totalErrors++;
      }
    });

    // 4. Check for interactive tags missing hover, focus, active attributes (Warning)
    const hasInteractiveTag = INTERACTIVE_TAG_REGEX.test(line);
    if (hasInteractiveTag && !filePath.endsWith('.css')) {
      const elementSource = lines.slice(index, index + 6).join(' ');
      const hasHover = elementSource.includes('hover:');
      const hasFocus = elementSource.includes('focus:') || elementSource.includes('focus-visible:');
      if (!hasHover || !hasFocus) {
        console.log(`${colors.yellow('⚠️ WARNING')} Interactive element missing states (hover: ${hasHover ? '✓' : '✗'}, focus: ${hasFocus ? '✓' : '✗'}) in ${colors.cyan(relativePath)}:${colors.yellow(lineNumber)}`);
        console.log(colors.gray(`   Line ${lineNumber}: ${line.trim()}`));
        console.log(colors.gray(`   Fix: Add responsive and interactive classes (e.g. "hover:text-[#7DF9FF] focus:outline-none focus:ring-1 focus:ring-[#7DF9FF]").\n`));
        totalWarnings++;
      }
    }

    // 5. Check for inline style attributes (Warning)
    const inlineStyleMatches = line.match(INLINE_STYLE_REGEX);
    if (inlineStyleMatches) {
      console.log(`${colors.yellow('⚠️ WARNING')} Inline CSS style attribute used in ${colors.cyan(relativePath)}:${colors.yellow(lineNumber)}`);
      console.log(colors.gray(`   Line ${lineNumber}: ${line.trim()}`));
      console.log(colors.gray(`   Fix: Prefer styling through Tailwind utility classes or index.css classes.\n`));
      totalWarnings++;
    }

    // 6. Reject pulsing or aggressive status motion.
    for (const match of line.matchAll(PROHIBITED_MOTION_REGEX)) {
      console.log(`${colors.red('❌ ERROR')} Prohibited motion class "${colors.bold(match[0])}" found in ${colors.cyan(relativePath)}:${colors.yellow(lineNumber)}`);
      totalErrors++;
    }

    // 7. Reject glow-style shadows. Conventional elevation shadows remain allowed.
    for (const match of line.matchAll(PROHIBITED_GLOW_REGEX)) {
      console.log(`${colors.red('❌ ERROR')} Prohibited glow shadow "${colors.bold(match[0])}" found in ${colors.cyan(relativePath)}:${colors.yellow(lineNumber)}`);
      totalErrors++;
    }

    // 8. Monospace is reserved for genuinely technical data, not interface copy.
    if (/src[\\/](?:pages|components[\\/]workspace)/.test(filePath)) {
      for (const match of line.matchAll(PROHIBITED_INTERFACE_MONO_REGEX)) {
        console.log(`${colors.red('ERROR')} General-purpose monospace class "${colors.bold(match[0])}" found in ${colors.cyan(relativePath)}:${colors.yellow(lineNumber)}`);
        totalErrors++;
      }
    }

    // 9. Reject legacy HUD terminology in page and workspace source.
    if (/src[\\/](?:pages|sections|components[\\/]workspace)/.test(filePath)) {
      for (const match of line.matchAll(PROHIBITED_HUD_COPY_REGEX)) {
        console.log(`${colors.red('ERROR')} Legacy HUD term "${colors.bold(match[0])}" found in ${colors.cyan(relativePath)}:${colors.yellow(lineNumber)}`);
        totalErrors++;
      }
    }
  });
}

function main() {
  console.log(colors.cyan('\n[UI Compliance Scanner] ') + 'Running checks in src/ directory...\n');
  const files = getFiles(SRC_DIR);
  files.forEach(checkFile);

  console.log(colors.cyan('-----------------------------------------------'));
  console.log(`Scan completed: Scanned ${files.length} files.`);
  console.log(`Errors found:   ${totalErrors > 0 ? colors.red(totalErrors) : colors.green(0)}`);
  console.log(`Warnings found: ${totalWarnings > 0 ? colors.yellow(totalWarnings) : colors.green(0)}\n`);

  if (totalErrors > 0) {
    console.log(colors.red('❌ UI compliance check failed. Please resolve all errors listed above.'));
    process.exit(1);
  } else {
    console.log(colors.green('✓ UI compliance check passed successfully!'));
    process.exit(0);
  }
}

main();
