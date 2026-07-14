# Design Specification — Nordic Editorial Learning Posters

**Date:** 2026-07-14  
**Status:** Approved by delegated CTO decision  
**Extends:** `2026-07-14-nordic-minimalism-design.md`  
**Scope:** Public-site illustration system, shared hero presentation, visual consistency, accessibility, and supporting quality fixes

## 1. Decision

EduPlus will use a **light Nordic interface shell with dark editorial illustration plates**.

The interface remains warm, spacious, and typographically led. Illustration is reintroduced only where it carries narrative value. Each illustration sits inside a warm-charcoal poster field and uses candlelight amber, muted sage, dusty rose, warm stone, and off-white highlights. This creates a repeatable contrast: quiet content surfaces around one authored visual focal point.

This specification supersedes the earlier typography-only rule that prohibited page-specific illustrations. All other Extreme Lagom principles remain active: strict hierarchy, generous negative space, straight edges, restrained motion, no neon, no HUD styling, no rounded cards, and no ornamental clutter.

## 2. Goals

- Replace the current mixed visual language of cinematic 3D renders, isometric objects, generic diagrams, and duplicated portraits with one coherent art direction.
- Give every major public route an identifiable narrative image without weakening readability or conversion.
- Represent East Asian learners, mentors, staff, and experts consistently and respectfully.
- Preserve the existing information architecture and current in-progress Nordic redesign wherever it is already working.
- Improve page consistency, responsive behavior, accessibility, performance, test coverage, and UI-rule compliance as part of the integration.

## 3. Non-goals

- No dark-mode-first redesign of the entire site.
- No rebuild of authenticated dashboard workflows.
- No new CMS, illustration editor, or remote asset pipeline.
- No embedded copy, logos, labels, or UI controls inside generated artwork.
- No destructive replacement of existing uncommitted assets. New artwork uses versioned filenames until final acceptance.
- No curved containers, rounded cards, neon effects, pulsing motion, dot grids, or cyberpunk/HUD motifs.

## 4. Visual System

### 4.1 Interface palette

| Role | Color | Usage |
| --- | --- | --- |
| Arctic paper | `#F7F4EE` | Primary light page surface |
| Warm charcoal | `#24211F` | Primary text and button fill |
| Soft stone | `#D8D1C7` | Dividers and quiet surfaces |
| Muted ink | `#716B63` | Body and supporting copy |
| Candlelight amber | `#D79A4B` | Active states, links, artwork highlights |

Existing OKLCH theme tokens remain the source of truth. Hex values describe the intended appearance and will be mapped to the current tokens rather than duplicated throughout components.

### 4.2 Illustration palette

| Role | Color family | Usage |
| --- | --- | --- |
| Poster field | warm charcoal | Consistent illustration background |
| Key light | candlelight amber/gold | Directional light and narrative emphasis |
| Figure highlight | warm off-white/stone | Clothing, paper, architecture, focal planes |
| Secondary accent | muted sage | Education, growth, outdoor and community details |
| Tertiary accent | dusty rose | Small humanizing details only |

### 4.3 Art direction

The system is called **Nordic Editorial Learning Posters**.

- Premium minimal travel-poster composition adapted to education.
- Ultra-clean flat-vector appearance rendered as optimized raster assets.
- Restrained soft cel shading for depth; no photorealism, glossy 3D rendering, or airbrushed fantasy lighting.
- Warm-charcoal background with candlelight amber key light.
- Straight-line architectural and decorative geometry. No curved ornamental paths.
- Angular, simplified human silhouettes with calm expressions and natural collaborative poses.
- East Asian representation in every scene containing people.
- One primary narrative anchor, two to four figures at most, and only a few secondary props.
- Large areas of quiet space; no dense decorative fields.
- No text, watermark, logo, fake interface, or unreadable pseudo-writing in the image.
- No hero worship. Group scenes communicate mentoring, peer learning, and equal participation.

### 4.4 Composition and ratios

