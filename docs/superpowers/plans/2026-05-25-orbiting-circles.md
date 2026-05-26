# Orbiting Circles Linkages Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static network diagram in the "Institutional Linkages & Networks" section of the council page with a dynamic, orbiting circles component.

**Architecture:** Create a reusable `OrbitingCircles` component that animates absolute-positioned children along a circle. Add custom keyframes in the global CSS to drive the circular animation with rotation adjustments to keep child elements upright, and integrate concentric orbits in the council page with a pause-on-hover effect.

**Tech Stack:** React (TypeScript), Tailwind CSS v3, Vitest, React Testing Library.

---

### Task 1: CSS Animation Configuration

**Files:**
- Modify: `c:\edu-plus\app\src\index.css`

- [ ] **Step 1: Add keyframes and class utility to CSS**
  Add the following code to the end of `c:\edu-plus\app\src\index.css`:
  ```css
  @keyframes orbit {
    0% {
      transform: rotate(calc(var(--angle) * 1deg))
        translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg));
    }
    100% {
      transform: rotate(calc(var(--angle) * 1deg + 360deg))
        translateY(calc(var(--radius) * 1px))
        rotate(calc((var(--angle) * -1deg) - 360deg));
    }
  }

  .animate-orbit {
    animation: orbit calc(var(--duration) * 1s) linear infinite;
  }

  .animate-orbit-pause:hover {
    animation-play-state: paused !important;
  }
  ```

- [ ] **Step 2: Commit CSS changes**
  ```bash
  git add app/src/index.css
  git commit -m "style: add custom keyframes and utility classes for orbiting circles"
  ```

---

### Task 2: Create Orbiting Circles Test First

**Files:**
- Create: `c:\edu-plus\app\src\components\ui\orbiting-circles.test.tsx`

- [ ] **Step 1: Create the failing unit test**
  Create the file `c:\edu-plus\app\src\components\ui\orbiting-circles.test.tsx` with the following content:
  ```tsx
  import { render } from '@testing-library/react';
  import { describe, it, expect } from 'vitest';
  import { OrbitingCircles } from './orbiting-circles';
  import '@testing-library/jest-dom';

  describe('OrbitingCircles', () => {
    it('renders children inside the orbiting wrapper', () => {
      const { getByText } = render(
        <OrbitingCircles>
          <div>Child Element 1</div>
          <div>Child Element 2</div>
        </OrbitingCircles>
      );
      expect(getByText('Child Element 1')).toBeInTheDocument();
      expect(getByText('Child Element 2')).toBeInTheDocument();
    });
  });
  ```

- [ ] **Step 2: Run test to confirm it fails**
  Run: `pnpm --filter app test:run app/src/components/ui/orbiting-circles.test.tsx`
  Expected: FAIL (Cannot find module './orbiting-circles')

---

### Task 3: Implement OrbitingCircles Component

**Files:**
- Create: `c:\edu-plus\app\src\components\ui\orbiting-circles.tsx`

- [ ] **Step 1: Write component code**
  Create `c:\edu-plus\app\src\components\ui\orbiting-circles.tsx` with the following code:
  ```tsx
  import React from "react"
  import { cn } from "../../lib/utils"

  export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
    children?: React.ReactNode
    reverse?: boolean
    duration?: number
    delay?: number
    radius?: number
    path?: boolean
    speed?: number
  }

  export function OrbitingCircles({
    className,
    children,
    reverse,
    duration = 20,
    radius = 160,
    path = true,
    speed = 1,
    ...props
  }: OrbitingCirclesProps) {
    const calculatedDuration = duration / speed
    return (
      <>
        {path && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="pointer-events-none absolute inset-0 size-full"
          >
            <circle
              className="stroke-border stroke-1 fill-none"
              cx="50%"
              cy="50%"
              r={radius}
            />
          </svg>
        )}
        {React.Children.map(children, (child, index) => {
          const angle = (360 / React.Children.count(children)) * index
          return (
            <div
              style={
                {
                  "--duration": calculatedDuration,
                  "--radius": radius,
                  "--angle": angle,
                } as React.CSSProperties
              }
              className={cn(
                "animate-orbit absolute flex transform-gpu items-center justify-center transition-all duration-300",
                { "[animation-direction:reverse]": reverse },
                className
              )}
              {...props}
            >
              {child}
            </div>
          )
        })}
      </>
    )
  }
  ```

