# EduPlus Integrated Nordic Optics Design

## Status and Decision

This specification is approved for implementation under the user's delegated CTO authority. EduPlus will adopt the **Integrated Nordic Optics** direction: a premium, coherent design language that selectively adapts the strongest ideas from the Optics design system without installing a second primitive stack or abandoning the established Nordic Lagom identity.

Optics is a reference for typography, semantic component variants, compound component APIs, material hierarchy, structured grids, and workflow components. It is not a drop-in dependency. EduPlus remains a React 19, Vite, Tailwind CSS 3, Radix/shadcn, Supabase application managed exclusively with pnpm.

## Objectives

1. Make every public and authenticated route feel like one premium product rather than a collection of basic shadcn pages.
2. Replace repetitive centered hero composition with an editorial page system that has intentional rhythm, varied layouts, and clearer narrative hierarchy.
3. Give the workspace greater information density and operational clarity without introducing HUD, cyberpunk, or dashboard-template aesthetics.
4. Upgrade existing primitives before adding new ones, keeping a single Radix-based component stack.
5. Preserve accessible behavior, responsive layouts, application security, and current business workflows.
6. Maintain strict straight-line geometry and the established East Asian flat-vector illustration policy.

## Non-Goals

- Do not install Base UI or copy the Optics registry wholesale.
- Do not migrate the project to Tailwind CSS 4, Next.js, or Bun.
- Do not introduce rounded or squircle geometry, neon effects, glassmorphism, pulsing motion, decorative dot grids, or general-purpose monospace typography.
- Do not add speculative product workflows or replace the existing Supabase architecture.
- Do not use photography, photorealistic rendering, or illustrations depicting non-Asian people.

## Design Principles

### Quiet confidence

The system communicates quality through proportion, typography, alignment, material restraint, and predictable interaction. Decorative effects never compete with content.

### One system, two densities

Public pages use an editorial density with larger type, longer rhythm, and asymmetric composition. Authenticated workspaces use an operational density with compact controls, structured data, and persistent context. Both modes use the same tokens and components.

### Depth without curvature

Depth comes from one-pixel borders, inset top highlights, layered backgrounds, controlled directional shadows, and subtle warm-to-cool gradients. Every container and control remains square.

### Accessible by default

Components preserve semantic HTML, visible focus, keyboard operation, sufficient contrast, meaningful loading and empty states, reduced-motion behavior, and understandable error copy.

## Foundation System

### Color

Retain the current OKLCH warm charcoal, candlelight amber, and warm off-white palette. Expand it with named semantic surface and status tokens rather than hard-coded colors:

- `surface-canvas`: page background.
- `surface-base`: default card and panel.
- `surface-raised`: emphasized interactive or featured surface.
- `surface-sunken`: inset wells, filters, and secondary regions.
- `surface-overlay`: dialogs, menus, and popovers.
- `edge-subtle`, `edge-strong`, and `edge-accent`: hierarchy borders.
- `status-info`, `status-success`, `status-warning`, and `status-danger`, each with foreground and surface companions.

Amber remains the only brand accent. Status colors are functional, muted, and never used as decorative glow.

### Typography

Use Inter Variable for headings and body. Outfit remains an approved alternate only where an existing branded lockup requires it. Remove Merriweather from active page composition.

The responsive type system has four practical tiers:

- Display: `clamp(2.75rem, 7vw, 6.5rem)`, tight leading and tracking, used once per major public page.
- Section: `clamp(2rem, 4vw, 3.75rem)`, used for narrative section headings.
- Product heading: 1.5–2rem, used in workspace route headers and major panels.
- Interface: 0.75–1rem, with uppercase tracking reserved for short labels, not paragraphs.

Line length is limited to approximately 65 characters for prose and 36 characters for large display copy.

### Spacing and layout

Adopt an 8-point spacing rhythm with intentional 4px exceptions for compact control internals. Public content uses a shared maximum width and 12-column editorial grid. Workspace content uses a separate fluid shell with a bounded reading width for forms and full width for tables.

Breakpoints follow content pressure rather than device labels. No page may create horizontal overflow at 320px viewport width.

### Material levels

- Level 0: canvas, no shadow.
- Level 1: bordered base surface with an inset top highlight.
- Level 2: raised interactive surface with a short, low-opacity shadow.
- Level 3: overlay surface with the strongest permitted shadow and explicit backdrop separation.

Only dialogs, menus, popovers, and deliberately featured panels may use Level 3.

### Motion

Motion is limited to opacity, translate, and color. Entrances use 160–320ms durations. Hover and focus transitions use 120–180ms. No scale bounce, pulse, shimmer, glow, text scrambling, or infinite decorative animation. `prefers-reduced-motion` disables nonessential movement.

## Component Architecture

### Existing primitives to upgrade

- **Button:** add `raised`, `muted`, `info`, `success`, `warning`, and `destructive` treatments while retaining consistent height, icon spacing, focus, disabled, and pending states.
- **Card:** add modular header, eyebrow, title, description, action, content, footer, and optional `base`, `raised`, or `sunken` surface treatments.
- **Badge:** provide quiet semantic status variants with readable text and no pill shape.
- **Field/Input/Textarea/Select:** align label, description, validation, leading/trailing actions, and density. Error messages remain adjacent and programmatically associated.
- **Item:** become the standard row primitive for resources, people, messages, settings, and command results.
- **Empty/Skeleton/Alert:** share a consistent feedback grammar and material level.
- **Tabs/Navigation/Menu/Dialog/Sheet:** receive consistent active indicators, keyboard focus, spacing, and surface depth.
- **Table/Chart:** improve density, headers, filtering affordances, responsive containment, and linear chart interpolation.

### New composed patterns

