# Immersive Cinematic Hero Backgrounds Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the top sections of all 7 core pages to use full-bleed, parallax-scrolling immersive background images featuring our custom-generated storytelling visual assets, complete with CRT scanline noise, dot matrix filters, and dynamic telemetry overlays.

**Architecture:** Create a highly reusable React component `<ImmersiveHero>` in `src/components/effects/ImmersiveHero.tsx` that absolute-positions the image at z-0, overlays a linear-and-radial dark-slate gradient (`#0B0F14`) along with CRT scanline patterns at z-1, handles parallax scroll translations using scroll offsets, and positions typography and micro-metadata elements dynamically at z-10.

**Tech Stack:** React, Tailwind CSS, Lucide Icons, TypeScript, Vite.

---

## 🏗️ File Structure & Responsibilities

1. **`src/components/effects/ImmersiveHero.tsx` [NEW]**: Renders full-bleed, dark-gradient masked, parallax-scrolling storytelling image backdrops overlayed with micro-telemetry data text fields and CRT scanlines, with child widget injection support.
2. **`src/pages/About.tsx` [MODIFY]**: Integrates `<ImmersiveHero>` with `/images/AboutCollabVisual.png`, removing the nested `AboutCollabVisual` card and header texts.
3. **`src/pages/Programs.tsx` [MODIFY]**: Integrates `<ImmersiveHero>` with `/images/CurriculumVisual.png`, removing the nested `CurriculumVisual` card and header texts.
4. **`src/pages/Guidance.tsx` [MODIFY]**: Integrates `<ImmersiveHero>` with `/images/MentorshipVisual.png`, removing the nested `MentorshipVisual` card and header texts.
5. **`src/pages/SignatureExperiences.tsx` [MODIFY]**: Integrates `<ImmersiveHero>` with `/images/EventsVisual.png`, removing the nested `EventsVisual` card and header texts.
6. **`src/pages/Council.tsx` [MODIFY]**: Integrates `<ImmersiveHero>` with `/images/CouncilVisual.png`, floating the spinning 3D `HolographicTextRing` directly over the council desk inside the background hero.
7. **`src/pages/News.tsx` [MODIFY]**: Integrates `<ImmersiveHero>` with `/images/NewsVisual.png`, removing the nested `NewsVisual` card and header texts.
8. **`src/pages/Contact.tsx` [MODIFY]**: Integrates `<ImmersiveHero>` with `/images/ContactVisual.png`, removing the nested `ContactVisual` card and header texts.

---

## 📝 Bite-Sized Tasks & Checklist

### Task 1: Create the Shared `<ImmersiveHero>` Component

**Files:**
- Create: `c:\edu-plus\app\src\components\effects\ImmersiveHero.tsx`

- [ ] **Step 1: Write the `<ImmersiveHero>` code with responsive parallax and dark gradients**

Create a clean React component featuring a hook for scroll position monitoring:

