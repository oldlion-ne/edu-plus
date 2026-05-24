# Expert Registry 4-Card Bento Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the "Technical Pedigree" section in `src/sections/PedigreeShowcase.tsx` into a modern 4-card Bento Grid features component matching the user's provided styling and layout, with themed copy for EduPlus.

**Architecture:** Extend the shared `Card` component to support outline variants, replace the old 8-advisor registry grid with the 4 Bento grid cards (using custom SVG icons, concentric circles, status grids, and HugeIcons shield graphics), and update unit tests to verify the new interface elements.

**Tech Stack:** React, Tailwind CSS, `@hugeicons/react`, `@hugeicons/core-free-icons`, Vitest, `@testing-library/react`.

---

### Task 1: Update Card Component to Support Variant Prop

**Files:**
- Modify: `c:/edu-plus/app-v2/src/components/ui/card.tsx`

- [ ] **Step 1: Edit card.tsx**
  Add support for a `variant` prop (`"default" | "outline"`) to `Card` component, mapping it to border styles.

  ```tsx
  function Card({
    className,
    size = "default",
    variant = "default",
    ...props
  }: React.ComponentProps<"div"> & { size?: "default" | "sm"; variant?: "default" | "outline" }) {
    return (
      <div
        data-slot="card"
        data-size={size}
        data-variant={variant}
        className={cn(
          "group/card flex flex-col gap-4 overflow-hidden rounded-lg bg-card py-4 text-xs/relaxed text-card-foreground has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
          variant === "default" && "ring-1 ring-foreground/10",
          variant === "outline" && "border border-border bg-transparent shadow-none",
          className
        )}
        {...props}
      />
    )
  }
  ```

