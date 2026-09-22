# EduPlus Project Enhancement Assessment

**Assessment date:** 22 September 2026  
**Status:** Documentation-only assessment; recommendations are not implemented  
**Primary input:** `C:\Users\rtf70\Downloads\eduplus-ui-audit-and-redesign-plan.md`, supplied as the AuditPlus report  
**Companion backlog:** [EduPlus Project Enhancement Tasks](./eduplus-project-enhancement-tasks.md)

## Contents

1. Executive summary
2. Scope, evidence, and confidence
3. Design context and audit reconciliation
4. Detailed category analysis
5. Page-level enhancement opportunities
6. Strengths and weaknesses
7. Risk-ranked recommendation register
8. Delivery strategy and release criteria
9. Outstanding decisions and evidence index

---

## 1. Executive summary

### Overall conclusion

EduPlus has a recognizable Nordic Lagom identity and meaningful engineering foundations, but implementation and governance are inconsistent. The supplied audit correctly prioritizes public-theme alignment, readable controls, cleaner surfaces, reduced ornament, and a task-oriented learner experience. Its recommendations should be treated as a **migration and consolidation plan**, not authorization to rebuild an absent design system: the repository already contains semantic theme tokens, Radix-based primitives, mobile navigation, application navigation, form feedback, route-level code splitting, and CI.

A focused, read-only source review also identified engineering concerns beyond the screenshot audit. These must be addressed alongside, and sometimes before, visual redesign.

### Most important findings

1. **Potential AI credential exposure requires immediate containment review.** `app/vite.config.ts` injects `OPENROUTER_API` into a browser-visible variable, and `src/lib/openRouter.ts` sends that value directly from the browser. The code path is verified; whether a live credential was supplied to a published build is unknown. If it was, assume that credential was public and rotate it after disabling the exposure path. This is a P0 release concern, not evidence of a confirmed compromise.
2. **Authorization assurance is incomplete.** The client restores simulated identities and roles from local storage, while `ProtectedRoute` skips its MFA assurance check for simulated sessions. Registration also submits a client-selected role. These facts do not prove server-side privilege escalation: deployed database policies, function permissions, and production demo isolation were not tested. They do justify a P0 authorization verification gate.
3. **Public pages default to dark mode despite the documented public-light requirement.** `app/index.html` starts with `class="dark"` and only removes it for a stored light preference. Day and Night tokens already exist. Fix initialization, contextual defaults, and preference precedence rather than introducing another theme system.
4. **Accessibility risks extend beyond visual polish.** The viewport requests disabled user scaling; CSS and the application shell constrain scrolling; several controls and labels are small. Contrast ratios, keyboard behavior, and real-device zoom remain unmeasured. The newsletter email input has no visible or explicit accessible label in the inspected markup.
5. **The glyph issue is chiefly placement and scope, not proven duplicate instances.** One fixed, full-viewport `GlyphMatrix` is mounted in the public/LMS shell. Its custom canvas animation has no reduced-motion branch in the inspected component. This can explain recurring pattern in screenshots without multiple instances.
6. **Learner progress and certificate claims need a product trust boundary.** Progress uses one browser-wide storage key, and the learner hub assembles certificate details on the client. That can be acceptable for an explicitly local demonstration, but is not authoritative evidence of authenticated enrollment or verified completion.
7. **Existing checks need to be made trustworthy.** CI runs lint, CSS lint, type checking, UI compliance, unit tests, and build. However, the compliance script still approves legacy neon colors and excludes the entire UI primitive directory. The E2E smoke file references `/resources`, which is not registered in the inspected route table; E2E is not invoked by the inspected CI workflow.

### Recommended investment sequence

- **Immediately:** review and contain the AI credential path; verify production authorization and demo isolation.
- **Foundation:** record a clean baseline, audit dependency compatibility, restore zoom, reconcile design rules, normalize tokens and shared primitives, repair enforcement checks.
- **Pilot:** migrate Programs end-to-end, with both themes, accessible states, real content, and approved screenshots.
- **Rollout:** Pricing, Contact/Login, learner shell, resource/editorial pages, Events, Council, Guidance, then About/Home.
- **Release:** require security assurance, functional state coverage, responsive/accessibility evidence, regression checks, and measured performance. Do not equate a visually improved page with a production-ready product.

The backlog contains **30 recommendations/tasks: 2 critical, 18 high, 8 medium, and 2 low priority**. These are work packages, not counts of confirmed defects. No numerical health score is assigned because screenshots, runtime results, coverage metrics, and production security evidence are incomplete.

---

## 2. Scope, evidence, and confidence

### 2.1 What was reviewed

- The complete supplied audit, including its cross-site findings, component guidance, page review, implementation phases, acceptance criteria, and references.
- Project guidance in `AGENTS.md`, product context in `PRODUCT.md`, and the design specification in `DESIGN.md`.
- Selected current working-tree source: application routes, theme initialization and CSS, primitive configuration and selected components, authentication, contact handling, learner state, canvas ornament, email/admin functions, package manifest and lockfile header, build configuration, CI, and E2E smoke tests.

This is **not** an exhaustive security audit, penetration test, dependency vulnerability scan, browser accessibility assessment, or performance benchmark.

### 2.2 Evidence labels

| Label | Meaning | Permitted conclusion |
|---|---|---|
| **V — Source-verified** | Directly visible in the inspected local source/configuration | The implementation pattern exists in this working tree; runtime consequences may still need testing |
| **A — Audit-reported** | Described in the supplied screenshot audit | The earlier reviewer reported it; screenshots were not independently re-inspected in this assessment |
| **H — Hypothesis / assurance gap** | Plausible consequence or missing evidence | Validate before describing it as an operational defect, vulnerability, or performance failure |
| **D — Documented requirement** | Explicit project guidance or product/design specification | A target or constraint, not proof of implementation |

