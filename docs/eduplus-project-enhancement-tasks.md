# EduPlus Project Enhancement Task List

**Prepared:** 22 September 2026  
**Status:** Proposed backlog; no implementation tasks have been executed  
**Basis:** Supplied AuditPlus UI report plus targeted read-only repository review  
**Companion assessment:** [EduPlus Project Enhancement Assessment](./eduplus-project-enhancement-assessment.md)

## Contents

1. Planning conventions and priorities
2. Implementation order and dependency map
3. Critical-priority tasks
4. High-priority tasks
5. Medium-priority tasks
6. Low-priority tasks
7. Shared definition of done and release gates
8. Traceability and ownership

---

## 1. Planning conventions and priorities

### 1.1 How to use this backlog

This is a documentation deliverable, not permission to perform the changes. All task checkboxes remain unchecked. A future implementation owner should revalidate the working tree, confirm production scope, and attach evidence to each task before closing it.

Every **Txx** corresponds to **Rxx** in the assessment's recommendation/risk register. Evidence labels **E01–E20** refer to that assessment's evidence index. Audit-only visual findings require fresh screenshots; source patterns do not by themselves prove production compromise, failed WCAG checks, or slow runtime performance.

### 1.2 Priority definitions

| Priority | Meaning | Count |
|---|---|---:|
| P0 — Critical | Immediate containment or production release-assurance gate for potential credential/authorization failure | 2 |
| P1 — High | Core usability, accessibility, data integrity, compatibility or regression work required before affected journeys ship | 18 |
| P2 — Medium | Measured optimization and broader content/page enhancement after shared patterns are proven | 8 |
| P3 — Low | Finishing work and continuing maintenance; do not prioritize above unresolved core risks | 2 |
| **Total** | Work packages, not confirmed-defect count | **30** |

P0 does not mean a breach has been confirmed. T01 concerns a verified browser credential path whose deployment exposure is unknown. T02 is an authorization assurance gate prompted by verified client-side patterns. Containment must not wait for baseline screenshots or design approval.

### 1.3 Effort levels

| Level | Interpretation |
|---|---|
| **S — Small** | Bounded decision/documentation or localized change with limited regression surface |
| **M — Medium** | One component family, page, or cross-cutting concern with several states and tests |
| **L — Large** | Multiple modules, shared behavior or backend/frontend coordination with significant verification |
| **XL — Extra large** | Product/data-model decisions and migration; split into independently releasable subtasks before committing implementation |

Effort includes design/engineering review, implementation and validation. These are relative estimates, **not elapsed-time promises**. Re-estimate after T03/T04 and production-scope confirmation. Data access, approved imagery, booking-provider constraints and policy availability can materially change effort.

### 1.4 Risk and dependency conventions

- **Risk if deferred** measures potential user/business impact; see the assessment for likelihood/confidence.
- **Change risk** measures migration blast radius; high-risk changes need staged validation and safe rollback.
- **Dependencies** are hard prerequisites for completing a task. Investigation, fixture preparation and design exploration may start earlier without marking the task done.
- An owner may accept “already satisfied” only with attached evidence. A prerequisite is not waived merely because the relevant file or test exists.
- Public learning/demo scope can reduce production persistence requirements, but only with explicit labeling, isolation and recorded product approval—not by silently skipping tests.

---

## 2. Implementation order and dependency map

### 2.1 Recommended delivery waves

| Wave | Tasks | Exit decision |
|---|---|---|
| **0 — Safety and baseline** | T01 and T02 immediately; T03, then T04; T21 can begin after T03 | Credential exposure triaged; authorization scope established; repeatable baseline available |
| **1 — Contracts and foundations** | T05–T13, T18, T20 in dependency order | Trust/data contracts, zoom, tokens, primitives, layouts, motion and checks are ready for a pilot |
| **2 — Reference route** | T14; develop T19 harness alongside the pilot | Programs approved at target widths, themes and states; reusable patterns accepted |
| **3 — Priority journeys** | T15, T16, T17; complete T19 infrastructure | Pricing, inquiry/authentication and learner tasks pass their acceptance criteria |
| **4 — Broader rollout** | T23–T26; then T27; T28 in parallel once foundations exist | Resource, event, council, booking and narrative journeys migrated without duplicated primitives |
| **Performance lane** | T21 → T22, with T04/T13 evidence | Measured loading/rendering contributors improved without hiding failures by changing budgets |
| **5 — Closure and handover** | T29, final release gates, then T30 ownership handover | Cross-route sign-off; remaining nonblocking work has owners and explicit acceptance |

T19 establishes the test harness and CI gates; it does not require all later pages to be migrated before work can start. Each later route task must add/use its own regression coverage. Final release acceptance is a separate gate after all applicable tasks are validated.

### 2.2 Dependency register

| Task | Hard dependencies | Principal output |
|---|---|---|
| T01 | None | Server-mediated AI boundary and exposure disposition |
| T02 | None | Verified server authorization and isolated simulation |
| T03 | None | Baseline and actual migration inventory |
| T04 | T03 | Dependency/toolchain assurance |
| T05 | T02, T03 | Validated, idempotent submissions and consent contract |
| T06 | T02, T03 | Approved learner-data authority and persistence |
| T07 | T03 | Accessible viewport and reflow behavior |
| T08 | T03 | Agreed design-system contracts |
| T09 | T07, T08 | Contextual theme and token foundation |
| T10 | T04, T09 | Tested normalized primitives |
| T11 | T02, T05, T10 | Accessible form/overlay state contract |
| T12 | T02, T07, T08, T10 | Explicit layout and navigation boundaries |
| T13 | T08, T09 | Scoped ornament and motion policy |
| T14 | T10, T11, T12, T13, T20 | Approved Programs reference implementation |
| T15 | T14 | Comparable and responsive Pricing |
| T16 | T11, T14 | Accessible Contact/Login journeys |
| T17 | T06, T12, T14 | Task-oriented learner experience |
| T18 | T02, T03 | Typed recovery and route error behavior |
| T19 | T04, T07, T10, T11, T12, T14, T18, T20 | Reliable automated quality gates |
| T20 | T08, T10 | Correct visual-compliance enforcement |
| T21 | T03 | Reproducible performance baseline/budgets |
| T22 | T04, T13, T21 | Evidence-backed performance improvements |
| T23 | T14, T18 | Resource/news discovery and state coverage |
| T24 | T14 | Events and FAQ migration |
| T25 | T14 | Approved Council identity presentation |
| T26 | T05, T11, T14 | Coherent Guidance/Connect booking journey |
| T27 | T15, T23, T24, T25, T26 | About/Home composed from proven patterns |
| T28 | T03, T08, T12 | Metadata/content/localization checklist |
| T29 | T15, T16, T17, T23, T24, T25, T26, T27 | Cross-route finishing pass |
| T30 | T19, T22, T28, T29 | Maintenance ownership and exception register |