- [ ] **Step 2: Run test to confirm it passes**
  Run: `pnpm --filter app test:run app/src/components/ui/orbiting-circles.test.tsx`
  Expected: PASS

- [ ] **Step 3: Commit the new component**
  ```bash
  git add app/src/components/ui/orbiting-circles.tsx app/src/components/ui/orbiting-circles.test.tsx
  git commit -m "feat: add OrbitingCircles component and unit test"
  ```

---

### Task 4: Integrate OrbitingCircles in Council page

**Files:**
- Modify: `c:\edu-plus\app\src\pages\Council.tsx`

- [ ] **Step 1: Replace PartnerNetworkIllustration with OrbitingCircles layout**
  Modify `PartnerNetworkIllustration` in `c:\edu-plus\app\src\pages\Council.tsx` (around lines 528-574) and add the import for `OrbitingCircles` at the top:
  ```tsx
  import { OrbitingCircles } from '../components/ui/orbiting-circles';
  ```
  And replace `PartnerNetworkIllustration` with:
  ```tsx
  const PartnerNetworkIllustration = () => {
    return (
      <div className="relative flex h-[480px] w-full flex-col items-center justify-center overflow-hidden bg-background select-none mt-8 border border-border/40">
        {/* Center Node */}
        <div className="z-20 border border-primary/20 bg-background rounded-none p-1 shadow-md shadow-primary/5 ring-1 ring-primary/10">
          <div className="bg-card border border-primary/40 flex h-10 items-center rounded-none px-5 shadow-sm">
            <div className="flex items-center gap-0">
              <span className="font-heading font-bold text-sm text-foreground tracking-tight">{t('eduLabel')}</span>
              <span className="text-primary font-light text-sm">+</span>
            </div>
          </div>
        </div>

        {/* Inner Orbit (Radius: 100, Speed/Duration: 24, Clockwise) */}
        <OrbitingCircles
          className="animate-orbit-pause z-10"
          radius={100}
          duration={24}
          path={true}
        >
          <PartnerNode name="SG MOE" title="Ministry of Education, Singapore // Speech Interventions" />
          <PartnerNode name="US ECE" title="Early Childhood Education Center, Dallas, USA // Cognitive Pedagogy" />
          <PartnerNode name="GOONJ NE" title="Grassroots Community Development, North East India // Education Equity" />
        </OrbitingCircles>

        {/* Outer Orbit (Radius: 180, Speed/Duration: 36, Counter-Clockwise) */}
        <OrbitingCircles
          className="animate-orbit-pause z-10"
          radius={180}
          duration={36}
          reverse
          path={true}
        >
          <PartnerNode name="KR LAB" title="Green Hydrogen & Energy Lab, South Korea // STEM Internships" />
          <PartnerNode name="MARITIME" title="Indian Maritime University / Global Seafaring Competence" />
          <PartnerNode name="POWERICA" title="Corporate Legal & Renewable Energy Advisory // Profile Mentorship" />
        </OrbitingCircles>
      </div>
    );
  };
  ```

- [ ] **Step 2: Commit the integration**
  ```bash
  git add app/src/pages/Council.tsx
  git commit -m "feat: integrate dual-orbit system for partner network on council page"
  ```

---

### Task 5: Build and Verify

**Files:**
- None (verification commands)

- [ ] **Step 1: Run all tests**
  Run: `pnpm --filter app test:run`
  Expected: PASS for all tests (App.test.tsx and orbiting-circles.test.tsx)

- [ ] **Step 2: Run linter**
  Run: `pnpm --filter app lint`
  Expected: PASS (no lint errors)

- [ ] **Step 3: Run build**
  Run: `pnpm --filter app build`
  Expected: Successful compilation without errors
