# EduPlus Platform Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a secure, Nordic Lagom EduPlus platform with real RBAC, dynamic public content, a modular staff workspace, protected AI access, and a coherent East Asian flat-vector illustration system.

**Architecture:** React Router layouts separate public, auth, and workspace concerns. Supabase migrations and RLS are authoritative for data security; typed domain services isolate browser code from database details; Edge Functions handle secrets and privileged processing.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, React Router 7, Tailwind 3, shadcn/ui, Supabase Auth/Postgres/Storage/Realtime/Edge Functions, Vitest, Testing Library, Zod, React Hook Form, Recharts.

---

### Task 1: Establish a trustworthy baseline

**Files:**
- Modify: `app/src/components/ScrollToTop.tsx`
- Modify: `app/src/App.test.tsx`
- Modify: `app/src/components/AIChatAgent.test.tsx`
- Modify: `app/scripts/check-ui-compliance.js`

- [ ] Write focused tests for safe scrolling and current AI input accessibility.
- [ ] Run `pnpm run test:run` and confirm the new tests fail for the expected behavior.
- [ ] Guard `scrollTo`, align accessible chat labels/placeholders, and strengthen the compliance scanner for forbidden motion and radius classes.
- [ ] Run `pnpm run test:run` and `pnpm run ui-check`; record any remaining violations as Task 2 inputs.
- [ ] Commit with `test: restore trustworthy frontend baseline`.

### Task 2: Enforce the Nordic Lagom design contract

**Files:**
- Modify: `app/src/index.css`
- Modify: `app/src/components/ProtectedRoute.tsx`
- Modify: affected files reported by `pnpm run ui-check`
- Delete: unused HUD/scramble effect modules after reference checks

- [ ] Add scanner fixtures proving rounded corners, pulse/ping, glow shadows, and non-token emerald colors fail.
- [ ] Set global radius tokens to zero and replace every reported violation with straight-edged, token-based styling.
- [ ] Replace security/HUD copy and general-purpose monospace classes with calm plain-language UI.
- [ ] Run `pnpm run ui-check`, `pnpm run lint`, and targeted component tests.
- [ ] Commit with `refactor: enforce Nordic Lagom interface rules`.

### Task 3: Add typed authentication and deny-by-default RBAC

**Files:**
- Create: `app/src/types/auth.ts`
- Create: `app/src/lib/auth/permissions.ts`
- Create: `app/src/lib/auth/permissions.test.ts`
- Modify: `app/src/lib/AuthContext.tsx`
- Modify: `app/src/components/ProtectedRoute.tsx`
- Modify: `app/src/App.tsx`

- [ ] Write failing permission tests for member, resource-person, admin, missing-role, and loading states.
- [ ] Define `AppRole = 'admin' | 'resource_person' | 'member'` and a single permission map.
- [ ] Remove simulated sessions and `any` auth state; a failed profile lookup must return no privileged role.
- [ ] Extend `ProtectedRoute` with `allowedRoles` and an accessible pending state.
- [ ] Run the auth and route tests, then the full test suite.
- [ ] Commit with `feat: enforce typed deny-by-default access`.

### Task 4: Complete the authentication experience

**Files:**
- Create: `app/src/pages/auth/AuthLayout.tsx`
- Create: `app/src/pages/auth/SignIn.tsx`
- Create: `app/src/pages/auth/SignUp.tsx`
- Create: `app/src/pages/auth/ForgotPassword.tsx`
- Create: `app/src/pages/auth/ResetPassword.tsx`
- Create: `app/src/pages/auth/AuthCallback.tsx`
- Test: `app/src/pages/auth/auth-pages.test.tsx`

- [ ] Write failing tests for validation, pending state, safe redirect, password recovery, and error feedback.
- [ ] Implement Zod/React Hook Form forms with shadcn fields and Supabase Auth methods.
- [ ] Add `/auth/*` routes and preserve `/login` as a redirect to `/auth/sign-in`.
- [ ] Confirm public signup cannot submit a role and always requests a member account.
- [ ] Run auth page tests and accessibility assertions.
- [ ] Commit with `feat: add complete member authentication flow`.

### Task 5: Introduce versioned Supabase security migrations

**Files:**
- Create: `app/supabase/config.toml`
- Create: `app/supabase/migrations/202607130001_platform_security.sql`
- Create: `app/src/types/database.ts`
- Test: `app/supabase/tests/platform_security.sql`

- [ ] Add SQL tests describing role creation, educator migration, RLS visibility, admin-only role changes, audit writes, and transactional event capacity.
- [ ] Create the `app_role` and publishing/status enums plus profiles, posts, events, registrations, resources, assets, knowledge, ingestion, message, and audit tables.
- [ ] Add a signup trigger that creates `member` profiles and an admin-only `set_user_role` function.
- [ ] Add RLS policies matching the approved matrix; remove public role enumeration.
- [ ] Add registration/cancellation functions with row locking and waitlist promotion.
- [ ] Generate or hand-maintain matching TypeScript database types and run `pnpm tsc -b`.
- [ ] Commit with `feat: add versioned RBAC and content schema`.

