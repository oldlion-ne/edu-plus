# UI Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the Eduplus app home page sections with interactive spotlight grids, high-tech scramble text effects, and cinematic scroll parallax marquees while maintaining a strict rounded-none constraint.

**Architecture:** Create custom React/TypeScript effects components (`Spotlight`, `RandomizedTextEffect`, `ScrollTextMarquee`) and integrate them into the home page sections (`Hero`, `ServicesMatrix`, `PedigreeShowcase`).

**Tech Stack:** React 19, TypeScript, TailwindCSS v3, Vitest, React Testing Library, and Framer Motion.

---

### Task 1: Install Dependency
**Files:**
- Modify: `c:/edu-plus/app/package.json`

- [ ] **Step 1: Install framer-motion**
  Run: `pnpm add framer-motion`
  Expected: Installation finishes successfully and framer-motion is added to `package.json`.

- [ ] **Step 2: Verify package.json addition**
  Run: `git diff c:/edu-plus/app/package.json`
  Expected: Shows framer-motion added under dependencies.

- [ ] **Step 3: Commit**
  Run: `git add c:/edu-plus/app/package.json c:/edu-plus/app/pnpm-lock.yaml && git commit -m "chore: add framer-motion dependency"`

---

### Task 2: Implement Spotlight Grid components
**Files:**
- Create: `c:/edu-plus/app/src/components/effects/Spotlight.tsx`
- Create: `c:/edu-plus/app/src/components/effects/Spotlight.test.tsx`

- [ ] **Step 1: Create Spotlight.tsx**
  Write: `c:/edu-plus/app/src/components/effects/Spotlight.tsx`
  ```tsx
  import { createContext, useContext, useRef, useState, MouseEvent } from 'react';
  import { cn } from '../../lib/utils';

  interface SpotlightProps {
    children: React.ReactNode;
    className?: string;
  }

  interface SpotlightItemProps {
    children: React.ReactNode;
    className?: string;
  }

  interface SpotlightContextType {
    mouseX: number | null;
    mouseY: number | null;
    setMousePos: (x: number | null, y: number | null) => void;
  }

  const SpotlightContext = createContext<SpotlightContextType | undefined>(undefined);

  export const Spotlight = ({ children, className }: SpotlightProps) => {
    const [mouseX, setMouseX] = useState<number | null>(null);
    const [mouseY, setMouseY] = useState<number | null>(null);

    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    const handleGlobalMouseLeave = () => {
      setMouseX(null);
      setMouseY(null);
    };

    return (
      <SpotlightContext.Provider value={{ mouseX, mouseY, setMousePos: (x, y) => { setMouseX(x); setMouseY(y); } }}>
        <div 
          className={cn("relative z-10", className)}
          onMouseMove={handleGlobalMouseMove}
          onMouseLeave={handleGlobalMouseLeave}
          data-testid="spotlight-container"
        >
          {children}
        </div>
      </SpotlightContext.Provider>
    );
  };

  export const SpotLightItem = ({ children, className }: SpotlightItemProps) => {
    const context = useContext(SpotlightContext);
    const cardRef = useRef<HTMLDivElement>(null);
    const [localMouse, setLocalMouse] = useState<{ x: number; y: number } | null>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const { left, top } = cardRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      setLocalMouse({ x, y });
    };

    const handleMouseLeave = () => {
      setLocalMouse(null);
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative rounded-none p-[1.5px] bg-[#ffffff08] overflow-hidden transition-colors duration-300",
          className
        )}
        data-testid="spotlight-item"
      >
        {/* Spotlight highlight layer */}
        {localMouse && (
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-none transition duration-300 opacity-100"
            style={{
              background: `radial-gradient(180px circle at ${localMouse.x}px ${localMouse.y}px, rgba(125, 249, 255, 0.12), transparent 80%)`
            }}
          />
        )}
        {/* Spotlight border glow layer */}
        {context?.mouseX !== null && context?.mouseY !== null && cardRef.current && (
          <div
            className="pointer-events-none absolute inset-0 z-0 rounded-none bg-fixed"
            style={{
              background: `radial-gradient(220px circle at ${context.mouseX}px ${context.mouseY}px, rgba(125, 249, 255, 0.22), transparent 80%)`
            }}
          />
        )}
        <div className="relative z-20 h-full w-full bg-[#0B0F14] rounded-none">
          {children}
        </div>
      </div>
    );
  };
  ```