- Shared hero artwork: `4:3` source composition, displayed in a straight-edged plate.
- Editorial feature artwork: `4:3` or `1:1`, depending on the existing section.
- News thumbnails: `3:2` crop with a shared focal-safe area.
- Council portraits: `4:5` editorial crop with consistent headroom and shoulder line.
- Desktop hero: 55% copy / 45% illustration at the large breakpoint.
- Mobile hero: copy first, artwork second; no text overlays on the raster image.

## 5. Page Story Map

### Home — Campus Walk

Three East Asian learners approach a modern learning pavilion through a sequence of angular thresholds. One carries a notebook, one documents the architecture, and two exchange a quiet observation. The doorway receives the brightest amber light and becomes the visual metaphor for possibility.

### Programs — Focus Studio

A shared learning table anchors the scene. Two learners review a geometric curriculum map on a laptop while a third sketches a pathway. Books, a desk lamp, and one warm mug support the scene without becoming visual clutter.

### About — Mentorship Table

Two founders and one learner meet at an equal-height table. The composition emphasizes listening and collaboration. Subtle architectural references to Manipur and East Asian academic networks are abstracted into straight-line background structures rather than literal landmarks.

### Knowledge Hub — Quiet Archive

A reader and a listening learner occupy a modular archive of books, headphones, and study material. The image makes resource discovery feel calm and purposeful and also supports the empty state without implying a broken page.

### Council — Global Roundtable

Four East Asian experts exchange ideas around a square table. A coordinated set of individual portraits provides distinct, dignified expert imagery with varied age, gender presentation, hair, clothing, and pose.

### Guidance — Pathfinding

A mentor and learner read a straight-line route map together. A compass-like angular marker, signpost, and branching path communicate choice without using curved diagrams or flowchart UI.

### News — Field Notes

The hero scene shows an interview and documentation moment. Four supporting article thumbnails share the same poster grammar but use distinct anchors: community classroom, speech intervention, green-energy research, and behavioral coaching.

### Events — Learning Beyond Walls

Four learners participate in a winter camp or education fair. A faceted tent or stage, one sketchbook, one backpack, a geometric tree, and a small amber gathering light establish experience and community.

### Contact — Open Channel

A modern letter station anchors the scene. One person sends a message while another receives or responds on a phone. Envelope forms, a plant, and a street lamp remain sparse and straight-edged.

### Login — The Threshold

An East Asian staff member enters a slightly open angular doorway. A key, console, and small plant support the secure-workspace metaphor. The scene stays especially sparse so the form remains dominant.

## 6. Component Architecture

### 6.1 Illustration registry

A single typed registry owns:

- route or semantic key;
- source path;
- intrinsic aspect ratio;
- alt text;
- focal position;
- whether the asset is meaningful or decorative;
- responsive size hint.

Page components consume the registry rather than repeating string paths and alt text.

### 6.2 Shared page hero

`PageHero` becomes the public-route visual primitive.

- Supports copy-only and copy-plus-art variants.
- Uses a consistent split grid and straight-edged artwork plate.
- Maintains one H1, one concise description, and optional CTA group.
- Keeps image semantics explicit: meaningful images receive descriptive alt text; decorative images use an empty alt.
- Uses CSS aspect ratios to prevent layout shift.
- Uses a refined opacity/translation entrance only when reduced-motion is not requested.
- Does not perform parallax, scaling, glowing, pulsing, or hover spectacle.

The home hero uses the same illustration container and spacing logic even if its component remains separate for content reasons.

### 6.3 Editorial media primitive

A small shared media wrapper standardizes:

- border treatment;
- aspect ratio;
- `object-fit` and focal positioning;
- loading behavior;
- responsive `sizes`;
- optional caption or visually hidden context.

It is used by hero art, article thumbnails, feature panels, and council portraits.

### 6.4 Page integration

- About, Programs, Events, Contact, Guidance, and Home replace current in-progress art references with versioned registry assets.
- Knowledge Hub and Login gain carefully placed artwork without expanding their information architecture.
- News replaces placeholder fields and current mixed thumbnails.
- Council replaces duplicated male/female avatars with distinct coordinated portraits.
- Existing content sections are adjusted only where spacing, focus states, or media framing prevent the new system from working.

## 7. Asset Strategy

