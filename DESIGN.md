# EduPlus Design System Contracts

**Version:** 2.0 (Nordic Lagom)
**Status:** Approved for implementation (Wave 1)

This document serves as the authoritative contract for the EduPlus design system, resolving previous contradictory implementations and establishing firm guidelines for theme defaults, geometry, typography, and shared primitives.

## 1. Contextual Theme Policy
- **Public Routes (Marketing/Info):** Default to **Nordic Day** (warm paper/ink).
- **Admin/Educator Routes (Dashboards):** Default to **Nordic Night** (warm charcoal/ink).
- **Learner Routes (LMS Hub/Lessons):** Default to **Nordic Night** to reduce eye strain during prolonged learning sessions.
- **Preference Persistence:** User explicit theme preferences (via theme toggle) will persist via local storage and supersede route-level defaults without flashing. Portals and overlays will inherit the active route theme dynamically.

## 2. Geometry and Shape Contracts
- **Radius:** A strict uniform `0px` radius policy is enforced globally. All elements (buttons, cards, dialogs, inputs) must have sharp, orthogonal corners.
- **Curves:** No curved lines anywhere in the UI. 
  - SVG paths must exclusively use linear commands (`L`, `H`, `V`, `Z`). Bezier curves (`C`, `S`, `Q`, `A`) are prohibited.
  - Data visualizations (Recharts) must use `type="linear"`.
- **Third-Party Assets:** Any approved third-party SVGs or logos that contain curves are isolated exceptions and must not dictate the UI's structural geometry.

## 3. Typography and Spacing Rhythm
- **Type Scale:**
  - Headings/Display: `Fraunces` (serif)
  - Body/UI: `Instrument Sans` (sans-serif)
  - Data/Micro-labels: `IBM Plex Mono` (monospace)
- **Spacing:** Text density must remain low. Elements require generous padding (`p-4` or `p-5`) and relaxed line heights (`leading-relaxed`). 
- **Legibility:** Long labels must not be constrained to micro-label (`text-xs`) typography. Contrast must meet WCAG AA standards across both themes.

## 4. Surfaces and Elevation
- **Tonal Surfaces over Shadows:** Elevation is communicated through tonal shifts in surface backgrounds (e.g., `bg-muted/20`, `bg-card`) rather than heavy drop shadows.
- **Borders:** Crisp, 1px borders (`border-border`) separate content panes. Floating overlays (dialogs, popovers) use sharp, solid backgrounds with a subtle, non-diffuse 1px ring if needed.
- **Action Hierarchy (60-30-10 Rule):** 
  - 60% warm neutrals (paper/night backgrounds)
  - 30% ink (text) and hairline structures (borders)
  - 10% accent colors. The primary action color (Ochre) should ideally appear only once per viewport to establish clear hierarchy.

## 5. Motion and Animation
- **Pacing:** Nature-paced, state-first motion. The base transition duration is `240ms` (`duration-240` or closest standard utility).
- **Easing:** Soft, refined transitions (fade-ins, soft translations like `translate-y-[1px]`).
- **Prohibited Motion:** No aggressive flashing, neon glows, pulsing animations, dot-grids, or scrambling text effects.
- **Exception:** The `GlyphMatrix` component is the sole explicitly permitted exception for complex particle/text scrambling motion.

## 6. Shared Primitive Ownership
- **Single Source of Truth:** Radix UI primitives wrapped with Tailwind CSS utilities form the core component library (e.g., `src/components/ui/`).
- **No Duplication:** Component logic must not be rebuilt as page-local controls. If a component (e.g., Button) lacks a state, the core primitive must be updated.
- **Extension Rules:** Temporary page-level UI components are allowed only if they do not duplicate an existing shared primitive. All interactive states (focus, hover, pressed, disabled) must be implemented globally.

## 7. Component Review Checklist
Before any component is merged or finalized in Wave 1, it must pass:
- [ ] Has 0px border-radius (`rounded-none`).
- [ ] Honors the current theme (Day/Night) without hardcoded non-semantic colors.
- [ ] Maintains minimum touch target sizes (44x44px equivalent) on mobile.
- [ ] Implements explicit focus-visible states (`focus-visible:ring`).
- [ ] Contains no curved SVGs (unless explicitly exempted).
- [ ] Avoids pulsing/glowing animations.

**Exception Owner:** The Design Lead / Product Owner must explicitly approve any deviation from these contracts (e.g., third-party brand assets).