- [ ] **Step 2: Create Spotlight.test.tsx**
  Write: `c:/edu-plus/app/src/components/effects/Spotlight.test.tsx`
  ```tsx
  import { render, screen } from '@testing-library/react';
  import { expect, test } from 'vitest';
  import { Spotlight, SpotLightItem } from './Spotlight';

  test('renders Spotlight container and item', () => {
    render(
      <Spotlight>
        <SpotLightItem>
          <div>Card Content</div>
        </SpotLightItem>
      </Spotlight>
    );

    expect(screen.getByTestId('spotlight-container')).toBeDefined();
    expect(screen.getByTestId('spotlight-item')).toBeDefined();
    expect(screen.getByText('Card Content')).toBeDefined();
  });
  ```

- [ ] **Step 3: Run test**
  Run: `pnpm run test:run`
  Expected: All 13 tests pass (12 existing + 1 new).

- [ ] **Step 4: Commit**
  Run: `git add c:/edu-plus/app/src/components/effects/Spotlight.tsx c:/edu-plus/app/src/components/effects/Spotlight.test.tsx && git commit -m "feat: add Spotlight and SpotlightItem components"`

---

### Task 3: Implement Randomized Text Effect
**Files:**
- Create: `c:/edu-plus/app/src/components/effects/RandomizedTextEffect.tsx`
- Create: `c:/edu-plus/app/src/components/effects/RandomizedTextEffect.test.tsx`

- [ ] **Step 1: Create RandomizedTextEffect.tsx**
  Write: `c:/edu-plus/app/src/components/effects/RandomizedTextEffect.tsx`
  ```tsx
  import { useCallback, useEffect, useState } from 'react';
  import { cn } from '../../lib/utils';

  const symbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,';

  interface RandomizedTextEffectProps {
    text: string;
    className?: string;
    triggerOnHover?: boolean;
  }

  export default function RandomizedTextEffect({ text, className, triggerOnHover = false }: RandomizedTextEffectProps) {
    const [animatedText, setAnimatedText] = useState(text);

    const getRandomChar = useCallback(
      () => symbols[Math.floor(Math.random() * symbols.length)],
      []
    );

    const animateText = useCallback(async () => {
      const duration = 30;
      const revealDuration = 40;
      const initialRandomDuration = 150;

      const generateRandomText = () =>
        text
          .split('')
          .map((char) => (char === ' ' ? ' ' : getRandomChar()))
          .join('');

      setAnimatedText(generateRandomText());

      const endTime = Date.now() + initialRandomDuration;
      while (Date.now() < endTime) {
        await new Promise((resolve) => setTimeout(resolve, duration));
        setAnimatedText(generateRandomText());
      }

      for (let i = 0; i < text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, revealDuration));
        setAnimatedText(
          (prevText) =>
            text.slice(0, i + 1) +
            prevText
              .slice(i + 1)
              .split('')
              .map((char) => (char === ' ' ? ' ' : getRandomChar()))
              .join('')
        );
      }
    }, [text, getRandomChar]);

    useEffect(() => {
      animateText();
    }, [text, animateText]);

    return (
      <span 
        className={cn("inline-block", className)}
        onMouseEnter={() => {
          if (triggerOnHover) {
            animateText();
          }
        }}
        data-testid="random-text-span"
      >
        {animatedText}
      </span>
    );
  }
  ```

