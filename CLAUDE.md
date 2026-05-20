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

## Styling and Layout Rules
- All newly added components and modified container cards must adhere strictly to the straight-line requirement (`rounded-none`). No rounded corners allowed.
- Styling uses Tailwind CSS.