### 2.3 Limits and preservation of existing work

No application code, configuration, dependency files, or existing source edits were changed. No build, lint, test, dependency audit, browser session, production API call, or deployment was executed. No secret values or environment-file contents were inspected.

At the start of the review, the working tree already contained edits in `LearningPathOptimizer.tsx`, `lms/StudyScheduler.tsx`, `ui/dialog.tsx`, `ui/select.tsx`, `data/lmsCurriculumData.ts`, `index.css`, `lib/curriculumGraph.ts`, and `pages/LmsHub.tsx`. Findings refer to that working tree, not a verified release commit. Recheck affected findings after those edits are finalized. Line ranges in the evidence index are review-time navigation aids, not permanent identifiers.

The original audit explicitly had no repository source. Its proposed filenames and component contracts therefore require mapping before implementation. Its statement about “all five quality commands/checks” is ambiguous: the displayed standard block has four commands. This assessment names the actual project scripts individually rather than inheriting that count.

---

## 3. Design context and audit reconciliation

### 3.1 Established design context

- **Audience:** `PRODUCT.md` identifies learners and educators; the audit additionally covers public information-seeking and inquiry/booking journeys. Exact learner access and credential requirements need product confirmation.
- **Primary jobs:** discover programs, compare offerings, inquire or book guidance, find resources, resume learning, understand progress, and administer relevant content/users.
- **Brand:** clean, balanced, quietly confident Nordic Lagom; editorial warmth rather than technical spectacle.
- **Visual constraints:** paper/ink public default, charcoal/ink admin default, Ochre/Fjord/Moss/Clay accents, Fraunces headings, Instrument Sans body/UI, IBM Plex Mono for short data labels, zero radii, straight-line geometry, restrained state-first motion.
- **Imagery:** retain the documented East Asian representation requirement and warm illustration treatment. Validate approval, accuracy, permissions, and alternative text; do not substitute decorative images for actual council-member identity.

The audit extends Nordic Night to learner routes. `AGENTS.md` explicitly names admin rather than all authenticated routes. Adopt the learner-night direction provisionally and record product approval; authentication alone should not silently decide theme behavior.

### 3.2 What the source changes about the audit

| Original audit statement | Current evidence | Resulting decision |
|---|---|---|
| Public surfaces are effectively Nordic Night | **V:** dark HTML initialization; Day and Night CSS tokens already exist [E03–E04] | Correct contextual default and precedence; do not recreate tokens from scratch |
| Controls do not share a grammar | **V:** Button variants/sizes, compositional Card, Field, Sidebar, Tabs and other primitives exist [E05–E06] | Normalize contracts and route-level overrides; avoid duplicate primitives |
| Mobile strategy is not visible | **V:** desktop NavigationMenu and mobile Sheet exist [E07] | Test and refine them, rather than create a second navigation implementation |
| Forms lack represented loading/error/success states | **V:** Contact has pending state, timeouts, toasts and confirmation panels [E11] | Complete field-level association, persistence and failure semantics; preserve working feedback |
| Learner dashboard needs an application shell | **V:** `/dashboard` already uses Sidebar; `/lms` remains under the public shell [E02, E13] | Distinguish administrative dashboard from learner hub before redesign |
| Repeated chat tiles suggest multiple controls | **V:** App conditionally mounts one chat component; that component has a named trigger [E02, E19] | Test fixed-position screenshot behavior and collisions; do not assume duplicate mounts |
| Repeated glyphs suggest page-level duplication | **V:** one global matrix spans the shell [E02, E08] | Restrict its visible scope and runtime lifetime; inspect any additional usages during inventory |
| Quality infrastructure needs adding | **V:** unit tests, smoke E2E, token tests and CI already exist [E16–E18] | Repair gaps and add missing assertions to existing infrastructure |
| React Hook Form/Zod may need introducing | **V:** both, plus resolvers, are declared dependencies [E06] | Reuse them where appropriate; no redundant form/schema library |

### 3.3 Rules requiring reconciliation before implementation

1. **Priority is not aesthetic dissatisfaction.** The audit labels public-theme mismatch P0. Here it is P1: important but not evidence of catastrophic failure. P0 is reserved for credential exposure and authorization assurance affecting release safety.
2. **Contrast must be measured.** Small or muted-looking text is not proof of a numerical WCAG failure. Assess rendered foreground/background combinations, alpha blending, states, images, and both themes.
3. **44px is a product target, not the universal AA minimum.** Use a 44×44 CSS-pixel effective target for standalone touch controls where practical. WCAG 2.2 AA Target Size (Minimum) has a 24×24 baseline with exceptions; the 44×44 enhanced criterion is AAA. Do not report all sub-44px controls as automatic AA failures.
4. **Existing styling contracts take precedence over examples.** The manifest declares Tailwind 3.4.19 and shadcn 4.7.0; the configured style is `radix-mira`. Validate generated selectors, utilities, primitive APIs and CSS imports against this installed combination. Do not run initialization or a wholesale “latest” upgrade.
5. **Spacing/elevation differences need a decision.** `DESIGN.md` specifies a 4px/8pt rhythm, 96/128px public rhythm and three surface levels. The audit proposes a broader Tailwind scale, roughly 64/96px sections and at most two elevations. Distinguish tonal surface steps from floating-layer elevation, then record one authority.
6. **Correct the geometry scanner specification.** SVG validation must recognize both cases of all curve commands, including `T/t`, and non-path curved primitives such as circles/ellipses and rounded rectangles. Straight paths still need move commands (`M/m`). Do not use a simple uppercase-letter scan over entire files. Standard easing curves are temporal controls, not decorative SVG geometry.
7. **Do not indiscriminately outlaw alpha or native elements.** Semantic-token alpha may be appropriate for decoration; it must not compromise essential text/control contrast. Native buttons/anchors remain correct when used semantically and styled through shared contracts. Decorative asset colors may require narrow, documented exceptions.

