# HUD Compliance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Achieve 0 errors and 0 warnings from `pnpm run ui-check` by fixing all rounded corners, missing interactive states, and inline styles across the codebase, then removing legacy file exclusions.

**Architecture:** Batch-fix files by error density (highest first), using simple find-and-replace patterns. All `rounded-full`/`rounded-md`/`rounded-lg` become `rounded-none`. All interactive elements get `hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary` states. Inline styles get moved to Tailwind classes or `/* ui-ignore */` where Tailwind has no equivalent.

**Tech Stack:** Tailwind CSS 3.4, React 19, TypeScript

---

### Task 1: Fix About.tsx (26 errors, 2 warnings)

**Files:** Modify: `app/src/pages/About.tsx`

- [ ] Replace all `rounded-full` with `rounded-none` (timeline nodes, status dots, connection badges, hub labels)
- [ ] Replace all `rounded-lg` with `rounded-none` (visualization containers)
- [ ] Add `hover:text-primary focus:outline-none focus:ring-1 focus:ring-primary` to anchor on line 117
- [ ] Replace `style={{ height: '100%' }}` with `h-full` class (line 389)
- [ ] Run `pnpm run ui-check` and verify About.tsx has 0 errors
- [ ] Commit: `fix(about): achieve full HUD compliance`

### Task 2: Fix Programs.tsx (30 errors, 4 warnings)

**Files:** Modify: `app/src/pages/Programs.tsx`

- [ ] Replace all `rounded-full` with `rounded-none`
- [ ] Replace all `rounded-md` with `rounded-none`
- [ ] Replace inline `style={{ height: '100%' }}` with `h-full`
- [ ] Add interactive states to any flagged elements
- [ ] Run `pnpm run ui-check` and verify Programs.tsx has 0 errors
- [ ] Commit: `fix(programs): achieve full HUD compliance`

### Task 3: Fix Council.tsx (11 errors, 3 warnings)

**Files:** Modify: `app/src/pages/Council.tsx`

- [ ] Replace all `rounded-full` with `rounded-none`
- [ ] Replace all `rounded-md`/`rounded-lg` with `rounded-none`
- [ ] Add interactive states to flagged elements
- [ ] Run `pnpm run ui-check` and verify Council.tsx has 0 errors
- [ ] Commit: `fix(council): achieve full HUD compliance`

### Task 4: Fix SignatureExperiences.tsx (2 errors, 1 warning)

**Files:** Modify: `app/src/pages/SignatureExperiences.tsx`

- [ ] Replace `rounded-full` on lines 221, 223 with `rounded-none`
- [ ] Add interactive states to Link on line 332
- [ ] Run `pnpm run ui-check` and verify 0 errors
- [ ] Commit: `fix(events): achieve full HUD compliance`

### Task 5: Fix ServicesMatrix.tsx (1 error, 1 warning)

**Files:** Modify: `app/src/sections/ServicesMatrix.tsx`

- [ ] Replace `rounded-full` on line 148 with `rounded-none`
- [ ] Add interactive states to Link on line 180
- [ ] Commit: `fix(services): achieve full HUD compliance`

### Task 6: Fix Navigation.tsx (9 warnings)

**Files:** Modify: `app/src/sections/Navigation.tsx`

- [ ] Add hover/focus states to all flagged Link/NavLink elements
- [ ] Commit: `fix(nav): add interactive states for HUD compliance`

### Task 7: Fix remaining warning-only files

**Files:**
- Modify: `app/src/sections/Footer.tsx`
- Modify: `app/src/sections/Hero.tsx`
- Modify: `app/src/components/AIChatAgent.tsx`
- Modify: `app/src/components/DashboardOnboardingTour.tsx`
- Modify: `app/src/components/effects/ImmersiveHero.tsx`
- Modify: `app/src/components/effects/ScrollTextMarquee.tsx`
- Modify: `app/src/pages/Contact.tsx`
- Modify: `app/src/pages/KnowledgeHub.tsx`

- [ ] Add hover/focus states to interactive elements
- [ ] Replace inline styles with Tailwind classes or add `/* ui-ignore */` for dynamic values
- [ ] Commit: `fix(ui): resolve remaining warnings across components`

### Task 8: Fix legacy excluded files

**Files:**
- Modify: `app/src/pages/Dashboard.tsx`
- Modify: `app/src/pages/Guidance.tsx`
- Modify: `app/src/pages/Login.tsx`
- Modify: `app/src/sections/PathwaySimulator.tsx`
- Modify: `app/src/sections/PedigreeShowcase.tsx`
- Modify: `app/src/sections/TelemetryStats.tsx`

- [ ] Replace all rounded classes with `rounded-none`
- [ ] Add interactive states
- [ ] Replace inline styles
- [ ] Commit: `fix(legacy): modernize excluded files to HUD compliance`

### Task 9: Remove exclusions and lock compliance

**Files:** Modify: `app/scripts/check-ui-compliance.js`

- [ ] Remove legacy file exclusions from IGNORE_PATHS
- [ ] Run `pnpm run ui-check` — expect 0 errors, 0 warnings
- [ ] Run `pnpm run build` — expect clean build
- [ ] Commit: `chore: remove legacy exclusions, lock HUD compliance at zero`
