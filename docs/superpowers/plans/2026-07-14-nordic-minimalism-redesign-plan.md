# Nordic Minimalism (Extreme Lagom) Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely redesign all public page sections and subpages to eliminate visual noise, maximize whitespace, and enforce the Nordic Lagom typographic minimalism philosophy using a solid background, zero boxed card borders, no animations/motion, and locked Inter Variable typography.

**Architecture:** We will strip all background video layers, SVG diagram structures, simulated chat bubbles, and marquee components. We replace them with flat typographic layouts, clean list columns, and borderless transparent cards aligned to a 48px grid gap.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Lucide React, Vitest.

---

### Task 1: Lock Typography & Global Styling Variables

**Files:**
- Modify: `app/src/index.css`
- Modify: `app/src/App.tsx`

- [ ] **Step 1: Edit `app/src/index.css` to clean out Outfit font imports, lock typography to Inter Variable, and lock color tokens**

```css
@import url("tw-animate-css");
@import url("shadcn/tailwind.css");
@import url("@fontsource-variable/inter");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-sans: 'Inter Variable', sans-serif;
    --font-heading: 'Inter Variable', sans-serif;
    --background: 80deg 0.004 98.5%;
    --foreground: 60deg 0.01 22%;
    --card: 80deg 0.004 97%;
    --card-foreground: 60deg 0.01 22%;
    --popover: 80deg 0.004 97%;
    --popover-foreground: 60deg 0.01 22%;
    --primary: 70deg 0.12 75%;
    --primary-foreground: 60deg 0.02 22%;
    --secondary: 80deg 0.008 94%;
    --secondary-foreground: 60deg 0.015 35%;
    --muted: 80deg 0.006 95%;
    --muted-foreground: 60deg 0.015 55%;
    --accent: 80deg 0.008 94%;
    --accent-foreground: 60deg 0.015 30%;
    --destructive: 25deg 0.2 55%;
    --destructive-foreground: 60deg 0.002 98%;
    --border: 80deg 0.008 90%;
    --input: 80deg 0.008 90%;
    --ring: 70deg 0.12 75%;
    --radius: 0px;
  }

  .dark {
    --background: 60deg 0.012 18%;
    --foreground: 80deg 0.006 93%;
    --card: 60deg 0.012 22%;
    --card-foreground: 80deg 0.006 93%;
    --popover: 60deg 0.012 22%;
    --popover-foreground: 80deg 0.006 93%;
    --primary: 70deg 0.13 78%;
    --primary-foreground: 60deg 0.02 22%;
    --secondary: 60deg 0.012 26%;
    --secondary-foreground: 80deg 0.006 90%;
    --muted: 60deg 0.012 26%;
    --muted-foreground: 60deg 0.012 65%;
    --accent: 60deg 0.012 26%;
    --accent-foreground: 80deg 0.006 93%;
    --destructive: 25deg 0.18 65%;
    --destructive-foreground: 80deg 0.006 93%;
    --border: 0deg 0 100% / 0.08;
    --input: 0deg 0 100% / 0.1;
    --ring: 60deg 0.012 65%;
  }

  * {
    @apply border-border rounded-none;
  }
}
```

- [ ] **Step 2: Edit `app/src/App.tsx` to remove any remaining non-standard layout container padding or effects**
Ensure that `App.tsx` handles full height and solid background properly:
```tsx
// Ensure background is solid bg-background
<div className="relative h-[100dvh] w-full bg-background flex flex-col overflow-hidden [touch-action:none]">
```

- [ ] **Step 3: Run TypeScript compiler check to verify imports**
Run: `pnpm tsc -b`
Expected: PASS

- [ ] **Step 4: Commit typography adjustments**
```bash
git add app/src/index.css app/src/App.tsx
git commit -m "style: lock typography to Inter Variable and restrict color tokens"
```

---

### Task 2: Redesign the Hero Section (`Hero.tsx`)

**Files:**
- Modify: `app/src/sections/Hero.tsx`

- [ ] **Step 1: Replace implementation in `app/src/sections/Hero.tsx` with a typographic, static pure-Lagom layout**

