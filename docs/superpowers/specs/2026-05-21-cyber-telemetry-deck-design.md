# Spec: Cyber Telemetry Deck Design

This specification details the redesign and drastic enhancement of the Eduplus homepage using a high-density, bento-style **Cyber Telemetry Deck** layout, integrated with the `@ui-layouts/advanced-stats` shadcn component block. All elements strictly adhere to the brand's sharp-cornered (`rounded-none`) cyber-punk aesthetic.

---

## 1. Goal Description

Redesign the homepage of Eduplus (`Home.tsx`) to feel premium, visually state-of-the-art, responsive, and data-dense. By replacing static blocks with modules showing animated training paths, career simulation nodes, and active expert nodes, we want to deliver a powerful, technical developer-console impression.

---

## 2. Design Constraints

* **Corner Radius**: Absolute `rounded-none` (no rounded corners anywhere).
* **Color System**:
  * Dark Canvas: `#0B0F14`
  * Card Surface: `#0E131A`
  * Accent Blue/Cyan: `#7DF9FF` (with varying opacities for glows)
  * Primary Text: `#E6EDF3`
  * Secondary Text: `#8B949E`
  * Green Status: `#34c759`
* **Dependencies**: React 19, TypeScript, TailwindCSS v3, Framer Motion (`motion` / `framer-motion`), `shadcn-ui`.

---

## 3. Proposed Layout Architecture

The new homepage layout will be structured as a sequence of immersive bento-style panels:

### Component 1: System Status Bar (Refinement)
* **Location**: Mounted at the very top of `Home.tsx` / `Navigation.tsx`.
* **Details**: A thin, high-tech top-banner displaying running terminal text or simple cyber metrics like:
  `SYS_STATUS: ACTIVE // POWER_LOAD: nominal // TARGET_COGNITION: max`.

### Component 2: Hero Section (Existing - Preserved)
* **Location**: `Hero.tsx`.
* **Details**: Retains the high-quality cinematic video background, RandomizedTextEffect, and ScrollTextMarquee but scales down the padding to blend cleanly into the new telemetry deck.

### Component 3: Telemetry Stats Grid (New - `@ui-layouts/advanced-stats` Component)
* **Location**: `src/sections/TelemetryStats.tsx` [NEW].
* **Integration**: Adds the component block via `npx shadcn add @ui-layouts/advanced-stats`.
* **Customizations**:
  * Overrides the component's default border-radius to `rounded-none`.
  * Integrates the standard `#7DF9FF` cyan accents for numbers and glowing status dots.
  * Displays four key telemetry metrics:
    1. **`256+` SYSTEM_NODES**: Deployed training pathways.
    2. **`08` EXPERT_NODES**: Frontier research advisors active in registry.
    3. **`99.9%` LINK_LATENCY**: Mentorship connectivity index.
    4. **`14.8K` PATH_COMMITS**: Completed skill milestones.

### Component 4: Interactive Career Pathway Simulator (New)
* **Location**: `src/sections/PathwaySimulator.tsx` [NEW].
* **Details**: A wide bento card block placed below the stats.
  * Interactive skill focus selection buttons (Linguistics, Hydrogen Energy, AI Models, Career Strategy).
  * An animated SVG line path that dynamically connects nodes in real-time based on the selected skill focus.
  * Glowing text output declaring the determined optimized specialized career pipeline.

### Component 5: Technical Pedigree Bento (Refinement of `PedigreeShowcase.tsx`)
* **Location**: `PedigreeShowcase.tsx`.
* **Details**: Renders the 8-node expert registry as dense, cybernetic bento grid cards. Uses local bounding coordinate tracking (restored in Spotlight) to handle high-fidelity hover border-glowing gradients.

---

## 4. Verification Plan

### Automated Verification
* Run `pnpm build` or `tsc -b && vite build` to ensure type-safety and successful clean builds.
* Run `pnpm test` (vitest) to ensure all tests (including PedigreeShowcase test, Home test, etc.) continue to pass perfectly.

### Manual Visual Verification
* Start the development server (`pnpm dev` on port `3001`).
* Verify that no borders use rounded utilities (`rounded-*`) and that hover animations behave smoothly under different screen sizes.

---

## 5. Open Questions & Future Proofing
* **Metric Realism**: Metrics are currently statically mocked to represent system scales. In future sprints, these can be wired up to real-time database counts via server side channels.