---

## 4. Detailed category analysis

### 4.1 Security, authentication, and authorization

**Coverage:** largely absent from the screenshot audit; source review reveals concrete trust-boundary concerns. **Overall residual risk: potentially critical, with deployment exposure unverified.**

**Verified findings**

- `vite.config.ts:28–30` defines a browser variable from `OPENROUTER_API`. `openRouter.ts:8–26` reads it and sends a direct authenticated request to the provider. `AIChatAgent.tsx` imports and invokes this helper [E09]. If a real key is configured during a published build, it is not a server secret.
- `AuthContext.tsx:128–142` trusts a cached simulated user/role before normal session initialization; `232–244` creates such sessions. `ProtectedRoute.tsx:16–20` bypasses its assurance check for simulated sessions [E10].
- `AuthContext.tsx:209–218` submits a caller-selected role to `user_roles`. Safety depends on server policy/constraints; client UI restrictions cannot establish privilege boundaries.
- The inspected admin action function verifies a user and an admin role before creating a server-side service-role client [E12]. This is a positive boundary, not proof that every endpoint and database operation is protected.

**Unknowns and risk implications**

Deployed RLS policies, storage rules, function grants, `get_my_role` definition/search path, JWT enforcement, MFA requirements, and production build contents were not verified. An anonymous Supabase public key is not itself a leaked service credential. Likewise, access to simulated dashboard UI is not proof of access to protected server data. However, role escalation, cross-user data exposure, and administrative endpoint misuse must be ruled out with direct server-side negative tests.

**Recommendations:** R01 moves provider calls behind a server-controlled boundary and adds quotas/validation; R02 isolates simulations, constrains role assignment, versions authorization policies, and verifies fail-closed behavior for anonymous, expired, wrong-role, and cross-user requests. Treat missing production authorization evidence as a release gate rather than inventing a confirmed exploit.

### 4.2 Privacy, submissions, and operational integrity

**Coverage:** the audit addresses form appearance but not the end-to-end data contract. **Residual risk: high.**

Contact performs a database insertion and an email-function call separately [E11]. A successful insert followed by a network failure can produce an error prompting the user to retry an already-saved inquiry. A non-success email HTTP response is logged but can still lead to a success message. These states require distinct semantics and idempotency, not only improved styling.

The contact form captures `marketingConsent`, but its shown database/email payloads omit that field. The newsletter insertion sends only an email address despite a required consent checkbox. Newsletter email and consent are logged to the browser console. This establishes a missing consent record in the inspected submission paths; it does not establish what downstream systems store or a specific legal violation.

The email function keeps its provider key server-side, escapes user-controlled HTML, and limits some field lengths [E12]. It uses an origin allowlist but has no application-level rate limiter in the inspected handler. An origin check/CORS is not an abuse-control boundary for non-browser callers. Platform-level protections remain unknown.

**Recommendations:** R05 defines one validated submission contract, idempotency and notification status, rate/size controls, privacy-aware logs, consent purpose/version/time, and retention/deletion ownership. Keep optional promotional consent separate from the ability to submit an inquiry. Validate the newsletter's requested communication channels against its actual purpose. R11/R16 make the resulting states accessible and accurate.

### 4.3 Performance and resource efficiency

**Coverage:** visual density is reported; runtime performance was not measured. **Residual risk: medium, confidence in severity low until profiling.**

**Strengths:** route modules use `lazy`/`Suspense`; build configuration separates chart, Supabase and UI chunks and excludes the inspector plugin outside development [E02, E15]. The application includes consent-gated speed/analytics components.

**Opportunities:**

- The global glyph canvas schedules animation frames and redraws the grid at its configured interval, including areas where ornament does not support the task. It scales with viewport dimensions and device pixel ratio. Its own effect has cleanup, but no reduced-motion or visibility stop condition is present [E08].
- The shared public shell imports chat eagerly and mounts the LMS progress provider, which imports curriculum data, even for public marketing routes [E02, E14]. These are candidates for import-graph analysis, not proof of a large initial bundle.
- The vendor catch-all may pull unrelated libraries together depending on the resolved graph. Merely increasing `chunkSizeWarningLimit` to 600 does not improve load performance [E15].
- `index.html` requests legacy Merriweather/Outfit fonts as well as the three approved families [E03]. Confirm actual use before removing font assets or dependencies.
- Package presence and repository asset counts do not equal downloaded bytes. Trace real network requests, image dimensions/decoding, critical fonts, route chunks, and long tasks.

**Recommendations:** R21 establishes reproducible route/device measurements and budgets; R13 confines/stops ornament; R22 optimizes only measured contributors. Proposed field targets are LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile, reported separately for mobile/desktop. These are acceptance targets, not current results. Establish practical lab proxies if production traffic is insufficient; never substitute a synthetic interaction score for field INP.

### 4.4 Accessibility and responsive behavior

**Coverage:** a central strength of the source audit, but its visual observations need runtime verification. **Residual risk: high.**

