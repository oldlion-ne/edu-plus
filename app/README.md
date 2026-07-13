# EduPlus

EduPlus is a secure East Asian learning-community platform built with React, TypeScript, Vite, Tailwind CSS, Radix/shadcn primitives, and Supabase. It combines public learning pathways, knowledge and events with a role-aware staff workspace and a server-proxied AI guidance experience.

## Design system

The interface follows **Integrated Nordic Optics**: EduPlus's Nordic Lagom identity enriched with stronger typography, structured composition, semantic states, and restrained material depth.

- Public routes use editorial density: large responsive type, asymmetric layouts, intentional whitespace, and route-specific hero composition.
- Authenticated routes use product density: compact navigation, clear workflow state, accessible metrics, and task-led surfaces.
- Geometry is square. Rounded cards, squircle controls, decorative curved paths, glassmorphism, neon glow, pulse, and HUD styling are prohibited.
- Amber is the brand accent over warm charcoal and warm off-white semantic surfaces.
- Inter Variable is the primary interface typeface. Monospace is reserved for genuinely technical data.
- Human illustrations depict East Asian people only and use non-realistic, minimalist flat-vector rendering.

Optics is a design reference, not an installed primitive stack. Components remain project-owned and Radix based.

## Technology

| Layer | Technology |
|---|---|
| Frontend | React 19 and TypeScript |
| Styling | Tailwind CSS 3 and project-owned design tokens |
| Build | Vite 7 |
| Backend | Supabase Auth, Postgres, Storage, RLS, RPC, and Edge Functions |
| Routing | React Router 7 |
| Charts | Recharts with linear interpolation |
| Package manager | pnpm only |

## Local development

```bash
pnpm install
pnpm run dev
```

Create `.env.local` from `.env.example` and provide the public Supabase URL and anonymous key. Provider secrets such as the OpenRouter key belong in Supabase Edge Function secrets and must never use a `VITE_` prefix.

## Verification

Run all required gates before release:

```bash
pnpm run test:run
pnpm tsc -b
pnpm run lint
pnpm run ui-check
pnpm run build
```

The UI compliance scanner enforces straight geometry, semantic colors, quiet motion, non-HUD copy, and normal interface typography.

## Structure

```text
src/
├── components/layout/     Editorial and workspace composition primitives
├── components/ui/         Project-owned Radix/shadcn primitives
├── components/workspace/  Role-aware staff workflows
├── lib/                   Authentication, permissions, content, AI, and Supabase clients
├── pages/                 Public and authentication routes
├── sections/              Shared public-page sections
└── index.css              Semantic tokens, material levels, typography, and motion
```

Illustration audit results are recorded in `docs/illustration-audit.md`. Architecture decisions and implementation plans are stored in the repository-level `docs/superpowers` directory.

## License

Private — © EduPlus. All rights reserved.
