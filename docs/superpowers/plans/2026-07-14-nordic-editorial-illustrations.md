# Nordic Editorial Illustrations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the public site's mixed illustration set with a coherent Nordic Editorial Learning Poster system, integrate it through shared responsive media components, and leave the public experience accessible, performant, and compliant.

**Architecture:** A typed illustration registry owns paths, semantics, focal behavior, and aspect ratios. `EditorialMedia` renders all new artwork; `PageHero` owns the responsive 55/45 copy-and-poster layout and delegates media behavior to that primitive. Built-in image generation produces raster masters, a pnpm-managed Sharp script optimizes them to WebP and extracts deterministic council portraits, and public routes consume only versioned registry entries.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Vitest, Testing Library, Playwright, Sharp, built-in image generation, pnpm.

---

## Execution Convention

- Run every `pnpm`, TypeScript, Vitest, asset, build, and Playwright command from `C:/edu-plus/app`.
- Run every `git` command from `C:/edu-plus` and stage only the exact paths listed for that task.
- Run built-in image generation from the current Codex task, then copy the selected result to the exact `C:/edu-plus/tmp/imagegen/editorial/` destination named in the task.
- Never reset, overwrite, or bulk-stage the existing dirty worktree.

---

## File Structure

**Create**

- `app/src/lib/editorialIllustrations.ts` — typed source of truth for all editorial assets.
- `app/src/lib/editorialIllustrations.test.ts` — registry integrity and accessibility assertions.
- `app/src/components/ui/editorial-media.tsx` — straight-edged responsive media primitive.
- `app/src/components/ui/editorial-media.test.tsx` — media semantics, loading, and crop tests.
- `app/src/components/ui/page-hero.test.tsx` — copy-only and copy-plus-art hero behavior.
- `app/scripts/prepare-editorial-images.mjs` — WebP optimization and council-sheet extraction.
- `app/public/images/editorial/*.webp` — final production artwork.
- `tmp/imagegen/editorial/*.png` — ignored generation masters used only during preparation.

**Modify**

- `.gitignore` — ignore generated source masters.
- `app/package.json`, `app/pnpm-lock.yaml` — add Sharp and the editorial asset script.
- `app/src/index.css` — map light-shell tokens to accessible Nordic palette values.
- `app/src/components/ui/page-hero.tsx` — shared 55/45 responsive hero.
- `app/src/sections/Hero.tsx` — consume `PageHero` and the home registry asset.
- `app/src/pages/About.tsx`, `Programs.tsx`, `SignatureExperiences.tsx`, `Guidance.tsx`, `Contact.tsx`, `KnowledgeHub.tsx`, `Council.tsx`, `News.tsx`, `Login.tsx` — consume editorial assets.
- `app/src/App.tsx` — remove the prohibited floating AI widget from public pages and remove pulsing loader motion.
- `app/src/sections/Vision.test.tsx` — align stale assertion with the current semantic heading.
- `app/e2e/smoke.spec.ts` — cover the actual ten public routes and editorial media behavior.

**Delete**

- `app/src/components/effects/Spotlight.tsx` and `Spotlight.test.tsx` — unused glow component prohibited by the approved system.
- `app/src/components/AIChatAgent.tsx` and `AIChatAgent.test.tsx` — public floating HUD widget prohibited by the approved system.

**Preserve**

- `app/src/lib/openRouter.ts` and its test remain available for a future authenticated advisor experience; this plan removes only the prohibited public floating UI.
- Existing uncommitted artwork and page edits are not overwritten or reset.

---

### Task 1: Establish and Repair the Test Baseline

**Files:**
- Modify: `app/src/sections/Vision.test.tsx`

- [ ] **Step 1: Record the dirty-tree baseline without changing it**

Run: `git status --short`

Expected: existing uncommitted page, component, asset, package, and lockfile changes remain visible. Do not stage or reset them.

- [ ] **Step 2: Run the current unit suite to reproduce the stale assertion**

Run: `pnpm run test:run -- src/sections/Vision.test.tsx`

Expected: FAIL because the test searches for isolated word nodes such as `become`, while the current component renders one semantic heading.

- [ ] **Step 3: Replace the stale word-fragment assertions**

Use this complete test body:

```tsx
it('renders the mission and vision as semantic copy', () => {
  render(<Vision />);

  expect(screen.getByText('Our Mission')).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      name: /To become a leading skills development platform/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText('Our Vision')).toBeInTheDocument();
  expect(
    screen.getByText(/To empower individuals to acquire future-ready/i),
  ).toBeInTheDocument();
});
```

- [ ] **Step 4: Verify the baseline repair**

Run: `pnpm run test:run -- src/sections/Vision.test.tsx`

Expected: PASS, 1 test.

- [ ] **Step 5: Commit only the baseline test repair**

```powershell
git add -- app/src/sections/Vision.test.tsx
git commit -m "test: align Vision assertions with semantic copy"
```

---

### Task 2: Generate the Home Master Style Key

**Files:**
- Create: `tmp/imagegen/editorial/home-campus-walk-v2.png`
- Reference: `C:/Users/rtf70/Downloads/travel-poster.jpg`

- [ ] **Step 1: Inspect the travel-poster reference with the image viewing tool**

Label the image as a **style and composition reference only**. Do not copy its Jeju setting, signage, lettering, people, or exact layout.

- [ ] **Step 2: Generate the home master with the built-in image-generation tool**

Use the travel poster as the referenced image and this complete prompt:

