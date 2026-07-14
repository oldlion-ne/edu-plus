# Design Specification — Extreme Lagom (Global Typographic Minimalism)

**Date**: 2026-07-14  
**Status**: APPROVED  
**Topic**: Nordic Minimalism Redesign

---

## Design Direction Statement
We are implementing **Extreme Lagom (Option A): Global Typographic Minimalism**. Every page, every section, and every component must adhere strictly to this rule: 
> *"If it does not help the learner take the next step, it is removed."*

We define boundaries and layout structure through negative space, generous margins, and precise typography alignment—never through boxed borders, shadows, backgrounds, or decorative lines.

---

## 1. Home Page Sections

### Hero Section (`Hero.tsx`)
*   **Remove**: Background video, all absolute overlays, timeline animations, bottom stats strip, and decorative elements.
*   **Implement**: Solid `bg-background` (`#FAF9F7`), generous vertical padding (`pt-40 pb-32`), and a clean, centered typographic hierarchy.
*   **Typography**:
    *   Eyebrow: `13px` / `500` / `#9B9B9B` / uppercase / tracking-wide
    *   H1: `56px` / `500` / `#1A1A1A` / line-height `1.15`
    *   Subtext: `18px` / `400` / `#6B6B6B` / max-width `55ch`
*   **CTAs**: Two buttons, `rounded-none`, `52px` height, `28px` horizontal padding.
    *   Primary: `#1A1A1A` fill, `#FAF9F7` text.
    *   Secondary: transparent, `1px` `#1A1A1A` border.
    *   Hover: accent `#C8956C` fill.
*   **Stats**: Removed entirely. Stats telemetry lives exclusively in the dedicated section below.

### Partner Marquee (`PartnerMarquee.tsx`)
*   **Remove**: Boxed cards, borders, backgrounds, Lucide icons, category lines, and all scrolling animation.
*   **Implement**: A static, centered horizontal flex row with partner names only (`15px` / `500` / `#6B6B6B`), `80px` gap between names, and `120px` vertical padding.
*   **Hover**: Name shifts to `#1A1A1A`, and a `1px` bottom border of `#C8956C` appears.
*   **No categories, no motion, no card shapes.**

### Telemetry & Stats (`TelemetryStats.tsx`)
*   **Remove**: Dotted world map, location cards, simulated chat thread, watermark SVGs, and all visual decorations.
*   **Implement**: A single row of 4 columns, `160px` vertical padding, and `48px` column gap.
*   **Typography**:
    *   Metric: `48px` / `500` / `#1A1A1A`
    *   Label: `13px` / `500` / `#9B9B9B` / uppercase / tracking-wide
*   **Ochre accents**: A `4px` ochre (`#C8956C`) dot above each number OR a numeral prefix (e.g., `"01 Learners"`). No colored numbers.
*   **Borders**: No borders between columns. A single `1px` `#E8E6E3` vertical rule is placed between columns 2 and 3 only (acting as a visual breathing pause).
*   **Mobile**: Vertical stack with `80px` gap between stats.

### Services Matrix (`ServicesMatrix.tsx`)
*   **Remove**: Triple automated marquees, central floating logo node, and all motion.
*   **Implement**: A static 3-column grid (2 rows, 6 programs), `48px` gap, and `160px` vertical padding.
*   **Cards**: No border, no background, no shadow. `40px` internal padding, rendered transparently over the `#FAF9F7` page background.
*   **Content**:
    *   Program Name: `20px` / `500` / `#1A1A1A`
    *   Description: `15px` / `400` / `#6B6B6B` (maximum 3 lines)
    *   Link: `"Explore →"` (`14px` / `500` / `#C8956C`, underline on hover)
*   **Hover**: Card background shifts to `#F5F3F0`. No scaling, no glowing, and no border changes.

### Pedigree Showcase (`PedigreeShowcase.tsx`)
*   **Remove**: All connected SVG diagrams, concentric squares, vertical bars, shields, radial glows, and all other decorations.
*   **Implement**: 2x2 grid, `64px` horizontal gap, `80px` vertical gap, and `160px` section padding.
*   **Cards**: Text-only. No border, no background, no shadow, `40px` padding.
*   **Content**:
    *   Label: `13px` / `500` / `#9B9B9B` / uppercase (e.g., `"01 — Integrations"`)
    *   Heading: `24px` / `500` / `#1A1A1A`
    *   Description: `16px` / `400` / `#6B6B6B` (maximum `45ch`)
*   **Hover**: Background shifts to `#F5F3F0`. No other effects.

---

## 2. Subpages (Global Enforcement)

The Home page DNA is the **only** design DNA allowed. No page-specific visual diagrams, primary illustrations, or custom ornaments will be preserved.

### Global Removals (To Be Deleted Universally):
*   Floating background grids or grid overlays
*   Floating nodes and connection lines
*   Canvas telemetry widgets or interactive modules
*   Mock terminal overlays (e.g., `LOG_PORT`, `TERMINAL_EXECUTION_DEV`)
*   Hover radial glows and shadows
*   3D hero illustrations and neon lighting
*   Seating charts (on `Council.tsx`)
*   Phase badges with hexagons (on `Programs.tsx`)
*   Flowchart illustrations (on `Guidance.tsx`)
*   Floating "Ask" buttons
*   Duplicate scroll-to-top arrows
*   All decorative icons on cards

