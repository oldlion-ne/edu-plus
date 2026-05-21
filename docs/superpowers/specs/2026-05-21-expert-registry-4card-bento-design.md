# Specification: Expert Registry 4-Card Bento Grid Redesign

**Author:** Antigravity  
**Date:** 2026-05-21  
**Status:** Approved by User  
**Target File:** [PedigreeShowcase.tsx](file:///c:/edu-plus/app-v2/src/sections/PedigreeShowcase.tsx)

---

## 1. Objective and Scope

Refactor the **Technical Pedigree** / **Expert Registry** section in `src/sections/PedigreeShowcase.tsx` to implement a modern, responsive 4-card Bento Grid features component. This design purges the old 8-advisor grid and replaces it with the user's requested layout containing:
1. **Strategic Integrations** (connected brand logo grid)
2. **Real-time Guidance** (concentric circles mask graphics)
3. **Framework Ready** (matrix status grid)
4. **Institution Ready** (HugeIcons Shield icon visual overlays)

All visual elements, layout utilities (`@container`, `grid-rows-subgrid`, custom masking), and components must match the user's requested HTML/JSX structure exactly, adapted to the project's styling preset: `radix-mira` (none radius/square borders, Inter font, taupe colors, Lime primary color).

---

## 2. Shared Component Changes

### [card.tsx](file:///c:/edu-plus/app-v2/src/components/ui/card.tsx)
Modify the shared `Card` component to accept a `variant` prop:
- `variant?: "default" | "outline"`
- If `variant="outline"`, apply `border border-border bg-transparent shadow-none` rather than the default `ring-1 ring-foreground/10`.

---

## 3. PedigreeShowcase Bento Card Structure

### Card 1: Strategic Integrations
- **Title**: Strategic Integrations
- **Description**: Direct alignment with leading educational ministries, corporate partners, and humanitarian platforms.
- **Visual**: A 3-row layout containing horizontal lines with brand logos floating in card circles:
  - Row 1: `Vercel`, `Slack`
  - Row 2: `Clerk`, `Linear`
  - Row 3: `Supabase`, `Firebase`
- **SVGs**: Imported from `@/components/ui/svgs/`.

### Card 2: Real-time Guidance
- **Title**: Real-time Guidance
- **Description**: Synchronized feedback loops between expert mentors and learner capability pathways.
- **Visual**: 4 concentric/overlapping circles styled with Tailwind borders:
  - Base: `bg-foreground/15 absolute inset-0 mx-auto w-px`
  - Ring 1: `absolute -inset-x-16 top-6 aspect-square rounded-full border`
  - Ring 2: `border-primary mask-l-from-50% mask-l-to-90% mask-r-from-50% mask-r-to-50% absolute -inset-x-16 top-6 aspect-square rounded-full border`
  - Ring 3: `absolute -inset-x-8 top-24 aspect-square rounded-full border`
  - Ring 4: `mask-r-from-50% mask-r-to-90% mask-l-from-50% mask-l-to-50% absolute -inset-x-8 top-24 aspect-square rounded-full border border-lime-500`

### Card 3: Framework Ready
- **Title**: Framework Ready
- **Description**: Built on verified data structures, comprehensive academic APIs, and standardized evaluation protocols.
- **Visual**: A grid of status blocks where selected blocks have the `bg-primary!` class.

### Card 4: Institution Ready
- **Title**: Institution Ready
- **Description**: Scale confidently with national educational standards and secure credentialing verification.
- **Visual**: Overlay layout using HugeIcons `Shield01Icon` instead of lucide `Shield`:
  - Outer: `<HugeiconsIcon icon={Shield01Icon} className="absolute inset-0 top-2.5 size-full stroke-[0.1px] opacity-15" />`
  - Inner: `<HugeiconsIcon icon={Shield01Icon} className="size-32 stroke-[0.1px]" />`

---

## 4. Verification Plan

### Automated Checks
- **Typechecking**: `pnpm tsc --noEmit` in `c:\edu-plus\app-v2`.
- **Unit Tests**: Update [PedigreeShowcase.test.tsx](file:///c:/edu-plus/app-v2/src/sections/PedigreeShowcase.test.tsx) to verify the new text elements and structure, then run `pnpm test:run`.