- [ ] **Step 2: Create RandomizedTextEffect.test.tsx**
  Write: `c:/edu-plus/app/src/components/effects/RandomizedTextEffect.test.tsx`
  ```tsx
  import { render, screen } from '@testing-library/react';
  import { expect, test } from 'vitest';
  import RandomizedTextEffect from './RandomizedTextEffect';

  test('renders RandomizedTextEffect component', () => {
    render(<RandomizedTextEffect text="test" />);
    expect(screen.getByTestId('random-text-span')).toBeDefined();
  });
  ```

- [ ] **Step 3: Run test**
  Run: `pnpm run test:run`
  Expected: All 14 tests pass.

- [ ] **Step 4: Commit**
  Run: `git add c:/edu-plus/app/src/components/effects/RandomizedTextEffect.tsx c:/edu-plus/app/src/components/effects/RandomizedTextEffect.test.tsx && git commit -m "feat: add RandomizedTextEffect component"`

---

### Task 4: Implement Scroll Parallax Typography
**Files:**
- Create: `c:/edu-plus/app/src/components/effects/ScrollTextMarquee.tsx`

- [ ] **Step 1: Create ScrollTextMarquee.tsx**
  Write: `c:/edu-plus/app/src/components/effects/ScrollTextMarquee.tsx`
  ```tsx
  import { useRef } from 'react';
  import { motion, useScroll, useTransform } from 'framer-motion';
  import { cn } from '../../lib/utils';

  interface ScrollTextMarqueeProps {
    text: string;
    baseSpeed?: number;
    className?: string;
  }

  export default function ScrollTextMarquee({ text, baseSpeed = -150, className }: ScrollTextMarqueeProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, baseSpeed]);

    return (
      <div 
        ref={targetRef} 
        className="w-full overflow-hidden whitespace-nowrap flex select-none pointer-events-none opacity-[0.03]"
        data-testid="scroll-marquee-container"
      >
        <motion.div 
          style={{ x }} 
          className={cn("flex whitespace-nowrap gap-16 font-heading text-8xl md:text-9xl uppercase font-extrabold tracking-widest", className)}
        >
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </motion.div>
      </div>
    );
  }
  ```

- [ ] **Step 2: Commit**
  Run: `git add c:/edu-plus/app/src/components/effects/ScrollTextMarquee.tsx && git commit -m "feat: add ScrollTextMarquee component"`

---

### Task 5: Integrate in Hero section
**Files:**
- Modify: `c:/edu-plus/app/src/sections/Hero.tsx`

