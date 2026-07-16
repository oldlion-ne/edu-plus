# Qodo / Macroscope Review Guidelines

These guidelines define the review standards for the EduPlus project. When reviewing pull requests, Qodo must evaluate the code against these specific requirements to ensure structural and aesthetic consistency.

## 1. Architectural & Tooling Standards
- **Package Manager:** Ensure the PR does not introduce `npm` or `yarn` commands or lockfiles (`package-lock.json`, `yarn.lock`). We exclusively use `pnpm`.
- **Imports:** Verify that components import from `@/components/ui` or relative paths correctly, and do not introduce unapproved third-party UI libraries outside of Radix/Shadcn.

## 2. Design System: Nordic Lagom Philosophy
- **Aesthetic:** EduPlus uses a "Nordic Lagom" design — clean, balanced, and quietly confident. Reject code that introduces "cyberpunk", "hacker", or "neon" aesthetic patterns (e.g., pulsing text, glowing drop shadows, matrix-style data streams).
- **Color Palette:** Ensure adherence to the established charcoal backgrounds, warm off-white text, and candlelight amber/gold accents (e.g., `#FBBF24`).

## 3. Strict Geometry Requirements (CRITICAL)
- **Rounded Corners:** No rounded corners are permitted. Ensure all new or modified Tailwind classes use `rounded-none`. Flag any usage of `rounded-sm`, `rounded-md`, `rounded-full`, etc., as a violation.
- **SVG Paths:** SVGs must only use straight lines (`L`, `H`, `V`, `Z`). Flag any Bezier curves (`C`, `S`, `Q`, `A`) as violations.
- **Charts:** Any Recharts components must explicitly use `type="linear"`.

## 4. Typography
- Verify that headings and body text use the `font-heading` or `font-sans` classes (mapped to `Inter Variable` / `Outfit`).
- Monospace (`font-mono`) should be heavily restricted. Flag its usage if it is used for primary headings or large blocks of text rather than technical data (IDs, system status codes, etc.).

## 5. Animation & Motion
- Animations must be refined (fade-ins, soft translations, hover color shifts).
- Flag aggressive motion (rapid pulsing, shaking, flashing, or continuous glowing animations) as violations.

## 6. Imagery & Illustration Requirements
- **Human Representation:** Ensure any new illustrations or avatars representing people feature East Asian individuals, as per project community guidelines.
- **Illustration Style:** Must be ultra-clean flat vector with soft gradient cel shading, warm dark charcoal backgrounds, and amber highlights. No curved decorative paths.

When surfacing findings, strictly flag violations of these rules as "Rule violations" or "Requirement gaps" based on Qodo's review standards.
