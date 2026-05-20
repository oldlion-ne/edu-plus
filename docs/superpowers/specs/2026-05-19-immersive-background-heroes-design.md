# Design Specification: Immersive 2026 Cinematic Hero Backgrounds

**Date**: 2026-05-19  
**Status**: Approved (Project Manager Directive)  
**Author**: Antigravity (Google DeepMind Coding Assistant)  
**Topic**: High-fidelity visual pivot from card-bound illustrations to full-bleed, parallax-scrolling top hero banners across all 7 main pages.

---

## 🎨 Design Vision & Aesthetic Direction (2026 Trends)

Based on recent Dribbble, Behance, and Medium design trends, the application is pivoting from modular card illustrations to a **Tactile Cyber-Brutalist Immersive Viewport**. Each of the 7 main routes will start with a full-bleed top hero section, utilizing our high-fidelity custom generated storytelling images as the backdrop.

### 2026 Visual Style Pillars:
1. **Double-Sided Ambient Gradients**: A customized radial and linear gradient overlay ensures the underlying storytelling artwork fades to solid slate-dark (`#0B0F14`) at the bottom, blending seamlessly with the main content while offering ultra-high legibility for foreground elements.
2. **Holographic CRT Scanlines & Dot Matrix**: Faint digital CRT lines (`opacity-4`) and dots are layered over the backgrounds to mimic engineered holographic telemetry monitors, elevating the sci-fi premium look.
3. **Heroic Viewport Typography**: Shifting the main title to viewport-relative typography sizes inside the absolute-positioned text layers.
4. **Scroll-Driven Parallax Depth**: The background image glides slowly behind the viewport, creating physical layered depth as the user scrolls.

---

## 🏗️ Architecture & Component Design

We will introduce a single, highly optimized, reusable React component:

### `<ImmersiveHero>`
* **Path**: `src/components/effects/ImmersiveHero.tsx`
* **Props Interface**:
```typescript
interface ImmersiveHeroProps {
  bgImage: string;            // Path to PNG asset
  category: string;           // Uppercase tiny tracking category tag
  titleNormal: string;        // Non-highlighted heading text
  titleHighlighted: string;   // Glowing cyan highlighted heading text
  description: string;        // Descriptive paragraph copy
  telemetryLeft?: string;     // Left footer telemetry string
  telemetryRight?: string;    // Right footer telemetry string
  children?: React.ReactNode; // Optional child canvas (e.g. HolographicTextRing)
}
```

* **HTML Structure**:
```html
<div class="relative w-full h-[55vh] min-h-[420px] md:h-[60vh] overflow-hidden bg-[#0B0F14] border-b border-[#7DF9FF]/10 select-none group">
  <!-- Parallax Background Image -->
  <img src={bgImage} class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 scale-100 group-hover:scale-[1.03] z-0 pointer-events-none" />

  <!-- Gradient Masking Overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-[#0B0F14]/75 via-[#0B0F14]/30 to-[#0B0F14] z-1" />

  <!-- CRT Scanlines & Dot Matrix Grid -->
  <div class="absolute inset-0 opacity-[0.04] bg-scanlines z-2 pointer-events-none" />

  <!-- Dynamic Child Canvas (e.g. 3D Rings) -->
  {children && <div class="absolute inset-0 z-3">{children}</div>}

  <!-- Foreground Content Block -->
  <div class="relative z-10 w-full h-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col justify-between py-12 md:py-16">
    <div class="space-y-4 max-w-3xl mt-auto md:mt-0">
      <span class="text-xs font-sans font-medium tracking-[0.3em] uppercase text-[#7DF9FF] block">
        {category}
      </span>
      <h1 class="font-heading text-4xl md:text-6xl font-light leading-tight tracking-tight text-[#E6EDF3]">
        {titleNormal} <span class="text-[#7DF9FF] font-medium">{titleHighlighted}</span>
      </h1>
      <p class="text-[#8B949E] text-sm md:text-base max-w-2xl leading-relaxed font-sans">
        {description}
      </p>
    </div>

    <!-- Telemetry Corner Details -->
    <div class="flex justify-between items-end text-[9px] font-mono text-[#8B949E] opacity-50 pt-8 border-t border-white/[0.04]">
      <span>{telemetryLeft || "SYSTEM_ACTIVE_NODES"}</span>
      <span>{telemetryRight || "UTC_COORDINATES_ON"}</span>
    </div>
  </div>
</div>
```

---

## 🗺️ Page Integration Matrix

We will refactor the 7 main routes to replace the previous header text and separate visual card components with `<ImmersiveHero>`:

| Route / File | Background Graphic Path | Header Content | Telemetry & Widgets |
| :--- | :--- | :--- | :--- |
| **About** (`About.tsx`) | `/images/AboutCollabVisual.png` | "Know Who" / "We Are" | `COLLAB_NEXUS // LOCAL_ROOTS // GLOBAL_VAL_NETWORKS` |
| **Programs** (`Programs.tsx`) | `/images/CurriculumVisual.png` | "Future-Ready" / "Programs" | `EXPLORATION_STUDIO // FUTURE_PATHWAYS // SYS_ADMIS_EXPLR` |
| **Guidance** (`Guidance.tsx`) | `/images/MentorshipVisual.png` | "One-to-One" / "Guidance" | `COZY_STUDIO // ADVISORY_DESK // REFLECTIVE_LAB_ON` |
| **Experiences** (`SignatureExperiences.tsx`) | `/images/EventsVisual.png` | "Signature" / "Experiences" | `EXPERIENCE_HALL // GALAXY_BOOTCAMPS // COSMIC_DISPLAY` |
| **Council** (`Council.tsx`) | `/images/CouncilVisual.png` | "Expert" / "Council" | Floating Spinning 3D `HolographicTextRing` widget |
| **News** (`News.tsx`) | `/images/NewsVisual.png` | "News &" / "Insights" | `INSIGHTS_MEDIA // GLOBAL_NEWSROOM // BROADCAST_NET_ACTIVE` |
| **Contact** (`Contact.tsx`) | `/images/ContactVisual.png` | "Contact &" / "Locations" | `OFFICE_PORTAL // WORKSPACE_GATEWAY // LOC_COORD_ONLINE` |

---

## ✅ Quality Assurance & Verification
1. **Compilation Validation**: Ensure TypeScript checks and Vite build (`tsc -b && vite build`) execute with zero errors.
2. **Automated Testing**: Validate that the Vitest test suites continue to pass completely.
3. **Responsive Audits**: Verify layout scaling across mobile viewports, ensuring content never clips or overlaps, even at narrow screen sizes.