The graph is acyclic. A practical design critical path is **T03 → T08/T07 → T09 → T10 → T20 → T14 → rollout**; T04, T11 and T12 are additional prerequisites. Security T01/T02 is an independent release gate, not a final polish activity.

### 2.3 Parallelization boundaries

- Security/data contracts, baseline measurement and design decisions can run concurrently.
- Assign one integration owner for `index.css`, shared primitives and `App.tsx`; competing broad edits there create unnecessary conflicts.
- Separate inquiry/consent work from learner-data migration, but agree identity and authorization rules first.
- Page migration can parallelize after T14 approval. Do not create independent Button/Card/Field or navigation forks per page.
- Content approval and performance measurement can proceed while foundational engineering is underway.

---

## 3. Critical-priority tasks

### [ ] T01 — Remove the browser-exposed AI credential path

**Priority:** P0 — Critical  
**Category:** Security / external-service boundary  
**Effort:** L  
**Suggested owner:** Backend/security engineer, supported by frontend and deployment owner  
**Dependencies:** None  
**Risk if deferred:** Critical if a live provider key was included in a published build; actual deployment exposure is unverified.  
**Change risk:** High; chat traffic and credentials require coordinated cutover.  
**Traceability:** R01; E09.

**Description:** Replace the Vite-to-browser provider credential path with a server-controlled chat boundary. Review build/deployment records and provider usage without copying secrets into tickets. Disable the exposed path immediately if live exposure is found; rotate affected credentials and assess abuse. A change of environment-variable name is not a fix.

**Acceptance criteria**

- [ ] Production browser bundles, maps and network requests contain no provider secret; the browser uses only an approved application endpoint.
- [ ] Deployment exposure review has an owner and disposition; any affected key is revoked/rotated and relevant usage reviewed.
- [ ] The server validates message roles/content/size, enforces request/token/cost limits, and handles anonymous access only under an explicit policy.
- [ ] Timeouts, provider failures and quota rejection produce safe user feedback without leaking credentials or raw provider responses.
- [ ] Tests cover successful chat, abuse limits and failure states; rollback disables chat rather than restoring browser secret exposure.

### [ ] T02 — Verify authorization and isolate simulated sessions

**Priority:** P0 — Critical assurance gate  
**Category:** Security / authentication / architecture  
**Effort:** L  
**Suggested owner:** Security/backend engineer and authentication owner  
**Dependencies:** None  
**Risk if deferred:** Potentially critical unauthorized access; client simulation behavior is verified but server privilege escalation is not.  
**Change risk:** High; role lookup, onboarding, MFA and administration may be affected.  
**Traceability:** R02; E02, E10, E12.

**Description:** Define and enforce the authority boundary across public routes, learner data and administrative operations. Ensure browser-stored roles or simulated users cannot authorize production operations. Review `user_roles` creation, `get_my_role`, database/storage policies and all privileged functions.

**Acceptance criteria**

- [ ] A reviewed access matrix identifies public, learner, educator, resource-person, admin and isolated-demo permissions.
- [ ] Production simulations are disabled or isolated from real data/actions; modifying browser simulation state cannot confer server privileges.
- [ ] Signup cannot assign a privileged role through client-controlled fields; server constraints and negative tests prove this.
- [ ] Deployed RLS/storage policies, RPC grants and security-definer scope/search-path controls are reviewed and versioned or exported to a controlled source of truth.
- [ ] Direct server requests with no session, expired sessions, wrong roles and another user's identifiers are denied; valid allowed requests succeed.
- [ ] MFA policy is explicit and enforced at the required server boundary; auth/policy errors fail closed without locking legitimate users into an unexplained loop.

---

## 4. High-priority tasks

### [ ] T03 — Establish the repository and runtime baseline

**Priority:** P1 — High  
**Category:** Audit validation / planning  
**Effort:** M  
**Suggested owner:** Technical lead with QA and design reviewer  
**Dependencies:** None  
**Risk if deferred:** High rework and accidental overwrite risk. **Change risk:** Low.  
**Traceability:** R03; E01–E07, E16–E20.

**Description:** Map audit concepts to the actual working tree, existing primitives, routes, forms and shells. Preserve pre-existing edits and distinguish the learner hub from the administrative dashboard. Record a reproducible baseline before implementing the redesign.

**Acceptance criteria**

- [ ] Baseline records commit/branch, uncommitted changes, runtime/pnpm versions and actual application working directory.
- [ ] Route and primitive inventories identify owners and reuse targets, including `/events` → `SignatureExperiences.tsx` and `/lms` versus `/dashboard`.
- [ ] All six existing CI-equivalent checks and applicable E2E commands are run and their actual results recorded; existing failures are not attributed to later changes.
- [ ] Before screenshots cover 375, 768, 1280 and 1440px with documented theme/data state; 320px/reflow checks are separately recorded.
- [ ] Audit claims are classified as confirmed, already addressed, still unverified or superseded. No initialization or duplicate primitive generation occurs.

### [ ] T04 — Audit dependencies and establish a reproducible toolchain

**Priority:** P1 — High  
**Category:** Dependencies / supply chain / compatibility  
**Effort:** M  
**Suggested owner:** Build/platform engineer  
**Dependencies:** T03  
**Risk if deferred:** High possible dependency/build impact; advisory status unknown. **Change risk:** Medium.  
**Traceability:** R04; E05–E06, E15–E16.

**Description:** Review the resolved pnpm graph and Deno-function dependency graph, rather than treating manifest entries as runtime bundle size. Verify React/Vite/Node and Tailwind/shadcn/Radix compatibility before generating or modifying primitives.

**Acceptance criteria**