### Task 6: Connect dynamic public layouts and content

**Files:**
- Create: `app/src/layouts/PublicLayout.tsx`
- Create: `app/src/lib/content/content-service.ts`
- Create: `app/src/lib/content/content-service.test.ts`
- Modify: `app/src/pages/News.tsx`, `SignatureExperiences.tsx`, and `KnowledgeHub.tsx`
- Modify: `app/src/App.tsx`

- [ ] Write failing service tests for published-only queries, empty results, typed errors, and slug lookup.
- [ ] Add shared public loading, empty, error, breadcrumb, and not-found behavior.
- [ ] Add list/detail routes for news, events, and resources.
- [ ] Add member registration/cancellation UI with confirmed, waitlisted, full, and closed states.
- [ ] Run route, service, and event interaction tests.
- [ ] Commit with `feat: connect dynamic public content and events`.

### Task 7: Build the modular workspace

**Files:**
- Create: `app/src/layouts/WorkspaceLayout.tsx`
- Create: `app/src/pages/workspace/Overview.tsx`
- Create: `app/src/pages/workspace/Uploads.tsx`
- Create: `app/src/pages/workspace/Knowledge.tsx`
- Create: `app/src/pages/workspace/Messages.tsx`
- Create: `app/src/pages/workspace/PeopleAccess.tsx`
- Delete: `app/src/pages/Dashboard.tsx` after route migration

- [ ] Write route and permission tests for every workspace module.
- [ ] Add nested `/workspace/*` routes and redirect `/dashboard` to `/workspace`.
- [ ] Build Overview from first-party RPC metrics, never hard-coded chart data.
- [ ] Build batch upload queues with 25 MB/type validation, metadata, progress, retry, and draft records.
- [ ] Build draft approval/publishing, message triage/notes, and admin role management with audit feedback.
- [ ] Run workspace interaction tests and the full suite.
- [ ] Commit with `feat: deliver modular staff workspace`.

### Task 8: Secure AI chat and knowledge ingestion

**Files:**
- Create: `app/supabase/functions/ai-chat/index.ts`
- Create: `app/supabase/functions/ingest-knowledge/index.ts`
- Create: `app/src/lib/ai/chat-service.ts`
- Modify: `app/src/components/AIChatAgent.tsx`
- Delete: `app/src/lib/openRouter.ts`

- [ ] Write failing tests proving no provider key is read by browser code and request limits are enforced.
- [ ] Store the OpenRouter key only as an Edge Function secret; proxy model calls server-side.
- [ ] Add opaque anonymous sessions, bounded history, message-length limits, rate limiting, safe errors, and a 30-day retention policy.
- [ ] Extract text from approved document sources, create reviewable chunks, and retrieve approved context with PostgreSQL full-text search.
- [ ] Show ingestion status/logs and context inclusion controls in AI Knowledge.
- [ ] Run AI component/service tests and scan built output for secret variable names.
- [ ] Commit with `feat: secure AI chat and knowledge ingestion`.

### Task 9: Regenerate and integrate the illustration system

**Files:**
- Create: `app/public/images/HomeHeroVisual.webp`
- Replace: page illustration assets with optimized WebP equivalents
- Modify: consuming public pages and `app/src/sections/Hero.tsx`
- Delete: `app/public/images/male_avatar.png`, `female_avatar.png`, and obsolete hero video

- [ ] Generate one asset per approved scene using the built-in image tool and the shared art-direction constraints.
- [ ] Inspect every result for non-realistic flat-vector rendering, East Asian representation, angular geometry, artifacts, text, and composition.
- [ ] Integrate responsive sizes and descriptive alt text; replace council portraits with monogram cards.
- [ ] Run image-reference tests, build, and a missing-asset scan.
- [ ] Commit with `feat: install East Asian flat-vector illustration system`.

### Task 10: Verify and document release readiness

**Files:**
- Modify: `docs/system_documentation.md`
- Modify: `docs/ui-ux-testing-playbook.md`

- [ ] Update architecture, routes, permissions, migrations, deployment secrets, storage, and operational workflows.
- [ ] Run `pnpm run test:run`, `pnpm run lint`, `pnpm run ui-check`, `pnpm tsc -b`, and `pnpm run build` from a clean state.
- [ ] Review the design requirement-by-requirement and record any external deployment steps that cannot be performed locally.
- [ ] Confirm git status contains only intended changes and inspect the final diff.
- [ ] Commit with `docs: add platform operations and release guide`.