- **V:** `index.html:13` requests `maximum-scale=1.0` and `user-scalable=no`. Restore user scaling and test supported devices; browser enforcement varies.
- **V:** root CSS locks document scrolling; App owns nested scrolling and touch-action rules [E02–E04]. This may be intentional, but keyboard scrolling, focus reveal, hash links, zoom, virtual keyboards, and modal scroll locking must be tested together.
- **V:** Button sizes range from 24px to 44px visual heights; Contact uses small mono labels and route-specific focus overrides [E05, E11]. Effective hit area and rendered focus visibility are not established by source classes alone.
- **V:** the newsletter email field has no explicit `id`/label or `aria-label` in the inspected markup [E11]. Its placeholder is not an adequate durable label.
- **V:** the application sets `MotionConfig reducedMotion="user"`, but that does not automatically stop the independent canvas loop, CSS animations, or arbitrary Web Animations API calls [E02, E08].
- **A/H:** low contrast, tiny metadata, pricing-table compression and fixed-chat interference require browser confirmation.

**Recommendations:** R07 restores scaling/reflow; R09 measures theme pairs; R10/R11 standardize effective target sizes, native semantics, accessible names, error association, focus and state; R12 addresses navigation, focus and scroll; R19 validates the integrated experience.

**Acceptance baseline:** normal text contrast ≥4.5:1; qualifying large text ≥3:1; essential UI boundaries/state indicators ≥3:1 where applicable. Verify 200% text enlargement and 320 CSS-pixel reflow, with justified exceptions for intrinsically two-dimensional tables. Capture normal-width visuals at 375, 768, 1280 and 1440px. Test keyboard-only use, visible/unobscured focus, screen-reader announcements, modal entry/return, reduced motion and safe areas. These checks support WCAG 2.2 AA; they are not a complete conformance certification by themselves.

### 4.5 Visual design, typography, and design-system consistency

**Coverage:** strongest part of the supplied audit. **Residual risk: high for usability/coherence, not a security risk.**

Day/Night semantic colors and approved font variables exist [E04]. The primary problem is inconsistent use, initialization, component anatomy, and the mixture of earlier design patterns with current rules. The global matrix confirms the audit's concern about persistent ornament. The audit-reported repeated split heroes, sparse resource grid and weak pricing comparison remain useful design hypotheses.

`Button` already supports the six principal variants and multiple sizes; it also applies active scaling and broad transitions. `Card` has standard subcomponents but uses local padding rather than the proposed spacing contract. Some rounded utilities in Card resolve through `--radius`; they cannot all be declared visibly curved. Conversely, `tailwind.config.js` explicitly defines `xl` as radius plus 4px, so setting the base radius to zero does not eliminate every possible nonzero radius [E05].

**Recommendations:** R08 resolves authority and contracts; R09 fixes contextual theme behavior, measured color pairs, complete status tokens and derived radii; R10 normalizes primitives in place; R13 limits ornament and state motion; R14 proves the system on Programs. Preserve brand distinctiveness through typography, content and restrained imagery rather than adding decorative effects.

### 4.6 Code quality and maintainability

**Coverage:** the screenshot audit inferred bespoke styling; source inspection supports targeted consolidation, not blanket claims of poor code. **Residual risk: high where incorrect enforcement perpetuates drift.**

- TypeScript, reusable primitives, aliases, tests and shared layouts are meaningful foundations.
- Contact mixes rendering, REST submission, notification orchestration, consent state and errors in one module. Authentication mixes SDK calls, manual REST fallback, local storage, simulation and timeout/retry coordination [E10–E11]. These are candidates for typed boundary separation, not a framework rewrite.
- Inspected files include `any` and unchecked role casts. Validate external data at trust boundaries and use typed domain results rather than treating every string as an authorized role.
- The UI compliance checker exempts primitives, accepts legacy neon colors, scans interactivity line-by-line, and looks for `focus:` rather than understanding `focus-visible:` or composed props [E17]. It can generate false confidence and false positives.
- Existing effect/component filenames are not proof that prohibited effects are rendered. Map imports and runtime usage before removing code.

**Recommendations:** R18 consolidates error/data boundary behavior; R20 repairs enforcement with semantic/AST-aware checks or narrowly tested rules; R10/R11 document ownership and reuse. Restrict abstractions to repeated domain behavior and preserve native elements where they are correct.

### 4.7 Dependencies, tooling, and supply-chain assurance

**Coverage:** absent from the screenshot evidence apart from suggested shadcn commands. **Residual risk: unknown until dependency/security checks; operational priority high.**

The manifest declares React 19.2.0, Vite 7.2.4, Tailwind 3.4.19, shadcn 4.7.0, React Hook Form 7.70.0 and Zod 4.3.5 [E06]. These are local declared versions, not assertions about the newest or safest releases. A pnpm v9 lockfile exists; no full transitive or advisory analysis was performed.

Both `radix-ui` and individual `@radix-ui/*` packages are declared. Both `motion` and `framer-motion` are declared. Several font/icon libraries are present. These may be legitimate overlapping import surfaces; do not label them duplicate shipped bytes without a resolved dependency/import graph.

The CSS/configuration includes shadcn styling imports and newer-looking selector conventions alongside Tailwind 3. Validate compatibility on the pinned stack rather than asserting failure or upgrading blindly. CI specifies Node 20 and pnpm 9, while the manifest does not declare an `engines` or `packageManager` contract. Runtime compatibility and supported patch versions need an explicit check.

**Recommendations:** R04 inventories resolved versions, peer/engine compatibility, unused imports, licenses and advisories; pins a reproducible toolchain; reviews the Deno function dependency graph separately; and defines a tested, incremental update policy. Reuse existing primitives and form libraries. Do not rerun shadcn initialization or execute a bulk install from the audit as a default migration step.

### 4.8 Architecture, routing, and learner data integrity

