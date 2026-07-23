# Design System

## Colors
- **Backgrounds:** Warm charcoal (`15% 0.01 85deg` dark, `98% 0.01 85deg` light).
- **Accents:** Candlelight amber/gold (`65% 0.15 75deg` light, `75% 0.16 75deg` dark).
- **Text:** Warm off-white.

## Typography
- **Primary (Sans):** Inter Variable for headings and body.
- **Alternate (Sans):** Outfit.
- **Monospace:** Reserved only for technical data (IDs, status codes).

## Geometry & Layout
- **Strictly Orthogonal:** All components must adhere strictly to the straight-line requirement (`rounded-none`). No rounded corners allowed.
- **No Curves:** SVG paths must use `L`/`H`/`V`/`Z` only (no Bezier curves). Recharts must use `type="linear"`.

## Imagery & Motion
- **Style:** Ultra-clean flat vector, soft gradient cel shading, warm dark charcoal background, candlelight amber highlights.
- **Characters:** East Asian people only.
- **Animations:** Refined transitions only (fade-ins, soft translations, hover color shifts). No glowing, pulsing, or aggressive motion.
