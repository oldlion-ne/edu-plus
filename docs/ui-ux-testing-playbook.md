# EduPlus UI/UX Testing Playbook — Nordic Lagom Design

This playbook outlines the visual and behavioral standards required to maintain UI/UX consistency across the EduPlus web application. All developers must follow these guidelines and verify their implementation before submitting pull requests.

---

## 1. Core Design Tokens & Theme Constants

All styles must adhere to the central theme tokens defined in `src/index.css` using the OKLCH color space:

**Dark Mode (Primary — `.dark`)**
- **Background:** Warm charcoal `oklch(18% 0.012 60deg)` — not cold/cyberpunk black.
- **Foreground/Text:** Warm off-white `oklch(93% 0.006 80deg)`.
- **Primary Accent:** Candlelight amber `oklch(78% 0.13 70deg)` — used for active states, outlines, highlights, and CTAs.
- **Muted Text:** Desaturated warm slate `oklch(65% 0.012 60deg)`.
- **Borders:** Subtle white-alpha `oklch(100% 0 0deg / 0.08)`.

**Light Mode (`:root`)**
- **Background:** Warm off-white cream `oklch(98.5% 0.004 80deg)`.
- **Foreground/Text:** Warm dark charcoal `oklch(22% 0.01 60deg)`.
- **Primary Accent:** Warm amber/gold `oklch(75% 0.12 70deg)`.

**Typography:**
- Body and general UI text: `Inter Variable` or `Outfit` (sans-serif).
- Headings (`h1`–`h6`): `Inter Variable` (sans-serif) — clean and geometric.
- Monospace: Reserved only for technical data (IDs, status codes). Never for headlines, navigation, or body copy.

---

## 2. The Straight-Edge Rule (Strict Requirement)

To maintain a premium, clean, and balanced Nordic Lagom layout:
- **No Curved Lines:** All container blocks, cards, buttons, input fields, badges, dialogs, navigation links, borders, SVG paths, and chart interpolations must use **straight lines only**.
- **Tailwind Class:** You must use `rounded-none` (or leave out any `rounded-*` class entirely).
- **Prohibited Classes:** `rounded`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`, and their side-specific variants (e.g. `rounded-t-*`, `rounded-r-*`).
- **SVG Paths:** Must use `L` (line to), `H` (horizontal), `V` (vertical), or `Z` (close). Bezier curves (`C`, `S`, `Q`, `A`) are forbidden.
- **Charts:** Recharts components must use `type="linear"`. Values `type="monotone"` and `type="natural"` are forbidden.
- **Exceptions:** Third-party components or media assets if wrapped or isolated correctly, and marked with a `/* ui-ignore */` inline comment.

---

## 3. Animation & Motion Checklist

- [x] **Allowed:** Fade-ins (`opacity` + `translateY`), smooth hover color transitions, soft scaling on hover.
- [x] **Transitions:** Standard durations using `transition-all duration-200` or `duration-300`.
- [ ] **Forbidden:** Glowing effects, pulsing neon, scrambling/typewriter text, cyberpunk HUD animations, `animate-pulse` on decorative elements.

---

## 4. Interactive States Checklist

All interactive elements (buttons, links, form inputs) must support clear visual cues:
- [ ] **Hover State:** Custom visual change using the primary amber accent (e.g., `hover:text-primary`, `hover:border-primary/50`).
- [ ] **Keyboard Focus State:** Standard outline indicator using the accent ring. Example: `focus:outline-none focus:ring-1 focus:ring-ring`.
- [ ] **Click Active State:** Immediate visual change when holding the element down (e.g. slight opacity shift).
- [ ] **Transitions:** Smooth UI transitions using standard durations. Example: `transition-all duration-300`.

---

## 5. Responsive Breakpoints Verification

Every UI feature must be manually verified across the following viewports:

### A. Mobile View (under 768px)
- Navigation shifts to a mobile drawer toggle.
- Text sizes scale down to prevent wrapping overlap.
- Multi-column grids collapse to single-column vertical lists.
- Margins and paddings are reduced to `px-4` or `px-6` max.

### B. Tablet View (768px - 1024px)
- Layout adapts smoothly without horizontal overflow.
- Navigation remains clean (either compact horizontal links or drawer toggle).
- Grid structures adjust to 2-column formats.

### C. Desktop View (1024px+)
- Container content is centered with a max-width of `max-w-[1440px]`.
- Warm hover effects and large layouts are fully enabled.

---

## 6. Illustration & Imagery Guidelines

- **Style:** Ultra-clean flat vector illustration with soft gradient cel shading.
- **Palette:** Warm dark charcoal backgrounds, candlelight amber highlights, slate grey shadows.
- **Asian Community Requirement:** All human characters in illustrations and avatars **must** represent East Asian people. Non-Asian characters are strictly forbidden.
- **Geometry:** Straight lines only in all visual elements. No curved decorative paths.