**Coverage:** the audit identifies a learner-shell problem; repository evidence reveals distinct public, LMS and administrative concerns. **Residual risk: high.**

`/dashboard` has a dedicated branch, `ProtectedRoute`, and an existing Sidebar composition. `/lms` and track-detail pages retain public navigation/footer, while lesson/quiz paths suppress them through pathname checks. LMS routes are not wrapped in `ProtectedRoute` in the inspected route table [E02, E13]. This may be intentional public learning, not necessarily an access-control flaw. Document public, authenticated, paid, administrative and demo access rules before changing behavior.

`LmsProgressProvider` persists under `eduplus_lms_progress`, without user scoping in the inspected implementation. It accepts partially validated saved data, tolerates storage failure silently, and computes completion client-side [E14]. Shared devices, account switching, corrupted storage and cross-device learning therefore need explicit treatment. The hub's client-generated certificate data must not be represented as independently verified credentials without server-side issuance/verification.

App has Suspense fallbacks but no route error boundary or catch-all route in the inspected route composition. Unknown routes, failed dynamic imports and bad curriculum identifiers need intentional recovery.

**Recommendations:** R02 establishes access authority; R06 defines learner persistence and credential truth; R12 creates explicit layout boundaries while reusing the existing admin shell; R17 improves learner task hierarchy; R18 adds route/data recovery. Do not introduce microservices or a global-state replacement merely to solve a layout issue.

### 4.9 Functional UX, content, and information architecture

**Coverage:** the supplied audit provides useful page-specific direction. **Residual risk: medium to high depending on the blocked journey.**

The most valuable UX improvements are clearer decisions and complete states, not uniformly larger cards. Programs should communicate outcomes; Pricing should support comparison; resources should explain sparse/no-result states; Contact should distinguish saved inquiries from notification failure; the learner hub should prioritize the next lesson over catalog repetition.

Use tabs only for genuine tab panels, links for navigation, and radio/filter semantics where selecting a query parameter is the real interaction. Maintain shareable URLs and back-button behavior where product needs them. Interactive cards must avoid nested conflicting links/buttons. Council identity content must be approved and recognizable rather than resemble loading skeletons.

**Recommendations:** R14–R17 and R23–R27 cover route migration. R28 reviews content hierarchy, metadata, dates/statuses, meaningful alt text and localization readiness. Avoid treating “award-caliber” aesthetics or conversion improvement as guaranteed outcomes; test task completion and clarity.

### 4.10 Testing, CI, observability, and release governance

**Coverage:** the audit describes a sound target, while source shows a partial existing pipeline. **Residual risk: high for regressions.**

CI already runs six explicit quality checks in `app/`: ESLint, Stylelint, TypeScript, UI compliance, unit tests and build [E16]. Their current results are unknown. Test files exist for authentication, routes, editorial components and tokens; existence is not coverage or passing status.

The E2E file visits `/resources`, absent from the inspected route table, and uses `networkidle` waits and basic visibility assertions [E18]. This suggests stale route expectations and nondeterminism, not a verified failing run. CI does not run E2E or a dependency/advisory check in the inspected workflow. No screenshot-diff assertion appears in the inspected smoke suite.

The application gates analytics and speed insights on a consent flag, which is a useful privacy foundation [E02]. Verify actual consent withdrawal, any third-party requests outside those components, and redaction/retention rather than assuming complete privacy compliance.

**Recommendations:** R03 records the real baseline; R19 adds realistic deterministic state/visual/accessibility journeys and CI evidence; R20 repairs the compliance oracle; R21 adds measured performance; R30 assigns continuing ownership and exception expiry. Keep error reporting free of credentials, form content and unnecessary personal data.

---

## 5. Page-level enhancement opportunities

File paths below are actual route mappings, not new component creation instructions. Unless specifically cited elsewhere, visual defects in this table remain **audit-reported** until screenshots and runtime states are revalidated.

| Route / current module | Main opportunity | Acceptance direction | Recommendation |
|---|---|---|---|
| `/programs` — `app/src/pages/Programs.tsx` | Prove a calm hero, program selector, outcomes and action grammar | Accessible selector; useful panel density; mobile equivalent; no essential content behind ornament | R14 |
| `/pricing` — `pages/Pricing.tsx` | Comparable tiers and a readable feature matrix | Aligned actions without fixed-height clipping; one featured tier; intentional narrow-table behavior | R15 |
| `/contact` — `pages/Contact.tsx` | Durable field states and truthful submission feedback | Labels/errors associated; retained input on failure; idempotent save/notification behavior; recorded consent | R05, R11, R16 |
| `/login` — `pages/Login.tsx` | Quiet task-focused authentication | Password/recovery/MFA/error states verified without weakening authentication; responsive layout | R02, R11, R16 |
| `/knowledge-hub` — `pages/KnowledgeHub.tsx` | Cohesive search/filter/result experience | Result count and zero/one/many/error/loading states; resource-density decisions match actual content | R23 |
| `/news` and `/news/:slug` — `pages/News.tsx` | Editorial hierarchy and detail-route behavior | Date/category clarity; valid and missing slug handling; explicit card focus; consistent images | R18, R23 |
| `/events` — `pages/SignatureExperiences.tsx` | Date/status/action hierarchy and compact FAQ | Textual status, meaningful ordering, expired/empty states, keyboard-operable accordion | R24 |
| `/council` — `pages/Council.tsx` | Intentional, trustworthy identities | Approved image/identity panels, visible name/role, fallback, accessible biography if offered | R25 |
| `/guidance` — `pages/Guidance.tsx`; booking also `/connect` — `pages/Connect.tsx` | One coherent audience-to-booking journey | Valid selector semantics; focused action; accessible booking dialog/sheet; failure/retry path | R26 |
| `/about` — `pages/About.tsx` | Narrative chapters rather than repeated empty bands | Clear reading order, straight-rule timeline, evidence-led illustrations, measured prose width | R27 |
| `/` — `pages/Home.tsx` and shared sections | Coherent synthesis of proven patterns | Day default, restrained hero, clear program pathways and proof sections; Home migrates last | R27 |
| `/lms` and `/lms/tracks/:trackId` — `pages/LmsHub.tsx`, `pages/LmsTrackDetail.tsx` | Dedicated learner navigation and next-action priority | Clear continue action; honest state; access/persistence policy; no page overflow | R06, R12, R17 |
| `/lms/learn/:trackId/:lessonId`, `/lms/quiz/:trackId/:moduleId` — lesson/quiz modules | Preserve focused learning and safe recovery | Direct links, invalid IDs, refresh/back navigation, completion/retry/access rules tested | R06, R17, R18 |
| `/dashboard` — `pages/Dashboard.tsx` | Preserve and refine the existing admin shell | Role-aware navigation, tested server authority and mobile Sidebar; do not rebuild it as learner UI | R02, R12 |
| `/legal` — `pages/Legal.tsx` | Keep privacy/consent wording consistent with implementation | Discoverable notices and links; no claims unsupported by actual data handling | R05, R28 |