```tsx
import { Link } from 'react-router';
import { Button } from '../components/ui/button';

export default function Hero() {
  return (
    <section
      id="story"
      className="relative w-full bg-background pt-40 pb-32 flex flex-col justify-center overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 max-w-5xl mx-auto w-full">
        {/* Eyebrow */}
        <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-6 block">
          Investing · Building · Advisory
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-medium tracking-tight leading-[1.15] text-foreground mb-6 max-w-3xl">
          Elevate Tomorrow
        </h1>

        {/* Subtext */}
        <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed mb-10 text-balance">
          A global network redefining human potential through AI-powered learning.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button asChild size="lg" className="rounded-none h-[52px] px-[28px] bg-foreground text-background hover:bg-primary transition-colors duration-200">
            <Link to="/contact" /* ui-ignore */>
              Start Your Pathway
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-none h-[52px] px-[28px] border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background transition-colors duration-200">
            <Link to="/about" /* ui-ignore */>
              Explore Network
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run tests to verify Hero compiles**
Run: `pnpm run test:run`
Expected: PASS

- [ ] **Step 3: Commit Hero redesign**
```bash
git add app/src/sections/Hero.tsx
git commit -m "feat: redesign Hero to Typographic Pure-Lagom Hero"
```

---

### Task 3: Redesign the Partner Marquee (`PartnerMarquee.tsx`)

**Files:**
- Modify: `app/src/sections/PartnerMarquee.tsx`

- [ ] **Step 1: Replace implementation in `app/src/sections/PartnerMarquee.tsx` with a static, borderless horizontal name row**

```tsx
export default function PartnerMarquee() {
  const partners = [
    'Ministry of Education, Singapore',
    'Goonj',
    'Hyundai',
    'Hero Honda',
    'LML',
    'Excel',
    'Powerica Ltd.',
    'Indian Maritime University',
    'Hungkuo Delin University of Technology',
    'Delhi University',
    'HCL',
    'IBM',
    'NIIT',
    'Convergys',
    'Kadi Sarva Vishwavidyalaya (KSV)',
    'Visva-Bharati University',
    'Green Hydrogen Research, South Korea',
    'Early Childcare and Education Center, Dallas'
  ];

  return (
    <section className="relative w-full bg-background border-t border-b border-border/50 py-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-6 text-center">
          {partners.map((partner) => (
            <span
              key={partner}
              className="text-[15px] font-medium text-muted-foreground hover:text-foreground cursor-default transition-colors duration-200"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify compilation**
Run: `pnpm tsc -b`
Expected: PASS

- [ ] **Step 3: Commit Partner Marquee redesign**
```bash
git add app/src/sections/PartnerMarquee.tsx
git commit -m "feat: redesign PartnerMarquee to a borderless static horizontal names row"
```

---

### Task 4: Redesign Telemetry Stats Section (`TelemetryStats.tsx`)

**Files:**
- Modify: `app/src/sections/TelemetryStats.tsx`
- Modify: `app/src/sections/TelemetryStats.test.tsx`

- [ ] **Step 1: Replace implementation in `app/src/sections/TelemetryStats.tsx` with a single-row 4-column metric list**

```tsx
export default function TelemetryStats() {
  const stats = [
    { value: '4,200+', label: 'Active Learners' },
    { value: '38',     label: 'Countries Reached' },
    { value: '98%',    label: 'Placement Rate' },
    { value: '1.2M+',  label: 'Learning Hours' },
  ];

  return (
    <section
      id="telemetry"
      className="relative w-full py-40 bg-background border-b border-border/50"
    >
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 items-start">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative flex flex-col items-start">
              {/* Optional 4px ochre dot prefix above the number */}
              <div className="w-1 h-1 bg-accent mb-3" />
              
              {/* Metric number */}
              <span className="text-[48px] font-medium text-foreground leading-none tracking-tight">
                {stat.value}
              </span>
              
              {/* Label */}
              <span className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide mt-2 block">
                {stat.label}
              </span>

              {/* Rules: single 1px divider between columns 2 and 3 on desktop */}
              {index === 1 && (
                <div className="hidden md:block absolute -right-4 top-0 bottom-0 w-px bg-border/50 h-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/src/sections/TelemetryStats.test.tsx` to match the redesigned structure**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TelemetryStats from './TelemetryStats';

describe('TelemetryStats section', () => {
  it('renders the custom telemetry stats section', () => {
    render(<TelemetryStats />);
    expect(screen.getByText('4,200+')).toBeDefined();
    expect(screen.getByText('Active Learners')).toBeDefined();
    expect(screen.getByText('38')).toBeDefined();
    expect(screen.getByText('Countries Reached')).toBeDefined();
  });
});
```

- [ ] **Step 3: Run Vitest on telemetry stats**
Run: `pnpm run test:run`
Expected: PASS

- [ ] **Step 4: Commit TelemetryStats changes**
```bash
git add app/src/sections/TelemetryStats.tsx app/src/sections/TelemetryStats.test.tsx
git commit -m "feat: redesign TelemetryStats to single-row borderless metric grid"
```

---

### Task 5: Redesign Services Matrix (`ServicesMatrix.tsx`)

**Files:**
- Modify: `app/src/sections/ServicesMatrix.tsx`

- [ ] **Step 1: Replace implementation in `app/src/sections/ServicesMatrix.tsx` with a static 3-column program grid**

```tsx
import { Link } from 'react-router';

const PROGRAMS = [
  { name: 'FuturePath Navigator', description: 'Decodes strengths, psychometrics, and DMIT assessments for subject/stream selection.' },
  { name: 'LifeSkills Lab', description: 'Teaches soft skills, communication, emotional resilience, and financial literacy.' },
  { name: 'Expert Connect Live', description: 'Connects students to industry experts, academics, and researchers for mentorship.' },
  { name: 'Global Admissions Studio', description: 'End-to-end guidance for domestic competitive prep and international admissions.' },
  { name: 'Career Launchpad', description: 'Resume/LinkedIn building, mock interviews, and global placements.' },
  { name: 'Innovation Studio & Educator Academy', description: 'Sets up STEM/robotics spaces in schools; provides pedagogical growth training.' },
];

export default function ServicesMatrix() {
  return (
    <section
      id="building"
      className="relative w-full py-40 bg-background border-b border-border/50"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-3 block">
            Programs &amp; Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2]">
            Future-Ready Programs
          </h2>
        </div>

        {/* 3-Column static program grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {PROGRAMS.map((program) => (
            <div
              key={program.name}
              className="group relative flex flex-col items-start p-10 bg-transparent transition-colors duration-300 hover:bg-secondary rounded-none"
            >
              <h3 className="text-[20px] font-medium text-foreground mb-4">
                {program.name}
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                {program.description}
              </p>
              <Link
                to="/programs" /* ui-ignore */
                className="text-[14px] font-medium text-accent hover:underline mt-auto"
              >
                Explore &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify compilation**
Run: `pnpm tsc -b`
Expected: PASS

- [ ] **Step 3: Commit ServicesMatrix**
```bash
git add app/src/sections/ServicesMatrix.tsx
git commit -m "feat: redesign ServicesMatrix to static 3-column program grid without marquees"
```

---

### Task 6: Redesign Pedigree Showcase (`PedigreeShowcase.tsx`)

**Files:**
- Modify: `app/src/sections/PedigreeShowcase.tsx`
- Modify: `app/src/sections/PedigreeShowcase.test.tsx`

- [ ] **Step 1: Replace implementation in `app/src/sections/PedigreeShowcase.tsx` with a clean 2x2 typographic card layout**

```tsx
export default function PedigreeShowcase() {
  const cards = [
    {
      label: '01 — Integrations',
      title: 'Strategic Integrations',
      description: 'Direct alignment with leading educational ministries, corporate partners, and humanitarian platforms.'
    },
    {
      label: '02 — Guidance',
      title: 'Real-time Guidance',
      description: 'Synchronized feedback loops between expert mentors and learner capability pathways.'
    },
    {
      label: '03 — Standards',
      title: 'Framework Ready',
      description: 'Built on verified data structures, comprehensive academic APIs, and standardized evaluation protocols.'
    },
    {
      label: '04 — Scale',
      title: 'Institution Ready',
      description: 'Scale confidently with national educational standards and secure credentialing verification.'
    }
  ];

  return (
    <section
      id="advisory"
      className="relative w-full bg-background py-40 border-b border-border/50"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-3 block">
            Technical Pedigree &amp; Advisory Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2]">
            Our founders &amp; advisors bring experience from world-class organizations
          </h2>
        </div>

        {/* 2x2 Typographic card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group flex flex-col items-start p-10 bg-transparent transition-colors duration-300 hover:bg-secondary rounded-none"
            >
              <span className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide mb-3 block">
                {card.label}
              </span>
              <h3 className="text-[24px] font-medium text-foreground mb-4">
                {card.title}
              </h3>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-[45ch]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/src/sections/PedigreeShowcase.test.tsx` to match the redesigned structure**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PedigreeShowcase from './PedigreeShowcase';

describe('PedigreeShowcase section', () => {
  it('renders the Technical Pedigree section header', () => {
    render(<PedigreeShowcase />);
    expect(screen.getByText('Strategic Integrations')).toBeDefined();
    expect(screen.getByText('01 — Integrations')).toBeDefined();
  });
});
```

- [ ] **Step 3: Run Vitest tests**
Run: `pnpm run test:run`
Expected: PASS

- [ ] **Step 4: Commit PedigreeShowcase redesign**
```bash
git add app/src/sections/PedigreeShowcase.tsx app/src/sections/PedigreeShowcase.test.tsx
git commit -m "feat: redesign PedigreeShowcase to a clean 2x2 typographic card grid"
```

---

### Task 7: Redesign About & Programs Pages

**Files:**
- Modify: `app/src/pages/About.tsx`
- Modify: `app/src/pages/Programs.tsx`

- [ ] **Step 1: Simplify `app/src/pages/About.tsx` to striptimeline graphics, maps, shields, and value shields, leaving a text-based vertical timeline and numbered text value statements**

```tsx
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export default function About() {
  const values = [
    { num: '01', title: 'Empowering Potential', desc: 'Making world-class educational tools accessible for everyone.' },
    { num: '02', title: 'Academic Rigour', desc: 'Formulating structured guidance using verified pathways.' },
    { num: '03', title: 'Industry Connect', desc: 'Fostering active corporate connections and direct placement.' }
  ];

  return (
    <div className="bg-background w-full py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-32">
        {/* Typographic Hero */}
        <div className="max-w-3xl space-y-6">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground block">
            ABOUT US
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-foreground tracking-tight leading-[1.15]">
            Redefining human capability through structured guidance.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            We operate next-generation talent frameworks mapping academic milestones directly to professional placement.
          </p>
        </div>

        {/* Numbered Value Statements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v) => (
            <div key={v.num} className="p-10 hover:bg-secondary transition-colors duration-300">
              <span className="text-xs font-semibold text-accent mb-4 block">{v.num}</span>
              <h3 className="text-xl font-medium text-foreground mb-3">{v.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Simplify `app/src/pages/Programs.tsx` to remove hexagonal phase badges, connection lines, scan animations, and complex structures, replacing them with a simple numbered text list**

```tsx
const PROGRAMS_LIST = [
  { num: '01', title: 'FuturePath Navigator', desc: 'Decodes strengths, psychometrics, and assessments for stream selection.' },
  { num: '02', title: 'LifeSkills Lab', desc: 'Soft skills, communication, emotional resilience, and financial literacy.' },
  { num: '03', title: 'Expert Connect Live', desc: 'Connects students to industry experts and researchers for mentorship.' },
  { num: '04', title: 'Global Admissions Studio', desc: 'Guidance for domestic competitive prep and international admissions.' }
];

export default function Programs() {
  return (
    <div className="bg-background w-full py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-32">
        {/* Typographic Hero */}
        <div className="max-w-3xl space-y-6">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground block">
            PROGRAMS
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-foreground tracking-tight leading-[1.15]">
            Pathway exploration built for outcomes.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Choose from our structured modules designed to bridge the gap between academic education and industry.
          </p>
        </div>

        {/* Numbered Simple Text List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {PROGRAMS_LIST.map((program) => (
            <div key={program.num} className="p-10 hover:bg-secondary transition-colors duration-300">
              <span className="text-xs font-semibold text-accent mb-4 block">{program.num} — MODULE</span>
              <h3 className="text-2xl font-medium text-foreground mb-3">{program.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{program.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**
Run: `pnpm tsc -b`
Expected: PASS

- [ ] **Step 4: Commit About and Programs page redesign**
```bash
git add app/src/pages/About.tsx app/src/pages/Programs.tsx
git commit -m "feat: simplify About and Programs subpages with typographic minimalism"
```

---

### Task 8: Redesign Guidance, Knowledge Hub, & Events Pages

**Files:**
- Modify: `app/src/pages/Guidance.tsx`
- Modify: `app/src/pages/KnowledgeHub.tsx`
- Modify: `app/src/pages/SignatureExperiences.tsx`

- [ ] **Step 1: Simplify `app/src/pages/Guidance.tsx` to strip code block graphics, pricing checkmarks, and custom diagrams, rendering clean text blocks and a flat price section**

```tsx
import { Button } from '@/components/ui/button';

export default function Guidance() {
  return (
    <div className="bg-background w-full py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-32">
        {/* Typographic Hero */}
        <div className="max-w-3xl space-y-6">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground block">
            GUIDANCE
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-foreground tracking-tight leading-[1.15]">
            One-to-One Academic Mentorship
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Personalised support structure mapping out your education, admissions prep, and placement roadmap.
          </p>
        </div>

        {/* Flat Price Block */}
        <div className="max-w-xl p-12 bg-secondary rounded-none space-y-8">
          <div>
            <h3 className="text-xl font-medium text-foreground">Premium Guidance Plan</h3>
            <p className="text-muted-foreground text-sm mt-2">Comprehensive 1-on-1 counselor framework.</p>
          </div>
          <div className="text-[48px] font-medium text-foreground">$149<span className="text-base text-muted-foreground">/mo</span></div>
          <ul className="space-y-3 text-[15px] text-muted-foreground">
            <li>• Weekly 1-on-1 counseling calls</li>
            <li>• Portfolio reviews & evaluation</li>
            <li>• Customized path simulation</li>
            <li>• Mock interview support</li>
          </ul>
          <Button className="w-full rounded-none bg-foreground text-background h-[52px]">Select Pathway</Button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Simplify `app/src/pages/KnowledgeHub.tsx` to remove desk heroes, filters, and loading animations, implementing resource grid with 3:2 contained thumbnails**

```tsx
export default function KnowledgeHub() {
  const articles = [
    { title: 'The Future of AI Learning Systems', date: 'June 2026' },
    { title: 'Navigating Global Admissions in 2026', date: 'May 2026' },
    { title: 'Psychometrics in Career Selection', date: 'April 2026' }
  ];

  return (
    <div className="bg-background w-full py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-32">
        {/* Typographic Hero */}
        <div className="max-w-3xl space-y-6">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground block">
            KNOWLEDGE HUB
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-foreground tracking-tight leading-[1.15]">
            Research &amp; Guidance Library
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Browse our verified publications, strategic analyses, and curriculum resources.
          </p>
        </div>

        {/* Grid with 3:2 flat thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((art) => (
            <div key={art.title} className="p-10 hover:bg-secondary transition-colors duration-300 space-y-4">
              <div className="aspect-[3/2] w-full bg-border/40 rounded-none flex items-center justify-center text-muted-foreground font-mono text-[10px]">
                3:2 MEDIA CONTAINER
              </div>
              <span className="text-xs text-muted-foreground font-medium block">{art.date}</span>
              <h3 className="text-lg font-medium text-foreground leading-snug">{art.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Simplify `app/src/pages/SignatureExperiences.tsx` (Events) to remove speakers crops, metadata pills, accordions, and ask buttons**

```tsx
export default function SignatureExperiences() {
  const events = [
    { title: 'Global Academic Summit Singapore', date: 'Oct 2026' },
    { title: 'Innovation Educator Workshop', date: 'Nov 2026' }
  ];

  return (
    <div className="bg-background w-full py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-32">
        {/* Typographic Hero */}
        <div className="max-w-3xl space-y-6">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground block">
            EVENTS
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-foreground tracking-tight leading-[1.15]">
            Signature Experiences &amp; Summits
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Connect directly with global researchers, educational ministries, and industry mentors.
          </p>
        </div>

        {/* Clean list with 1px top divider lines */}
        <div className="border-t border-border/50 divide-y divide-border/50">
          {events.map((e) => (
            <div key={e.title} className="py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-xs text-accent font-semibold block mb-1">{e.date}</span>
                <h3 className="text-xl font-medium text-foreground">{e.title}</h3>
              </div>
              <span className="text-sm text-muted-foreground font-medium">Singapore / Hybrid</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify type checks**
Run: `pnpm tsc -b`
Expected: PASS

- [ ] **Step 5: Commit page modifications**
```bash
git add app/src/pages/Guidance.tsx app/src/pages/KnowledgeHub.tsx app/src/pages/SignatureExperiences.tsx
git commit -m "feat: redesign Guidance, KnowledgeHub, and Events pages for typographic minimalism"
```

---

### Task 9: Redesign Council, News, & Contact Pages

**Files:**
- Modify: `app/src/pages/Council.tsx`
- Modify: `app/src/pages/News.tsx`
- Modify: `app/src/pages/Contact.tsx`

- [ ] **Step 1: Simplify `app/src/pages/Council.tsx` to remove seating charts, seats metadata, dossier links, initials cards, and tags, rendering a clean 3-column flat photo grid**

```tsx
export default function Council() {
  const members = [
    { name: 'Prof. Chen Wei', role: 'Chairman', inst: 'National University of Singapore' },
    { name: 'Dr. Sarah Lin', role: 'Senior Academic Advisor', inst: 'Ministry of Education' },
    { name: 'Takahiro Sato', role: 'Enterprise Placements Lead', inst: 'Innovation Studio Tokyo' }
  ];

  return (
    <div className="bg-background w-full py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-32">
        {/* Typographic Hero */}
        <div className="max-w-3xl space-y-6">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground block">
            COUNCIL
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-foreground tracking-tight leading-[1.15]">
            Global Expert Council
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A network of academic leaders, global policymakers, and senior industry advisors guiding our learning path.
          </p>
        </div>

        {/* 3-Column Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {members.map((member) => (
            <div key={member.name} className="p-8 bg-transparent hover:bg-secondary transition-colors duration-300 space-y-4">
              <div className="aspect-[4/5] w-full bg-border/40 rounded-none flex items-center justify-center text-muted-foreground font-mono text-[10px]">
                4:5 PORTRAIT PLACEHOLDER
              </div>
              <div>
                <h3 className="text-lg font-medium text-foreground leading-snug">{member.name}</h3>
                <p className="text-xs text-accent font-medium mt-1">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{member.inst}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Simplify `app/src/pages/News.tsx` to remove 3D graphics, read times, and tags, rendering a clean article grid**

```tsx
export default function News() {
  const news = [
    { title: 'EduPlus Launches Digital Learning Academy', date: 'July 14, 2026' },
    { title: 'Singapore Enrolment Reaches Record Milestone', date: 'July 10, 2026' }
  ];

  return (
    <div className="bg-background w-full py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-32">
        {/* Typographic Hero */}
        <div className="max-w-3xl space-y-6">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground block">
            NEWS &amp; INSIGHTS
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium text-foreground tracking-tight leading-[1.15]">
            Announcements &amp; Updates
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stay informed with verified updates from our strategic initiatives and research.
          </p>
        </div>

        {/* Clean Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {news.map((item) => (
            <div key={item.title} className="p-10 hover:bg-secondary transition-colors duration-300 space-y-4">
              <div className="aspect-[3/2] w-full bg-border/40 rounded-none flex items-center justify-center text-muted-foreground font-mono text-[10px]">
                3:2 THUMBNAIL PLACEHOLDER
              </div>
              <span className="text-xs text-muted-foreground font-medium block">{item.date}</span>
              <h3 className="text-xl font-medium text-foreground leading-snug">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**
Run: `pnpm tsc -b`
Expected: PASS

- [ ] **Step 4: Commit Council and News changes**
```bash
git add app/src/pages/Council.tsx app/src/pages/News.tsx
git commit -m "feat: simplify Council and News pages with typographic profiles and grids"
```

---

### Task 10: App-wide Check and Verification

- [ ] **Step 1: Run TypeScript compiler check on the entire project**
Run: `pnpm tsc -b`
Expected: PASS with 0 errors

- [ ] **Step 2: Run all unit and page tests**
Run: `pnpm run test:run`
Expected: PASS with 17/17 tests passing

- [ ] **Step 3: Update walkthrough and finalize redesign work**
Verify that all pages render correctly and contain no rounded corners, visual clutter, HUD details, or non-conforming graphics.
