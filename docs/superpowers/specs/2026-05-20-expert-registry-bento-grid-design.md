# Specification: Expert Registry Bento Grid Redesign

**Author:** Antigravity  
**Date:** 2026-05-20  
**Status:** Approved by User  
**Target File:** [PedigreeShowcase.tsx](file:///c:/edu-plus/app/src/sections/PedigreeShowcase.tsx)

---

## 1. Objective and Scope

### Context
The current **Expert Registry / Technical Pedigree** section inside `PedigreeShowcase.tsx` attempts to render a list of 8 global advisors and researchers as a rotating 3D text ring using React Three Fiber (`HolographicTextRing.tsx`). Due to the cylinder mapping and custom noise shader distortion, the text is completely distorted, unreadable, and presents a visual barrier to the user.

### Goal
- Remove the `<HolographicTextRing />` component entirely.
- Delete unused 3D dependencies (`html2canvas`, shader custom materials) from imports if applicable.
- Re-implement the Expert Registry in `PedigreeShowcase.tsx` as a beautiful, high-contrast, fully responsive **Bento Grid of Cybernetic HUD Cards** displaying all 8 advisors with clear typography.
- Ensure all styling strictly adheres to the existing cyberpunk design palette (dark primary `#0B0F14`, neon-cyan `#7DF9FF` accents, subtle grey text, and square borders `rounded-none`).

---

## 2. Target Audience & UX Requirements

1. **Pixel-Perfect Legibility**: All 8 expert profiles must be immediately and easily readable.
2. **Mobile First**: 70% of visitors are mobile users. The layout must display as a 4-column bento grid on large displays, reflow to 2 columns on tablets, and stack into a single column on phones.
3. **Cybernetic HUD Theme**:
   - Thin monochrome borders (`border-[#7DF9FF]/10`).
   - Neon tags for domains (e.g. `// GREEN HYDROGEN`).
   - Monospaced serial tags (`NODE // 01`, `NODE // 02`).
   - Glowing interactive hover animations (a thin top border that lights up in solid cyan `#7DF9FF` and subtle drop shadows on card hover).

---

## 3. Data Schema: The 8 Experts

The registry will represent the following 8 advisors, which were previously embedded in the 3D Holographic code:

| Node | Name | Domain Tag | Short Professional Profile | Core Node Category |
|---|---|---|---|---|
| **01** | Dr. Soram Bobby Singh | `Green Hydrogen` | Principal Scientist leading clean-energy & hydrogen storage architectures. | Research Node |
| **02** | Ms. Geetarani Takhellambam | `Legal Operations` | GM and Head of Legal at Powerica Ltd, specializing in energy governance & compliance. | Corporate Node |
| **03** | Smt. Purnimashi Moirangthem | `Cognitive Development` | Assistant Director leading early childhood cognitive learning and research methodologies. | Cognitive Node |
| **04** | Dr. Ngangbam Shantikumar Meetei | `Advanced Linguistics` | Professor of Advanced Linguistics specializing in structural syntactic frameworks. | Academic Node |
| **05** | Khumukcham Roshaan Singh | `Career Strategy` | Executive Career Strategist designing pathways for global leadership pipelines. | Strategy Node |
| **06** | Shri Romen Ningthoujam | `Social Operations` | Operational Lead at Goonj, driving large-scale humanitarian logistics and systems. | Logistics Node |
| **07** | Smt. Nutan Nongthongbam | `Public Health` | International Public Health Speaker advocating global community healthcare protocols. | Medical Node |
| **08** | Shri Rojit Keisham | `Maritime Logistics` | Professor of Maritime Operations specializing in blue-ocean transport networks. | Transport Node |

---

## 4. Proposed Layout Structure (`PedigreeShowcase.tsx`)

We will replace lines 60-87 of `PedigreeShowcase.tsx` with a typed list mapping over the expert data structure:

```tsx
interface ExpertNode {
  nodeId: string;
  name: string;
  domain: string;
  role: string;
  category: string;
}

const EXPERT_REGISTRY: ExpertNode[] = [
  // List of all 8 experts
];
```

The markup inside the grid will follow:

```tsx
<div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-12">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {EXPERT_REGISTRY.map((expert) => (
      <div 
        key={expert.nodeId}
        className="group relative bg-[#0E131A] border border-[#7DF9FF]/10 p-6 flex flex-col justify-between min-h-[220px] rounded-none transition-all duration-300 hover:border-[#7DF9FF]/40 hover:shadow-[0_4px_20px_rgba(125,249,255,0.08)] hover:-translate-y-0.5"
      >
        {/* Glow Top Accent */}
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
          <span className="font-mono text-[8px] text-[#7DF9FF] tracking-wider group-hover:underline">
            [ PROFILE ]
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
```

---

## 5. Verification Plan

1. **Compilation Check**:
   - Run `pnpm tsc -b` inside the `app` directory to ensure perfect TypeScript typing and compilation.
2. **Build Success**:
   - Run `pnpm run build` in `app` to verify that Rollup, Vite, and PostCSS assemble everything with zero errors.
3. **Responsive Visual Audits**:
   - Ensure the new section fits comfortably next to the rest of the application without overflow or structural issues.