---

## 6. Strengths and weaknesses

### Strengths to preserve

- Distinctive, documented brand and visual constraints; the audit recognizes the warmth of the typography, palette and illustration language.
- Semantic OKLCH theme tokens, font roles and reusable layout primitives already provide a migration foundation.
- Existing Radix-based controls and composition reduce the need to invent interactive behavior.
- Mobile Sheet navigation, an administrative Sidebar, and named chat controls already exist.
- Route-level lazy loading, build chunk separation and development-only inspection are useful performance foundations.
- Contact feedback, timeout handling, server-side email escaping and administrative identity checks demonstrate existing resilience/security intent.
- Unit/E2E test infrastructure and a pnpm-based CI pipeline can be extended instead of replaced.
- The audit advocates a representative pilot and reusable patterns rather than simultaneous per-page redesign.

### Weaknesses to address

- Browser/server and demo/production trust boundaries are insufficiently evidenced and include a browser credential injection path.
- Learner storage and certificate data have local-demo semantics that need explicit separation from production claims.
- Theme initialization, derived radii, legacy fonts and enforcement scripts drift from the stated design system.
- Appearance is more consistent than behavior: labels, field errors, retry states, keyboard flow and target sizes still vary.
- A persistent animated background and shared public/LMS layout compete with reading and learning tasks.
- Existing checks do not provide end-to-end proof of accessibility, server authorization, visual stability or performance.
- The primary audit lacks measurements and source context; several proposed “new” components already exist.

---

## 7. Risk-ranked recommendation register

### 7.1 Priority and risk method

- **P0 / Critical:** immediate containment or release-assurance work for potential credential exposure or authorization failure. Severity may be critical while deployed likelihood remains unknown.
- **P1 / High:** significant usability, integrity, accessibility or regression risk; resolve before affected production journeys are released.
- **P2 / Medium:** meaningful optimization/content improvement; schedule after shared foundations or when measurement demonstrates impact.
- **P3 / Low:** polish and continuing governance; must not displace unresolved safety or core-task issues.

**Residual risk** describes the potential cost of leaving the issue unresolved. **Change risk** describes migration blast radius, not how important the work is. High change risk calls for tests, staged rollout and rollback, not indefinite deferral. Qualitative ratings are planning judgments; they are not CVSS scores or measured probabilities.

Each recommendation has a one-to-one task in the companion file: **R01 maps to T01**, and so on. Task acceptance criteria and dependencies are the implementation contract.

