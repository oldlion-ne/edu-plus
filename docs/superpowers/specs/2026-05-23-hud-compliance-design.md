# Spec: Universal HUD Compliance & Legacy Modernization

**Date:** 2026-05-23  
**Status:** Approved  
**Author:** Project Manager  

---

## 1. Goal & Context
The **Edu+** platform features a premium dark glassmorphic, monospace-font HUD (Head-Up Display) theme. To preserve this visual identity, the codebase has a strict compliance scanner (`scripts/check-ui-compliance.js`) that enforces style guidelines, including:
- Prohibiting rounded corners (except `rounded-none`).
- Prohibiting non-theme color overrides.
- Requiring interactive states (`hover:`, `focus:`) for links/buttons.
- Disallowing inline `style` attributes.

Currently, the codebase contains **70 errors and 38 warnings** in active page files. Additionally, multiple core layouts (such as `Dashboard.tsx`, `Guidance.tsx`, `Login.tsx`, and telemetry/simulation sections) have been completely bypassed/excluded in the scanner settings because they are legacy non-compliant files.

This specification details how we will systematically:
1. **Fix all 70 errors and 38 warnings** in the active components.
2. **Refactor and modernize all legacy bypassed files** to meet HUD design standards.
3. **Remove all file exclusions**, locking the scanner at **0 errors and 0 warnings repository-wide** to prevent future design drift while maintaining the exact visual premium feel of the final v2 application.

---

## 2. HUD Design Token Translations
To keep the visual look 100% the same as the final v2 experience while achieving 100% compliance, the following token conversions will be strictly applied:

| Old Non-Compliant Style | Approved HUD Compliant Replacement | Visual Effect |
| :--- | :--- | :--- |
| `rounded-full` / `rounded-md` on status indicators, timelines, small dots | `rounded-none shadow-[0_0_8px_oklch(var(--primary))]` | Converts circles/rounded badges to sharp, high-tech square micro-nodes. |
| `rounded-full` on user/team avatars | `rounded-none border border-primary/30 p-0.5 bg-background` | Frames circular avatar images inside sharp, tech-style squared bordered containers. |
| `rounded-md` / `rounded-lg` on cards, panels, inputs, and dropdowns | `rounded-none border border-border bg-card/50 backdrop-blur-md` | Retains glassmorphic backdrop while providing sharp tech frames. |
| Missing interactive hover/focus states on `<Link>`, `<NavLink>`, `<button>`, `<a>` | Add `hover:text-[#7DF9FF] hover:border-primary/50 focus:outline-none focus:ring-1 focus:ring-[#7DF9FF] transition-all duration-300` | Implements premium neon cyan highlights and accessible focus rings. |
| Inline `style={{ ... }}` | Move properties (e.g. gradients, custom clip paths) to `src/index.css` as utility classes or use Tailwind equivalents. | Removes inline style attributes while maintaining identical rendering. |

---

## 3. Scope of Proposed Changes

### A. Active Components Clean-up (70 Errors, 38 Warnings)
*   **`src/pages/About.tsx`**: Clean up team card profiles, avatar images, timeline node highlights, and value grids.
*   **`src/pages/Programs.tsx`**: Refactor course card modules, filters, progress markers, and inline styles on indicators.
*   **`src/pages/Council.tsx`**: Square the social links, card layouts, board members grid, and add robust active states.
*   **`src/pages/SignatureExperiences.tsx`**: Convert animated pulsing circles and indicator bubbles to compliant styled square grids.
*   **`src/sections/ServicesMatrix.tsx`**: Standardize main landing page matrix containers and icons to `rounded-none`.
*   **`src/sections/Navigation.tsx`**: Complete interactive state definitions (`hover:text-[#7DF9FF] focus:ring-1 focus:ring-[#7DF9FF]`) for all menu anchors and buttons.
*   **`src/sections/Footer.tsx`**: Fix interactive anchors.

### B. Legacy Bypassed Components Refactoring
Remove files from scanner exclusion and modernize:
*   **`src/pages/Dashboard.tsx`**: Refactor main sidebar dashboard, role selector items, status bars, and avatar blocks to be fully sharp-cornered HUD style.
*   **`src/pages/Guidance.tsx`**: Square form layout containers, select boxes, floating chat bubbles, and interactive advisories.
*   **`src/pages/Login.tsx`**: Redesign standard form panel borders, credentials container, focus states on inputs, and submit button boundaries.
*   **`src/sections/TelemetryStats.tsx`**: Align the Recharts panel box, button group tabs, and floating tooltips to standard `rounded-none` borders.
*   **`src/sections/PathwaySimulator.tsx`**: Square interactive simulators, pathway node cards, simulation flow controllers, and tracks.
*   **`src/sections/PedigreeShowcase.tsx`**: Modernize visual pedigree chart items and timelines.

### C. Compliance Lock-in
*   Modify `scripts/check-ui-compliance.js` to clear bypassed files from `IGNORE_PATHS`:
```javascript
const IGNORE_PATHS = [
  /node_modules/,
  /dist/,
  /\.test\./,
  /check-ui-compliance\.js/,
  /main\.tsx/,
  /vite-env\.d\.ts/,
  /src[\\/]components[\\/]ui/ // Ignore shadcn UI primitives only
];
```

---

## 4. Verification Plan

### Automated Verification
Run compliance checks and unit/build checks:
1. **Compliance Scanner**:
   ```bash
   pnpm run ui-check
   ```
   *Expected result: Exits with code 0. Logs `✓ UI compliance check passed successfully!` with exactly 0 errors and 0 warnings.*

2. **TypeScript & Build Verification**:
   ```bash
   pnpm run build
   ```
   *Expected result: Bundles successfully without any compiler errors.*

### Manual/Visual Verification
- Confirm that the final v2 visual feel remains intact across all pages.
- Ensure buttons/links have interactive glows on hover and focus rings on selection.
- Verify that status micro-nodes look visually like square glowing indicators rather than simple standard circles, aligning with the tech HUD concept.
