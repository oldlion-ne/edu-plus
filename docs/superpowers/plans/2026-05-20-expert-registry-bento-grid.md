# Expert Registry Bento Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the distorted, illegible 3D Holographic Ring with a responsive, high-contrast Bento Grid Expert Registry inside the Technical Pedigree section.

**Architecture:** We will strip the Three.js and custom shader-based cylinder rendering from `PedigreeShowcase.tsx`. In its place, we will map over an array of 8 structured expert profiles, rendering them in a fluid CSS grid (4 columns on desktop, 2 on tablet, 1 on mobile) styled with thin monochrome borders, serial tags, glowing hover animations, and direct layout compliance.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Vitest, React Testing Library.

---

### Task 1: Create Unit Tests for Expert Registry

**Files:**
- Create: `app/src/sections/PedigreeShowcase.test.tsx`

- [ ] **Step 1: Write the failing test**
  Create a new test file `app/src/sections/PedigreeShowcase.test.tsx` containing assertions for the Technical Pedigree header and all 8 advisor names.

  ```tsx
  import { render, screen } from '@testing-library/react';
  import { describe, it, expect } from 'vitest';
  import PedigreeShowcase from './PedigreeShowcase';

  // Mock IntersectionObserver for JSDOM
  class IntersectionObserverMock {
    constructor(callback: any) {
      // Instantly trigger callback to simulate element visibility
      callback([{ isIntersecting: true }]);
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  (globalThis as any).IntersectionObserver = IntersectionObserverMock as any;

  describe('PedigreeShowcase Component', () => {
    it('renders the Technical Pedigree section header', () => {
      render(<PedigreeShowcase />);
      expect(screen.getByText('Expert Registry')).toBeDefined();
      expect(screen.getByText('Technical Pedigree')).toBeDefined();
    });

    it('renders all 8 advisors in the bento grid', () => {
      render(<PedigreeShowcase />);
      
      const expectedAdvisors = [
        'Dr. Soram Bobby Singh',
        'Ms. Geetarani Takhellambam',
        'Smt. Purnimashi Moirangthem',
        'Dr. Ngangbam Shantikumar Meetei',
        'Khumukcham Roshaan Singh',
        'Shri Romen Ningthoujam',
        'Smt. Nutan Nongthongbam',
        'Shri Rojit Keisham'
      ];

      expectedAdvisors.forEach(name => {
        expect(screen.getByText(name)).toBeDefined();
      });
    });
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  Run: `pnpm run test:run` inside the `app` directory.
  Expected: **FAIL** or compilation crash due to the 8 expert names not rendering in the DOM (currently hidden inside Three.js canvas text texture).

- [ ] **Step 3: Commit**
  ```bash
  git add app/src/sections/PedigreeShowcase.test.tsx
  git commit -m "test: add unit tests for PedigreeShowcase expert registry"
  ```

---

### Task 2: Re-implement PedigreeShowcase as a Bento Grid

**Files:**
- Modify: `app/src/sections/PedigreeShowcase.tsx`

- [ ] **Step 1: Replace implementation in PedigreeShowcase.tsx**
  Open `app/src/sections/PedigreeShowcase.tsx`. Remove the import of `<HolographicTextRing />`. Define the typed expert data array and render them in a responsive CSS Grid with custom hover glows and serial tracking codes.

  Replace the entire file with the following complete, pristine code:

  ```tsx
  import { useEffect, useRef, useState } from 'react';

  interface ExpertNode {
    nodeId: string;
    name: string;
    domain: string;
    role: string;
    category: string;
  }

  const EXPERT_REGISTRY: ExpertNode[] = [
    {
      nodeId: '01',
      name: 'Dr. Soram Bobby Singh',
      domain: 'Green Hydrogen',
      role: 'Principal Scientist leading clean-energy & hydrogen storage architectures.',
      category: 'Research Node',
    },
    {
      nodeId: '02',
      name: 'Ms. Geetarani Takhellambam',
      domain: 'Legal Operations',
      role: 'GM and Head of Legal at Powerica Ltd, specializing in energy governance & compliance.',
      category: 'Corporate Node',
    },
    {
      nodeId: '03',
      name: 'Smt. Purnimashi Moirangthem',
      domain: 'Cognitive Development',
      role: 'Assistant Director leading early childhood cognitive learning and research methodologies.',
      category: 'Cognitive Node',
    },
    {
      nodeId: '04',
      name: 'Dr. Ngangbam Shantikumar Meetei',
      domain: 'Advanced Linguistics',
      role: 'Professor of Advanced Linguistics specializing in structural syntactic frameworks.',
      category: 'Academic Node',
    },
    {
      nodeId: '05',
      name: 'Khumukcham Roshaan Singh',
      domain: 'Career Strategy',
      role: 'Executive Career Strategist designing pathways for global leadership pipelines.',
      category: 'Strategy Node',
    },
    {
      nodeId: '06',
      name: 'Shri Romen Ningthoujam',
      domain: 'Social Operations',
      role: 'Operational Lead at Goonj, driving large-scale humanitarian logistics and systems.',
      category: 'Logistics Node',
    },
    {
      nodeId: '07',
      name: 'Smt. Nutan Nongthongbam',
      domain: 'Public Health',
      role: 'International Public Health Speaker advocating global community healthcare protocols.',
      category: 'Medical Node',
    },
    {
      nodeId: '08',
      name: 'Shri Rojit Keisham',
      domain: 'Maritime Logistics',
      role: 'Professor of Maritime Operations specializing in blue-ocean transport networks.',
      category: 'Transport Node',
    },
  ];

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
        className="relative w-full min-h-screen bg-[#0B0F14] overflow-hidden"
      >
        {/* Section Header */}
        <div className="relative z-10 pt-32 md:pt-40 pb-8">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <span
              className={`text-xs font-sans font-medium tracking-[0.3em] uppercase text-[#7DF9FF] mb-6 block transition-all duration-1000 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Expert Registry
            </span>
            <h2
              className={`font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#E6EDF3] max-w-3xl transition-all duration-1000 delay-200 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Technical Pedigree
            </h2>
            <p
              className={`font-sans text-sm text-[#8B949E] max-w-lg mt-6 leading-relaxed transition-all duration-1000 delay-400 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Our advisory network spans scientists, strategists, linguists, and operational
              leads across critical domains of human capability development.
            </p>
          </div>
        </div>

        {/* 8-Node Bento Grid Display */}
        <div
          className={`max-w-[1440px] mx-auto px-6 md:px-12 pb-24 transition-all duration-1000 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERT_REGISTRY.map((expert) => (
              <div
                key={expert.nodeId}
                className="group relative bg-[#0E131A] border border-[#7DF9FF]/10 p-6 flex flex-col justify-between min-h-[220px] rounded-none transition-all duration-300 hover:border-[#7DF9FF]/40 hover:shadow-[0_4px_20px_rgba(125,249,255,0.08)] hover:-translate-y-0.5"
              >
                {/* Neon Cyan Border Top Ambient Light */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent transition-colors duration-300 group-hover:bg-[#7DF9FF]" />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[9px] text-[#8B949E] tracking-wider uppercase">
                      NODE // {expert.nodeId}
                    </span>
                    <span className="font-mono text-[8px] text-[#34c759] flex items-center gap-1">
                      <span className="w-1 h-1 bg-[#34c759] rounded-full inline-block animate-pulse" />
                      SECURE
                    </span>
                  </div>

                  <div className="font-mono text-[10px] text-[#7DF9FF] uppercase tracking-widest mb-3">
                    // {expert.domain}
                  </div>
                  <h3 className="font-heading text-lg font-light text-[#E6EDF3] leading-snug mb-2">
                    {expert.name}
                  </h3>
                  <p className="font-sans text-xs text-[#8B949E] leading-relaxed">
                    {expert.role}
                  </p>
                </div>

                <div className="border-t border-white/5 mt-6 pt-4 flex justify-between items-center">
                  <span className="font-mono text-[8px] text-[#8B949E] uppercase tracking-wider">
                    {expert.category}
                  </span>
                  <span className="font-mono text-[8px] text-[#7DF9FF] tracking-wider group-hover:underline cursor-pointer">
                    [ PROFILE ]
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div
          className={`h-[1px] max-w-[1440px] mx-auto px-6 md:px-12 transition-all duration-1000 delay-700 ${
            visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, #0B0F14 0%, rgba(125,249,255,0.3) 50%, #0B0F14 100%)',
            transformOrigin: 'center',
          }}
        />
      </section>
    );
  }
  ```

- [ ] **Step 2: Run test to verify it passes**
  Run: `pnpm run test:run` inside the `app` directory.
  Expected: **PASS** (11/11 tests pass successfully).

- [ ] **Step 3: Commit**
  ```bash
  git add app/src/sections/PedigreeShowcase.tsx
  git commit -m "feat: re-implement Expert Registry as a fully responsive bento grid"
  ```

---

### Task 3: Clean up Unused Holographic Ring Code

**Files:**
- Delete: `app/src/components/effects/HolographicTextRing.tsx`

- [ ] **Step 1: Delete file**
  Delete the obsolete Three.js visual component since it has been replaced: `app/src/components/effects/HolographicTextRing.tsx`

- [ ] **Step 2: Run final validation check**
  Run: `pnpm tsc -b` and then `pnpm run build` in the `app` directory.
  Expected: **0 Errors** and successful production build.

- [ ] **Step 3: Commit**
  ```bash
  git rm app/src/components/effects/HolographicTextRing.tsx
  git commit -m "cleanup: remove obsolete HolographicTextRing component"
  ```