| ID | Priority | Specific action | Residual risk / likelihood basis | Change risk |
|---|---|---|---|---|
| R01 | P0 | Remove the browser provider-key path; review deployed exposure; rotate affected keys; introduce server mediation and quotas | Critical if a live key shipped; path verified, deployment unknown | High: chat availability and key cutover |
| R02 | P0 | Isolate simulated sessions and verify server authorization, role assignment, RLS, RPCs and privileged functions | Critical impact possible; client trust patterns verified, server exploitability unknown | High: login and administrative access |
| R03 | P1 | Establish source/route/component inventory, baseline checks and before screenshots | High rework/regression risk; report/source discrepancies verified | Low: read-only baseline |
| R04 | P1 | Audit pinned dependency/runtime compatibility, advisories and licenses; make installs reproducible | High possible supply-chain/build impact; advisory status unknown | Medium: dependency changes can break primitives |
| R05 | P1 | Harden inquiry/newsletter contracts, consent records, abuse controls and notification idempotency | High privacy/data-integrity impact; omitted payload fields and split writes verified | High: data/API changes |
| R06 | P1 | Scope learner data to its identity and decide authoritative enrollment/completion/certificate handling | High learning-integrity impact; shared storage/client issuance verified | High: migration and retained progress |
| R07 | P1 | Restore zoom and validate reflow, keyboard scrolling and virtual-keyboard behavior | High exclusion risk; restrictive viewport/scroll configuration verified | Medium: root-layout interactions |
| R08 | P1 | Reconcile design authorities, route themes, spacing, geometry, and component contracts | High repeated rework risk; conflicting rules verified | Low: explicit decisions first |
| R09 | P1 | Correct contextual theme defaults; measure semantic pairs; normalize status/radius/type/spacing tokens | High readability/coherence impact; initialization and derived-radius drift verified | High: global visual blast radius |
| R10 | P1 | Normalize existing Button/Card/Field/status/filter/table primitives with tested states | High inconsistent-interaction impact; mixed contracts verified | High: shared consumers |
| R11 | P1 | Complete accessible forms, menus and overlays; use shared validation and recovery semantics | High task/accessibility impact; sampled field gaps verified, keyboard outcomes unknown | Medium: focus/state regressions |
| R12 | P1 | Define public/learner/admin layout boundaries; refine existing navigation, scroll and floating support | High navigation/reflow impact; mixed route shell verified | High: route and focus transitions |
| R13 | P1 | Constrain GlyphMatrix and normalize reduced-motion behavior across animation mechanisms | High distraction/accessibility concern; independent perpetual loop verified | Medium: signature effect behavior |
| R14 | P1 | Migrate Programs as the approved reference route | High rollout-rework prevention value; audit-reported density issues | Medium: contained pilot |
| R15 | P1 | Rework Pricing comparison and tier actions using proven primitives | High decision friction; audit-reported, runtime unmeasured | Medium: comparison/content accuracy |
| R16 | P1 | Migrate Contact/Login while preserving and testing authentication/submission semantics | High journey impact; form and auth paths verified | High: conversion and authentication |
| R17 | P1 | Redesign the learner experience around next action, progress and truthful states | High learning-task impact; mixed shell and local data verified | High: active learner flows |
| R18 | P1 | Add typed data/route error boundaries, unknown-route handling and safe retries | High availability/confusion impact; route composition lacks explicit recovery | Medium: fallback behavior |
| R19 | P1 | Extend deterministic state, accessibility, visual and end-to-end CI coverage | High undetected-regression risk; pipeline gaps and stale route reference verified | Medium: test stability and CI cost |
| R20 | P1 | Replace stale visual-compliance rules with tested semantic/geometry enforcement | High design-regression risk; obsolete allowlist/exemptions verified | Medium: false-positive remediation |
| R21 | P2 | Measure representative route performance and approve budgets before optimizing | Medium unknown latency/CPU impact; no benchmark evidence | Low: measurement setup |
| R22 | P2 | Optimize measured bundle, fonts, images, canvas and shared-provider loading | Medium performance cost; candidates verified, impact unknown | Medium: load order and visual shift |
| R23 | P2 | Normalize Knowledge Hub and News discovery, density, states and image treatment | Medium discoverability/trust impact; audit-reported | Medium: search/detail navigation |
| R24 | P2 | Rework Events date/status hierarchy and FAQ behavior | Medium comprehension impact; audit-reported | Low: mostly composition/content |
| R25 | P2 | Replace placeholder-like Council presentation with approved identity content | Medium credibility impact; audit-reported, asset status unknown | Low: content and imagery review |
| R26 | P2 | Consolidate Guidance/Connect booking into one coherent accessible journey | Medium booking friction; audit-reported | Medium: external booking and failure states |
| R27 | P2 | Migrate About/Home last using approved narrative and reusable compositions | Medium brand/discovery impact; audit-reported | Medium: many shared sections |
| R28 | P2 | Validate metadata, content semantics, localization readiness and privacy wording | Medium discoverability/comprehension impact; broader coverage unassessed | Low: content review |
| R29 | P3 | Polish footer, microcopy, wrapping and final visual alignment | Low friction; audit-reported aesthetic issues | Low: localized refinements |
| R30 | P3 | Assign recurring ownership, exception expiry and maintenance review | Low immediate, cumulative long-term drift risk | Low: process changes |

---

## 8. Delivery strategy and release criteria

### 8.1 Staged implementation

1. **Safety and truth:** pursue R01/R02 immediately; run R03/R04 and clarify demo-versus-production behavior. Baseline collection must not delay credential containment.
2. **Foundation:** R05–R13, R18 and R20. Workstreams may run in parallel with separate ownership, but coordinate `index.css`, primitives, auth and App shell changes.
3. **Pilot:** R14 plus initial R19 coverage. Review Programs at all target widths and representative states before approving migration patterns.
4. **Priority journeys:** R15–R17; validate learner-data migration independently of visual improvements.
5. **Broader rollout:** R23–R27 and R28. R21 can start with the baseline; R22 follows measurement rather than waiting for every page.
6. **Closure:** R29, cross-route regression verification, security sign-off and maintenance handover R30.

### 8.2 Measurable release evidence

| Dimension | Required evidence |
|---|---|
| Security | No provider/service secret in browser artifacts; exposure review recorded; anonymous/wrong-role/cross-user requests denied by server authority; production simulation isolation demonstrated |
| Data integrity | User-scoped progress and approved credential authority, or visibly restricted demo semantics; consent captured for the intended purpose; idempotent submissions; tested partial failures |
| Theme/brand | Day public default and approved learner/admin defaults; explicit preference honored; no unapproved flash; measured semantic contrast; zero effective radii; approved typography/imagery |
| Accessibility | Keyboard and screen-reader journeys; visible focus; labels/errors; touch targets; 200% text and 320px reflow; 375/768/1280/1440 visual checks; reduced-motion behavior |
| Functional UX | Programs selection, Pricing comparison, inquiry/login/recovery, resource discovery and learner continuation complete with empty/loading/error/success states |
| Engineering | From `app/`: `pnpm run lint`, `pnpm run lint:css`, `pnpm tsc -b`, `pnpm run ui-check`, `pnpm run test:run`, `pnpm run build`, and applicable `pnpm run test:e2e` pass; advisory/security checks separately reviewed |
| Performance | Recorded lab setup and before/after results; agreed route-level byte/CPU budgets; proposed field targets monitored when enough consented traffic exists |
| Release operations | Reviewed change set, dependency lockfile, rollback plan, data migration/recovery plan, named owners and expiry dates for accepted nonblocking exceptions |