- [ ] **Step 1: Modify Hero.tsx**
  Replace imports and content in `Hero.tsx` to include `RandomizedTextEffect` for main title phrase ("tomorrow"), and `ScrollTextMarquee` watermark in background.
  Modify `c:/edu-plus/app/src/sections/Hero.tsx:1-118`:
  ```tsx
  import { useEffect, useRef, useState } from 'react';
  import { Link } from 'react-router';
  import RandomizedTextEffect from '../components/effects/RandomizedTextEffect';
  import ScrollTextMarquee from '../components/effects/ScrollTextMarquee';

  export default function Hero() {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    }, []);

    return (
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
        id="story"
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://res.cloudinary.com/don7nlsnp/video/upload/v1779208942/hero-bg_dlyb9f.mp4"
        />

        {/* Sleek Dark Vignette & Gradient Overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at center, rgba(11, 15, 20, 0.3) 0%, rgba(11, 15, 20, 0.7) 100%),
              linear-gradient(to bottom, rgba(11, 15, 20, 0.6) 0%, transparent 40%, rgba(11, 15, 20, 0.9) 100%)
            `
          }}
        />

        {/* Parallax Scroll Marquee background watermark */}
        <div className="absolute inset-x-0 bottom-24 z-[1] pointer-events-none">
          <ScrollTextMarquee text="BUILDING • REDEFINING • REDIRECTION • MOBILIZING" baseSpeed={-300} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          {/* Soft Radial Neon Glow behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#7DF9FF]/8 rounded-none blur-[110px] pointer-events-none z-0" />

          {/* Subtitle */}
          <div
            className={`mb-6 transition-all duration-1000 relative z-10 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-xs md:text-sm font-sans font-semibold tracking-[0.4em] uppercase text-[#7DF9FF]">
              <RandomizedTextEffect text="Eduplus" triggerOnHover />
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[1.05] tracking-tight mb-8 relative z-10">
            <span className="block text-[#E6EDF3]">
              {'Shaping '}
              <RandomizedTextEffect
                text="tomorrow"
                className="text-[#7DF9FF] font-heading"
              />
            </span>
          </h1>

          {/* Body */}
          <p
            className={`max-w-xl mx-auto text-base md:text-lg font-sans text-[#E6EDF3]/85 leading-relaxed mb-12 transition-all duration-1000 delay-500 relative z-10 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            We are building a global network of innovators, educators, and visionaries
            to redefine human capability.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-700 relative z-10 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#7DF9FF] text-[#0B0F14] font-sans font-semibold text-sm tracking-wide hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(125,249,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.45)]"
            >
              Start a Chat
            </Link>
            <Link
              to="/about"
              className="liquid-glass inline-flex items-center justify-center px-8 py-3.5 text-[#E6EDF3] font-sans font-medium text-sm tracking-wide hover:text-[#7DF9FF] hover:border-[#7DF9FF]/40 transition-all duration-300"
            >
              Explore Now
            </Link>
          </div>
        </div>

        {/* Bottom Right Tag */}
        <div
          className={`absolute bottom-8 right-6 md:right-12 z-10 transition-all duration-1000 delay-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="border border-[#7DF9FF]/25 bg-[#0B0F14]/70 backdrop-blur-md px-5 py-3 shadow-[0_0_15px_rgba(125,249,255,0.08)]">
            <span className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-[#7DF9FF]">
              Investing. Building. Advisory.
            </span>
          </div>
        </div>

        {/* Bottom Edge Gradient for Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B0F14] to-transparent z-[2] pointer-events-none" />
      </section>
    );
  }
  ```

- [ ] **Step 2: Run test**
  Run: `pnpm run test:run`
  Expected: All tests pass.

- [ ] **Step 3: Commit**
  Run: `git add c:/edu-plus/app/src/sections/Hero.tsx && git commit -m "feat: integrate RandomizedTextEffect and ScrollTextMarquee into Hero section"`

---

### Task 6: Integrate Spotlight in Services Matrix and Pedigree Showcase
**Files:**
- Modify: `c:/edu-plus/app/src/sections/ServicesMatrix.tsx`
- Modify: `c:/edu-plus/app/src/sections/PedigreeShowcase.tsx`

- [ ] **Step 1: Modify ServicesMatrix.tsx**
  Wrap grid in `<Spotlight>` and cards in `<SpotLightItem>`.
  Modify `c:/edu-plus/app/src/sections/ServicesMatrix.tsx:145-155`:
  ```tsx
        {/* Services Grid */}
        <Spotlight
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-all duration-1000 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {SERVICES.map((service, index) => (
            <SpotLightItem key={service.title}>
              <ServiceCard service={service} index={index} />
            </SpotLightItem>
          ))}
        </Spotlight>
  ```
  Make sure to import `Spotlight` and `SpotLightItem` at the top of `ServicesMatrix.tsx`.

- [ ] **Step 2: Modify PedigreeShowcase.tsx**
  Read and modify the file `c:/edu-plus/app/src/sections/PedigreeShowcase.tsx` to wrap the grid and item boxes in `Spotlight` and `SpotLightItem`.

- [ ] **Step 3: Run test**
  Run: `pnpm run test:run`
  Expected: All 14 tests pass.

- [ ] **Step 4: Commit**
  Run: `git add c:/edu-plus/app/src/sections/ServicesMatrix.tsx c:/edu-plus/app/src/sections/PedigreeShowcase.tsx && git commit -m "feat: integrate Spotlight and SpotlightItem into ServicesMatrix and PedigreeShowcase"`