- [ ] Resolved versions, peer/engine constraints, license obligations and advisory findings are recorded with remediation or justified dispositions.
- [ ] Toolchain versions are explicitly documented/pinned for development and CI; CI performs a frozen-lockfile installation.
- [ ] Existing generated selectors, animation utilities and CSS imports are validated under the approved Tailwind/shadcn combination.
- [ ] Overlapping Radix, motion, font and icon packages have import-graph evidence before removal or consolidation.
- [ ] Required updates are small, separately reviewed and tested; no wholesale shadcn reinitialization or unbounded “latest” upgrade is used.

### [ ] T05 — Harden submissions, consent and notification delivery

**Priority:** P1 — High  
**Category:** Privacy / backend contracts / reliability  
**Effort:** L  
**Suggested owner:** Backend engineer with frontend and privacy/product reviewer  
**Dependencies:** T02, T03  
**Risk if deferred:** High consent and duplicate/lost-notification risk. **Change risk:** High.  
**Traceability:** R05; E11–E12.

**Description:** Create a validated inquiry/newsletter contract, persist meaningful consent records and separate durable submission success from notification delivery. Prevent retrying a completed database write from creating duplicate inquiries. Review public endpoint abuse protections beyond origin checks.

**Acceptance criteria**

- [ ] Server validation covers required fields, types, lengths and permitted values; browser validation is not the only boundary.
- [ ] Consent records capture purpose, decision, timestamp and notice version as appropriate; optional marketing consent does not gate ordinary inquiries.
- [ ] Submission identifiers/idempotency prevent duplicate records on retries; notification failure is retryable without resubmitting saved data.
- [ ] Rate limits and payload limits protect inquiry, newsletter and email paths; tests demonstrate that an origin header alone is not authorization.
- [ ] Logs omit raw personal form content; retention/deletion owners and privacy notice updates are documented.
- [ ] Tests cover save failure, save success plus notification failure, timeout, duplicate newsletter request and consent withdrawal handling.

### [ ] T06 — Define authoritative learner progress and credential handling

**Priority:** P1 — High  
**Category:** Data integrity / learner architecture  
**Effort:** XL — split after the product decision  
**Suggested owner:** Product owner and backend/learner engineering lead  
**Dependencies:** T02, T03  
**Risk if deferred:** High account-mixing and unsupported credential claims. **Change risk:** High.  
**Traceability:** R06; E13–E14.

**Description:** Decide whether LMS progress/certificates are demonstrative or authoritative. Replace one browser-global state key with an identity-scoped contract and a defined guest migration path. If certificates assert verified achievement, issue and verify them through trusted server state.

**Acceptance criteria**

- [ ] Product approves public/guest versus authenticated learning and the meaning of enrollment, completion and certificates.
- [ ] Account A, account B and guest state cannot be confused on one browser; logout/account-switch and cleared/restricted storage behavior are tested.
- [ ] Progress is schema-validated/versioned; migration preserves valid existing progress with user-visible recovery for invalid data.
- [ ] Production progress supports authorized persistence and an explicit cross-device/conflict policy; failures do not silently claim successful synchronization.
- [ ] Verified certificates use authoritative identity/completion and durable verification identifiers; otherwise the experience is clearly labeled a non-verified demo and cannot grant real entitlements.
- [ ] Subtasks separately cover data contract, migration, persistence, certificate authority and recovery tests before the XL package is scheduled.

### [ ] T07 — Restore zoom and reliable responsive reflow

**Priority:** P1 — High  
**Category:** Accessibility / responsive layout  
**Effort:** M  
**Suggested owner:** Frontend accessibility engineer with QA  
**Dependencies:** T03  
**Risk if deferred:** High exclusion of low-vision and mobile users. **Change risk:** Medium.  
**Traceability:** R07; E02–E04.

**Description:** Remove restrictions on user scaling and audit the interaction between fixed-height root containers, nested scrolling, touch-action, focus and mobile keyboards. Preserve intentional app scrolling only where it remains usable.

**Acceptance criteria**

- [ ] User scaling is not disabled by the viewport configuration; supported mobile-device behavior is verified.
- [ ] Text enlargement at 200% and reflow at 320 CSS pixels preserve content and actions without page-level horizontal scrolling, except justified two-dimensional content.
- [ ] Keyboard scrolling, focus scrolling, back/forward restoration and direct anchors work in the chosen scroll container.
- [ ] Opening the software keyboard does not hide active fields or submission controls; dialogs/sheets restore scrolling on close.
- [ ] Automated checks and manual evidence cover public, login, LMS and administrative layouts.

### [ ] T08 — Reconcile and approve design-system contracts

**Priority:** P1 — High  
**Category:** Design governance / architecture  
**Effort:** S  
**Suggested owner:** Design lead with frontend lead and product owner  
**Dependencies:** T03  
**Risk if deferred:** High repeated contradictory implementation. **Change risk:** Low.  
**Traceability:** R08; E01, E20.

**Description:** Establish one coherent interpretation of existing project rules and the audit. Resolve public/learner/admin theme defaults, preference persistence, spacing rhythm, tonal surfaces versus overlay elevation, geometry, motion and imagery approvals.

**Acceptance criteria**

- [ ] Public Day, admin Night and the proposed learner Night policy have explicit approval, including user overrides and portal behavior.
- [ ] Spacing, type scale, surface/elevation, target-size and motion contracts reconcile `DESIGN.md` with audit proposals.
- [ ] Geometry rules distinguish path commands, curved SVG primitives, derived radii and any approved third-party asset exceptions.
- [ ] Shared primitive ownership and extension rules prevent parallel replacements; semantic native elements remain permitted.
- [ ] A concise component review checklist and exception owner are accepted before T09/T10 implementation.

### [ ] T09 — Normalize contextual themes and semantic tokens

**Priority:** P1 — High  
**Category:** Design system / contrast / typography  
**Effort:** L  
**Suggested owner:** Frontend design-system engineer  
**Dependencies:** T07, T08  
**Risk if deferred:** High readability and cross-route inconsistency. **Change risk:** High.  
**Traceability:** R09; E03–E05.

**Description:** Update existing Day/Night tokens and initialization instead of introducing another theme provider. Normalize foreground pairs, feedback roles, derived radii, type and spacing contracts. Remove route colors only when validated semantic replacements exist.

**Acceptance criteria**