### 7.1 Generation

Use the built-in image generation workflow. Every asset receives its own page-specific prompt while repeating the locked palette, representation, geometry, and negative constraints.

For consistency:

1. Generate and inspect the home hero as the master style key.
2. Make one targeted refinement if the master misses the intended palette or geometry.
3. Reuse the approved style language in all subsequent page prompts.
4. Generate news thumbnails and council portraits as coordinated sub-series.
5. Inspect every output for representation, anatomy, fake text, unwanted curves, inconsistent lighting, and visual clutter.

### 7.2 Files

- Store final page art in `app/public/images/editorial/`.
- Use descriptive versioned filenames such as `home-campus-walk-v2.webp`.
- Keep current source assets untouched during development.
- Convert final selected raster assets to an efficient web format only after visual approval.
- Avoid keeping unused generated variants in the production asset directory.

### 7.3 Performance

- Hero art uses eager loading only when it is the likely largest-contentful-paint element.
- Below-fold art uses lazy loading and asynchronous decoding.
- Images include intrinsic dimensions or fixed aspect-ratio wrappers.
- Responsive `sizes` prevent desktop-scale downloads on mobile.
- Production assets target practical visual quality rather than oversized source dimensions.

## 8. Responsive Behavior

### Desktop

- Navigation remains quiet and visually separate from art.
- Hero copy and illustration share one balanced grid.
- Artwork never exceeds the readable content hierarchy.
- Page-specific detail sections retain generous vertical rhythm.

### Tablet

- Split layouts use equal columns from 900px upward and stack below 900px.
- Copy width stays controlled.
- Artwork crops preserve the page-specific anchor and people.

### Mobile

- Content order is copy, CTA, then artwork unless task completion requires the form first.
- Illustration plates use full available width without edge-to-edge cropping.
- Typography and controls remain above minimum touch and reading sizes.
- No absolute-positioned copy is placed over important image content.

## 9. Accessibility

- Every route keeps a unique, descriptive H1.
- Meaningful illustration alt text describes its communication purpose, not its style.
- Decorative art uses `alt=""` and is excluded from the accessibility tree.
- Focus states are visible and use theme tokens.
- Form labels remain persistent and are not replaced by placeholders.
- Motion respects `prefers-reduced-motion`.
- Text is never baked into generated artwork.
- Color contrast is validated for copy, controls, links, and focus indicators.

## 10. Error and Fallback Behavior

- The layout remains complete and understandable if an image fails to load.
- Media wrappers use the poster-field background as a neutral fallback, not broken-image text.
- The application must not block route rendering while a decorative asset loads.
- Existing content, forms, filters, and authentication behavior remain unchanged unless a verified defect is found.

## 11. Verification

The work is complete only when all applicable checks pass:

1. `pnpm tsc -b`
2. `pnpm run test:run`
3. `pnpm run lint`
4. `pnpm run ui-check`
5. `pnpm run build`
6. Playwright route smoke tests for public pages
7. Visual review at representative desktop, tablet, and mobile widths
8. Manual reduced-motion and keyboard-focus review
9. Asset review for East Asian representation, straight-line geometry, absence of fake text, and consistent poster styling

The current branch begins with one stale `Vision` unit test and pre-existing UI-compliance errors in `AIChatAgent` and `Spotlight`, plus focus-state warnings. Fixes that are safe and directly support this quality gate are in scope. Unrelated dashboard refactors are not.

## 12. Acceptance Criteria

- The ten public experiences use one recognizably coherent visual system.
- All human illustration subjects represent East Asian people.
- Existing mixed 3D/isometric/generic illustration references are replaced in active public routes.
- The light Nordic shell remains dominant and the charcoal art remains a focal plate, not a full-site dark theme.
- All modified containers use straight edges and conform to project UI rules.
- Generated art contains no text, logos, watermarks, curved decorative paths, neon, HUD elements, or dense ornament.
- Layout works without images and fails gracefully when media is unavailable.
- Current user changes are preserved; new assets are introduced non-destructively.
- The required quality commands pass, or any genuinely unrelated pre-existing failure is documented with evidence.