```text
Use case: stylized-concept
Asset type: EduPlus public-site hero illustration and master style key
Primary request: Create “Campus Walk,” a premium Nordic editorial learning poster showing three East Asian learners approaching a modern education pavilion through a sequence of angular architectural thresholds. One learner carries a notebook, one documents the pavilion with a phone, and two exchange a calm observation. The amber-lit doorway is the narrative focal point and metaphor for opportunity.
Input image: the supplied Jeju travel poster is a style and spacious-composition reference only; do not reproduce its location, lettering, objects, people, or exact composition.
Scene/backdrop: warm charcoal poster field, straight-edged modern pavilion, sparse path, one geometric lamp, minimal environmental structure.
Style/medium: ultra-clean premium flat-vector travel poster rendered as raster, restrained soft cel shading, crisp editorial finish, quiet award-publication quality.
Composition/framing: 4:3 landscape-safe composition, primary activity centered-right, generous quiet space, all important people and doorway inside a central 3:2 focal-safe region for mobile cropping.
Lighting/mood: candlelight amber directional light, calm, humane, confident, contemplative.
Color palette: warm charcoal #24211F, candlelight amber #D79A4B, warm off-white #F7F4EE, soft stone #D8D1C7, muted sage, tiny dusty-rose details.
Character direction: all people are East Asian; natural proportions; softly faceted human forms with warm, calm expressions and collaborative body language.
Geometry: strict straight-line geometry for architecture, furniture, props, and environmental structures; no curved ornament.
Constraints: no text, no logo, no watermark, no fake UI, no signage, no pseudo-writing, no neon, no glow bloom, no cyberpunk, no HUD, no rounded decorative frames, no photorealism, no glossy 3D, no dense ornament.
```

- [ ] **Step 3: Inspect the result**

Reject and regenerate once if any of these are present: non-East-Asian characters, fake text, curved architectural ornament, glossy 3D rendering, heavy gradients, extra limbs, clutter, or a focal point outside the mobile-safe center.

- [ ] **Step 4: Copy the selected generated result**

Copy the selected built-in output to exactly:

`C:/edu-plus/tmp/imagegen/editorial/home-campus-walk-v2.png`

Expected: one approved master PNG exists at that path. Keep the built-in generation path recorded in the implementation notes.

---

### Task 3: Generate the Remaining Nine Page Posters

**Files:**
- Create: `tmp/imagegen/editorial/about-mentorship-table-v2.png`
- Create: `tmp/imagegen/editorial/programs-focus-studio-v2.png`
- Create: `tmp/imagegen/editorial/knowledge-quiet-archive-v2.png`
- Create: `tmp/imagegen/editorial/council-roundtable-v2.png`
- Create: `tmp/imagegen/editorial/guidance-pathfinding-v2.png`
- Create: `tmp/imagegen/editorial/news-field-notes-v2.png`
- Create: `tmp/imagegen/editorial/events-learning-beyond-walls-v2.png`
- Create: `tmp/imagegen/editorial/contact-open-channel-v2.png`
- Create: `tmp/imagegen/editorial/login-threshold-v2.png`

- [ ] **Step 1: Use the locked style prefix for every generation**

Reference both `C:/Users/rtf70/Downloads/travel-poster.jpg` as the composition reference and `C:/edu-plus/tmp/imagegen/editorial/home-campus-walk-v2.png` as the approved EduPlus style key. Prepend this exact locked prefix to each scene block below:

```text
Use case: stylized-concept
Asset type: EduPlus public-site editorial poster
Style lock: match the approved Campus Walk asset’s warm-charcoal field, candlelight amber key light, warm off-white and soft-stone planes, muted sage and tiny dusty-rose accents, softly faceted East Asian human figures, crisp premium flat-vector raster finish, restrained cel shading, generous quiet space, and calm collaborative mood. Use the Jeju poster only for spacious travel-poster composition, never for copied content.
Composition: 4:3 landscape-safe source with every essential subject inside a central 3:2 focal-safe crop.
Geometry: architecture, furniture, props, and environmental structures use straight-line geometry only. Human forms remain natural and softly faceted.
Global avoid: no text, logo, watermark, signage, pseudo-writing, fake interface, neon, glow bloom, cyberpunk, HUD, rounded decorative frame, photorealism, glossy 3D, dense ornament, or non-East-Asian people.
```

- [ ] **Step 2: Generate and save each page scene using its exact scene block**

```text
ABOUT — “Mentorship Table”: Two East Asian founders and one East Asian learner meet at an equal-height angular table. One founder listens, one explains with an open hand, and the learner contributes while referencing a notebook. Abstract straight-line architectural forms subtly connect Manipur with wider Asian academic networks. Emphasize equality, listening, and shared purpose. Save as about-mentorship-table-v2.png.

PROGRAMS — “Focus Studio”: Two East Asian learners review a geometric curriculum pathway on a laptop at a straight-edged shared desk while a third learner sketches a route in a notebook. Include a slim angular lamp, a small book stack, and one warm mug. Emphasize focus, collaboration, and forward movement. Save as programs-focus-studio-v2.png.

KNOWLEDGE HUB — “Quiet Archive”: One East Asian learner reads while another listens with headphones beside modular straight-edged shelves, books, and study materials. Keep a strong square-safe center crop for the empty state. Emphasize calm discovery and a complete—not broken—resource space. Save as knowledge-quiet-archive-v2.png.

COUNCIL — “Global Roundtable”: Four distinct East Asian experts of varied ages and gender presentation exchange ideas around a square table. One presents, one writes, and two listen. Keep the power dynamic equal and the props sparse. Save as council-roundtable-v2.png.

GUIDANCE — “Pathfinding”: An East Asian mentor and learner read a straight-line route map together. The mentor indicates a branch while the learner holds the map and considers the options. Include one angular compass marker and a sparse signpost. Emphasize clarity without prescribing a single destination. Save as guidance-pathfinding-v2.png.

NEWS — “Field Notes”: An East Asian reporter documents a quiet interview between two East Asian participants at a small angular table. Include a camera, one microphone, and a dusty-rose notebook. Emphasize credible observation and human stories. Save as news-field-notes-v2.png.

EVENTS — “Learning Beyond Walls”: Four East Asian learners participate in a winter camp and education-fair scene. Include a faceted tent or stage, one backpack, one sketchbook, a geometric bare tree, a muted-sage flag, and a small amber gathering light. Emphasize community and practical experience. Save as events-learning-beyond-walls-v2.png.

CONTACT — “Open Channel”: A modern straight-edged letter station anchors the scene. One East Asian person sends a message while another responds using a phone. Include sparse angular envelope forms, one geometric plant, and a straight street lamp. Emphasize responsiveness and welcome. Save as contact-open-channel-v2.png.

LOGIN — “The Threshold”: One East Asian staff member calmly enters a slightly open angular doorway illuminated by candlelight amber. Include a small key, a straight-edged console, and one minimal plant. Keep the composition especially sparse and secure. Save as login-threshold-v2.png.
```