- [ ] Fresh public navigation defaults to Day; approved learner/admin defaults and explicit preferences work on direct load, reload, route changes and overlay portals without an unintended theme flash.
- [ ] Normal text, qualifying large text and essential UI states meet the contrast targets in the shared definition of done in both themes.
- [ ] Primary/destructive and success/info/warning surfaces have appropriate foreground pairs; no essential state relies only on color.
- [ ] All effective radius tokens/utilities resolve to zero under the approved geometry policy, including the existing radius-plus-4px case.
- [ ] Approved font roles and readable type/spacing are documented and exercised; long UI labels are not set in decorative micro-label styling.
- [ ] Token/initialization tests and representative before/after screenshots are reviewed before changing all routes.

### [ ] T10 — Normalize shared primitives without duplication

**Priority:** P1 — High  
**Category:** Component architecture / code quality  
**Effort:** L  
**Suggested owner:** Design-system engineer with QA  
**Dependencies:** T04, T09  
**Risk if deferred:** High repeated interaction and styling defects. **Change risk:** High.  
**Traceability:** R10; E05–E07.

**Description:** Refine the existing Button, Card, Field/Input, Badge, Tabs, Accordion, Table, Skeleton and overlay-related contracts. Use installed Radix semantics and validated Tailwind utilities; do not rebuild their behaviors as page-local controls.

**Acceptance criteria**

- [ ] Existing Button variants and sizes have consistent focus, pressed, disabled, loading and icon behavior; standalone touch controls meet the agreed effective target size.
- [ ] Navigation renders anchors/links, actions render buttons, and interactive cards avoid nested conflicting interactive targets.
- [ ] Card anatomy, padding ownership and spacing tokens are consistent; alignment uses layout rather than clipping fixed heights.
- [ ] Filters use semantics matching their job; FAQ triggers, table headers and mobile comparison wrappers are accessible.
- [ ] Variants/states are represented in tests or a development-only component catalog for both themes, including long labels and reduced motion.
- [ ] Call-site compatibility is reviewed before removing legacy props; no duplicate primitive family or blanket copy of showcase blocks is introduced.

### [ ] T11 — Complete accessible forms, menus and overlays

**Priority:** P1 — High  
**Category:** Accessibility / validation / interaction states  
**Effort:** L  
**Suggested owner:** Frontend engineer with accessibility QA  
**Dependencies:** T02, T05, T10  
**Risk if deferred:** High blocked task/error-recovery risk. **Change risk:** Medium.  
**Traceability:** R11; E07, E10–E11, E19.

**Description:** Adopt the existing field/form/schema capabilities where appropriate. Unify labels, descriptions, validation, pending states and recovery, including newsletter email labeling. Review mobile menus, authentication dialogs, booking and chat as complete keyboard/screen-reader interactions.

**Acceptance criteria**

- [ ] Every control has a durable accessible name; errors/descriptions are programmatically associated and invalid fields receive appropriate state.
- [ ] Submission errors are announced and focus moves predictably; entered data is preserved when retry is safe.
- [ ] Pending actions prevent accidental duplicate submission without unexplained focus loss; saved-versus-notified outcomes follow T05.
- [ ] Dialogs/sheets have titles, descriptions where useful, contained focus, keyboard dismissal and focus return; menus/tabs follow their expected keyboard model.
- [ ] Consent fields allow comfortable multi-line activation; password reveal and icon-only actions have meaningful names.
- [ ] Representative screen-reader and keyboard tests pass in Day and Night, including network and validation failures.

### [ ] T12 — Separate route layouts and normalize navigation/support

**Priority:** P1 — High  
**Category:** Architecture / navigation / responsive shell  
**Effort:** L  
**Suggested owner:** Frontend architecture lead  
**Dependencies:** T02, T07, T08, T10  
**Risk if deferred:** High navigation and cross-context state confusion. **Change risk:** High.  
**Traceability:** R12; E02, E07, E13, E19.

**Description:** Define explicit public, learner and administrative layout boundaries. Preserve the existing administrative Sidebar and mobile public Sheet. Centralize route-derived active state, gutters, scroll ownership, contextual theme and floating support behavior.

**Acceptance criteria**

- [ ] A route/layout matrix replaces ambiguous assumptions; `/dashboard` is not mistakenly rebuilt as the learner hub.
- [ ] Public desktop/mobile menus expose the same destinations and clear active state; learner navigation prioritizes task destinations and becomes off-canvas when needed.
- [ ] Direct navigation, refresh, back/forward and layout transitions preserve intended auth/theme/focus/scroll behavior.
- [ ] Only one support trigger is mounted where appropriate, with safe-area-aware placement and no collisions with primary actions, consent controls or mobile keyboard.
- [ ] Shared hero/section/footer primitives align gutters without per-route layout forks; all supported layouts pass T07 checks.

### [ ] T13 — Limit GlyphMatrix and make reduced motion complete

**Priority:** P1 — High  
**Category:** Visual noise / accessibility / rendering  
**Effort:** M  
**Suggested owner:** Frontend engineer with design reviewer  
**Dependencies:** T08, T09  
**Risk if deferred:** High distraction/accessibility concern; runtime cost unmeasured. **Change risk:** Medium.  
**Traceability:** R13; E02, E08.

**Description:** Preserve GlyphMatrix as the explicitly permitted exception while removing its default full-page presence behind reading, forms, tables and learner data. Implement reduced-motion behavior for canvas, CSS and other animation mechanisms, not only the motion provider.

**Acceptance criteria**

- [ ] Each page has no more than one approved dominant ornament zone; dense reading/data surfaces are clean and readable.
- [ ] Reduced-motion preference produces a static or removed decorative layer without losing content or state cues.
- [ ] Offscreen/hidden/unmounted decorative work stops as appropriate; resize and lifecycle cleanup are tested.
- [ ] Non-exempt pulse/glow/scramble/scale-pop behavior is removed from active UI paths; default state transitions follow the approved restrained timing contract.
- [ ] Representative canvas CPU/paint observations are attached to T21/T22 rather than an unsupported claim of improved frame rate.

### [ ] T14 — Approve Programs as the reference migration

**Priority:** P1 — High  
**Category:** Public UX / pilot implementation  
**Effort:** M  
**Suggested owner:** Frontend engineer and design/product reviewer  
**Dependencies:** T10, T11, T12, T13, T20  
**Risk if deferred:** High risk of multiplying unapproved design patterns. **Change risk:** Medium.  
**Traceability:** R14; E01 §4 Phase 4; E02 route mapping.

**Description:** Migrate Programs end-to-end using shared hero, selection, outcomes, media and action patterns. Use the pilot to decide composition and density before broad rollout.

**Acceptance criteria**

