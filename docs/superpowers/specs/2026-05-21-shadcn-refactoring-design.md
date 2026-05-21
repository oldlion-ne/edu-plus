# Design Specification: Version 2 Project (app-v2) with shadcn Presets

## 1. Goal & Architecture
The objective is to create a parallel version of the project in a new directory (`app-v2`) to serve as a clean, standardized, 100% shadcn/ui variation of the app. This allows the user to compare two distinct styling approaches (Version 1: Custom cyber-punk editorial; Version 2: Pure shadcn/ui preset driven styling).

In `app-v2`, we will apply the style preset:
`pnpm dlx shadcn@latest apply --preset b38olxT1u`

And we will configure the base CSS variables in `app-v2/src/index.css` using the exact oklch variables specified by the user, ensuring a sharp corner style with `--radius: 0`.

## 2. Directory Structure
We will copy `c:\edu-plus\app` to `c:\edu-plus\app-v2`. This ensures that:
- The exact same page structure, routes, assets, dynamic simulations (PathwaySimulator), and mockups exist in both versions.
- The same backend authentication logic (Supabase Auth and local simulated state) works seamlessly in both projects.
- We have independent test runners and dev servers running concurrently (e.g., `app` on port 3001, `app-v2` on another port).

## 3. Style and Presets Integration Workflow
1. **Duplicate Workspace**: Copy all source files and assets from `app` to `app-v2` (excluding `node_modules`).
2. **Apply Preset**: Inside `app-v2`, run the shadcn preset application command:
   `pnpm dlx shadcn@latest apply --preset b38olxT1u`
3. **Configure CSS Tokens**: Overwrite the theme variables in `app-v2/src/index.css` with the user-defined OKLCH properties and set `--radius: 0`.
4. **Purge Legacy Graphics and Pseudo-UI**: In `app-v2/src/sections/` and `app-v2/src/pages/`, refactor all files to replace hard-coded custom glass cards, bespoke buttons, and native selectors with their shadcn/ui counterparts:
   - Custom cards -> `@/components/ui/card`
   - Tabs selectors -> `@/components/ui/tabs`
   - Text inputs -> `@/components/ui/input`
   - Select boxes -> `@/components/ui/select`
   - Buttons -> `@/components/ui/button`
   - Mobile menu sheet -> `@/components/ui/sheet`
   - Sidebar layouts -> `@/components/ui/sidebar`

## 4. Verification Plan
- Ensure `app-v2` dependencies are clean by running `pnpm install` in `app-v2`.
- Run typechecking: `pnpm tsc -b --noEmit` in `app-v2`.
- Run Vitest suite in `app-v2`: `pnpm test:run`.
- Verify that `pnpm build` succeeds for the production bundle in `app-v2`.
