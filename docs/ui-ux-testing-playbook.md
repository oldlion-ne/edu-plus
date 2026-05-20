# EduPlus UI/UX Testing Playbook

This playbook outlines the visual and behavioral standards required to maintain UI/UX consistency across the EduPlus web application. All developers must follow these guidelines and verify their implementation before submitting pull requests.

---

## 1. Core Design Tokens & Theme Constants

All styles must adhere to the central theme tokens defined in `src/index.css`:
- **Primary Background:** Solid Slate `#0B0F14` (for subpages) or Cloudinary Video Background (for Home page).
- **Foreground/Text Primary:** `#E6EDF3` (Off-white).
- **Accent Color:** Neon Cyan `#7DF9FF` (used for active states, outlines, highlights, and primary CTAs).
- **Typography:**
  - Body and general UI text: `Outfit` (sans-serif).
  - Headings (`h1`, `h2`, `h3`, etc.): `Merriweather` (serif).

---

## 2. The Straight-Edge Rule (Strict Requirement)

To maintain a premium, high-tech, and consistent futuristic cyberpunk layout:
- **No Rounded Corners:** All container blocks, cards, buttons, input fields, badges, custom dialogs, navigation links, and borders must have **straight lines only**.
- **Tailwind Class:** You must use `rounded-none` (or leave out any `rounded-*` class entirely).
- **Prohibited Classes:** `rounded`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full`, and their side-specific variants (e.g. `rounded-t-*`, `rounded-r-*`).
- **Exceptions:** Third-party components or media assets (e.g. avatar images, map layers, or specific third-party library primitives) if wrapped or isolated correctly, and marked with a `/* ui-ignore */` inline comment.

---

## 3. Interactive States Checklist

All interactive elements (buttons, links, form inputs) must support clear visual cues for user actions:
- [ ] **Hover State:** Custom visual change (e.g., changing text color to `#7DF9FF`, scaling borders, or shifting background opacity). Example: `hover:text-[#7DF9FF]` or `hover:bg-[#7DF9FF] hover:text-[#0B0F14]`.
- [ ] **Keyboard Focus State:** Standard outline indicator using the accent ring. Example: `focus:outline-none focus:ring-1 focus:ring-[#7DF9FF]`.
- [ ] **Click Active State:** Immediate visual change when holding the element down (e.g. slight opacity shift or font weight change).
- [ ] **Transitions:** Smooth UI transitions using standard durations. Example: `transition-all duration-300`.

---

## 4. Responsive Breakpoints Verification

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
- Rich hover effects, background glows, and large layouts are fully enabled.