- [ ] Program selection has correct semantics, visible state, keyboard support and an intentional mobile equivalent.
- [ ] Outcomes, supporting content and the primary action have clear hierarchy without large unexplained blank panels or repeated card nesting.
- [ ] Day/default and explicit Night views use shared tokens and approved image/ornament treatment.
- [ ] Screenshots at all four target widths plus 320px/reflow and long-content states receive recorded design approval.
- [ ] Component/state, interaction and baseline quality checks pass; reusable patterns and any justified exceptions are documented.

### [ ] T15 — Make Pricing comparable and responsive

**Priority:** P1 — High  
**Category:** Decision UX / tables / responsive layout  
**Effort:** M  
**Suggested owner:** Frontend engineer with product/content owner  
**Dependencies:** T14  
**Risk if deferred:** High plan-selection friction. **Change risk:** Medium.  
**Traceability:** R15; E01 §§1.3, 4.

**Description:** Normalize plan-card anatomy, feature grouping and CTA alignment. Preserve correct pricing/content logic and use semantic comparison structures rather than squeezing columns into a small viewport.

**Acceptance criteria**

- [ ] Plans expose comparable features, prices and billing context; one featured plan is emphasized without obscuring alternatives.
- [ ] Actions align through layout rather than clipped content or arbitrary fixed card heights.
- [ ] The comparison uses appropriate headers/caption and a clear mobile scroll cue or equivalent readable feature-list mode.
- [ ] Audience/plan switching works with keyboard, focus and screen-reader state; displayed values are verified against approved product content.
- [ ] Narrow/zoomed layouts, long feature names, both themes and all CTA destinations pass regression checks.

### [ ] T16 — Migrate Contact and Login without changing their promises

**Priority:** P1 — High  
**Category:** Core journeys / forms / authentication UX  
**Effort:** L  
**Suggested owner:** Frontend engineer with auth/backend owner  
**Dependencies:** T11, T14  
**Risk if deferred:** High inquiry/authentication friction. **Change risk:** High.  
**Traceability:** R16; E01 §1.3; E10–E11.

**Description:** Apply the new surface/type/field language to inquiry, newsletter and authentication. Keep identity assurance and T05 data semantics separate from presentation decisions. Verify existing recovery flows before assuming they need replacement.

**Acceptance criteria**

- [ ] Contact and newsletter use visible labels, consistent targets, inline validation and truthful saved/failed/pending/notification states.
- [ ] Contact links are semantic; consent wording and payload behavior match the approved contract.
- [ ] Login, password reveal, invalid credentials, recovery, session expiry and required MFA states are accessible and testable.
- [ ] Auth imagery does not obscure the primary task on small screens; theme behavior follows the approved auth context.
- [ ] Tests prove no weakening of authentication, duplicate submissions or loss of entered data during the migration.

### [ ] T17 — Redesign the learner hub around the next useful action

**Priority:** P1 — High  
**Category:** Learner UX / application layout  
**Effort:** L  
**Suggested owner:** Learner frontend lead with product/design and QA  
**Dependencies:** T06, T12, T14  
**Risk if deferred:** High learning-task and state-trust risk. **Change risk:** High.  
**Traceability:** R17; E01 §4 Phase 5; E13–E14.

**Description:** Preserve the existing continue-learning capability while improving hierarchy and reducing repetitive course-card density. Include track detail, lesson and quiz transitions in the learner journey, without folding administration into the same shell.

**Acceptance criteria**

- [ ] The primary continuation action is clear; in a small review with at least five representative users, at least four identify the next action within five seconds. Record the sample as formative, not statistically conclusive.
- [ ] Progress, deadlines, status and completion reflect T06 authority; a returning learner is not shown misleading demo/default progress.
- [ ] Learner navigation has visible location/active state and a mobile equivalent; discovery content does not displace the current task.
- [ ] Empty enrollment, completed track, loading, offline/error, missing lesson and failed quiz states are useful and keyboard-operable.
- [ ] 375px and 320px/reflow checks show no page overflow, hidden essential controls or micro-sized body copy; direct links and back navigation preserve state.

### [ ] T18 — Add typed recovery and route/data error boundaries

**Priority:** P1 — High  
**Category:** Reliability / code quality / architecture  
**Effort:** M  
**Suggested owner:** Frontend engineer with backend support  
**Dependencies:** T02, T03  
**Risk if deferred:** High blank-screen/confusing-retry impact. **Change risk:** Medium.  
**Traceability:** R18; E02, E10–E11, E14.

**Description:** Define safe route and asynchronous failure behavior. Separate reusable typed service results from presentation, validate external data and recover from stale dynamic imports, invalid paths and damaged local state without masking authorization errors.

**Acceptance criteria**

- [ ] Unknown paths, invalid news/track/lesson IDs and dynamic import failures produce intentional recoverable states rather than an unexplained empty main region.
- [ ] Auth/role/network failures are distinct, fail closed where required, and avoid unbounded retries or stale state after account changes.
- [ ] Abort/timeouts, duplicate requests and partial submission outcomes have explicit typed results compatible with T05.
- [ ] Storage parse/write failures have an approved user-visible recovery path; errors do not overwrite valid progress without a migration decision.
- [ ] Tests cover fallback, retry, cancellation and stale response behavior; logs are redacted and do not expose user form content or secrets.

### [ ] T19 — Extend deterministic accessibility, visual and end-to-end CI

**Priority:** P1 — High  
**Category:** Testing / release engineering  
**Effort:** L  
**Suggested owner:** QA automation engineer and CI owner  
**Dependencies:** T04, T07, T10, T11, T12, T14, T18, T20  
**Risk if deferred:** High undetected cross-route regressions. **Change risk:** Medium.  
**Traceability:** R19; E16–E18.

**Description:** Extend existing tests instead of replacing them. Correct stale route assumptions, test realistic failure states, and make accessibility/visual evidence reproducible. Build the harness alongside T14; validate later routes within their own tasks.

**Acceptance criteria**

- [ ] The E2E route list matches the approved route registry; `/resources` is either intentionally supported/redirected or removed from stale expectations.
- [ ] Fixtures control dates, content, authentication and third-party responses; readiness uses stable UI conditions instead of indiscriminate network-idle waiting.
- [ ] Core journeys cover public navigation, program/plan selection, inquiry/login/recovery, resource filtering and learner continuation, including failures.
- [ ] Automated accessibility checks, keyboard/manual screen-reader evidence and visual snapshots cover agreed themes, widths and states.
- [ ] CI runs the six existing checks plus applicable deterministic E2E; preserves reports/screenshots on failure and does not silently skip failing tests.
- [ ] Security negative tests and dependency findings have explicit review gates, even if hosted in a separate backend workflow; current pass/fail results are attached.