### Global Additions (To Be Implemented Universally):
*   Typographic hero (eyebrow, H1, subtext, optional CTA, `160px+` vertical padding)
*   Clean flat grids (cards: no border, no background, no shadow, `40px` padding, `#F5F3F0` background on hover)
*   Clean list groups (no borders between items; `1px` `#E8E6E3` top border only if needed for separation)
*   Generous negative space (`py-24` to `py-32` minimum between main sections)

### Page-by-Page Audit & Redesign Map:

| Page | Specific Removals | Specific Implementations |
| :--- | :--- | :--- |
| **About** | Timeline graphics, "Manipur Root" map, progress bars, and value shields. | Vertical text timeline (alternating layout), numbered value statements (`01`, `02`, `03`) in flat text blocks. No icons. |
| **Programs** | Hexagonal phase badges, `"PHASE_01 // DISCOVERY"` labels, connecting pipeline lines, and aptitude scan graphics. | Simple numbered list: `"01 FuturePath Navigator"` with description. 2-column: phase list on the left, detail card on the right. No badges, no shapes. |
| **Knowledge Hub** | 3D desk hero, pill filter buttons, and `"LOADING RESOURCES..."` text. | Typographic hero. Filter tabs as text links with a `1px` bottom border when active. Resource cards with `3:2` contained image thumbnails. |
| **Council** | Seating chart, `"SEAT.01 // CHAIR"`, `"DOSSIER →"`, category tags, and initial-letter testimonial cards. | 3-column grid: `4:5` portrait photos (properly framed), name (`H3`), title (`body gray`), and institution (small). One large quote per page, centered. |
| **Guidance** | Terminal code block, flowchart illustration, tab boxes with fills, and pricing checkmarks. | Text tabs (underline when active). Flat text blocks. Pricing: one card, large price, 4 text bullets (no icons), and one CTA. |
| **Events** | Speaker hero (cropped), stacked metadata pills, FAQ accordion icons, and `"Ask"` buttons. | Typographic hero. Event cards: horizontal `3:2` image on the left (contained), text on the right. FAQ: `1px` top border dividers, no icons. |
| **News** | 3D newspaper hero, category tags on cards, `"Read Article →"` arrows, and read time. | Typographic hero. Article grid: `3:2` thumbnail, title, and date only. No tags, no arrows, no read time. |

---

## 3. Typography & Tokens

### Font Family
*   **Primary**: `Inter Variable` (`400`, `500`, `600` weights only). No weight `700`, and no italics in UI.
*   **Outlawed**: `Outfit` and all other geometric sans-serifs with rounded terminals.
*   **Monospace**: Completely removed from all UI elements. Monospace is reserved exclusively for actual code blocks and database IDs. No code-like labels on cards, buttons, or navigation.

### Color Tokens (Locked)

| Token | Value | Usage |
| :--- | :--- | :--- |
| `bg-background` | `#FAF9F7` | Page background |
| `bg-secondary` | `#F5F3F0` | Card hover, footer background, subtle bands |
| `text-primary` | `#1A1A1A` | Headings, body text, buttons |
| `text-secondary` | `#6B6B6B` | Descriptions, partner names, metadata |
| `text-muted` | `#9B9B9B` | Labels, eyebrows, timestamps |
| `accent` | `#C8956C` | Hover states, active indicators, links |
| `border` | `#E8E6E3` | `1px` dividers only (never card borders) |

*   **No gradients, no neon, no glows, and no shadows on cards.**

---

## 4. Component DNA (Universal)

### Buttons (3 variants only)
1.  **Primary**: `bg-text-primary` (`#1A1A1A`), `text-bg-background` (`#FAF9F7`), `rounded-none`, `h-13` (52px), `px-7`.
2.  **Secondary**: `bg-transparent`, `border border-text-primary` (1px #1A1A1A), `text-text-primary` (`#1A1A1A`), `rounded-none`, `h-13` (52px), `px-7`.
3.  **Text Link**: `text-accent` (`#C8956C`), underline on hover, no border, no background.

### Cards (One DNA only)
*   **Background**: Transparent (or `#FFFFFF` if forced by adjacent section container context)
*   **Border**: None (`0px`)
*   **Shadow**: None
*   **Radius**: None (`0px`)
*   **Padding**: `40px` (2.5rem)
*   **Hover**: `bg-secondary` (`#F5F3F0`) background shift only. No scaling, no glowing, no border changes.

### Navigation
*   Transparent over the hero, `bg-background/80` with `backdrop-blur-md` on scroll.
*   Links: `15px` / `500` / `text-primary`.
*   Active: `1px` bottom border of `accent` (`#C8956C`). No bold font weight, no background.

### Footer
*   **Background**: `bg-secondary` (`#F5F3F0`)
*   **Layout**: Logo + tagline (left, 25%), 3 link columns (center, 50%), copyright bar (bottom, full-width).
*   **No floating buttons or scroll arrows.**

---

## 5. The Final Honesty Checklist

Before any component is integrated, verify:
*   [ ] If I remove all images, is the typography and spacing still beautiful? (Nordic test)
*   [ ] Does this element justify its existence with the phrase *"helps the learner take the next step"*?
*   [ ] Is there any animation, glow, or motion? (If yes, remove it)
*   [ ] Is there any border, shadow, or radius on a card? (If yes, remove it)
*   [ ] Does this page feel like it is in the same room as the home page? (If no, redesign)
