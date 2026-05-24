# Mobile Responsiveness & App-Shell Viewport Locking Design Spec

## Goal
Make the Edu+ application mobile-responsive (with 70% mobile browse target), enforce viewport locking to prevent mobile screens from bouncing or dragging, and redesign the AI Chatbot to provide an immersive, premium user experience.

---

## Architectural Changes

### 1. Viewport Locking
* **Viewport Meta Tag:** Update `index.html` viewport settings to disable pinching and zoom-scaling while adapting to viewport-fit.
* **CSS Lock:** Apply `100dvh` dynamic viewport height and `overflow: hidden` to root `html` and `body` in `index.css`. Use `touch-action: pan-y manipulation` to restrict double-tap gestures and rubberband bouncing while leaving internal panel scrolling enabled.
* **Layout Structure:** Convert the global app wrapper in `App.tsx` and the admin dashboard in `Dashboard.tsx` to self-contained Flexbox shells. Navigation and top bars remain static, while the main `<main>` workspace sections scroll independently.

---

## Component Designs

### 1. Navigation & Hamburger Menu (`Navigation.tsx` / `sheet.tsx`)
* **Overlay Hierarchy:** Remove custom `z-40` class from `SheetContent` to resolve conflicts where the Radix `SheetOverlay` (`z-50`) rendered on top of the menu content.
* **Radix Accessibility:** Insert `<SheetTitle>` and `<SheetDescription>` wrapped with `sr-only` class to fix missing Radix accessibility node warnings.

### 2. Immersive AI Chatbot Redesign (`AIChatAgent.tsx`)
* **Trigger Button:** Transform the floating button into an active cybernetic node featuring:
  * Monospace `[AI]` state label.
  * Status indicator `[ONLINE]` with an animated breathing green dot.
  * Circular spin animation on hover/active.
* **Layout Adaptations:**
  * **Desktop:** Slides in as a glassmorphic right-side drawer (`w-[380px] h-screen bg-background/90 backdrop-blur-xl border-l border-primary/20`).
  * **Mobile:** Expands to full screen (`w-full h-full min-h-[100dvh]`) to prevent background page interactions, providing a focused console.
* **UX Upgrades:**
  * Message containers display `[YOU]` and `[ADVISOR]` labels in monospace.
  * Quick-suggestion prompts styled as futuristic interactive chips.
  * Anchored message composer input block.

### 3. Dashboard Mobile Layout (`Dashboard.tsx`)
* **Responsive Grid:** Change metric layout columns from `sm:grid-cols-3` to a clean single column stacking on small mobile screens.
* **Chart Auto-Scaling:** Adjust the `ChartContainer` aspect ratio to `aspect-[4/3]` on mobile viewports to prevent scaling down to zero height/width.
* **Mobile Drawer:** Enforce Radix accessibility standards by adding `<SheetTitle className="sr-only">` inside mobile sidebar sheets.

---

## Verification Plan
* Verify TypeScript compilation passes: `pnpm tsc -b --noEmit`.
* Verify production build compiles: `pnpm run build`.
* Run dev server and inspect responsive layouts on multiple simulated device widths (mobile, tablet, desktop).
