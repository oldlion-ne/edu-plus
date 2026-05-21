# Cyber Telemetry Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Eduplus homepage to incorporate a state-of-the-art, data-dense Cyber Telemetry Deck with interactive simulator and bento-style stats panels, strictly adhering to the `rounded-none` sharp-edged brand aesthetic.

**Architecture:** Integrate `@ui-layouts/advanced-stats` component block, strip default rounded layouts, implement an interactive SVG Pathway Simulator, and render the components as modular bento grid segments in the main Home container.

**Tech Stack:** React 19, TypeScript, TailwindCSS v3, Framer Motion (`motion` package), Vitest.

---

### Task 1: Add Advanced Stats Component via Shadcn

**Files:**
- Create: `src/components/timeline-animation.tsx`
- Modify: `package.json`, `pnpm-lock.yaml`

- [ ] **Step 1: Install shadcn block**
  Run: `pnpm dlx shadcn@latest add -y @ui-layouts/advanced-stats`
  Expected: Installs dependencies and downloads component block.

- [ ] **Step 2: Verify component existence**
  Verify that `src/components/timeline-animation.tsx` is successfully created.

- [ ] **Step 3: Commit**
  ```bash
  git add package.json pnpm-lock.yaml src/components/timeline-animation.tsx
  git commit -m "feat: install ui-layouts advanced-stats component"
  ```

---

### Task 2: Custom Telemetry Stats Section

**Files:**
- Create: `src/sections/TelemetryStats.tsx`
- Create: `src/sections/TelemetryStats.test.tsx`