- [ ] **Step 3: Inspect every output against the same rejection checklist**

Expected: all nine scenes match the master’s palette, representation, geometry, light direction, and illustration finish. Regenerate only the scene that fails.

---

### Task 4: Generate News Thumbnails and Council Portrait Contact Sheets

**Files:**
- Create: `tmp/imagegen/editorial/news-community-classroom-v2.png`
- Create: `tmp/imagegen/editorial/news-speech-intervention-v2.png`
- Create: `tmp/imagegen/editorial/news-green-energy-v2.png`
- Create: `tmp/imagegen/editorial/news-behavioral-coaching-v2.png`
- Create: `tmp/imagegen/editorial/council-portraits-a-v2.png`
- Create: `tmp/imagegen/editorial/council-portraits-b-v2.png`

- [ ] **Step 1: Generate four article thumbnails**

Reference the approved home master and use the Task 3 locked prefix plus these exact scene blocks. Require a `3:2` final composition:

```text
COMMUNITY CLASSROOM: East Asian students and a mentor opening a small Manipur learning center, arranging books and an angular learning table, with a warm doorway and restrained community detail. Save as news-community-classroom-v2.png.

SPEECH INTERVENTION: An East Asian speech therapist and child work with simple learning cards while an educator observes. The interaction is supportive, clinical, and dignified; no medical UI or pseudo-text. Save as news-speech-intervention-v2.png.

GREEN ENERGY: An East Asian researcher and student inspect a simplified straight-edged green-hydrogen demonstration rig with sparse lab props and muted-sage energy accents. Save as news-green-energy-v2.png.

BEHAVIORAL COACHING: An East Asian mentor and learner rehearse an interview across an angular table with one notebook and a simple posture cue. Save as news-behavioral-coaching-v2.png.
```

- [ ] **Step 2: Generate two square portrait contact sheets**

Use this complete prompt for sheet A, then repeat with the sheet B identities. Each sheet is a strict `4 columns × 2 rows` grid with seven used cells and one empty charcoal cell. Every used cell contains one centered, chest-up portrait inside a 4:5-safe region; no dividers, labels, or text.

```text
Use case: stylized-concept
Asset type: deterministic council portrait contact sheet for later cropping
Primary request: Create a square 4-column by 2-row portrait contact sheet. Use seven cells for seven distinct chest-up East Asian expert portraits and leave the final bottom-right cell as plain warm charcoal. Keep identical camera distance, shoulder line, headroom, warm-charcoal background, candlelight amber key light, softly faceted human rendering, and premium flat-vector raster finish in every cell. Keep every face and shoulders inside the centered 4:5-safe crop of its grid cell.
Sheet A identities in reading order: male education founder in his 40s; male corporate mentor in his 40s; male speech therapist in his 40s; male green-hydrogen scientist in his 50s; male community-development leader in his 50s; male executive career coach in his 40s; female life-skills and public-health trainer in her 40s.
Color palette: #24211F, #D79A4B, #F7F4EE, #D8D1C7, muted sage, tiny dusty rose details.
Constraints: all subjects East Asian and clearly distinct; varied hair, clothing, age, facial structure, and pose; no text, labels, logos, dividers, watermark, duplicate faces, uniforms, fantasy clothing, glossy 3D, or photorealism.
```

```text
Use case: stylized-concept
Asset type: deterministic council portrait contact sheet for later cropping
Primary request: Create a square 4-column by 2-row portrait contact sheet. Use seven cells for seven distinct chest-up East Asian expert portraits and leave the final bottom-right cell as plain warm charcoal. Keep identical camera distance, shoulder line, headroom, warm-charcoal background, candlelight amber key light, softly faceted human rendering, and premium flat-vector raster finish in every cell. Keep every face and shoulders inside the centered 4:5-safe crop of its grid cell.
Sheet B identities in reading order: female senior corporate lawyer in her 40s; male maritime faculty member in his 40s; male English professor in his 50s; male senior speech-language therapist in his 50s; female early-childhood education director in her 40s; male teacher-education professor in his 50s; male literature and theatre professor in his 40s.
Color palette: #24211F, #D79A4B, #F7F4EE, #D8D1C7, muted sage, tiny dusty rose details.
Constraints: all subjects East Asian and clearly distinct; varied hair, clothing, age, facial structure, and pose; no text, labels, logos, dividers, watermark, duplicate faces, uniforms, fantasy clothing, glossy 3D, or photorealism.
```

- [ ] **Step 3: Inspect sheet geometry before accepting it**

Expected: exactly eight equal cells, seven distinct portraits, one empty final cell, consistent background/lighting, and no face crossing a cell boundary. Regenerate a sheet if the grid is irregular because deterministic extraction depends on it.

---

### Task 5: Add the Raster Preparation Pipeline

**Files:**
- Modify: `.gitignore`
- Modify: `app/package.json`
- Modify: `app/pnpm-lock.yaml`
- Create: `app/scripts/prepare-editorial-images.mjs`

- [ ] **Step 1: Ignore generation masters**

Append exactly:

```gitignore
# Image-generation working masters
tmp/imagegen/
```

- [ ] **Step 2: Install Sharp with pnpm**

Run: `pnpm add -D sharp`

Expected: `sharp` appears in `devDependencies`; only pnpm updates the lockfile.

- [ ] **Step 3: Add the preparation script**

Add this script entry to `app/package.json`:

```json
"assets:editorial": "node scripts/prepare-editorial-images.mjs"
```

Create `app/scripts/prepare-editorial-images.mjs` with the complete implementation:

