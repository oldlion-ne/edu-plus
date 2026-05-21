# UI Enhancements Design Spec - 2026-05-21

## Goals & Context
Redesign and upgrade the visual aesthetics of the Eduplus homepage (`c:\edu-plus\app\src\pages\Home.tsx`) using component patterns inspired by UI-Layouts. The enhancements will add interactive micro-interactions, high-tech text scrambling, and layered cinematic depth, while strictly adhering to the straight-line/sharp-corner constraint (`rounded-none`).

---

## Proposed Components

### 1. Spotlight Cursor Hover Grid (`Spotlight` & `SpotLightItem`)
* **File Location**: [Spotlight.tsx](file:///c:/edu-plus/app/src/src/components/effects/Spotlight.tsx) (New file)
* **Description**: A proximity-based hover effect that tracks the cursor coordinates and projects a radial spotlight gradient across cards in a grid.
* **Details**:
  * Employs standard React state and hooks to calculate mouse coordinates relative to each card.
  * Dynamically renders a radial gradient spotlight container inside each card.
  * **Strict Styling**: All borders, wrappers, and containers must be `rounded-none` (no rounded corners).
  * Color theme matches `--primary` (cyan/green oklch/hex).

### 2. Scramble Text Animation (`RandomizedTextEffect`)
* **File Location**: [RandomizedTextEffect.tsx](file:///c:/edu-plus/app/src/src/components/effects/RandomizedTextEffect.tsx) (New file)
* **Description**: A character-by-character scrambling animation that transitions random characters/symbols into final readable text.
* **Details**:
  * Takes `text` as a prop and runs a scramble animation on load and hover.
  * Uses symbols: `abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,`.
  * Runs asynchronously using React hooks and requestAnimationFrame / setTimeout.

### 3. Horizontal Parallax Typography (`ScrollTextMarquee`)
* **File Location**: [ScrollTextMarquee.tsx](file:///c:/edu-plus/app/src/src/components/effects/ScrollTextMarquee.tsx) (New file)
* **Description**: Large background typography that shifts left/right in response to page scrolling, creating layered spatial depth.
* **Details**:
  * Utilizes `framer-motion` (or lightweight window scroll listener) to compute velocity and scroll position.
  * Displays text watermarks in the background with extremely low opacity.

---

## Integration Plan

### Hero Section (`c:\edu-plus\app\src\sections\Hero.tsx`)
* Replace simple text transition with `RandomizedTextEffect` for subtitle and key title phrase ("tomorrow").
* Add the `ScrollTextMarquee` behind the Hero content, sliding horizontally as the page is scrolled.

### Services Matrix (`c:\edu-plus\app\src\sections\ServicesMatrix.tsx`)
* Wrap the `ServicesMatrix` card grid in `<Spotlight>`.
* Wrap each `ServiceCard` in `<SpotLightItem>` so moving the mouse over the cards produces a beautiful glowing highlight border.

### Pedigree Showcase (`c:\edu-plus\app\src\sections\PedigreeShowcase.tsx`)
* Wrap card grid in `<Spotlight>` and each showcase item in `<SpotLightItem>` for interactive cohesion.

---

## Dependency Updates
* We will install `framer-motion` using `pnpm add framer-motion` (since `pnpm` is the required package manager).

---

## Verification Plan
1. **Automated Tests**:
   * Run the test suite: `pnpm run test:run` to ensure all 12 existing tests remain passing.
2. **Visual Verification**:
   * Run the dev server using `pnpm run dev`.
   * Check interactive spotlight cards, text scrambler, and scroll parallax marquee behaviors in the browser.
