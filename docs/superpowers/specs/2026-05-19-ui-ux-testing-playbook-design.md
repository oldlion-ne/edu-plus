# Design Spec: UI/UX Testing Playbook and Compliance Linter

## Goal Description
Establish a comprehensive playbook and automated compliance checking framework to ensure 100% UI/UX consistency across the EduPlus web application. Specifically, we need to enforce core design tokens, ensure the "straight-edge" (`rounded-none`) requirement is respected, and mandate responsiveness and interactive element state validation.

---

## Approved Architectural & Design Choices

### 1. UI/UX Testing Playbook (`docs/ui-ux-testing-playbook.md`)
We will create a markdown playbook designed for developers. It will document the core guidelines of our design system:
- **Design Tokens & Theme Constants:** Background colors, accent color (`#7DF9FF`), typography (`Outfit` / `Merriweather`), and layout rules.
- **The Straight-Edge Rule:** Absolute requirement of straight lines (`rounded-none` / 0px borders) for all cards, buttons, elements, and containers.
- **Interactive States Checklist:** Standardized verification checklist for links, buttons, and custom inputs to ensure they have appropriate hover transitions, keyboard focus styling, and click-down active states.
- **Responsive Breakdown:** Checklists for testing layouts on mobile (under 768px), tablet (768px to 1024px), and desktop (1024px+).

### 2. Automated Heuristic Compliance Linter (`scripts/check-ui-compliance.js`)
We will write a dedicated Node.js command-line utility to scan files in `src/` (specifically `.ts`, `.tsx`, `.css`) and detect violations.

- **Prohibited Patterns (Errors - Blocks Builds/Commits):**
  - Rounded border classes: `rounded`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`.
  - Non-standard inline or Tailwind color utility overrides (e.g., hardcoded values like `text-red-500` or `bg-[#FF0000]`).
- **Discouraged Patterns (Warnings - Non-blocking Logs):**
  - Interactive elements (e.g., `<a>`, `<button>`, `<Link>`, `<NavLink>`) missing interactive Tailwind variants (`hover:`, `focus:`, `active:`).
  - Use of raw style HTML attributes (`style={{ ... }}`) bypassing CSS classes/variables.
- **Ignore / Exception Mechanism:**
  - Standard Ignore Lists: Allow ignoring third-party components (e.g. Radix UI or shadcn UI primitives, config files, icons) via an ignore pattern array inside the script.
  - Inline Comments: Support `/* ui-ignore */` or `// ui-ignore-next-line` to bypass scanning rules on a case-by-case basis.

### 3. npm Script Integration
Expose the utility script via `package.json` under script `"ui-check"`.

---

## Detailed Directory and File Plan

### 1. Playbook Document
Create [ui-ux-testing-playbook.md](file:///c:/edu-plus/docs/ui-ux-testing-playbook.md) containing the developer checklists and definitions.

### 2. Scanner Script
Create [check-ui-compliance.js](file:///c:/edu-plus/app/scripts/check-ui-compliance.js) containing:
- Path matching and directory traversal.
- File scanning logic using targeted regular expressions for rounded classes, hardcoded color classes, and interactive tag attributes.
- Logging utility (using ANSI terminal color codes for clear terminal reporting).
- Exclusion filters matching config files, library imports, and inline ignore comments.

### 3. package.json Integration
Register the `"ui-check": "node scripts/check-ui-compliance.js"` script in [package.json](file:///c:/edu-plus/app/package.json).

---

## Verification Plan

### 1. Automated Checks
- Run `pnpm run lint` and verify 0 linting/compile issues exist.
- Run `pnpm run test:run` and verify that the existing tests continue to pass.
- Run `pnpm run ui-check` and verify it reports files correctly. We will intentionally create a temporary file with a violation to confirm the scanner detects the error and exits with a non-zero code.

### 2. Manual Verification
- Verify that `check-ui-compliance.js` accurately ignores lines containing `/* ui-ignore */` or `// ui-ignore-next-line`.
- Ensure the color-coded console outputs are readable and clearly specify the file path, line number, and prohibited style.
