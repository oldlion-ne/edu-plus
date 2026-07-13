# Integrated Nordic Optics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform every EduPlus public, authentication, and staff route into one premium Integrated Nordic Optics design system while preserving the existing application architecture, data workflows, security, and illustration policy.

**Architecture:** Keep the installed Radix/shadcn primitive layer and extend it with semantic surface variants and project-owned composition components. Replace the repeated immersive hero with an editorial hero that supports three deliberate layouts, migrate global and workspace shells onto the same tokens, then clean legacy HUD and general-purpose monospace styling from every touched route.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS 3, Radix/shadcn, Vitest, Testing Library, Supabase, pnpm.

---

### Task 1: Foundation tokens and compliance contracts

**Files:**
- Modify: `app/src/index.css`
- Modify: `app/scripts/check-ui-compliance.js`
- Test: `app/src/design-system-compliance.test.ts`

- [x] **Step 1: Write the failing token contract test**

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

const css = readFileSync(new URL('./index.css', import.meta.url), 'utf8');

describe('Integrated Nordic Optics foundation', () => {
  test('defines semantic surfaces, edges, status colors, and motion', () => {
    for (const token of ['--surface-base', '--surface-raised', '--surface-sunken', '--edge-strong', '--status-success', '--motion-standard']) {
      expect(css).toContain(token);
    }
  });

  test('keeps square geometry and reduced-motion support', () => {
    expect(css).toContain('--radius: 0rem');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
```

- [x] **Step 2: Run the contract test and verify RED**

Run: `pnpm vitest run src/design-system-compliance.test.ts`

Expected: FAIL because the new semantic tokens are absent.

- [x] **Step 3: Add the foundation tokens and utilities**

Define the named surface, edge, status, shadow, layout, and motion variables in both light and dark themes. Add `editorial-container`, `editorial-grid`, `surface-base`, `surface-raised`, `surface-sunken`, `eyebrow`, `display-title`, and `section-title` utilities. Replace the global fade animation with the shared motion tokens and disable nonessential transitions under reduced motion.

- [x] **Step 4: Extend the UI compliance scanner**

Add checks that flag `font-mono` in public pages and workspace copy unless the line contains `ui-ignore`, and flag legacy telemetry/HUD terms including `SYSTEM_`, `UTC_COORD`, `NODE`, `NEXUS`, `MATRIX`, `STREAM`, and `SCAN` in rendered copy.

- [x] **Step 5: Run foundation verification**

Run: `pnpm vitest run src/design-system-compliance.test.ts && pnpm run ui-check`

Expected: token tests pass; the scanner reports the current legacy violations that later tasks remove.

- [x] **Step 6: Commit**

```bash
git add app/src/index.css app/scripts/check-ui-compliance.js app/src/design-system-compliance.test.ts
git commit -m "feat: establish integrated Nordic design tokens"
```

### Task 2: Premium primitive variants

**Files:**
- Modify: `app/src/components/ui/button.tsx`
- Modify: `app/src/components/ui/card.tsx`
- Modify: `app/src/components/ui/badge.tsx`
- Create: `app/src/components/ui/premium-primitives.test.tsx`

- [x] **Step 1: Write failing primitive behavior tests**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardEyebrow } from './card';

describe('premium primitive variants', () => {
  test('exposes raised and semantic button variants', () => {
    render(<><Button variant="raised">Continue</Button><Button variant="success">Published</Button></>);
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveAttribute('data-variant', 'raised');
    expect(screen.getByRole('button', { name: 'Published' })).toHaveAttribute('data-variant', 'success');
  });

  test('exposes material card variants and an eyebrow slot', () => {
    render(<Card variant="raised"><CardEyebrow>Featured</CardEyebrow></Card>);
    expect(screen.getByText('Featured').closest('[data-slot="card"]')).toHaveAttribute('data-variant', 'raised');
  });

  test('exposes non-pill status badges', () => {
    render(<Badge variant="warning">Review</Badge>);
    expect(screen.getByText('Review')).toHaveAttribute('data-variant', 'warning');
  });
});
```

- [x] **Step 2: Run tests and verify RED**

Run: `pnpm vitest run src/components/ui/premium-primitives.test.tsx`

Expected: FAIL because `raised`, `success`, `warning`, and `CardEyebrow` are not implemented.

- [x] **Step 3: Implement square semantic variants**

Remove all `rounded-lg` classes from the three primitives. Add Button variants `raised`, `muted`, `info`, `success`, and `warning`; Card variants `base`, `raised`, `sunken`, and `outline`; Badge variants `info`, `success`, and `warning`. Use only semantic CSS tokens and preserve existing exports and default behavior.

- [x] **Step 4: Run primitive and existing tests**

Run: `pnpm vitest run src/components/ui/premium-primitives.test.tsx src/App.test.tsx`

Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add app/src/components/ui/button.tsx app/src/components/ui/card.tsx app/src/components/ui/badge.tsx app/src/components/ui/premium-primitives.test.tsx
git commit -m "feat: add premium semantic component variants"
```

### Task 3: Editorial and product composition components

**Files:**
- Create: `app/src/components/layout/EditorialHero.tsx`
- Create: `app/src/components/layout/SectionHeader.tsx`
- Create: `app/src/components/layout/WorkspaceHeader.tsx`
- Create: `app/src/components/layout/MetricPanel.tsx`
- Create: `app/src/components/layout/layout-components.test.tsx`
- Delete: `app/src/components/effects/ImmersiveHero.tsx`

- [x] **Step 1: Write failing composition tests**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { EditorialHero } from './EditorialHero';
import { WorkspaceHeader } from './WorkspaceHeader';

describe('composition components', () => {
  test('renders an informative illustration and requested layout', () => {
    render(<EditorialHero eyebrow="Programs" title="Shape your next chapter" description="Choose a pathway." image="/images/CurriculumVisual.webp" imageAlt="East Asian learners collaborating" layout="offset" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Shape your next chapter');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'East Asian learners collaborating');
    expect(screen.getByTestId('editorial-hero')).toHaveAttribute('data-layout', 'offset');
  });

  test('provides a consistent workspace heading contract', () => {
    render(<WorkspaceHeader eyebrow="Operations" title="Overview" description="Current activity." />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Overview');
  });
});
```

- [x] **Step 2: Run tests and verify RED**

Run: `pnpm vitest run src/components/layout/layout-components.test.tsx`

Expected: FAIL because the layout modules do not exist.

- [x] **Step 3: Implement composition contracts**

`EditorialHero` accepts `eyebrow`, `title`, `description`, `image`, `imageAlt`, `layout: 'split' | 'offset' | 'poster'`, optional `actions`, and optional `proof`. It uses a semantic `<header>`, a single `<h1>`, responsive image sizing, no parallax, no telemetry, and no hover scaling. `SectionHeader`, `WorkspaceHeader`, and `MetricPanel` use the shared typography and surface utilities.

- [x] **Step 4: Run layout tests**

Run: `pnpm vitest run src/components/layout/layout-components.test.tsx`

Expected: PASS.

- [x] **Step 5: Commit**

```bash
git add app/src/components/layout app/src/components/effects/ImmersiveHero.tsx
git commit -m "feat: add premium editorial composition system"
```

### Task 4: Global public and authentication shells

**Files:**
- Modify: `app/src/sections/Navigation.tsx`
- Modify: `app/src/sections/Footer.tsx`
- Modify: `app/src/pages/auth/AuthLayout.tsx`
- Modify: `app/src/App.test.tsx`

- [x] **Step 1: Add failing shell assertions**

Add tests that render the app and assert an accessible `Main navigation` label, a `Current` indicator on the active link, a `Start learning` primary action, and an authentication trust region labelled `Built for the East Asian learning community`.

- [x] **Step 2: Run shell tests and verify RED**

Run: `pnpm vitest run src/App.test.tsx`

Expected: FAIL on the new accessible labels and copy.

- [x] **Step 3: Rebuild navigation and footer composition**

Use a 72px square-edged navigation bar, a compact destination set, an overflow `Explore` menu for secondary routes, visible active state, theme control, and one primary action. Rebuild the footer into brand statement, learning, community, and support columns with a concise legal row. Preserve authentication controls and mobile Sheet keyboard behavior.

- [x] **Step 4: Rebuild the authentication shell**

Use a two-region layout at `lg`, with trust copy and `/images/HomeHeroVisual.webp` on the editorial side and a bounded Level 1 form surface on the other. Collapse to a single form column below `lg`. Keep existing form contents and route behavior unchanged.

- [x] **Step 5: Run shell tests**

Run: `pnpm vitest run src/App.test.tsx src/pages/auth/authSchemas.test.ts`

Expected: PASS.

- [x] **Step 6: Commit**

```bash
git add app/src/sections/Navigation.tsx app/src/sections/Footer.tsx app/src/pages/auth/AuthLayout.tsx app/src/App.test.tsx
git commit -m "feat: redesign public and authentication shells"
```

### Task 5: Public route migration

**Files:**
- Modify: `app/src/pages/Home.tsx`
- Modify: `app/src/pages/About.tsx`
- Modify: `app/src/pages/Programs.tsx`
- Modify: `app/src/pages/KnowledgeHub.tsx`
- Modify: `app/src/pages/News.tsx`
- Modify: `app/src/pages/SignatureExperiences.tsx`
- Modify: `app/src/pages/Council.tsx`
- Modify: `app/src/pages/Guidance.tsx`
- Modify: `app/src/pages/Contact.tsx`
- Modify: `app/src/sections/Hero.tsx`
- Modify: `app/src/sections/Vision.tsx`
- Modify: `app/src/sections/TelemetryStats.tsx`
- Create: `app/src/public-route-design.test.tsx`

- [x] **Step 1: Write the failing route-source contract**

```ts
import { readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';

const routes = ['About', 'Programs', 'KnowledgeHub', 'News', 'SignatureExperiences', 'Council', 'Guidance', 'Contact'];

describe('public route design migration', () => {
  test.each(routes)('%s uses the editorial hero without legacy telemetry', (name) => {
    const source = readFileSync(new URL(`./pages/${name}.tsx`, import.meta.url), 'utf8');
    expect(source).toContain('EditorialHero');
    expect(source).not.toMatch(/ImmersiveHero|telemetryLeft|telemetryRight|font-mono|backdrop-blur/);
  });
});
```

- [x] **Step 2: Run the source contract and verify RED**

Run: `pnpm vitest run src/public-route-design.test.tsx`

Expected: FAIL for every route still using the old hero and legacy styling.

- [x] **Step 3: Migrate route heroes with distinct layouts**

Use this exact mapping: About `poster`, Programs `offset`, Knowledge Hub `split`, News `poster`, Events `offset`, Council `split`, Guidance `poster`, Contact `split`. Provide route-specific informative alt text and retain existing images.

- [x] **Step 4: Normalize public typography and materials**

Replace public `font-mono` labels with `eyebrow` or normal sans text. Remove blurred decorative glow nodes and general `backdrop-blur` cards. Convert major content wrappers to `editorial-container`, headings to `SectionHeader` where appropriate, and feature cards to `base` or `raised` material variants. Rename Telemetry Stats rendered language to Community Outcomes and remove technical labels.

- [x] **Step 5: Run public route and existing behavior tests**

Run: `pnpm vitest run src/public-route-design.test.tsx src/sections src/App.test.tsx`

Expected: PASS.

- [x] **Step 6: Commit**

```bash
git add app/src/pages app/src/sections app/src/public-route-design.test.tsx
git commit -m "feat: migrate public routes to editorial composition"
```

### Task 6: Workspace product density

**Files:**
- Modify: `app/src/components/workspace/WorkspaceShell.tsx`
- Modify: `app/src/components/workspace/OverviewModule.tsx`
- Modify: `app/src/components/workspace/ContentModule.tsx`
- Modify: `app/src/components/workspace/InboxModule.tsx`
- Modify: `app/src/components/workspace/KnowledgeModule.tsx`
- Modify: `app/src/components/workspace/PeopleModule.tsx`
- Create: `app/src/components/workspace/workspace-design.test.tsx`

- [x] **Step 1: Write failing workspace design tests**

Test that `OverviewModule` renders the shared `WorkspaceHeader`, five labelled metric regions, and no `Live operations` telemetry copy. Add a source contract asserting the five workspace modules contain no `font-mono` class.

- [x] **Step 2: Run workspace tests and verify RED**

Run: `pnpm vitest run src/components/workspace/workspace-design.test.tsx`

Expected: FAIL because the shared header and accessible metric regions are absent.

- [x] **Step 3: Rebuild the shell and overview**

Use a 272px Level 1 sidebar, clearer active navigation rail, labelled mobile menu, role badge, and a compact top context bar. Replace overview cards with `MetricPanel` and add a responsive recent-work region without fabricated values.

- [x] **Step 4: Normalize workflow modules**

Adopt `WorkspaceHeader` in Content, Inbox, Knowledge, and People. Use Item rows, semantic Badges, raised detail surfaces, consistent empty states, and 44px interactive hit areas. Preserve all Supabase queries and authorization behavior.

- [x] **Step 5: Run workspace and permission tests**

Run: `pnpm vitest run src/components/workspace src/lib/auth/permissions.test.ts src/components/ProtectedRoute.test.tsx`

Expected: PASS.

- [x] **Step 6: Commit**

```bash
git add app/src/components/workspace
git commit -m "feat: elevate workspace information architecture"
```

### Task 7: Illustration audit and integration

**Files:**
- Replace if audit fails: `app/public/images/HomeHeroVisual.webp`
- Replace if audit fails: `app/public/images/AboutCollabVisual.webp`
- Replace if audit fails: `app/public/images/CurriculumVisual.webp`
- Replace if audit fails: `app/public/images/HubVisual.webp`
- Replace if audit fails: `app/public/images/EventsVisual.webp`
- Replace if audit fails: `app/public/images/CouncilVisual.webp`
- Replace if audit fails: `app/public/images/MentorshipVisual.webp`
- Replace if audit fails: `app/public/images/NewsVisual.webp`
- Replace if audit fails: `app/public/images/ContactVisual.webp`
- Create: `app/docs/illustration-audit.md`

- [x] **Step 1: Inventory dimensions, format, and route references**

Run a read-only inventory that records each file's pixel dimensions, file size, and referencing route. Confirm every route uses WebP and an explicit alt description.

- [x] **Step 2: Visually audit every image**

Inspect all nine images at original resolution for East Asian representation, flat/non-realistic rendering, angular geometry, matte shading, text/watermarks, malformed anatomy, and crop safety at desktop and mobile ratios.

- [x] **Step 3: Regenerate only failed scenes**

Use this fixed art direction for any failed scene: “Ultra-clean minimalist modern flat vector illustration; East Asian people only; angular simplified anatomy; straight-edged environmental geometry; matte gradient cel shading; warm candlelight amber side rim light; cool charcoal volumetric shadows; uncluttered solid background; no harsh outline; no photo texture; no realism; no text; no logo; no watermark.” Add route-specific scene content without changing the style contract.

- [x] **Step 4: Re-inspect replacements and write the audit record**

Record a pass/fail row for each image with representation, style, artifacts, and crop checks. Do not integrate a failed replacement.

- [x] **Step 5: Commit**

```bash
git add app/public/images app/docs/illustration-audit.md
git commit -m "art: align route illustrations with Nordic vector system"
```

### Task 8: Cleanup and complete verification

**Files:**
- Delete when unused: `app/src/components/effects/SurfaceCard.tsx`
- Delete when unused: `app/src/components/effects/TypeScramble.tsx`
- Delete when unused: `app/src/components/effects/RandomizedTextEffect.tsx`
- Delete when unused: `app/src/components/effects/ScrollTextMarquee.tsx`
- Modify: `app/README.md`
- Modify: `docs/superpowers/plans/2026-07-13-integrated-nordic-optics.md`

- [x] **Step 1: Locate superseded code and forbidden language**

Run: `rg -n "ImmersiveHero|SurfaceCard|TypeScramble|RandomizedTextEffect|SYSTEM_|UTC_COORD|font-mono|backdrop-blur|rounded-(sm|md|lg|xl|2xl|full)" src`

Expected: no public/workspace violations; remaining monospace or rounded usage must be an explicitly approved technical or third-party primitive case.

- [x] **Step 2: Remove dead components and imports**

Delete only modules with zero imports. Retain technical code presentation components and third-party accessibility internals where removal would break behavior.

- [x] **Step 3: Update project documentation**

Document Integrated Nordic Optics, the two density modes, semantic material variants, illustration rules, pnpm-only workflow, and the five required verification commands.

- [x] **Step 4: Run the complete automated gate**

Run: `pnpm run test:run`

Expected: all tests pass with zero failures.

Run: `pnpm tsc -b`

Expected: exit 0 with no TypeScript errors.

Run: `pnpm run lint`

Expected: zero ESLint errors.

Run: `pnpm run ui-check`

Expected: zero forbidden and zero warning findings.

Run: `pnpm run build`

Expected: production build exits 0.

- [x] **Step 5: Run browser verification**

At 1440×1000 and 390×844, verify `/`, `/about`, `/programs`, `/knowledge-hub`, `/events`, `/council`, `/guidance`, `/news`, `/contact`, `/auth/sign-in`, and the authenticated workspace modules. Check navigation, headings, overflow, focus, image crop, console errors, empty/loading states, and reduced-motion behavior.

- [x] **Step 6: Mark this plan complete and commit**

```bash
git add app/README.md docs/superpowers/plans/2026-07-13-integrated-nordic-optics.md
git commit -m "docs: complete integrated Nordic Optics rollout"
```