- [ ] **Step 2: Run typecheck**
  Run: `pnpm tsc --noEmit` in `c:/edu-plus/app-v2`
  Expected: Success, no compilation errors.

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/ui/card.tsx
  git commit -m "feat: add outline variant to Card component"
  ```

---

### Task 2: Refactor `PedigreeShowcase.tsx` Component

**Files:**
- Modify: `c:/edu-plus/app-v2/src/sections/PedigreeShowcase.tsx`

- [ ] **Step 1: Replace implementation in PedigreeShowcase.tsx**
  Replace the old 8-advisor grid with the 4-card Bento grid component using custom copy and assets.

  ```tsx
  import { useEffect, useRef, useState } from 'react';
  import { Card } from '../components/ui/card';
  import { HugeiconsIcon } from '@hugeicons/react';
  import { Shield01Icon } from '@hugeicons/core-free-icons';
  import { Vercel } from '../components/ui/svgs/vercel';
  import { Supabase } from '../components/ui/svgs/supabase';
  import { Linear } from '../components/ui/svgs/linear';
  import { Slack } from '../components/ui/svgs/slack';
  import { Firebase } from '../components/ui/svgs/firebase';
  import { ClerkIconDark as Clerk } from '../components/ui/svgs/clerk';

  export default function PedigreeShowcase() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <section
        ref={sectionRef}
        id="advisory"
        className="relative w-full bg-background overflow-hidden py-24"
      >
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-primary mb-6 block">
              Technical Pedigree &amp; Advisory Network
            </span>
            <h2 className="text-balance font-sans text-4xl md:text-5xl lg:text-6xl font-light text-foreground max-w-3xl leading-tight">
              Advisory Framework
            </h2>
            <p className="text-muted-foreground mt-4 text-balance max-w-lg text-sm">
              A robust framework of academic advisories, corporate expertise, and secure operational nodes powering talent development.
            </p>
          </div>

          <div className={`@container mt-12 transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 *:p-6">
              {/* Card 1: Strategic Integrations */}
              <Card
                variant="outline"
                className="row-span-2 grid grid-rows-subgrid"
              >
                <div className="space-y-2">
                  <h3 className="text-foreground font-medium text-lg">Strategic Integrations</h3>
                  <p className="text-muted-foreground text-sm">
                    Direct alignment with leading educational ministries, corporate partners, and humanitarian platforms.
                  </p>
                </div>
                <div
                  aria-hidden
                  className="**:fill-foreground flex h-44 flex-col justify-between pt-8"
                >
                  <div className="relative flex h-10 items-center gap-12 px-6">
                    <div className="bg-border absolute inset-0 my-auto h-px"></div>
                    <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                      <Vercel className="size-3.5" />
                    </div>
                    <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                      <Slack className="size-3.5" />
                    </div>
                  </div>
                  <div className="pl-16 relative flex h-10 items-center justify-between gap-12 pr-6">
                    <div className="bg-border absolute inset-0 my-auto h-px"></div>
                    <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                      <Clerk className="size-3.5" />
                    </div>
                    <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                      <Linear className="size-3.5" />
                    </div>
                  </div>
                  <div className="relative flex h-10 items-center gap-20 px-8">
                    <div className="bg-border absolute inset-0 my-auto h-px"></div>
                    <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                      <Supabase className="size-3.5" />
                    </div>
                    <div className="bg-card shadow-black/6.5 ring-border relative flex h-8 items-center rounded-full px-3 shadow-sm ring">
                      <Firebase className="size-3.5" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Card 2: Real-time Guidance */}
              <Card
                variant="outline"
                className="row-span-2 grid grid-rows-subgrid overflow-hidden"
              >
                <div className="space-y-2">
                  <h3 className="text-foreground font-medium text-lg">Real-time Guidance</h3>
                  <p className="text-muted-foreground text-sm">
                    Synchronized feedback loops between expert mentors and learner capability pathways.
                  </p>
                </div>
                <div
                  aria-hidden
                  className="relative h-44 translate-y-6"
                >
                  <div className="bg-foreground/15 absolute inset-0 mx-auto w-px"></div>
                  <div className="absolute -inset-x-16 top-6 aspect-square rounded-full border"></div>
                  <div className="border-primary mask-l-from-50% mask-l-to-90% mask-r-from-50% mask-r-to-50% absolute -inset-x-16 top-6 aspect-square rounded-full border"></div>
                  <div className="absolute -inset-x-8 top-24 aspect-square rounded-full border"></div>
                  <div className="mask-r-from-50% mask-r-to-90% mask-l-from-50% mask-l-to-50% absolute -inset-x-8 top-24 aspect-square rounded-full border border-lime-500"></div>
                </div>
              </Card>

              {/* Card 3: Framework Ready */}
              <Card
                variant="outline"
                className="row-span-2 grid grid-rows-subgrid overflow-hidden"
              >
                <div className="space-y-2">
                  <h3 className="text-foreground font-medium text-lg">Framework Ready</h3>
                  <p className="text-muted-foreground text-sm">
                    Built on verified data structures, comprehensive academic APIs, and standardized evaluation protocols.
                  </p>
                </div>
                <div
                  aria-hidden
                  className="*:bg-foreground/15 flex h-44 justify-between pb-6 pt-12 *:h-full *:w-px"
                >
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="bg-primary!"></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="bg-primary!"></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="bg-primary!"></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="bg-primary!"></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="bg-primary!"></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div className="bg-primary!"></div>
                </div>
              </Card>

              {/* Card 4: Institution Ready */}
              <Card
                variant="outline"
                className="row-span-2 grid grid-rows-subgrid"
              >
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Institution Ready</h3>
                  <p className="text-muted-foreground text-sm">
                    Scale confidently with national educational standards and secure credentialing verification.
                  </p>
                </div>

                <div className="pointer-events-none relative -ml-7 flex size-44 items-center justify-center pt-5">
                  <HugeiconsIcon icon={Shield01Icon} className="absolute inset-0 top-2.5 size-full stroke-[0.1px] opacity-15 text-primary" />
                  <HugeiconsIcon icon={Shield01Icon} className="size-32 stroke-[0.1px] text-primary" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 2: Run typecheck**
  Run: `pnpm tsc --noEmit` in `c:/edu-plus/app-v2`
  Expected: Success, no compilation errors.

- [ ] **Step 3: Commit**
  ```bash
  git add src/sections/PedigreeShowcase.tsx
  git commit -m "feat: refactor PedigreeShowcase to use 4-card Bento grid"
  ```

---

### Task 3: Rewrite Unit Tests for `PedigreeShowcase.tsx`

**Files:**
- Modify: `c:/edu-plus/app-v2/src/sections/PedigreeShowcase.test.tsx`

- [ ] **Step 1: Replace test cases in PedigreeShowcase.test.tsx**
  Update the tests to verify text content and headings of the new 4-card Bento layout.

  ```tsx
  import { render, screen } from '@testing-library/react';
  import { describe, it, expect } from 'vitest';
  import PedigreeShowcase from './PedigreeShowcase';

  // Mock IntersectionObserver for JSDOM
  class IntersectionObserverMock {
    callback: any;
    constructor(callback: any) {
      this.callback = callback;
    }
    observe() {
      this.callback([{ isIntersecting: true }]);
    }
    unobserve() {}
    disconnect() {}
  }
  (globalThis as any).IntersectionObserver = IntersectionObserverMock as any;

  describe('PedigreeShowcase Component', () => {
    it('renders the Technical Pedigree section header', () => {
      render(<PedigreeShowcase />);
      expect(screen.getByText('Technical Pedigree & Advisory Network')).toBeDefined();
      expect(screen.getByText('Advisory Framework')).toBeDefined();
      expect(screen.getByText(/A robust framework of academic advisories/i)).toBeDefined();
    });

    it('renders all 4 bento cards', () => {
      render(<PedigreeShowcase />);
      expect(screen.getByText('Strategic Integrations')).toBeDefined();
      expect(screen.getByText('Real-time Guidance')).toBeDefined();
      expect(screen.getByText('Framework Ready')).toBeDefined();
      expect(screen.getByText('Institution Ready')).toBeDefined();
    });
  });
  ```

- [ ] **Step 2: Run tests**
  Run: `pnpm test:run` in `c:/edu-plus/app-v2`
  Expected: Success, all tests pass.

- [ ] **Step 3: Commit**
  ```bash
  git add src/sections/PedigreeShowcase.test.tsx
  git commit -m "test: update PedigreeShowcase tests for 4-card layout"
  ```

---

### Task 4: Final Validation

- [ ] **Step 1: Check typescript compile, unit tests, and production build**
  Run: `pnpm tsc --noEmit; pnpm test:run; pnpm build` in `c:/edu-plus/app-v2`
  Expected: All checks pass successfully.