### [ ] T20 — Repair visual-compliance rules and geometry checks

**Priority:** P1 — High  
**Category:** Code quality / design-system enforcement  
**Effort:** M  
**Suggested owner:** Frontend tooling engineer with design-system reviewer  
**Dependencies:** T08, T10  
**Risk if deferred:** High repeated drift and misleading check results. **Change risk:** Medium.  
**Traceability:** R20; E05, E17.

**Description:** Replace the legacy neon allowlist and broad primitive exemption with enforcement that matches current Nordic rules. Test the checker itself and distinguish source syntax from rendered behavior.

**Acceptance criteria**

- [ ] Shared primitives and feature code are in scope; exemptions are narrow, justified and owned rather than directory-wide.
- [ ] Semantic token usage replaces outdated neon suggestions; valid token alpha/decorative exceptions are handled intentionally.
- [ ] Geometry validation covers uppercase/lowercase curve commands, including smooth quadratic commands, plus curved SVG primitives and effective nonzero radii.
- [ ] Chart validation detects unapproved nonlinear interpolation; CSS timing-function curves are not confused with decorative geometry.
- [ ] Multiline JSX, `focus-visible`, shared variants and native semantic elements do not produce avoidable false positives.
- [ ] Positive and negative checker fixtures demonstrate expected behavior; known genuine violations are resolved rather than suppressed to obtain a green build.

---

## 5. Medium-priority tasks

### [ ] T21 — Establish route-level performance baselines and budgets

**Priority:** P2 — Medium  
**Category:** Performance / observability  
**Effort:** M  
**Suggested owner:** Performance/QA engineer  
**Dependencies:** T03  
**Risk if deferred:** Medium; expensive work may target the wrong bottleneck. **Change risk:** Low.  
**Traceability:** R21; E02–E03, E08, E15.

**Description:** Measure representative public, form, learner and administrative routes under documented browser/device/network conditions. Record initial bytes, critical fonts/media, chunk requests, long tasks and glyph CPU/paint cost before optimizing.

**Acceptance criteria**

- [ ] Measurements identify commit/build, device/browser, cache state, network/CPU profile and repeated-run methodology.
- [ ] Bundle/import analysis distinguishes declared dependencies, stored assets and actual route-downloaded resources.
- [ ] Baseline includes LCP/CLS lab observations and interaction traces; field INP is collected only when suitable consented traffic exists.
- [ ] Proposed field targets are LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at p75, segmented by mobile/desktop; concrete route byte/CPU budgets are approved from baseline evidence.
- [ ] The top measured contributors are linked to T22; no fabricated score or performance pass is recorded without results.

### [ ] T22 — Optimize measured fonts, assets, bundles and shared work

**Priority:** P2 — Medium  
**Category:** Performance / dependency use  
**Effort:** L  
**Suggested owner:** Frontend performance engineer  
**Dependencies:** T04, T13, T21  
**Risk if deferred:** Medium latency/CPU impact; depends on profiling. **Change risk:** Medium.  
**Traceability:** R22; E02–E03, E06, E08, E15.

**Description:** Address measured contributors such as legacy font requests, below-fold media, eager chat/curriculum imports, vendor grouping or canvas redraw work. Preserve critical LCP media priority and do not add speculative memoization or blanket lazy loading.

**Acceptance criteria**

- [ ] Each optimization has a before/after measure or an import/network trace showing the eliminated cost.
- [ ] Unused font families/weights are removed only after usage verification; approved fonts preserve legibility and avoid avoidable layout shift.
- [ ] Media has responsive sizing, reserved aspect ratio and appropriate loading priority; the main LCP image is not inadvertently deferred.
- [ ] Lazy boundaries and chunk changes reduce measured route costs without new waterfalls, broken direct routes or stale-load failures.
- [ ] Agreed budgets are met or residual exceptions documented with evidence; functional, visual and accessibility checks remain green.

### [ ] T23 — Improve Knowledge Hub and News discovery

**Priority:** P2 — Medium  
**Category:** Content UX / information architecture  
**Effort:** L  
**Suggested owner:** Frontend engineer and content owner  
**Dependencies:** T14, T18  
**Risk if deferred:** Medium resource discoverability/trust impact. **Change risk:** Medium.  
**Traceability:** R23; E01 §1.3; E02.

**Description:** Normalize toolbar/filter/search/result composition, editorial card anatomy and image treatment. Scale the layout to real content rather than leaving an empty multi-column grid around one item.

**Acceptance criteria**

- [ ] Search/filters have correct semantics, clear selection and result count; URL/back behavior is intentional where shareable queries are required.
- [ ] Zero, one, many, loading and failed results have useful states; clearing filters is obvious.
- [ ] Cards have predictable image ratios, readable metadata and nonconflicting link/focus behavior.
- [ ] Pagination/load-more is introduced only when content volume requires it and is keyboard/screen-reader accessible.
- [ ] News detail/slugs and missing articles recover correctly; narrow layouts and long titles pass regression checks.

### [ ] T24 — Clarify Events and FAQ structure

**Priority:** P2 — Medium  
**Category:** Public UX / content states  
**Effort:** M  
**Suggested owner:** Frontend engineer and event content owner  
**Dependencies:** T14  
**Risk if deferred:** Medium uncertainty about dates/availability/actions. **Change risk:** Low.  
**Traceability:** R24; E01 §1.3.

**Description:** Recompose `SignatureExperiences.tsx` event rows with consistent date/status/title/audience/outcome hierarchy. Replace oversized FAQ spacing with a readable full-row accordion.

**Acceptance criteria**

- [ ] Dates, times/time zones and status are explicit and verified; availability is not communicated by color alone.
- [ ] Open, full, completed, cancelled and no-event states show appropriate actions or explanations.
- [ ] Filled emphasis is reserved for a meaningful featured/open event rather than every row.
- [ ] FAQ triggers have comfortable targets, visible focus and expected keyboard behavior.
- [ ] Mobile, long-title, both-theme and relevant booking-link checks pass.

### [ ] T25 — Make Council identities complete and credible