```js
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(process.cwd(), '..');
const sourceDir = path.join(root, 'tmp', 'imagegen', 'editorial');
const outputDir = path.join(process.cwd(), 'public', 'images', 'editorial');

const portraitSheets = {
  'council-portraits-a-v2.png': [
    'council-bikash-oinam-v2.webp',
    'council-roshan-khumukcham-v2.webp',
    'council-ronen-akoijam-v2.webp',
    'council-soram-bobby-singh-v2.webp',
    'council-romen-ningthoujam-v2.webp',
    'council-khumukcham-roshaan-singh-v2.webp',
    'council-nutan-nongthongbam-v2.webp',
  ],
  'council-portraits-b-v2.png': [
    'council-takhellambam-geetarani-v2.webp',
    'council-rojit-keisham-v2.webp',
    'council-ngangbam-shantikumar-meetei-v2.webp',
    'council-ronendrojit-akoijam-v2.webp',
    'council-purnimashi-moirangthem-v2.webp',
    'council-tomba-singh-thokchom-v2.webp',
    'council-usham-rojio-v2.webp',
  ],
};

await mkdir(outputDir, { recursive: true });
const files = await readdir(sourceDir);

for (const file of files.filter((name) => name.endsWith('.png'))) {
  if (portraitSheets[file]) continue;
  const outputName = file.replace(/\.png$/i, '.webp');
  await sharp(path.join(sourceDir, file))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(path.join(outputDir, outputName));
}

for (const [sheet, portraits] of Object.entries(portraitSheets)) {
  const input = path.join(sourceDir, sheet);
  const metadata = await sharp(input).metadata();
  if (!metadata.width || !metadata.height) throw new Error(`Missing dimensions for ${sheet}`);

  const cellWidth = Math.floor(metadata.width / 4);
  const cellHeight = Math.floor(metadata.height / 2);
  const cropHeight = Math.min(cellHeight, Math.floor(cellWidth * 1.25));
  const verticalInset = Math.floor((cellHeight - cropHeight) / 2);

  for (const [index, outputName] of portraits.entries()) {
    const column = index % 4;
    const row = Math.floor(index / 4);
    await sharp(input)
      .extract({
        left: column * cellWidth,
        top: row * cellHeight + verticalInset,
        width: cellWidth,
        height: cropHeight,
      })
      .resize({ width: 640, height: 800, fit: 'cover', withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(path.join(outputDir, outputName));
  }
}

console.log(`Prepared editorial assets in ${outputDir}`);
```

- [ ] **Step 4: Prepare the production assets**

Run: `pnpm run assets:editorial`

Expected: ten page posters, four news thumbnails, and fourteen council portraits are present under `app/public/images/editorial/` as WebP files.

- [ ] **Step 5: Commit the pipeline and optimized assets**

```powershell
git add -- .gitignore app/package.json app/pnpm-lock.yaml app/scripts/prepare-editorial-images.mjs app/public/images/editorial
git commit -m "feat: add optimized Nordic editorial artwork"
```

---

### Task 6: Map Accessible Nordic Interface Tokens

**Files:**
- Modify: `app/src/index.css`

- [ ] **Step 1: Verify the ratified contrast values**

Run this read-only calculation:

```powershell
@'
function channel(v){v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4)}
function luminance(hex){const n=parseInt(hex.slice(1),16);return 0.2126*channel((n>>16)&255)+0.7152*channel((n>>8)&255)+0.0722*channel(n&255)}
function ratio(a,b){const x=luminance(a),y=luminance(b);return (Math.max(x,y)+0.05)/(Math.min(x,y)+0.05)}
console.log(ratio('#D79A4B','#F7F4EE').toFixed(2));
console.log(ratio('#925F22','#F7F4EE').toFixed(2));
'@ | node
```

Expected output:

```text
2.22
4.93
```

- [ ] **Step 2: Map the light-shell OKLCH tokens**

Replace the corresponding `:root` values with:

```css
--background: 96.78% 0.0086 84.6deg;
--foreground: 25.03% 0.0059 56.1deg;
--primary: 52.99% 0.1 66.9deg;
--primary-foreground: 96.78% 0.0086 84.6deg;
--muted-foreground: 53.08% 0.0144 75.3deg;
--border: 86.35% 0.0157 77.1deg;
--input: 86.35% 0.0157 77.1deg;
--ring: 52.99% 0.1 66.9deg;
--sidebar-primary: 52.99% 0.1 66.9deg;
--sidebar-primary-foreground: 96.78% 0.0086 84.6deg;
```

The artwork retains Candlelight Amber `#D79A4B`. The light interface uses the darker accessible amber `#925F22` through `primary`; dark mode retains the existing light amber token.

- [ ] **Step 3: Verify and commit**

Run: `pnpm tsc -b`

Expected: PASS.

```powershell
git add -- app/src/index.css
git commit -m "style: map accessible Nordic interface tokens"
```

---

### Task 7: Add the Typed Illustration Registry

**Files:**
- Create: `app/src/lib/editorialIllustrations.ts`
- Create: `app/src/lib/editorialIllustrations.test.ts`

- [ ] **Step 1: Write the failing registry test**

```ts
import { describe, expect, it } from 'vitest';
import { councilPortraits, editorialIllustrations } from './editorialIllustrations';

describe('editorial illustration registry', () => {
  it('defines semantic, versioned WebP assets for every public story', () => {
    expect(Object.keys(editorialIllustrations)).toHaveLength(15);
    for (const asset of Object.values(editorialIllustrations)) {
      expect(asset.src).toMatch(/^\/images\/editorial\/.+-v2\.webp$/);
      expect(asset.alt.length).toBeGreaterThan(12);
      expect(asset.objectPositionClass).toMatch(/^object-/);
      expect(asset.sizes.length).toBeGreaterThan(4);
    }
  });

  it('defines fourteen distinct council portraits', () => {
    expect(councilPortraits).toHaveLength(14);
    expect(new Set(councilPortraits).size).toBe(14);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm run test:run -- src/lib/editorialIllustrations.test.ts`

Expected: FAIL because the registry does not exist.

- [ ] **Step 3: Implement the registry**