- [ ] **Step 1: Write failing test for TelemetryStats**
  Create `src/sections/TelemetryStats.test.tsx`:
  ```tsx
  import { render, screen } from '@testing-library/react';
  import TelemetryStats from './TelemetryStats';

  test('renders the custom telemetry stats section', () => {
    render(<TelemetryStats />);
    expect(screen.getByText(/SYSTEM_NODES/i)).toBeInTheDocument();
    expect(screen.getByText(/EXPERT_NODES/i)).toBeInTheDocument();
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  Run: `pnpm test src/sections/TelemetryStats.test.tsx`
  Expected: FAIL (component not imported/defined)

- [ ] **Step 3: Implement TelemetryStats component**
  Create `src/sections/TelemetryStats.tsx`:
  ```tsx
  import { useEffect, useState } from 'react';

  interface StatNode {
    value: string;
    label: string;
    desc: string;
  }

  const STATS: StatNode[] = [
    { value: '256+', label: 'SYSTEM_NODES', desc: 'Active real-world training paths deployed globally.' },
    { value: '08', label: 'EXPERT_NODES', desc: 'Frontier research advisors active in registry.' },
    { value: '99.9%', label: 'LINK_LATENCY', desc: 'Uptime maintained across mentorship connections.' },
    { value: '14.8K', label: 'PATH_COMMITS', desc: 'Milestones verified in talent development paths.' },
  ];

  export default function TelemetryStats() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      setVisible(true);
    }, []);

    return (
      <section className="relative w-full py-16 bg-[#0B0F14] border-t border-[#7DF9FF]/10 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`relative bg-[#0E131A] border border-[#7DF9FF]/10 p-8 rounded-none transition-all duration-500 hover:border-[#7DF9FF]/40 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Neon Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#7DF9FF]/20 hover:bg-[#7DF9FF]" />
                <div className="font-mono text-3xl md:text-4xl font-light text-[#7DF9FF] mb-2">{stat.value}</div>
                <div className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase mb-3">{stat.label}</div>
                <p className="font-sans text-xs text-[#8B949E]/80 leading-relaxed">{stat.desc}</p>
                {/* Tech corner accent */}
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#7DF9FF]/30" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 4: Run test to verify it passes**
  Run: `pnpm test src/sections/TelemetryStats.test.tsx`
  Expected: PASS

- [ ] **Step 5: Commit**
  ```bash
  git add src/sections/TelemetryStats.tsx src/sections/TelemetryStats.test.tsx
  git commit -m "feat: add TelemetryStats component with TDD verification"
  ```

---

### Task 3: Interactive Career Pathway Simulator Component

**Files:**
- Create: `src/sections/PathwaySimulator.tsx`
- Create: `src/sections/PathwaySimulator.test.tsx`

- [ ] **Step 1: Write failing test for PathwaySimulator**
  Create `src/sections/PathwaySimulator.test.tsx`:
  ```tsx
  import { render, screen } from '@testing-library/react';
  import PathwaySimulator from './PathwaySimulator';

  test('renders PathwaySimulator with nodes', () => {
    render(<PathwaySimulator />);
    expect(screen.getByText(/NODE CHECK MATRIX/i)).toBeInTheDocument();
  });
  ```

- [ ] **Step 2: Run test to verify it fails**
  Run: `pnpm test src/sections/PathwaySimulator.test.tsx`
  Expected: FAIL

- [ ] **Step 3: Implement PathwaySimulator component**
  Create `src/sections/PathwaySimulator.tsx`:
  ```tsx
  import { useState } from 'react';

  interface Pathway {
    name: string;
    description: string;
    path: string;
  }

  const DOMAINS: Pathway[] = [
    { name: 'AI Models', description: 'Deep learning pipeline & fine-tuning architectures.', path: 'INTEGRATION_ARCHITECT' },
    { name: 'Hydrogen Energy', description: 'Clean fuel cells and hydrogen storage operations.', path: 'FRONTIER_SCIENTIST' },
    { name: 'Linguistics', description: 'Advanced structural syntactic matrices and translator pipelines.', path: 'LINGUISTIC_ANALYST' },
    { name: 'Career Strategy', description: 'Global corporate mobility frameworks.', path: 'OPERATIONS_DIRECTOR' }
  ];

  export default function PathwaySimulator() {
    const [selected, setSelected] = useState(0);

    return (
      <section className="relative w-full py-20 bg-[#0B0F14] border-t border-[#7DF9FF]/10 overflow-hidden" id="simulator">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-[#7DF9FF] block mb-3">Interactive Workspace</span>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-[#E6EDF3]">Node Path Simulator</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Domain selectors */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {DOMAINS.map((domain, idx) => (
                <button
                  key={domain.name}
                  onClick={() => setSelected(idx)}
                  className={`w-full text-left p-6 border transition-all duration-300 rounded-none bg-[#0E131A] ${
                    selected === idx
                      ? 'border-[#7DF9FF] shadow-[0_0_15px_rgba(125,249,255,0.08)]'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-1.5 h-1.5 rounded-none ${selected === idx ? 'bg-[#7DF9FF]' : 'bg-white/20'}`} />
                    <span className={`font-mono text-[10px] tracking-wider uppercase ${selected === idx ? 'text-[#7DF9FF]' : 'text-[#8B949E]'}`}>
                      DOMAIN // 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-light text-[#E6EDF3]">{domain.name}</h3>
                  <p className="font-sans text-xs text-[#8B949E] mt-2 leading-relaxed">{domain.description}</p>
                </button>
              ))}
            </div>

            {/* Path visualization */}
            <div className="lg:col-span-7 bg-[#0E131A] border border-[#7DF9FF]/10 p-8 rounded-none flex flex-col justify-between min-h-[350px] relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#7DF9FF]/20" />
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[9px] text-[#8B949E] tracking-wider uppercase">NODE CHECK MATRIX // VISUALIZER</span>
                <span className="font-mono text-[8px] text-[#34c759] flex items-center gap-1 animate-pulse">
                  <span className="w-1 h-1 bg-[#34c759] inline-block" /> ONLINE
                </span>
              </div>

              {/* Dynamic pathway svg */}
              <div className="relative w-full h-[180px] bg-[#0b0f14]/50 border border-white/5 flex items-center justify-center">
                <div className="absolute left-[10%] top-[50%] -translate-y-1/2 w-2 h-2 bg-[#7DF9FF] shadow-[0_0_8px_#7DF9FF]" />
                <div className={`absolute left-[50%] -translate-x-1/2 w-2 h-2 bg-[#7DF9FF] shadow-[0_0_8px_#7DF9FF] transition-all duration-500 ${
                  selected === 0 || selected === 2 ? 'top-[25%]' : 'top-[75%]'
                }`} />
                <div className="absolute right-[10%] top-[50%] -translate-y-1/2 w-2 h-2 bg-[#7DF9FF] shadow-[0_0_8px_#7DF9FF]" />

                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* Dynamic path link */}
                  {selected === 0 || selected === 2 ? (
                    <>
                      <path d="M 50,90 Q 200,45 350,90" fill="none" stroke="#7DF9FF" strokeWidth="1.5" className="path-draw" />
                      <path d="M 350,90 Q 500,45 650,90" fill="none" stroke="#7DF9FF" strokeWidth="1.5" className="path-draw" />
                    </>
                  ) : (
                    <>
                      <path d="M 50,90 Q 200,135 350,90" fill="none" stroke="#7DF9FF" strokeWidth="1.5" className="path-draw" />
                      <path d="M 350,90 Q 500,135 650,90" fill="none" stroke="#7DF9FF" strokeWidth="1.5" className="path-draw" />
                    </>
                  )}
                </svg>
              </div>

              <div className="mt-6 border-t border-white/5 pt-4 flex justify-between items-center">
                <span className="font-mono text-[9px] text-[#8B949E] uppercase">OPTIMIZED PATHWAY</span>
                <span className="font-mono text-xs text-[#7DF9FF] tracking-widest">// {DOMAINS[selected].path}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  ```

- [ ] **Step 4: Run test to verify it passes**
  Run: `pnpm test src/sections/PathwaySimulator.test.tsx`
  Expected: PASS

- [ ] **Step 5: Commit**
  ```bash
  git add src/sections/PathwaySimulator.tsx src/sections/PathwaySimulator.test.tsx
  git commit -m "feat: add interactive PathwaySimulator component with TDD verification"
  ```

---

### Task 4: Integrate Sections into Homepage (`Home.tsx`)

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Modify Home.tsx to include the new sections**
  Update `src/pages/Home.tsx`:
  ```tsx
  import Hero from '../sections/Hero';
  import PartnerMarquee from '../sections/PartnerMarquee';
  import TelemetryStats from '../sections/TelemetryStats';
  import Vision from '../sections/Vision';
  import PathwaySimulator from '../sections/PathwaySimulator';
  import ServicesMatrix from '../sections/ServicesMatrix';
  import PedigreeShowcase from '../sections/PedigreeShowcase';

  export default function Home() {
    return (
      <>
        <Hero />
        <PartnerMarquee />
        <TelemetryStats />
        <Vision />
        <PathwaySimulator />
        <ServicesMatrix />
        <PedigreeShowcase />
      </>
    );
  }
  ```

- [ ] **Step 2: Run verification build and tests**
  Run: `pnpm test` and `tsc -b && vite build`
  Expected: All tests pass, production build completes successfully.

- [ ] **Step 3: Commit**
  ```bash
  git add src/pages/Home.tsx
  git commit -m "feat: integrate TelemetryStats and PathwaySimulator into homepage"
  ```