```tsx
import { useEffect, useState } from 'react';

interface ImmersiveHeroProps {
  bgImage: string;
  category: string;
  titleNormal: string;
  titleHighlighted: string;
  description: string;
  telemetryLeft?: string;
  telemetryRight?: string;
  children?: React.ReactNode;
}

export default function ImmersiveHero({
  bgImage,
  category,
  titleNormal,
  titleHighlighted,
  description,
  telemetryLeft,
  telemetryRight,
  children
}: ImmersiveHeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[60vh] min-h-[460px] md:h-[65vh] overflow-hidden bg-[#0B0F14] border-b border-[#7DF9FF]/10 select-none group">
      {/* Parallax Background Layer */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-transform duration-1000 ease-out group-hover:scale-105"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
        }}
      >
        <img 
          src={bgImage} 
          alt="Storytelling Background Illustration" 
          className="w-full h-full object-cover" 
        />
        {/* Double Gradient Mask Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F14]/75 via-[#0B0F14]/40 to-[#0B0F14]" />
      </div>

      {/* Retro Dot Matrix Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-1 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #7DF9FF 1px, transparent 1px)', 
          backgroundSize: '18px 18px' 
        }} 
      />

      {/* Holographic Scanline noise overlay */}
      <div 
        className="absolute inset-0 z-2 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(125, 249, 255, 0.1) 50%, rgba(0, 0, 0, 0.4) 50%)', 
          backgroundSize: '100% 4px' 
        }} 
      />

      {/* Canvas Widget Slot */}
      {children && (
        <div className="absolute inset-0 z-3">
          {children}
        </div>
      )}

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col justify-between py-12 md:py-16">
        {/* Top Empty buffer for navigation spacer */}
        <div />

        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-sans font-medium tracking-[0.3em] uppercase text-[#7DF9FF] block animate-fade-in">
            {category}
          </span>
          <h1 className="font-heading text-4xl md:text-6xl font-light leading-tight tracking-tight text-[#E6EDF3] leading-none mb-3 animate-slide-up">
            {titleNormal} <span className="text-[#7DF9FF] font-medium">{titleHighlighted}</span>
          </h1>
          <p className="text-[#8B949E] text-sm md:text-base max-w-2xl leading-relaxed font-sans animate-fade-in-delayed">
            {description}
          </p>
        </div>

        {/* Telemetry Corner Footers */}
        <div className="flex justify-between items-end text-[9px] font-mono text-[#8B949E] opacity-50 pt-6 border-t border-white/[0.04]">
          <span>{telemetryLeft || "SYSTEM_ACTIVE_NODES // OK"}</span>
          <span>{telemetryRight || "UTC_COORDINATES_ACTIVE"}</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit files**

```bash
git add c:\edu-plus\app\src\components\effects\ImmersiveHero.tsx
git commit -m "feat: add reusable ImmersiveHero component with scanlines and parallax background"
```

---

### Task 2: Refactor About Page Hero

**Files:**
- Modify: `c:\edu-plus\app\src\pages\About.tsx`

- [ ] **Step 1: Replace About Page Header and Visual Card with `<ImmersiveHero>`**

Update imports and refactor the component to use the new hero component at the top, allowing the Bento block grid to start immediately below:

```tsx
import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mouseCoords, setMouseCoords] = useState<{ [key: number]: { x: number; y: number } }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords(prev => ({
      ...prev,
      [idx]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/5 rounded-none blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#7DF9FF]/3 rounded-none blur-[150px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/AboutCollabVisual.png"
        category="Inside EduPlus Skills"
        titleNormal="Know Who"
        titleHighlighted="We Are"
        description="EduPlus Skills is an innovation-led skills and career platform that seamlessly combines education, training, and employment enablement. We operate both online and offline, ensuring access and outreach across regions—from local communities in Manipur to global education and career pathways."
        telemetryLeft="COLLAB_NEXUS // LOCAL_ROOTS"
        telemetryRight="GLOBAL_VALUE_NETWORKS // ONLINE"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* Additional paragraph block under hero */}
        <div className={`mt-16 text-[#8B949E] text-base md:text-lg leading-relaxed font-sans transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="max-w-4xl">
            We specialize in structured skill-building, career mapping, higher studies support, and curated placement opportunities, supported by a diverse network of experts from India, Asia, and beyond. Our programs are designed to be practical, experiential, and outcomes-focused, so that learning translates directly into confidence, clarity, and career progress.
          </p>
        </div>

        {/* What We Stand For: Premium Cyber-Brutalist Bento Grid */}
        <div className={`mt-24 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[#E6EDF3] mb-12 border-b border-[#7DF9FF]/10 pb-4">
            What We Stand For
          </h2>
          <p className="text-[#8B949E] text-base md:text-lg max-w-3xl mb-12 leading-relaxed">
            We believe that every learner deserves clarity of direction, access to opportunity, and the right skills at the right time. Our work centers on reducing confusion, demystifying career decisions, and making high-quality guidance accessible to students as early as school.
          </p>
          
          {/* Rest of the Bento Grid contents remain unchanged */}
          ...
```

- [ ] **Step 2: Commit files**

```bash
git add c:\edu-plus\app\src\pages\About.tsx
git commit -m "refactor: replace inline AboutCollabVisual card with immersive top hero on About page"
```

---

### Task 3: Refactor Programs Page Hero

**Files:**
- Modify: `c:\edu-plus\app\src\pages\Programs.tsx`

- [ ] **Step 1: Replace Programs Page Header and Visual Card with `<ImmersiveHero>`**

Update imports and replace the top section with `<ImmersiveHero>`, rendering the Programs Grid below it:

```tsx
import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';

export default function Programs() {
  const [mounted, setMounted] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Decorative Radials */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7DF9FF]/5 rounded-none blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7DF9FF]/5 rounded-none blur-[120px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/CurriculumVisual.png"
        category="Curriculum Pathways"
        titleNormal="Future-Ready"
        titleHighlighted="Programs"
        description="At EduPlus Skills, our programs are designed as interconnected modules that support learners at every milestone—from discovering their strengths to launching global careers."
        telemetryLeft="EXPLORATION_STUDIO // VR_ACTIVE"
        telemetryRight="FUTURE_PATHWAYS // SYS_ADMIS"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Pillars Grid */}
        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Rest of the Programs Grid content remains unchanged */}
          ...
```

- [ ] **Step 2: Commit files**

```bash
git add c:\edu-plus\app\src\pages\Programs.tsx
git commit -m "refactor: replace inline CurriculumVisual card with immersive top hero on Programs page"
```

---

### Task 4: Refactor Guidance Page Hero

**Files:**
- Modify: `c:\edu-plus\app\src\pages\Guidance.tsx`

- [ ] **Step 1: Replace Guidance Page Header and Visual Card with `<ImmersiveHero>`**

Update imports and embed the immersive top hero:

```tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ImmersiveHero from '../components/effects/ImmersiveHero';

export default function Guidance() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('students');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  ... // Terminal logs scripts and typing logic remain unchanged

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/5 rounded-none blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/3 rounded-none blur-[130px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/MentorshipVisual.png"
        category="Advisory Services"
        titleNormal="One-to-One"
        titleHighlighted="Guidance"
        description="EduPlus Skills offers dedicated, one-on-one support tailored to each stakeholder in the education ecosystem. We design guidance that meets you exactly where you are—and then helps you move forward with clarity and confidence."
        telemetryLeft="COZY_STUDIO // FOCUS_ACTIVE"
        telemetryRight="ADVISORY_DESK // INTERACTIVE"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Dynamic Stakeholder Tabs & Dashboard Grid */}
        <div className={`flex flex-col lg:flex-row gap-8 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Navigation and Retro Terminal Control Block */}
          ...
          
          {/* Right Active Details Panel (Removing the bottom <MagicCard><MentorshipVisual /></MagicCard> component since the visual serves as the main page backdrop) */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            <div className="liquid-glass p-8 md:p-12 min-h-[380px] flex flex-col justify-between border border-white/[0.08] rounded-none">
              ...
            </div>
            {/* REMOVED: MagicCard containing MentorshipVisual */}
          </div>
```

- [ ] **Step 2: Commit files**

```bash
git add c:\edu-plus\app\src\pages\Guidance.tsx
git commit -m "refactor: replace inline MentorshipVisual card with immersive top hero on Guidance page"
```

---

### Task 5: Refactor Signature Experiences Page Hero

**Files:**
- Modify: `c:\edu-plus\app\src\pages\SignatureExperiences.tsx`

- [ ] **Step 1: Replace Experiences Page Header and Visual Card with `<ImmersiveHero>`**

Refactor the SignatureExperiences route structure to render `<ImmersiveHero>` at the top:

```tsx
import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';

export default function SignatureExperiences() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7DF9FF]/3 rounded-none blur-[160px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/EventsVisual.png"
        category="Flagship Events"
        titleNormal="Signature"
        titleHighlighted="Experiences"
        description="Our flagship events bring energy, community, and real-world exposure into the learning experience. These curated experiences connect students, educators, institutions, and industry experts in environments where ideas, opportunities, and inspiration flow freely."
        telemetryLeft="EXPERIENCE_HALL // ACTIVE"
        telemetryRight="GALAXY_BOOTCAMPS // COSMIC"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Stacked Cards */}
        <div className="space-y-12">
          {/* Rest of the Events content grid remains unchanged */}
          ...
```

- [ ] **Step 2: Commit files**

```bash
git add c:\edu-plus\app\src\pages\SignatureExperiences.tsx
git commit -m "refactor: replace inline EventsVisual card with immersive top hero on Experiences page"
```

---

### Task 6: Refactor Council Page Hero & Hologram Overlay

**Files:**
- Modify: `c:\edu-plus\app\src\pages\Council.tsx`

- [ ] **Step 1: Refactor Council Page Header to float the spinning 3D HolographicTextRing directly inside the boardroom background**

Pass `<HolographicTextRing />` as a child node inside `<ImmersiveHero>`. Since the image displays a boardroom table, placing the holographic canvas within it creates a highly immersive visual effect:

```tsx
import { useEffect, useState } from 'react';
import HolographicTextRing from '../components/effects/HolographicTextRing';
import ImmersiveHero from '../components/effects/ImmersiveHero';

export default function Council() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#7DF9FF]/3 rounded-none blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#7DF9FF]/3 rounded-none blur-[160px] pointer-events-none" />

      {/* Immersive Top Hero Viewport with Embedded spinning 3D Hologram */}
      <ImmersiveHero
        bgImage="/images/CouncilVisual.png"
        category="Global Vision. Local Impact."
        titleNormal="Expert"
        titleHighlighted="Council"
        description="Uniting researchers, corporate leaders, and community builders across Asia, Europe, and North America."
        telemetryLeft="BOARDROOM_CENTER // ACTIVE_DEVICES"
        telemetryRight="EAGLE_DATA_HOLOGRAM // TELEMETRY"
      >
        {/* Floatingspinning 3D text ring overlay */}
        <div className="absolute inset-0 z-0 opacity-30 flex justify-center items-center pointer-events-none">
          <HolographicTextRing />
        </div>
      </ImmersiveHero>

      <div className={`max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 border-y border-[#7DF9FF]/10 py-6">
          {FILTERS.map(filter => (
            ...
```

- [ ] **Step 2: Commit files**

```bash
git add c:\edu-plus\app\src\pages\Council.tsx
git commit -m "refactor: integrate 3D HolographicTextRing directly inside the immersive Council boardroom hero"
```

---

### Task 7: Refactor News Page Hero

**Files:**
- Modify: `c:\edu-plus\app\src\pages\News.tsx`

- [ ] **Step 1: Replace News Page Header and Visual Card with `<ImmersiveHero>`**

Modify the page to render `<ImmersiveHero>` at the top:

```tsx
import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';

export default function News() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Decorative radial glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#7DF9FF]/4 rounded-none blur-[140px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/NewsVisual.png"
        category="Updates & Publications"
        titleNormal="News &"
        titleHighlighted="Insights"
        description="This space brings you closer to the people, programs, and impact behind EduPlus Skills. We share success stories, event highlights, new initiatives, and perspectives on the evolving world of education and work."
        telemetryLeft="INSIGHTS_MEDIA // NETWORK_ON"
        telemetryRight="GLOBAL_NEWSROOM // BROADCAST"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Articles Grid */}
        <div className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Rest of the articles grid remains unchanged */}
          ...
```

- [ ] **Step 2: Commit files**

```bash
git add c:\edu-plus\app\src\pages\News.tsx
git commit -m "refactor: replace inline NewsVisual card with immersive top hero on News page"
```

---

### Task 8: Refactor Contact Page Hero

**Files:**
- Modify: `c:\edu-plus\app\src\pages\Contact.tsx`

- [ ] **Step 1: Replace Contact Page Header and Visual Card with `<ImmersiveHero>`**

Refactor the Contact page to render `<ImmersiveHero>` and layout details:

```tsx
import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/5 rounded-none blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/3 rounded-none blur-[130px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/ContactVisual.png"
        category="Connect With Us"
        titleNormal="Contact &"
        titleHighlighted="Locations"
        description="Let’s Build Your Next Chapter. Whether you seek strategic collaboration, student enrollment, counselor support, or training resources—we are here to launch you forward."
        telemetryLeft="OFFICE_PORTAL // GATEWAY_OK"
        telemetryRight="WORKSPACE_GATEWAY // SEC_ONLINE"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 mt-16">
        {/* Info & Form Split Layout */}
        <div className={`grid lg:grid-cols-12 gap-12 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Left Column: Office & Details (REMOVING the bottom <MagicCard><ContactVisual /></MagicCard> element since it's in the hero background) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="liquid-glass p-8 space-y-6">
              <span className="text-xs font-sans text-[#7DF9FF] tracking-wider uppercase block opacity-60">
                Primary Head Office
              </span>
              <div>
                <h3 className="font-heading text-xl font-light text-[#E6EDF3] mb-3">Mommy Complex</h3>
                <p className="font-sans text-sm text-[#8B949E] leading-relaxed">
                  Nambol Bazar, Bishnupur District,<br />
                  Nambol 795134, Manipur, India
                </p>
              </div>
              <div className="pt-4 border-t border-[#7DF9FF]/10 space-y-4">
                <div>
                  <span className="text-[10px] font-sans text-[#8B949E] uppercase tracking-wider block mb-1">Direct Advisory Hotline</span>
                  <a href="tel:+919856456703" className="font-sans text-base text-[#7DF9FF] hover:underline font-medium">
                    +91 (985) 645 6703
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          ...
```

- [ ] **Step 2: Commit files**

```bash
git add c:\edu-plus\app\src\pages\Contact.tsx
git commit -m "refactor: replace inline ContactVisual card with immersive top hero on Contact page"
```

---

### Task 9: Clean Up Old Assets & Quality Verification

**Files:**
- Modify: `c:\edu-plus\app\src\components\effects\CyberVisualizations.tsx`

- [ ] **Step 1: Remove unused component visuals from `CyberVisualizations.tsx`**

Remove the outdated SVG-overlay components (e.g. `AboutCollabVisual`, `CurriculumVisual`, `MentorshipVisual`, `EventsVisual`, `CouncilVisual`, `NewsVisual`, `ContactVisual`) from `CyberVisualizations.tsx`, keeping only the core `<MagicCard>` layout component for future bento grids.

- [ ] **Step 2: Run Production Compiling**

Run: `pnpm run build`
Expected: COMPILATION SUCCESS with zero errors.

- [ ] **Step 3: Run Vitest Unit Tests**

Run: `pnpm run test:run`
Expected: PASS (4/4 tests passed).

- [ ] **Step 4: Run ESLint Linter**

Run: `pnpm run lint`
Expected: LINTER SUCCESS (0 errors, standard React warnings only).

- [ ] **Step 5: Commit Cleanup**

```bash
git add c:\edu-plus\app\src\components\effects\CyberVisualizations.tsx
git commit -m "cleanup: remove obsolete visual wrappers and complete immersive top hero integration"
```