```ts
export interface EditorialIllustration {
  src: string;
  alt: string;
  aspectClass: string;
  objectPositionClass: string;
  sizes: string;
}

const heroAspect = 'aspect-[4/3] max-md:aspect-[3/2] max-md:max-h-[360px]';
const landscapeAspect = 'aspect-[3/2]';
const heroSizes = '(min-width: 1024px) 45vw, 100vw';
const landscapeSizes = '(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw';

const hero = (src: string, alt: string): EditorialIllustration => ({
  src,
  alt,
  aspectClass: heroAspect,
  objectPositionClass: 'object-center',
  sizes: heroSizes,
});

const landscape = (src: string, alt: string): EditorialIllustration => ({
  src,
  alt,
  aspectClass: landscapeAspect,
  objectPositionClass: 'object-center',
  sizes: landscapeSizes,
});

export const editorialIllustrations = {
  home: hero('/images/editorial/home-campus-walk-v2.webp', 'East Asian learners approaching an amber-lit education pavilion'),
  about: hero('/images/editorial/about-mentorship-table-v2.webp', 'Founders and a learner sharing ideas at an equal-height mentorship table'),
  programs: hero('/images/editorial/programs-focus-studio-v2.webp', 'Learners mapping a curriculum pathway together in a focused studio'),
  knowledge: hero('/images/editorial/knowledge-quiet-archive-v2.webp', 'Learners reading and listening in a quiet modular learning archive'),
  knowledgeEmpty: { src: '/images/editorial/knowledge-quiet-archive-v2.webp', alt: 'A quiet archive suggesting broader resource discovery', aspectClass: 'aspect-square', objectPositionClass: 'object-center', sizes: '240px' },
  council: hero('/images/editorial/council-roundtable-v2.webp', 'East Asian experts exchanging ideas around an equal roundtable'),
  guidance: hero('/images/editorial/guidance-pathfinding-v2.webp', 'A mentor and learner considering branches on a shared pathway map'),
  news: hero('/images/editorial/news-field-notes-v2.webp', 'A reporter documenting a quiet education interview'),
  events: hero('/images/editorial/events-learning-beyond-walls-v2.webp', 'Learners collaborating during an outdoor education experience'),
  contact: hero('/images/editorial/contact-open-channel-v2.webp', 'People sending and receiving a message through an open channel'),
  login: hero('/images/editorial/login-threshold-v2.webp', 'A staff member entering a calm amber-lit workspace'),
  newsCommunity: landscape('/images/editorial/news-community-classroom-v2.webp', 'A community learning center opening in Manipur'),
  newsSpeech: landscape('/images/editorial/news-speech-intervention-v2.webp', 'A speech therapist supporting a learner with an educator present'),
  newsEnergy: landscape('/images/editorial/news-green-energy-v2.webp', 'A researcher and student examining a green hydrogen demonstration'),
  newsCoaching: landscape('/images/editorial/news-behavioral-coaching-v2.webp', 'A mentor and learner practicing a professional interview'),
} satisfies Record<string, EditorialIllustration>;

export const councilPortraits = [
  'bikash-oinam', 'roshan-khumukcham', 'ronen-akoijam', 'soram-bobby-singh',
  'romen-ningthoujam', 'khumukcham-roshaan-singh', 'nutan-nongthongbam',
  'takhellambam-geetarani', 'rojit-keisham', 'ngangbam-shantikumar-meetei',
  'ronendrojit-akoijam', 'purnimashi-moirangthem', 'tomba-singh-thokchom', 'usham-rojio',
].map((slug) => `/images/editorial/council-${slug}-v2.webp`);
```

- [ ] **Step 4: Verify and commit**

Run: `pnpm run test:run -- src/lib/editorialIllustrations.test.ts`

Expected: PASS, 2 tests.

```powershell
git add -- app/src/lib/editorialIllustrations.ts app/src/lib/editorialIllustrations.test.ts
git commit -m "feat: add typed editorial illustration registry"
```

---

### Task 8: Build the EditorialMedia Primitive

**Files:**
- Create: `app/src/components/ui/editorial-media.tsx`
- Create: `app/src/components/ui/editorial-media.test.tsx`

- [ ] **Step 1: Write the failing component tests**

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
import { EditorialMedia } from './editorial-media';