**Priority:** P2 — Medium  
**Category:** Content / imagery / credibility  
**Effort:** M  
**Suggested owner:** Content/design owner with frontend support  
**Dependencies:** T14  
**Risk if deferred:** Medium appearance of unfinished or unreliable content. **Change risk:** Low.  
**Traceability:** R25; E01 §1.3; E20.

**Description:** Replace audit-reported skeleton-like presentation with approved portraits or deliberate identity panels. Preserve the documented representation/art-direction requirements without misrepresenting actual people or implying fabricated affiliations.

**Acceptance criteria**

- [ ] Each published identity has approved name, role, affiliation and image/intentional fallback; image permissions and factual approval are recorded.
- [ ] Portrait/panel ratios, type and spacing are consistent and names remain readable on mobile.
- [ ] Alternative text reflects the image's purpose without repeating all adjacent text unnecessarily.
- [ ] Any biography dialog follows T11 focus/title behavior; broken-image and missing-bio states remain intentional.
- [ ] Design/content review confirms the grid no longer resembles a loading state.

### [ ] T26 — Consolidate Guidance and Connect booking

**Priority:** P2 — Medium  
**Category:** Booking UX / forms / integration resilience  
**Effort:** L  
**Suggested owner:** Frontend engineer with booking/product owner  
**Dependencies:** T05, T11, T14  
**Risk if deferred:** Medium booking friction and inconsistent expectations. **Change risk:** Medium.  
**Traceability:** R26; E01 §1.3; E02; E18 booking smoke coverage.

**Description:** Align Guidance audience selection, benefits and primary booking action with the actual Connect booking flow. Reuse one validated modal/sheet pattern and define an accessible fallback when an external scheduling service is unavailable.

**Acceptance criteria**

- [ ] Each audience sees coherent outcomes and one clear booking action; selected audience carries into the booking context when relevant.
- [ ] Selection controls use appropriate tab/radio/link semantics and work on small screens.
- [ ] Scheduling validates required details and clearly states availability/time zone and confirmation outcome.
- [ ] Third-party load failure, no slots, cancellation and retry have useful alternatives; focus is restored after dismissal.
- [ ] Booking privacy/consent wording matches actual data transfer and the approved T05 contract.

### [ ] T27 — Migrate About and Home after reusable patterns stabilize

**Priority:** P2 — Medium  
**Category:** Narrative UX / brand / public architecture  
**Effort:** L  
**Suggested owner:** Design/content lead and frontend engineer  
**Dependencies:** T15, T23, T24, T25, T26  
**Risk if deferred:** Medium discovery/brand inconsistency. **Change risk:** Medium.  
**Traceability:** R27; E01 §§1.3, 4; E20.

**Description:** Give About a readable chapter-based narrative and Home a coherent synthesis of proven program, proof, council and content patterns. Do not create another set of cards or a bespoke hero for each section.

**Acceptance criteria**

- [ ] About uses clear chapter hierarchy, comfortable line length and approved straight-rule narrative elements.
- [ ] Home clearly directs visitors toward programs, evidence and the main next action; partner/proof labels are readable.
- [ ] Public Day surfaces, restrained ornament and tonal section separation replace repeated dark patterned bands.
- [ ] Shared components cover repeated structures; content length drives spacing rather than arbitrary blank regions or fixed-height clipping.
- [ ] Mobile/zoomed layouts, image fallbacks and both-theme screenshots receive design/content approval.

### [ ] T28 — Validate metadata, content semantics and localization readiness

**Priority:** P2 — Medium  
**Category:** Content quality / discoverability / i18n  
**Effort:** M  
**Suggested owner:** Content/product owner with frontend support  
**Dependencies:** T03, T08, T12  
**Risk if deferred:** Medium unclear content or inconsistent disclosures; coverage is currently incomplete. **Change risk:** Low.  
**Traceability:** R28; E01, E03, E20.

**Description:** Audit route titles, descriptions, heading structure, indexing/share behavior, date/currency formatting, longer text and legal/privacy links. Determine actual language/locale needs from product requirements, not inferred geography.

**Acceptance criteria**

- [ ] Public routes have meaningful titles/descriptions and approved canonical/share behavior; client-rendering/indexing needs are tested before adding prerendering.
- [ ] Heading order, landmarks, link names and meaningful image alternatives are reviewed on migrated pages.
- [ ] Locale-sensitive dates/times/prices are consistently formatted; longer strings and missing translations do not hide essential actions.
- [ ] Error, empty, booking and consent wording is accurate, actionable and aligned with the implemented contracts.
- [ ] Ownership and review evidence exist for legal/privacy content; no unsupported security, credential or compliance claim remains.

---

## 6. Low-priority tasks

### [ ] T29 — Polish footer, microcopy and final visual alignment

**Priority:** P3 — Low  
**Category:** Finishing / consistency  
**Effort:** S  
**Suggested owner:** Designer and frontend engineer  
**Dependencies:** T15, T16, T17, T23, T24, T25, T26, T27  
**Risk if deferred:** Low residual friction and visual inconsistency. **Change risk:** Low.  
**Traceability:** R29; E01 §§1.1, 5–6.

**Description:** Perform a focused cross-route finishing pass after core workflows work. Compact the footer, remove repetitive copy and align gutters, labels and image crops without removing useful content solely to make a screenshot tidy.

**Acceptance criteria**

- [ ] Footer columns, legal row and navigation links remain useful, compact and aligned at target widths.
- [ ] Heading wraps, orphan lines, control labels, image crops and spacing inconsistencies are reviewed with real content.
- [ ] No essential copy is truncated or hidden without product approval; primary/secondary action emphasis is consistent.
- [ ] Focus rings are not clipped and floating support does not cover content after final layout adjustments.
- [ ] Final screenshot review introduces no regression in contrast, geometry, reduced motion or task completion.

### [ ] T30 — Assign maintenance ownership and control design drift

**Priority:** P3 — Low  
**Category:** Governance / maintenance  
**Effort:** S  
**Suggested owner:** Technical lead, design-system owner and QA lead  
**Dependencies:** T19, T22, T28, T29  
**Risk if deferred:** Low immediate impact, accumulating long-term inconsistency. **Change risk:** Low.  
**Traceability:** R30; E01 §5; E16–E17.

**Description:** Hand over component ownership, dependency/security review, performance checks, content approval and exception management. This task defines a maintenance process; it does not create scheduled automations or replace the final security release gate.

