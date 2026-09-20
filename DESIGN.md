# Design System (Nordic Lagom)

## Colors
All tokens use OKLCH for perceptual uniformity.
- **Nordic Day (Light - Public Default):**
  - Backgrounds: Paper (`96.5% 0.012 85`), Surface (`99% 0.006 85`).
  - Text: Ink (`24% 0.018 60`), Ink 2 (`38% 0.02 60`), Ink 3 (`52% 0.02 65`).
  - Accents: Ochre (`57% 0.115 68`) for primary action, Fjord (`50% 0.055 225`) for info, Moss (`53% 0.065 145`) for success, Clay (`52% 0.11 38`) for destructive.
  - Borders: Hairline (`88% 0.015 80`).
- **Nordic Night (Dark - Admin Default):**
  - Backgrounds: Night-0 (`18% 0.014 70`), Night-1 (`22% 0.015 70`), Night-2 (`27% 0.016 70`).
  - Text: Text-1 (`93% 0.01 80`), Text-2 (`74% 0.018 70`).
  - Accents: Ochre-Night (`74% 0.11 75`).

## Typography
- **Display/Headings:** `Fraunces` (Editorial voice).
- **Body/UI:** `Instrument Sans` (Quiet, functional).
- **Data/Micro-labels:** `IBM Plex Mono` (Data-only, tabular nums).
- **Scale:** 1.25 ratio (12, 14, 16, 20, 25, 31). Fixed rem for admin; fluid for marketing.

## Geometry & Layout
- **Radius:** Uniform 0px radius (razor-sharp) for all components.
- **Spacing Rhythm:** 4px base unit, 8pt vertical rhythm. Admin is breathable (24-32px padding, relaxed line-heights), public is editorial (96/128px rhythm).
- **Surfaces:** 3-level surfaces (low elevation). Hairline borders.

## Imagery & Motion
- **Style:** Ultra-clean flat vector, soft gradient cel shading, matching the UI temperature (warm paper or warm charcoal). East Asian representation only.
- **Motion:** Nature-paced, state-first. Base duration 240ms, fast 160ms, slow 360ms. Ease-out (`cubic-bezier(.2,.7,.3,1)`) for entry.
- **"Just Enough":** No cyberpunk, no HUD patterns. One primary CTA per viewport.