describe('EditorialMedia', () => {
  it('renders meaningful artwork with responsive loading metadata', () => {
    render(<EditorialMedia asset={editorialIllustrations.home} priority />);
    const image = screen.getByRole('img', { name: /learners approaching/i });
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('fetchpriority', 'high');
    expect(image).toHaveAttribute('sizes', editorialIllustrations.home.sizes);
    expect(image.parentElement).toHaveClass('aspect-[4/3]', 'max-md:aspect-[3/2]');
  });

  it('can mark repeated artwork as decorative', () => {
    const { container } = render(<EditorialMedia asset={editorialIllustrations.knowledgeEmpty} decorative />);
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('keeps the poster field when the image fails', () => {
    const { container } = render(<EditorialMedia asset={editorialIllustrations.home} />);
    const image = screen.getByRole('img');
    fireEvent.error(image);
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass('bg-[#24211F]');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm run test:run -- src/components/ui/editorial-media.test.tsx`

Expected: FAIL because `EditorialMedia` does not exist.

- [ ] **Step 3: Implement the component**

```tsx
import { useState, type ImgHTMLAttributes } from 'react';
import type { EditorialIllustration } from '@/lib/editorialIllustrations';
import { cn } from '@/lib/utils';

interface EditorialMediaProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  asset: EditorialIllustration;
  decorative?: boolean;
  priority?: boolean;
  frameClassName?: string;
  imageClassName?: string;
}

export function EditorialMedia({
  asset,
  decorative = false,
  priority = false,
  frameClassName,
  imageClassName,
  ...imageProps
}: EditorialMediaProps) {
  const [failed, setFailed] = useState(false);
  const { onError, ...restImageProps } = imageProps;

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-none border border-border bg-[#24211F]',
        asset.aspectClass,
        frameClassName,
      )}
    >
      {failed ? null : (
        <img
          {...restImageProps}
          src={asset.src}
          alt={decorative ? '' : asset.alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          sizes={asset.sizes}
          onError={(event) => {
            setFailed(true);
            onError?.(event);
          }}
          className={cn('h-full w-full object-cover', asset.objectPositionClass, imageClassName)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 4: Verify and commit**

Run: `pnpm run test:run -- src/components/ui/editorial-media.test.tsx`

Expected: PASS, 3 tests.

```powershell
git add -- app/src/components/ui/editorial-media.tsx app/src/components/ui/editorial-media.test.tsx
git commit -m "feat: add accessible editorial media primitive"
```

---

### Task 9: Rebuild PageHero and Home Hero Around EditorialMedia

**Files:**
- Create: `app/src/components/ui/page-hero.test.tsx`
- Modify: `app/src/components/ui/page-hero.tsx`
- Modify: `app/src/sections/Hero.tsx`

- [ ] **Step 1: Write failing PageHero tests**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
import { PageHero } from './page-hero';

describe('PageHero', () => {
  it('renders a copy-only hero without an image', () => {
    render(<PageHero eyebrow="Label" title="Quiet title" description="Quiet description" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Quiet title' })).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('places copy and CTA before priority artwork', () => {
    render(
      <PageHero eyebrow="Foundation" title="Where learning begins" description="Description" illustration={editorialIllustrations.home}>
        <button>Start</button>
      </PageHero>,
    );
    const order = screen.getByRole('button', { name: 'Start' }).compareDocumentPosition(screen.getByRole('img'));
    expect(order & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager');
  });
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `pnpm run test:run -- src/components/ui/page-hero.test.tsx`

Expected: FAIL because `illustration` is not a valid prop.

- [ ] **Step 3: Replace PageHero with the shared implementation**

```tsx
import type { ReactNode } from 'react';
import type { EditorialIllustration } from '@/lib/editorialIllustrations';
import { EditorialMedia } from './editorial-media';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  illustration?: EditorialIllustration;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, illustration, children }: PageHeroProps) {
  return (
    <section className="w-full border-b border-border/50 bg-background pt-12">
      <div className={illustration ? 'grid min-h-[75vh] lg:grid-cols-[55fr_45fr]' : 'mx-auto flex min-h-[65vh] max-w-4xl items-center justify-center'}>
        <div className={`flex w-full flex-col justify-center px-8 py-16 md:px-12 lg:px-24 lg:py-24 ${illustration ? '' : 'items-center text-center'}`}>
          <div className={`max-w-lg ${illustration ? '' : 'mx-auto'}`}>
            <span className="mb-5 block text-[10px] font-medium uppercase tracking-[0.3em] text-primary">{eyebrow}</span>
            <h1 className="mb-6 text-3xl font-medium leading-[1.15] tracking-tight text-foreground md:text-4xl lg:text-5xl">{title}</h1>
            <p className="mb-10 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>
            {children ? <div className={`flex flex-col gap-3 sm:flex-row ${illustration ? 'items-start' : 'items-center justify-center'}`}>{children}</div> : null}
          </div>
        </div>
        {illustration ? (
          <div className="flex w-full items-center justify-center border-t border-border/30 bg-muted/5 px-6 pb-16 pt-8 md:px-10 md:pb-20 lg:border-l lg:border-t-0 lg:px-14 lg:pb-24 lg:pt-14">
            <EditorialMedia asset={illustration} priority frameClassName="max-w-xl" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Refactor Home Hero to consume PageHero**

```tsx
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { PageHero } from '../components/ui/page-hero';
import { editorialIllustrations } from '../lib/editorialIllustrations';

export default function Hero() {
  return (
    <PageHero
      eyebrow="Foundation"
      title="Where Learning Begins"
      description="Intimate classrooms where curiosity is kindled through mentorship and collaboration. From learner to leader — shaping the future through expertise, vision, and purpose."
      illustration={editorialIllustrations.home}
    >
      <Button asChild className="h-[44px] rounded-none bg-foreground px-8 text-sm text-background transition-colors duration-200 hover:bg-primary hover:text-primary-foreground">
        <Link to="/contact">Start Your Pathway</Link>
      </Button>
      <Button asChild variant="outline" className="h-[44px] rounded-none border-foreground bg-transparent px-8 text-sm text-foreground transition-colors duration-200 hover:bg-foreground hover:text-background">
        <Link to="/about">Explore Network</Link>
      </Button>
    </PageHero>
  );
}
```

- [ ] **Step 5: Verify and commit**

Run: `pnpm run test:run -- src/components/ui/page-hero.test.tsx`

Expected: PASS, 2 tests.

```powershell
git add -- app/src/components/ui/page-hero.tsx app/src/components/ui/page-hero.test.tsx app/src/sections/Hero.tsx
git commit -m "feat: unify public heroes around editorial artwork"
```

---

### Task 10: Integrate Artwork Across About, Programs, Events, Guidance, and Contact

**Files:**
- Modify: `app/src/pages/About.tsx`
- Modify: `app/src/pages/Programs.tsx`
- Modify: `app/src/pages/SignatureExperiences.tsx`
- Modify: `app/src/pages/Guidance.tsx`
- Modify: `app/src/pages/Contact.tsx`

- [ ] **Step 1: Import the registry in all five pages**

Add exactly:

```tsx
import { editorialIllustrations } from '@/lib/editorialIllustrations';
```

- [ ] **Step 2: Replace string image props with typed illustrations**

Use these exact props:

```tsx
// About
illustration={editorialIllustrations.about}

// Programs
illustration={editorialIllustrations.programs}

// SignatureExperiences
illustration={editorialIllustrations.events}

// Guidance
illustration={editorialIllustrations.guidance}

// Contact
illustration={editorialIllustrations.contact}
```

Remove all `image="/images/..."` props because `PageHero` no longer accepts raw paths.

- [ ] **Step 3: Remove duplicate legacy media blocks**

Delete the entire `contact-visual.png` square `<div>` from Contact's office-details column and the entire `guidance-mentorship.png` square `<div>` from Guidance's pricing grid. Change the Guidance pricing wrapper from:

```tsx
<div className="grid md:grid-cols-2 gap-16 items-center">
```

to:

```tsx
<div className="mx-auto max-w-xl">
```

- [ ] **Step 4: Add visible keyboard focus to modified controls**

Append this exact class fragment to the Programs buttons, Guidance tabs, Events FAQ buttons, and Contact phone/email links:

```text
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background
```

- [ ] **Step 5: Verify the five routes compile and commit**

Run: `pnpm tsc -b`

Expected: PASS with no `image` prop or illustration type errors.

```powershell
git add -- app/src/pages/About.tsx app/src/pages/Programs.tsx app/src/pages/SignatureExperiences.tsx app/src/pages/Guidance.tsx app/src/pages/Contact.tsx
git commit -m "feat: integrate editorial art across core public pages"
```

---

### Task 11: Integrate Knowledge Hub, Council, and News

**Files:**
- Modify: `app/src/pages/KnowledgeHub.tsx`
- Modify: `app/src/pages/Council.tsx`
- Modify: `app/src/pages/News.tsx`

- [ ] **Step 1: Add the shared imports**

```tsx
import { EditorialMedia } from '@/components/ui/editorial-media';
import { councilPortraits, editorialIllustrations } from '@/lib/editorialIllustrations';
```

Use only `editorialIllustrations` in Knowledge Hub and News; Council uses both exports.

- [ ] **Step 2: Add hero artwork**

```tsx
// KnowledgeHub PageHero
illustration={editorialIllustrations.knowledge}

// Council PageHero
illustration={editorialIllustrations.council}

// News PageHero
illustration={editorialIllustrations.news}
```

- [ ] **Step 3: Replace the Knowledge Hub empty state**

```tsx
<div className="flex flex-col items-center py-20 text-center text-[14px] text-muted-foreground">
  <EditorialMedia
    asset={editorialIllustrations.knowledgeEmpty}
    decorative
    frameClassName="mb-8 w-full max-w-[240px]"
  />
  <p>No resources match your query.</p>
</div>
```

Add the standard `focus-visible` class fragment from Task 10 to filter, watch, resource, and close controls.

- [ ] **Step 4: Map distinct Council portraits**

After the `COUNCIL_MEMBERS` array declaration, add:

```tsx
const COUNCIL_WITH_PORTRAITS = COUNCIL_MEMBERS.map((member, index) => ({
  ...member,
  avatar: councilPortraits[index],
}));
```

Replace `COUNCIL_MEMBERS.map` with `COUNCIL_WITH_PORTRAITS.map`. Replace the portrait `<img>` with:

```tsx
<img
  src={member.avatar}
  alt={`${member.name}, ${member.role}`}
  loading="lazy"
  decoding="async"
  className="h-full w-full object-cover transition-[filter] duration-200 grayscale group-hover:grayscale-0"
/>
```

Remove the inline `onError` handler. Add `role="button"`, `tabIndex={0}`, `onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setSelectedMember(member); }}`, and visible focus classes to each member card.

- [ ] **Step 5: Connect News thumbnails to article data**

Add an `illustration` property to each article in order:

```tsx
illustration: editorialIllustrations.newsCommunity
illustration: editorialIllustrations.newsSpeech
illustration: editorialIllustrations.newsEnergy
illustration: editorialIllustrations.newsCoaching
```

Replace the thumbnail placeholder with:

```tsx
<EditorialMedia asset={article.illustration} frameClassName="w-full" />
```

Add the standard visible focus classes to article links.

- [ ] **Step 6: Verify and commit**

Run: `pnpm tsc -b`

Expected: PASS.

```powershell
git add -- app/src/pages/KnowledgeHub.tsx app/src/pages/Council.tsx app/src/pages/News.tsx
git commit -m "feat: complete editorial media for knowledge council and news"
```

---

### Task 12: Redesign Login as the Calm Threshold

**Files:**
- Modify: `app/src/pages/Login.tsx`

- [ ] **Step 1: Preserve the existing authentication behavior**

Do not alter `handleSubmit`, redirect behavior, password visibility, Supabase error handling, or field names.

- [ ] **Step 2: Add the artwork imports**

```tsx
import { EditorialMedia } from '@/components/ui/editorial-media';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
```

- [ ] **Step 3: Replace only the returned layout**

Use this complete structure around the existing form fields and submit button:

```tsx
<div className="min-h-screen w-full bg-background px-6 pb-20 pt-28 md:px-12">
  <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[55fr_45fr]">
    <div className="order-1 w-full max-w-md justify-self-center lg:justify-self-start">
      <div className="mb-10">
        <span className="font-heading text-2xl font-semibold leading-none text-foreground">
          {t('brandName')}<span className="font-light text-primary">{t('brandPlus')}</span>
        </span>
        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">{t('staffPortal')}</p>
      </div>
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-foreground">{t('signIn')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('restrictedAccess')}</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="login-email" className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
            {t('emailLabel')}
          </Label>
          <input
            id="login-email"
            type="email"
            placeholder="name@eduplus.in"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={cn(
              'h-12 w-full rounded-none border border-border bg-background px-3 text-sm text-foreground',
              'placeholder:text-muted-foreground transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="login-password" className="text-[10px] font-medium uppercase tracking-[0.22em] text-foreground">
            {t('passwordLabel')}
          </Label>
          <div className="relative">
            <input
              id="login-password"
              type={showPass ? 'text' : 'password'}
              placeholder="••••••••••••"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={cn(
                'h-12 w-full rounded-none border border-border bg-background px-3 pr-12 text-sm text-foreground',
                'placeholder:text-muted-foreground transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              )}
            />
            <button
              type="button"
              onClick={() => setShowPass((visible) => !visible)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              {showPass ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-1 h-12 w-full rounded-none text-xs font-medium uppercase tracking-[0.22em] focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          disabled={submitting}
        >
          {submitting ? t('signingIn') : t('signIn')}
        </Button>
      </form>
    </div>
    <div className="order-2 pb-8 lg:pb-16">
      <EditorialMedia asset={editorialIllustrations.login} priority />
    </div>
  </div>
</div>
```

Change input and button focus classes to:

```text
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background
```

- [ ] **Step 4: Verify authentication tests and TypeScript**

Run: `pnpm run test:run -- src/lib/AuthContext.test.tsx src/components/ProtectedRoute.test.tsx`

Expected: PASS.

Run: `pnpm tsc -b`

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add -- app/src/pages/Login.tsx
git commit -m "feat: redesign staff login as a calm editorial threshold"
```

---

### Task 13: Remove Public HUD Artifacts and Dead Spotlight Effects

**Files:**
- Modify: `app/src/App.tsx`
- Delete: `app/src/components/AIChatAgent.tsx`
- Delete: `app/src/components/AIChatAgent.test.tsx`
- Delete: `app/src/components/effects/Spotlight.tsx`
- Delete: `app/src/components/effects/Spotlight.test.tsx`

- [ ] **Step 1: Remove the floating public AI mount**

Delete:

```tsx
import AIChatAgent from './components/AIChatAgent';
```

Delete `isLogin`, `showChatAgent`, and this render:

```tsx
{showChatAgent && <AIChatAgent />}
```

Keep `openRouter.ts` and `openRouter.test.ts` unchanged for a possible future authenticated advisor experience.

- [ ] **Step 2: Remove prohibited pulsing loader motion**

Replace:

```tsx
<div className="w-8 h-1 bg-primary animate-pulse" />
```

with:

```tsx
<div className="h-px w-12 bg-foreground" aria-label="Loading page" role="status" />
```

- [ ] **Step 3: Delete the floating AI UI and unused Spotlight component**

Run:

```powershell
Remove-Item -LiteralPath 'app/src/components/AIChatAgent.tsx'
Remove-Item -LiteralPath 'app/src/components/AIChatAgent.test.tsx'
Remove-Item -LiteralPath 'app/src/components/effects/Spotlight.tsx'
Remove-Item -LiteralPath 'app/src/components/effects/Spotlight.test.tsx'
```

Expected: `rg -n "Spotlight|SpotLightItem" app/src -g '*.tsx'` returns no component imports.

- [ ] **Step 4: Verify App and remaining tests**

Run: `pnpm run test:run -- src/App.test.tsx src/lib/openRouter.test.ts`

Expected: PASS; public App rendering and the retained service helper remain healthy.

- [ ] **Step 5: Commit**

```powershell
git add -- app/src/App.tsx app/src/components/AIChatAgent.tsx app/src/components/AIChatAgent.test.tsx app/src/components/effects/Spotlight.tsx app/src/components/effects/Spotlight.test.tsx
git commit -m "refactor: remove public HUD and unused spotlight effects"
```

---

### Task 14: Update Public Route Smoke Coverage

**Files:**
- Modify: `app/e2e/smoke.spec.ts`

- [ ] **Step 1: Replace the obsolete route matrix**

```ts
const routes = [
  { path: '/', heading: /Where Learning Begins/i, image: /learners approaching/i },
  { path: '/about', heading: /Know Who We Are/i, image: /mentorship table/i },
  { path: '/programs', heading: /Future-Ready Programs/i, image: /curriculum pathway/i },
  { path: '/knowledge-hub', heading: /Knowledge Hub/i, image: /learning archive/i },
  { path: '/events', heading: /Signature Experiences/i, image: /education experience/i },
  { path: '/council', heading: /Global Expert Council/i, image: /experts exchanging ideas/i },
  { path: '/guidance', heading: /One-to-One Guidance/i, image: /pathway map/i },
  { path: '/news', heading: /News & Insights/i, image: /education interview/i },
  { path: '/contact', heading: /Contact & Locations/i, image: /open channel/i },
  { path: '/login', heading: /Sign in/i, image: /entering a calm amber-lit workspace/i },
];
```

- [ ] **Step 2: Replace the public navigation test loop**

```ts
for (const route of routes) {
  await page.goto(route.path);
  const container = page.locator('#main-scroll-container');
  await expect(container).toBeVisible();
  await expect(container.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();
  await expect(container.getByRole('img', { name: route.image })).toBeVisible();
}
```

Remove obsolete `/resources`, `/connect`, `/pricing`, pricing-toggle, and Connect-scheduler tests because those routes are not registered in `App.tsx`.

- [ ] **Step 3: Add a mobile crop test**

```ts
test('public hero artwork uses a bounded mobile crop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const image = page.getByRole('img', { name: /learners approaching/i });
  await expect(image).toBeVisible();
  const box = await image.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeLessThanOrEqual(360);
});
```

- [ ] **Step 4: Run Chromium smoke tests**

Run: `pnpm exec playwright test --project=chromium`

Expected: all public route and mobile tests pass with no page errors.

- [ ] **Step 5: Commit**

```powershell
git add -- app/e2e/smoke.spec.ts
git commit -m "test: cover Nordic editorial public routes"
```

---

### Task 15: Final Compliance, Performance, and Visual Verification

**Files:**
- Modify only files implicated by failures in the commands below; do not refactor unrelated dashboard code.

- [ ] **Step 1: Verify no legacy public assets remain referenced**

Run:

```powershell
rg -n "hero-frame-01|about-collab|programs-curriculum|events-summit|guidance-mentorship|contact-visual|male_avatar|female_avatar" app/src
```

Expected: no matches.

- [ ] **Step 2: Verify typography, UI rules, and prohibited effects**

Run:

```powershell
rg -n "animate-pulse|rounded-(sm|md|lg|xl|2xl|3xl)|shadow-\[|bg-emerald|text-emerald|mix-blend" app/src/pages app/src/sections app/src/components/ui
```

Expected: no newly introduced violations in modified public files.

Run: `pnpm run ui-check`

Expected: exit code 0. Existing unrelated warnings may remain, but there are no errors.

- [ ] **Step 3: Run the full unit and static-analysis suite**

Run: `pnpm tsc -b`

Expected: PASS.

Run: `pnpm run test:run`

Expected: all unit tests pass.

Run: `pnpm run lint`

Expected: PASS. Fix only violations in files modified by this plan; document any pre-existing unrelated failure with file and line evidence.

- [ ] **Step 4: Build production output**

Run: `pnpm run build`

Expected: PASS with production assets emitted and no missing image imports.

- [ ] **Step 5: Run cross-browser route smoke tests**

Run: `pnpm run test:e2e`

Expected: Chromium and WebKit pass; Firefox remains intentionally disabled in configuration.

- [ ] **Step 6: Perform manual visual review**

Review all ten public routes at `1440×900`, `1024×768`, and `390×844`.

Acceptance checklist:

- all people are East Asian;
- all page and article scenes share one poster grammar;
- no fake text, watermarks, extra limbs, glossy 3D, neon, HUD styling, or curved environmental ornament appears;
- dark plates have a straight Soft Stone border and recovery spacing, with no shadow;
- mobile copy and CTA precede a bounded 3:2 artwork crop;
- amber is not used as text, link, or focus color on Arctic Paper;
- keyboard focus is visible on modified controls;
- Knowledge Hub empty art is centered and no wider than 240px;
- fourteen Council members have distinct 4:5 portraits;
- layout remains readable if images are disabled.

- [ ] **Step 7: Commit final corrections and documentation**

Stage only files actually corrected during verification, then commit:

```powershell
git commit -m "fix: complete Nordic editorial quality gate"
```

If no corrections were needed, do not create an empty commit.