**Acceptance criteria**

- [ ] Owners are named for tokens/primitives, auth/data boundaries, test gates, performance and public content.
- [ ] Approved exceptions record rationale, scope, risk owner and review/expiry date; broad permanent exemptions are not used.
- [ ] Dependency/advisory and cross-route design review cadence is agreed, with an escalation path for regressions.
- [ ] Superseded design guidance is clearly marked and linked to the authoritative contract without deleting historical evidence.
- [ ] New contributors can find the component contract, route matrix, baseline and release checklist; unresolved work remains visibly tracked.

---

## 7. Shared definition of done and release gates

### 7.1 Definition of done for every implementation task

- [ ] Acceptance criteria are supported by reviewable evidence, not merely “implemented” assertions.
- [ ] Changes preserve unrelated work and use pnpm exclusively; no unapproved initialization, framework replacement or bulk dependency refresh.
- [ ] Relevant unit/component/integration tests cover successful and failed states; tests are run and actual results recorded.
- [ ] New shared behavior uses existing contracts and has an owner; no avoidable per-page primitive fork appears.
- [ ] Security/privacy impact is reviewed for changed data flows; logs, screenshots and fixtures contain no secrets or unnecessary personal data.
- [ ] Applicable accessibility, responsive, theme and visual checks below are complete.
- [ ] Change-risk controls and rollback are documented where global tokens, auth, persistence or dependencies are affected.

### 7.2 UI acceptance matrix

| Area | Minimum evidence |
|---|---|
| Themes | Contextual default, explicit override, direct load/reload and overlay portals in Day/Night |
| Widths | Screenshots at 375, 768, 1280, 1440px; functional reflow check at 320px |
| Scaling | 200% text enlargement; 320 CSS-pixel equivalent reflow, including browser zoom where applicable |
| Contrast | Normal text ≥4.5:1; qualifying large text ≥3:1; essential non-text UI/state contrast ≥3:1 where applicable |
| Targets | Product target of 44×44 CSS pixels for standalone touch controls where practical; documented exceptions and WCAG 2.2 AA target-size/spacing evaluation |
| Keyboard | Logical order, visible/unobscured focus, expected tab/menu/accordion behavior, modal entry/dismissal/return |
| Assistive technology | Names, headings/landmarks, labels/descriptions/errors, state announcements and status feedback |
| State matrix | Default, hover, focus, selected/active, disabled, pending, empty, error and success as applicable |
| Motion | Reduced-motion coverage for canvas, CSS and scripted effects; GlyphMatrix exception does not waive accessibility |
| Content | Long labels, missing/broken image, sparse/many results, realistic dates/status and correct identity/credential claims |
| Geometry | Zero effective radii, approved straight SVG geometry and linear charts; no newly introduced non-exempt glow/pulse/scramble |

These checks are a practical release baseline, not a standalone certification of complete WCAG conformance.

### 7.3 Quality commands for future execution

Run from **`C:\edu-plus\app`** using the approved toolchain. These commands are listed for implementation/QA; none was run as part of preparing these documents.

| Command | Purpose |
|---|---|
| `pnpm run lint` | ESLint |
| `pnpm run lint:css` | Stylelint |
| `pnpm tsc -b` | TypeScript project check |
| `pnpm run ui-check` | Corrected design-compliance checks |
| `pnpm run test:run` | Unit/component tests |
| `pnpm run build` | Production build, including TypeScript in the existing script |
| `pnpm run test:e2e` | Browser E2E journeys with appropriate test configuration |
| `pnpm run test:editorial-assets` | Editorial processing tests when asset preparation changes |
| `pnpm audit` | Dependency advisory evidence; triage findings rather than applying blind fixes |

Backend policy/function tests and Deno dependency checks require an approved isolated test environment and their own run instructions. Do not substitute browser mocks for server authorization evidence. Networked tests must not send real inquiries/emails or modify production accounts.

### 7.4 Final release gate

A release owner must verify:

1. T01/T02 are resolved with evidence. No unresolved provider-secret exposure or unverified privileged authorization path is accepted as visual-design debt.
2. Applicable P1 tasks are complete; prototype-only scope decisions are explicit and prevent unsupported production claims.
3. Every migrated page satisfies its task criteria and the shared UI acceptance matrix; Programs approval is not blanket approval for other pages.
4. All agreed quality gates pass with recorded environment and artifacts. Remaining nonblocking exceptions have owners and review dates.
5. T21/T22 performance evidence meets approved budgets or has a justified residual disposition; field and lab data are distinguished.
6. Auth/data migrations have recovery plans that preserve legitimate user records; rollback cannot restore an insecure path.
7. Product, engineering and QA approve release; design approval alone does not certify security or data integrity.

---

## 8. Traceability and ownership

### 8.1 Category-to-task coverage

| Category | Tasks |
|---|---|
| Security/authentication/authorization | T01, T02, T04, T11, T16, T18, T19 |
| Privacy/submission integrity | T05, T11, T16, T26, T28 |
| Learner data and credential integrity | T02, T06, T17, T18 |
| Performance | T13, T21, T22 |
| Accessibility/responsiveness | T07, T09–T13, T15–T17, T19, plus every route definition of done |
| Design system/code quality | T08–T10, T18, T20, T29, T30 |
| Dependencies/build tooling | T03, T04, T19, T22 |
| Architecture/navigation | T02, T06, T12, T18 |
| Public content/page migration | T14–T16, T23–T29 |
| Testing/release governance | T03, T19–T21, T30 and the final release gate |

### 8.2 Approval responsibilities

- **Product owner:** access/demo policy, learner/certificate truth, page content, booking and primary user actions.
- **Security/backend owner:** credential disposition, role/RLS enforcement, submissions, rate limits, privacy-aware storage and authoritative learning records.
- **Design-system owner:** typography, themes, spacing, geometry, primitive contracts and approved visual evidence.
- **Frontend lead:** route boundaries, shared component migration, state handling and performance implementation.
- **QA/release owner:** reproducible baseline, accessibility/manual checks, functional/security test evidence, CI results and release decision.

### Recommended first assignment

Assign **T01 and T02 for immediate security assurance**, **T03/T04 for the evidence baseline**, and **T08 for design decisions**. Then prove **T09/T10/T12/T13 on T14 Programs**. Avoid redesigning every route simultaneously or treating screenshot findings as a completed technical audit.
