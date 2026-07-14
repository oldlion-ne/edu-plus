# Developer Guidelines for EduPlus

## Build and Test Commands
- Use **pnpm** exclusively. **NPM is forbidden.**
- Start dev server: `pnpm run dev`
- Production build: `pnpm run build`
- Type checking: `pnpm tsc -b` (or `npx tsc -b`)
- Run tests: `pnpm run test:run`
- Run linter: `pnpm run lint`

## Project Initialization
- Preset Template: `pnpm dlx shadcn@latest init --preset b4YtlA5Ym2 --template vite`

## Design System — Nordic Lagom Philosophy
- The visual identity follows the **Nordic Lagom** design philosophy: clean, balanced, and quietly confident.
- **Color palette:** Warm charcoal backgrounds, candlelight amber/gold accent, warm off-white text. Defined in OKLCH in `app/src/index.css`.
- **Typography:** `Inter Variable` for headings and body. `Outfit` as alternate sans-serif. Monospace is reserved only for technical data (IDs, status codes).
- **No cyberpunk/HUD patterns:** No neon glows, pulsing animations, dot-grids, or scrambling text effects.

## Styling and Layout Rules
- Styling uses Tailwind CSS.
- All newly added components and modified container cards must adhere strictly to the straight-line requirement (`rounded-none`). No rounded corners allowed.
- **No curved lines anywhere:** SVG paths must use `L`/`H`/`V`/`Z` only (no Bezier curves `C`/`S`/`Q`/`A`). Recharts must use `type="linear"`.
- **Animations:** Only refined transitions (fade-ins, soft translations, hover color shifts). No glowing, pulsing, or aggressive motion.

## Illustration & Imagery Rules
- **Style:** Ultra-clean flat vector, soft gradient cel shading, warm dark charcoal background, candlelight amber highlights.
- **Asian Community Requirement:** All human characters in illustrations and avatars **must** represent East Asian people. Non-Asian characters are strictly forbidden.
- **Geometry:** Straight lines only in illustrations. No curved decorative paths.