All results above are **future acceptance evidence**, not claimed outcomes of this documentation task. Existing failing checks must be recorded honestly. Do not relax a checker simply to make a migration appear green; repair incorrect checks and resolve genuine failures. Do not accept P0 exposure/authorization exceptions as cosmetic release debt.

### 8.3 Change-risk controls

Use small reviewable changes, one representative page, and component-level state evidence before broad migration. Coordinate around pre-existing working-tree changes. Avoid wholesale CSS replacement, reinitialization, mass dependency upgrades and automatic source deletion. For data/auth changes, define rollback that preserves legitimate user records and does not re-enable insecure behavior. Feature disabling can be safer than restoring an exposed credential path.

---

## 9. Outstanding decisions and evidence index

### 9.1 Decisions to resolve during baseline, not by assumption

- Is the current deployment a demonstration, a production learner service, or both? Which routes and certificate claims require identity and authoritative server state?
- Was a live OpenRouter key supplied to any publicly accessible build? Who owns provider usage review, disabling and rotation?
- Which database policies/RPC definitions are deployed, and are they reproducibly versioned? Is MFA required for administrative operations at the server boundary?
- Should learner routes default to Nordic Night, and how do explicit user preferences behave across public/admin transitions and portals?
- Which spacing/surface specification is authoritative? How are legitimate third-party logos and asset geometry treated under the straight-line requirement?
- What content and imagery are approved, and what are the real empty/sparse states rather than placeholders?
- What supported browser/device/network profile and accessibility release target will QA enforce?
- Who owns consent purpose, retention, deletion and booking-provider disclosures? No legal determination is made here.

### 9.2 Evidence index

Paths are relative to the repository root unless absolute. Full source audit citations use its section numbers to remain readable if line numbers change.

| Ref | Evidence and reviewed location |
|---|---|
| E01 | Supplied `eduplus-ui-audit-and-redesign-plan.md`: Executive verdict; Inputs and limitation; §§1–7; original reference list §8 |
| E02 | `app/src/App.tsx:20–39` lazy pages; `71–85` route flags; `87–123` globals/admin branch; `127–185` public/LMS providers, glyph and route table |
| E03 | `app/index.html:2–19`: default dark class, stored-light override, viewport restriction and font requests |
| E04 | `app/src/index.css:8–145`: Day/Night tokens, font roles, root radius and document overflow; reduced-motion/status-token names not found in the searched stylesheet |
| E05 | `app/src/components/ui/button.tsx:7–66`; `card.tsx:5–104`; `app/tailwind.config.js:58–64`: primitive contracts and derived radius definitions |
| E06 | `app/components.json:1–26`; `app/package.json:6–120`; `app/pnpm-lock.yaml:1–29`: initialized Radix style, scripts, declared dependencies and lockfile header/importer sample |
| E07 | `app/src/sections/Navigation.tsx`: NavigationMenu usage around 186–250; mobile Sheet around 313–395; names/titles around 266, 318 and 327–328 |
| E08 | `app/src/components/effects/GlyphMatrix.tsx:34–64` colors/theme observer; `71–119` resize/grid; `121–172` animation loop and cleanup |
| E09 | `app/vite.config.ts:28–30`; `app/src/lib/openRouter.ts:8–39`; `app/src/components/AIChatAgent.tsx:3,179`: browser provider-key path and its consumer |
| E10 | `app/src/lib/AuthContext.tsx:14–109` role retrieval; `128–195` simulation/session initialization; `209–244` signup and simulation; `app/src/components/ProtectedRoute.tsx:13–66` assurance check and redirects |
| E11 | `app/src/pages/Contact.tsx:41–179` submissions, consent payloads and feedback; `254–359` main form; `379–408` newsletter markup |
| E12 | `app/supabase/functions/send-email/index.ts:14–97` escaping, origin/size checks and email handling; `admin-user-action/index.ts:35–79` identity/role check and server-side service client |
| E13 | `app/src/pages/Dashboard.tsx`: Sidebar imports at 41–42, composition around 408–434; `app/src/pages/LmsHub.tsx:23–107`: certificate construction and existing continue-learning row |
| E14 | `app/src/lib/lmsProgressContext.tsx:5–65` shared key/storage; `103–110` quiz writes; `127–171` client completion/certificate counts |
| E15 | `app/vite.config.ts:8–18` dev plugin; `31–58` chunking; `60–71` unit-test setup |
| E16 | `.github/workflows/ci.yml:20–58`: pnpm/Node setup and six quality steps |
| E17 | `app/scripts/check-ui-compliance.js:10–39` primitive exemption/legacy colors; `95–162` line-based checks |
| E18 | `app/e2e/smoke.spec.ts:34–57` route list and wait strategy; selected test-file inventory under `app/src` confirms existing tests, not their results |
| E19 | `app/src/components/AIChatAgent.tsx`: named trigger at 266–270, fixed panel at 286–305; App mount conditions in E02 |
| E20 | `AGENTS.md`; `PRODUCT.md:9–27`; `DESIGN.md:3–29`: audience, brand, geometry, theme, spacing and motion requirements |

### Final recommendation

Preserve the brand and the working engineering foundations. First secure the trust boundaries and establish reliable evidence. Then normalize the shared system, prove it on Programs, and roll it out in controlled stages. The objective is a coherent, accessible and trustworthy learning product—not merely a cleaner screenshot.
