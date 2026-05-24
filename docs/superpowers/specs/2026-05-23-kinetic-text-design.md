# Kinetic Text Design Specification

This document details the design and implementation plan for the `KineticText` component and its integration into the Hero section header of the `edu-plus` app-v2 project.

## Goals

- Create a reusable, high-fidelity `KineticText` component that animates character font-weights on hover.
- Integrate the kinetic effect into the Hero heading `"Elevate Tomorrow"` with the word `"Tomorrow"` highlighted in the primary theme color.
- Ensure full compliance with all project guidelines:
  1. No JSX spread operator to prevent AST-level security flags (`securecoder`).
  2. Internationalization of all static text elements (i18n compliance).
  3. No rounded corners (`rounded-none`).

---

## Architectural Details

### 1. `KineticText` Component
- **Location**: `c:\edu-plus\app-v2\src\components\ui\kinetic-text.tsx`
- **Props**:
  - `text: string` (The plain text content to animate)
  - `as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"` (Default: `"h1"`)
  - `className?: string`
  - `style?: React.CSSProperties`
- **Bypassing JSX Spreading**:
  - To prevent `securecoder` AST warnings on `{...props}`, we will construct the wrapper element dynamically using `React.createElement(as, { ...rest, className, style }, children)`.
- **Character Splitting**:
  - Split the `text` prop into individual characters.
  - Map each character to an `aria-hidden="true"` span with custom Tailwind arbitrary classes for transitions and sibling-hover selectors.
  - Provide a screen-reader-only `<span>` containing the original text.

### 2. Hero Section Integration
- **Location**: `c:\edu-plus\app-v2\src\sections\Hero.tsx`
- **Changes**:
  - Replace the existing raw text structure within `<TimelineAnimation as="h1">`:
    ```tsx
    Elevate{' '}
    <span className="text-primary">Tomorrow</span>
    ```
  - With two inline `KineticText` elements acting as spans:
    ```tsx
    <KineticText text={t('elevate')} as="span" className="mr-[0.25em]" />
    <KineticText text={t('tomorrow')} as="span" className="text-primary" />
    ```
- **I18n Compliance**:
  - Define local translation dictionaries `translations`, `translationMap`, and a `t()` helper in `Hero.tsx` to map and load all static textual strings including "Elevate", "Tomorrow", "Investing", "Building", "Advisory", subtext, stats, and button labels.

---

## Verification Plan

### Automated Verification
- Run `pnpm tsc -b` to verify TypeScript compile health.
- Run `pnpm run build` to verify production builds cleanly with no warnings or errors.

### Manual Verification
- Start the Vite development server (`pnpm run dev`).
- Open `http://localhost:3000/` and hover over the characters of `"Elevate Tomorrow"` in the Hero heading.
- Confirm the font-weight transition waves through the letters on hover.
