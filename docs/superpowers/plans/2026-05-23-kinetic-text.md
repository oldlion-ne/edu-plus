# Kinetic Text Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a reusable KineticText component that animates letter font-weights on hover and integrate it into the Hero heading.

**Architecture:** Implement the component utilizing custom Tailwind sibling hover selectors inside a dynamic `React.createElement` builder to avoid JSX spread warnings. Integrate into `Hero.tsx` using local static translations for all text strings.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v3

---

### Task 1: Create the KineticText component

**Files:**
- Create: `app-v2/src/components/ui/kinetic-text.tsx`

- [ ] **Step 1: Write the KineticText component code**

Create `app-v2/src/components/ui/kinetic-text.tsx` with the following content:
```tsx
import React from 'react';
import { cn } from '@/lib/utils';

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type KineticTextProps = React.HTMLAttributes<HTMLElement> & {
  text: string;
  as?: As;
};

export function KineticText({
  text,
  as: Tag = 'h1',
  className = '',
  style,
  ...rest
}: KineticTextProps) {
  const mergedStyle = {
    '--hover-padding': 'calc(1em / 12)',
    '--text-stroke-width': 'calc(1em * 125 / 6000)',
    ...style,
  } as React.CSSProperties;

  const letters = text.split('');

  const children = (
    <>
      {letters.map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="[will-change:font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] hover:[padding-inline:var(--hover-padding)] hover:font-[900] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-[400] has-[+span:hover]:[padding-inline:var(--hover-padding)] has-[+span:hover]:font-[600] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+span+&]:font-[400]"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </>
  );

  return React.createElement(
    Tag,
    {
      ...rest,
      className: cn('flex flex-wrap font-[300]', className),
      style: mergedStyle,
    } as any,
    children
  );
}
```

- [ ] **Step 2: Commit Task 1**

Run:
```bash
git add app-v2/src/components/ui/kinetic-text.tsx
git commit -m "feat: create reusable KineticText component"
```

---

### Task 2: Refactor Hero.tsx and Integrate KineticText

**Files:**
- Modify: `app-v2/src/sections/Hero.tsx`

- [ ] **Step 1: Replace hardcoded strings and integrate KineticText**

Modify `app-v2/src/sections/Hero.tsx` to:
1. Import the `KineticText` component.
2. Define a local translation dictionary to internationalize all static text elements in the file.
3. Integrate `KineticText` into the Hero heading.

Here is the exact code for the updated `app-v2/src/sections/Hero.tsx`:
```tsx
import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { TimelineAnimation } from '../components/timeline-animation';
import { Button } from '../components/ui/button';
import { KineticText } from '@/components/ui/kinetic-text';

const STATS = [
  { value: '4,200+', labelKey: 'learners' as const },
  { value: '98%',    labelKey: 'placement' as const },
  { value: '38',     labelKey: 'countries' as const },
];

const translations = {
  investing: 'Investing',
  building: 'Building',
  advisory: 'Advisory',
  elevate: 'Elevate',
  tomorrow: 'Tomorrow',
  subtext: 'A global network redefining human potential through AI-powered learning.',
  startPathway: 'Start Your Pathway',
  exploreNetwork: 'Explore Network',
  learners: 'Learners',
  placement: 'Placement',
  countries: 'Countries',
};

const translationMap = new Map<string, string>(Object.entries(translations));
const t = (key: keyof typeof translations) => translationMap.get(key) || '';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* ── Background video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-55"
        src="/assets/hero-bg-new.mp4"
      />

      {/* ── Dark overlays ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 80% 60% at 50% 40%, oklch(var(--background) / 0.25) 0%, oklch(var(--background) / 0.7) 100%)',
            'linear-gradient(to bottom, oklch(var(--background) / 0.35) 0%, transparent 40%, oklch(var(--background) / 0.85) 100%)',
          ].join(', '),
        }}
      />

      {/* ── Subtle neon top glow ── */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 z-[2] pointer-events-none h-[40%]"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, oklch(var(--primary) / 0.06) 0%, transparent 80%)',
        }}
      />

      {/* ── Grid dot overlay ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(oklch(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 pt-28 pb-16 max-w-5xl mx-auto w-full">

        {/* ── Investing · Building · Advisory eyebrow ── */}
        <TimelineAnimation
          once
          as="div"
          animationNum={1}
          timelineRef={sectionRef}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 border border-border bg-card/70 backdrop-blur-md px-4 py-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-muted-foreground">
              {t('investing')}
            </span>
            <span className="text-primary/40 text-[10px] font-mono">·</span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-muted-foreground">
              {t('building')}
            </span>
            <span className="text-primary/40 text-[10px] font-mono">·</span>
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-muted-foreground">
              {t('advisory')}
            </span>
          </div>
        </TimelineAnimation>

        {/* Headline */}
        <TimelineAnimation
          once
          as="h1"
          animationNum={2}
          timelineRef={sectionRef}
          className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-6xl font-semibold tracking-tight leading-[1.1] text-foreground mb-5 flex flex-wrap justify-center"
        >
          <KineticText text={t('elevate')} as="span" className="mr-[0.25em]" />
          <KineticText text={t('tomorrow')} as="span" className="text-primary" />
        </TimelineAnimation>

        {/* Subtext */}
        <TimelineAnimation
          once
          as="p"
          animationNum={3}
          timelineRef={sectionRef}
          className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mb-10"
        >
          {t('subtext')}
        </TimelineAnimation>

        {/* CTAs */}
        <TimelineAnimation
          once
          as="div"
          animationNum={4}
          timelineRef={sectionRef}
          className="flex flex-col sm:flex-row items-center gap-3 mb-12"
        >
          <Button asChild size="lg">
            <Link to="/contact" className="inline-flex items-center gap-2">
              {t('startPathway')}
              <ArrowRight size={14} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">
              {t('exploreNetwork')}
            </Link>
          </Button>
        </TimelineAnimation>

        {/* Stats strip */}
        <TimelineAnimation
          once
          as="div"
          animationNum={5}
          timelineRef={sectionRef}
          className="flex items-center gap-0 border border-border bg-card/70 backdrop-blur-sm"
        >
          {STATS.map((s, i) => (
            <div
              key={s.labelKey}
              className={`flex flex-col items-center px-7 py-4 ${i < STATS.length - 1 ? 'border-r border-border' : ''}`}
            >
              <span className="text-xl font-bold text-primary font-mono">
                {s.value}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mt-0.5">
                {t(s.labelKey)}
              </span>
            </div>
          ))}
        </TimelineAnimation>
      </div>

      {/* ── Bottom fade ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 z-[3] pointer-events-none"
        style={{ background: 'linear-gradient(to top, oklch(var(--background)) 0%, transparent 100%)' }}
      />

    </section>
  );
}
```

- [ ] **Step 2: Commit Task 2**

Run:
```bash
git add app-v2/src/sections/Hero.tsx
git commit -m "feat: integrate KineticText and translate static texts in Hero section"
```

---

### Task 3: Verification

- [ ] **Step 1: Check TypeScript Compilation**

Run:
```bash
pnpm tsc -b
```
Expected: Complete successfully without any TS compile errors.

- [ ] **Step 2: Run Production Build**

Run:
```bash
pnpm run build
```
Expected: Build finishes with a clean bundle.
