# Developer Guidelines for EduPlus

## Build and Test Commands
- Use **pnpm** exclusively. **NPM is forbidden.**
- Start dev server: `pnpm run dev`
- Production build: `pnpm run build`
- Type checking: `pnpm tsc -b`
- Run tests: `pnpm run test:run`
- Run linter: `pnpm run lint`

## Project Initialization
- Preset Template: `pnpm dlx shadcn@latest init --preset b4YtlA5Ym2 --template vite`

## Design System — Nordic Lagom Philosophy
- The visual identity follows the **Nordic Lagom** design philosophy: clean, balanced, and quietly confident.
- **Color palette:** Warm paper/ink for public ("Nordic Day") and warm charcoal/ink for admin ("Nordic Night"). Key accents are Ochre (primary), Fjord (info), Moss (success), and Clay (destructive). Defined in OKLCH in `app/src/index.css`.
- **Typography:** `Fraunces` for headings/display, `Instrument Sans` for body/UI, and `IBM Plex Mono` for data and micro-labels only.
- **Text Spacing:** Ensure text is never crowded. Use generous paddings (`p-4` or `p-5`) and relaxed line heights (`leading-relaxed`) to give content room to breathe.
- **No cyberpunk/HUD patterns:** No neon glows, pulsing animations, dot-grids, or scrambling text effects. *(Exception: The global `GlyphMatrix` component is explicitly permitted as the sole exception to this rule).*

## Styling and Layout Rules
- Styling uses Tailwind CSS.
- **Geometry:** Components should use a uniform 0px radius for a sharp aesthetic (`rounded-none` with `--radius: 0px`).
- **No curved lines anywhere:** SVG paths must use `L`/`H`/`V`/`Z` only (no Bezier curves `C`/`S`/`Q`/`A`). Recharts must use `type="linear"`.
- **Animations:** Nature-paced, state-first motion (240ms base). Only refined transitions (fade-ins, soft translations). No glowing, pulsing, or aggressive motion.

## Illustration & Imagery Rules
- **Style:** Ultra-clean flat vector, soft gradient cel shading, warm dark charcoal or warm paper background, candlelight amber highlights.
- **Asian Community Requirement:** All human characters in illustrations and avatars **must** represent East Asian people. Non-Asian characters are strictly forbidden.
- **Geometry:** Straight lines only in illustrations. No curved decorative paths.