- `EditorialHero`: asymmetric public-page introduction with optional illustration, supporting proof, and primary action.
- `SectionHeader`: shared eyebrow, title, description, and action composition.
- `MetricPanel`: real operational metric with context, trend copy, and optional linear visualization.
- `DataTableToolbar`: search, filters, visible result count, and clear-filter action.
- `WorkspaceHeader`: route title, description, role-aware actions, and breadcrumbs.
- `StatusRail`: compact workflow state summary for content, messages, and ingestion jobs.
- `EditorialGrid`: 12-column composition helper with responsive spans and square intersection marks.
- `ContentCard`: public news, event, program, and knowledge summary with consistent metadata hierarchy.

New patterns compose existing primitives and remain local to the project. New dependencies are permitted only when an equivalent accessible behavior cannot reasonably be composed from installed packages.

## Page Composition

### Global shell

Navigation becomes quieter and more deliberate: compact brand lockup, clear primary destinations, one emphasized action, visible current route, and an accessible mobile panel. The footer becomes a structured closing region with navigation, contact, legal, and a concise brand statement rather than a generic link list.

### Public routes

- **Home:** editorial split hero, credibility strip, program pathways, community proof, featured knowledge and events, and a strong final invitation.
- **About:** mission statement, principles, history, and community model arranged as alternating editorial bands.
- **Programs:** pathway-led discovery with comparison-ready program cards and clear next steps.
- **Knowledge Hub:** searchable editorial library with topic filters, featured resource, and structured resource rows.
- **News:** featured story plus a typographic story index; metadata remains secondary to headlines.
- **Events / Signature Experiences:** featured event, chronological program, capacity status, and accessible registration actions.
- **Council:** role-led governance presentation using initials and metadata, never synthetic portraits.
- **Guidance:** calm decision paths, step-based resources, and contextual support actions.
- **Contact:** direct support routes, expectations, and a concise form inside a bounded Level 1 surface.

Each route receives a distinct composition while retaining the same foundation. Reusing identical full-bleed hero overlays is forbidden.

### Authentication

Authentication uses a two-region editorial layout on large screens and a focused single column on small screens. Forms prioritize trust, recovery, validation, and a clear return path. Decorative illustration never reduces form contrast.

### Workspace

The workspace shell uses persistent navigation on wide screens and a compact accessible drawer on narrow screens. Each route has one `WorkspaceHeader`, a contextual status region, and content organized by task rather than decorative cards.

- Overview surfaces first-party metrics, recent work, and next actions.
- Content uses a searchable/filterable table or structured list with explicit publication status.
- Inbox prioritizes assignment, status, priority, and internal notes.
- Knowledge exposes sources, ingestion status, entries, and failures without fabricated analytics.
- People emphasizes role, access level, and safe administrative actions.

## Illustration Direction

All human scenes depict East Asian people only. The approved visual language is ultra-clean minimalist flat vector art with angular simplified anatomy, matte gradient cel shading, candlelight amber rim light, cool charcoal shadows, uncluttered backgrounds, and no harsh outlines.

Illustrations use fixed compositions and straight-edged environmental geometry. They contain no text, watermark, logo, photographic texture, realistic skin rendering, or ambiguous realistic portrait treatment. Existing generated assets may be retained only if a fresh visual audit confirms representation, non-realism, page fit, and artifact-free rendering. Any replacement follows the same nine-scene route inventory established by the platform hardening specification.

## Responsive and Accessibility Requirements

- Every interactive target is at least 44×44 CSS pixels where practical, with compact desktop controls retaining an equivalent accessible hit area.
- Keyboard focus is always visible and never removed without a replacement.
- Navigation, dialogs, menus, tabs, forms, tables, and live feedback preserve correct semantics and announcements.
- Tables have a narrow-screen strategy: contained horizontal scrolling, selective column reduction, or transformation into labeled item rows.
- Images include meaningful alt text when informative and empty alt text when decorative.
- Color is never the sole carrier of status.
- Reduced-motion and high-contrast user preferences remain usable.

## Migration Strategy

Implementation proceeds in independently testable slices:

1. Add foundation tokens, layout utilities, motion rules, and compliance checks.
2. Upgrade core primitives with tests for variants, states, and accessibility contracts.
3. Add composed page and workspace patterns.
4. Migrate the global navigation, footer, authentication shell, and public routes.
5. Migrate workspace routes and data-heavy states.
6. Audit, regenerate where needed, and integrate route illustrations.
7. Remove superseded effects, duplicate patterns, dead dependencies, and stale HUD terminology.

The application must remain runnable after every slice. Existing business logic, security rules, and data contracts are not rewritten merely for visual consistency.

## Verification and Acceptance

Acceptance requires all of the following:

- Automated component and route tests cover new behavior and important accessibility contracts.
- `pnpm run test:run` passes with zero failures.
- `pnpm tsc -b` passes.
- `pnpm run lint` has zero errors.
- `pnpm run ui-check` reports zero forbidden rounded, curved, glow, pulse, HUD, and representation violations.
- `pnpm run build` succeeds.
- Browser verification covers every public route, authentication, and each workspace module at desktop and narrow mobile widths.
- No tested route logs an unexpected browser console error.
- Visual review confirms consistent hierarchy, readable contrast, straight geometry, restrained motion, and no repetitive hero treatment.
- Illustration review confirms flat/non-realistic rendering and East Asian representation for every depicted person.
- The final diff contains no accidental Bun, npm, Base UI, Tailwind 4, or unrelated infrastructure migration.

## Reference Boundary

Optics references used for this design are its public [design-system documentation](https://optics.agusmayol.com.ar/), [machine-readable documentation index](https://optics.agusmayol.com.ar/llms.txt), and [source repository](https://github.com/agusmayol/optics). EduPlus adapts concepts from those references under its own constraints; it does not claim registry-level compatibility.
