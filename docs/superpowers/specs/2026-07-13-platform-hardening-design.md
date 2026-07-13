# EduPlus Platform Hardening Design

## Objective

Turn the current prototype into a secure, deployable Asian community platform while preserving React, Vite, shadcn/ui, Tailwind, and Supabase. The finished system must use Nordic Lagom styling, straight-edged geometry, non-realistic flat-vector artwork, and East Asian representation for every illustrated person.

## Architecture

- Keep the public React application and introduce explicit public, authentication, and workspace layouts.
- Replace the monolithic dashboard with route-level workspace modules: Overview, Uploads, AI Knowledge, Messages, and People & Access.
- Keep Supabase as the source of truth. Move schema changes into versioned migrations, generate TypeScript database types, enforce permissions with RLS, and reserve privileged mutations for audited database functions or Edge Functions.
- Move OpenRouter calls out of the browser into a rate-limited Edge Function. The provider secret must never use a `VITE_` variable.
- Ship in independently verifiable releases: foundation/security, public content and events, workspace operations, then AI knowledge ingestion.

## Identity and Permissions

- Canonical roles are `admin`, `resource_person`, and `member`. Existing `educator` rows migrate to `resource_person`.
- Public signup always creates a member profile. Only admins can promote or demote users.
- Admins manage roles, publishing, and every workspace module.
- Resource people create drafts, upload files, manage AI knowledge, and triage messages; they cannot publish or change roles.
- Members manage their own profile, read published content, and register for events.
- Missing role data denies privileged access. Local-storage simulated authentication is removed.

## Data and Workflows

- Preserve and migrate existing knowledge resources, AI facts, and contact messages.
- Add profiles, news posts, events, event registrations, media assets, knowledge sources/entries, ingestion jobs, and audit events.
- News, Events, and Knowledge Hub become data-driven. About, Programs, Council, Guidance, and Contact remain curated pages.
- Event registration is transactional: available places become confirmed registrations; overflow becomes a waitlist; cancellation promotes the next member.
- Uploads accept PDF, DOCX, PPTX, TXT, PNG, JPEG, and WebP up to 25 MB. Draft objects stay private and only published assets are readable publicly.
- Message Hub supports triage, assignment, priority, tags, status, and internal notes. Replies hand off to the staff email client; no email provider is introduced.
- Overview uses first-party database counts and trends. No fabricated analytics remain.

## UI and Illustration System

- Set radius tokens to zero and remove glow, pulse, ping, scramble, HUD language, non-token colors, and general-purpose monospace typography.
- Use only refined fades, soft translations, and color transitions. Charts use linear interpolation.
- Audit SVG/icon geometry and replace curved decorative forms with straight-line icons.
- Replace the landing video and page art with nine optimized assets: Home, About, Programs, Knowledge Hub, Events, Council, Guidance, News, and Contact.
- Every human scene depicts non-identifying East Asian people in minimalist modern flat-vector style: matte gradient cel shading, angular simplified features, warm amber rim light, cool charcoal shadows, solid backgrounds, no photo texture, no harsh outline, no text, and no watermark.
- Council members use initials and role metadata, not generated portraits. The generic male/female portraits are removed.

## Reliability and Acceptance

- Loading, empty, permission-denied, validation, retry, and server-error states are explicit in every data workflow.
- New behavior is developed test-first. Auth/RBAC, role migration, event capacity/waitlist behavior, upload validation, publishing, AI proxy limits, and workspace access receive automated coverage.
- Required gates are `pnpm run test:run`, `pnpm run lint`, `pnpm run ui-check`, `pnpm tsc -b`, and `pnpm run build`.
- No generated asset is adopted until it is visually inspected for East Asian representation, flat/non-realistic rendering, composition, artifacts, and forbidden text.
