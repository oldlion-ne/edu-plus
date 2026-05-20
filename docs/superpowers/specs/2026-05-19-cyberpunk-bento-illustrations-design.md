# Spec: Cyberpunk Bento & Asian Community Illustrations Integration

**Date**: 2026-05-19  
**Status**: APPROVED  
**Goal**: Elevate the EduPlus Skills web application with state-of-the-art out-of-the-box UI components and premium, high-contrast, cyber-brutalist Asian community illustrations.

---

## 1. Vision & Visual Aesthetic

This design establishes a high-premium, technically dense **Cyber-Brutalist** visual aesthetic. The theme centers on a dark palette with high-contrast neon-cyan and green accents, relying strictly on **straight lines, zero border rounding, and coordinate grid wireframe overlays**. 

The core illustration assets showcase the **Asian community**—specifically representing learners, educators, and innovators in Manipur/Northeast India, Singapore, and Asia globally.

---

## 2. Asian Community Cyberpunk Illustrations

We will generate and integrate three high-fidelity illustrations under `public/assets/` using futuristic, technical parameters. Each illustration will be housed in a linear brutalist frame:

### A. Vision Section Backdrop: `hero_tech_lab.png`
*   **Path**: `public/assets/illustrations/hero_tech_lab.png`
*   **Location**: Integrated into the **About Page** under the description section.
*   **Concept**: A male innovator from Manipur/Northeast India and a female developer from Singapore working on holographic clean energy grids (green hydrogen) and code.
*   **Prompt**: *"A cinematic futuristic cyber-brutalist tech laboratory. Two young Asian innovators (a male from Northeast India/Manipur, a female from Southeast Asia/Singapore) working on advanced holograms and hydrogen energy fuel cells. Highly detailed dark carbon background, glowing neon-cyan telemetry, sharp coordinate grid lines, mathematical formulas and technical wireframe overlays, premium digital concept art, HUD vectors, high-contrast lighting, 16:9 aspect ratio."*

### B. Curriculum Header: `career_matrix_grid.png`
*   **Path**: `public/assets/illustrations/career_matrix_grid.png`
*   **Location**: Embedded on the **Programs Page** as a technical curriculum dashboard asset.
*   **Concept**: An Asian student in Delhi/Singapore analyzing a complex flow map of career streams.
*   **Prompt**: *"A futuristic technical dashboard and grid mapping system. A close-up profile of a young Asian student analyzing a network flow diagram. Cyberpunk interface with neon-cyan nodes, glowing code lines, sharp straight lines, server diagnostic data, high-contrast dark theme, digital vector HUD overlay, extremely premium tech vector aesthetic, 16:9 aspect ratio."*

### C. Guidance Section Header: `guidance_coaching.png`
*   **Path**: `public/assets/illustrations/guidance_coaching.png`
*   **Location**: Integrated inside the **Guidance Page** next to the stakeholder advisory panels.
*   **Concept**: An experienced Asian academic mentor in Singapore guiding a young student, with high-tech HUD diagrams.
*   **Prompt**: *"A high-contrast cyber-brutalist portrait of an experienced Asian academic mentor in Singapore advising a young student. Overlay grid lines, glowing terminal code, sharp digital blueprints, high-tech diagnostic HUD elements, dark background, vivid neon-cyan highlights, flat straight-line graphic borders, extremely premium tech art, 16:9 aspect ratio."*

---

## 3. Innovative UI Component Architectures

We will implement two interactive, out-of-the-box UI features:

### A. The Cyber-Brutalist Bento Grid (`About.tsx`)
Replaces the standard 3-column "What We Stand For" section on the **About Page**:
*   **Layout Structure**:
    *   **Cell 01 (Clarity of Direction)**: Spans two columns (`md:col-span-2`), featuring a larger technical layout, coordinate decorations, and a blinking green active light ("System Status: Online").
    *   **Cell 02 (Access to Opportunity)**: Spans one column (`md:col-span-1`), presenting dynamic percentage graphs and local-to-global path connections.
    *   **Cell 03 (Right Skills at the Right Time)**: Spans three columns (`md:col-span-3`), displaying an interactive horizontal matrix mapping skills to employment fields.
*   **Border Glow-Follow Effect**:
    *   A custom React mouse-tracking hook tracks pointer positions. On hover, a single-pixel neon-cyan border overlay (`border-[#7DF9FF]`) traces the container edges, creating a highly interactive high-tech feedback system.

### B. The Dynamic Log Console / Typing Retro Terminal (`Guidance.tsx`)
A terminal-like console widget rendering custom script logs corresponding to the active stakeholder tab:
*   **Visual Style**:
    *   Carbon-black viewport (`bg-[#0B0F14]/90`), double-walled straight borders (`border border-white/[0.08]`), scanline pixelated overlay.
    *   Vivid green (`text-[#4AF626]`) and neon-cyan (`text-[#7DF9FF]`) log flows.
*   **Tab Interaction Scripts**:
    *   **Students**: Executes `./futurepath-navigator.sh --assess` (types out psychometric analysis, stream recommendation, and curriculum diagnostics).
    *   **Parents**: Executes `./parent-consultation.sh --mitigate` (types out modern academic landscape metrics, mitigation guides, and study plan setups).
    *   **Job Seekers**: Executes `./career-launchpad.sh --region "singapore"` (diagnoses industry skill gaps, profiles resumes, and registers placements).
    *   **Teachers**: Executes `./educator-academy.sh --train` (diagnoses pedagogical benchmarks, e-learning integrations, and class metrics).
*   **Console Mechanics**:
    *   Typing delay typewriter hook, blinking prompt caret (`_`), scrolling output viewports.

---

## 4. Strict Design Rule Enforcement

*   **Global Zero-Radius Boundary**: All UI components, cards, terminal nodes, buttons, search bars, and frames must feature exactly `0px` border rounding (`rounded-none`).
*   **Theme Continuity**: Set `--radius: 0px` globally under `:root` in `src/index.css`.
*   **Illustrations Housing**: Render all images within premium cyber frames featuring double-layered borders and linear padding to complement the styling system.

---

## 5. Technical Verification Strategy

To guarantee codebase robustness:
*   **TypeScript Validation**: Run compiler validation `tsc -b`.
*   **Production Build Compilation**: Execute `pnpm run build` to confirm optimal bundling with zero errors.
*   **Unit Verification**: Run `pnpm run test:run` to confirm all routing and component tests pass.
*   **Static Code Analysis**: Run `pnpm run lint` to guarantee that all styles, hook bindings, and component mappings comply with project-wide guidelines.
