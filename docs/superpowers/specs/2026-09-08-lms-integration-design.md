# Design Specification — EduPlus Learning Management System (LMS) Integration

**Date:** 2026-09-08  
**Status:** In Review  
**Extends:** `2026-07-14-nordic-editorial-illustration-system-design.md`, `2026-07-14-nordic-minimalism-design.md`  
**Scope:** Curriculum-based LMS Architecture, Course Hub, Module & Lesson Viewer, Quiz Assessment Engine, Credential Generator, Staff Dashboard Telemetry, and Nordic Editorial Artwork.

---

## 1. Executive Summary

This specification outlines the architecture, UX flows, data contracts, and design tokens for integrating a native **Learning Management System (LMS)** into the EduPlus Skills ecosystem (`c:\edu-plus\app`).

The LMS digitizes and operationalizes the **6 core EduPlus curriculum tracks** established in `docs/contents.md`:
1. **FuturePath Navigator** — Psychometric scanning, DMIT aptitude analysis, stream selection, and personalized career roadmapping.
2. **LifeSkills Lab** — Soft skills, verbal/presentation mastery, analytical problem solving, emotional intelligence, financial literacy, and digital ethics.
3. **Expert Connect Live** — Subject matter masterclasses, industry transitions, and live mentorship dialogues.
4. **Global Admissions Studio** — Domestic entrance exam preparation (JEE, NEET, CUET, CLAT) & global university admissions (SAT, IELTS, SOP writing, visa protocols).
5. **Career Launchpad** — Employability acceleration, portfolio development, mock interviews, and corporate placement pipelines (domestic hubs and international/Dubai).
6. **Innovation Studio & Educator Academy** — STEM/robotics project incubation and pedagogical excellence training for educators.

The LMS strictly respects the **Nordic Lagom** design philosophy: straight edges (`rounded-none`), warm charcoal backgrounds, candlelight amber accents, warm off-white text, refined animations, and flat-vector editorial art representing East Asian learners and educators.

---

## 2. Core Architecture & Route Map

The LMS operates within the React 19 + TypeScript + Tailwind single-page application under `src/`:

```
src/
├── types/
│   └── lms.ts                         # Core LMS interfaces & progress types
├── data/
│   └── lmsCurriculumData.ts           # Rich curriculum content for all 6 tracks
├── lib/
│   └── lmsProgressContext.tsx         # Persistent progress tracking provider (localStorage + Supabase sync)
├── pages/
│   ├── LmsHub.tsx                     # /lms — Course Catalog, Learner Telemetry & Badges
│   ├── LmsTrackDetail.tsx             # /lms/tracks/:trackId — Syllabus, Prerequisites, Outcomes
│   ├── LmsLessonPlayer.tsx            # /lms/learn/:trackId/:lessonId — Interactive Video/Text Player & Takeaways
│   └── LmsQuiz.tsx                    # /lms/quiz/:trackId/:moduleId — Assessment Engine & Certificate Modal
├── components/
│   ├── lms/
│   │   ├── CertificateModal.tsx       # Straight-edged printable completion certificate
│   │   ├── LessonSidebar.tsx          # Collapsible track outline with active status
│   │   └── TrackCard.tsx              # Straight-edged track card with progress indicator
│   └── dashboard/
│       └── LmsManager.tsx             # Staff dashboard tab for curriculum & learner analytics
```

### Route Map
- `/lms` — Main LMS Portal: filterable catalog by domain, active enrollments, overall progress summary, and certificates.
- `/lms/tracks/:trackId` — Track syllabus overview, module roadmap, council advisor linkage, learning outcomes.
- `/lms/learn/:trackId/:lessonId` — Focus player: video lecture / deep reading mode, key takeaways, practical exercises, previous/next navigation, mark complete action.
- `/lms/quiz/:trackId/:moduleId` — Interactive module assessment: multiple choice scenario questions, instant rationales, score computation, and Certificate of Competence generation.

---

## 3. Data Model (`src/types/lms.ts`)

```typescript
export type CurriculumCategory =
  | 'career_exploration'
  | 'human_capabilities'
  | 'industry_mentorship'
  | 'global_admissions'
  | 'placement_careers'
  | 'stem_pedagogy';

export interface LmsQuestion {
  readonly id: string;
  readonly prompt: string;
  readonly options: readonly string[];
  readonly correctIndex: number;
  readonly explanation: string;
}

export interface LmsQuiz {
  readonly id: string;
  readonly moduleId: string;
  readonly title: string;
  readonly description: string;
  readonly passingPercentage: number;
  readonly questions: readonly LmsQuestion[];
}

export interface LmsLesson {
  readonly id: string;
  readonly moduleId: string;
  readonly title: string;
  readonly durationMinutes: number;
  readonly type: 'video' | 'reading' | 'interactive' | 'workshop';
  readonly summary: string;
  readonly videoUrl?: string;
  readonly contentHtml: string;
  readonly keyTakeaways: readonly string[];
  readonly practicalExercise?: string;
  readonly resources?: readonly { title: string; type: string; url?: string }[];
}

export interface LmsModule {
  readonly id: string;
  readonly trackId: string;
  readonly order: number;
  readonly title: string;
  readonly description: string;
  readonly lessons: readonly LmsLesson[];
  readonly quiz?: LmsQuiz;
}

export interface CurriculumTrack {
  readonly id: string;
  readonly code: string;
  readonly category: CurriculumCategory;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly targetAudience: string;
  readonly estimatedHours: number;
  readonly level: 'Foundational' | 'Intermediate' | 'Advanced' | 'Professional';
  readonly councilLead: {
    readonly name: string;
    readonly title: string;
    readonly portraitSlug: string;
  };
  readonly modules: readonly LmsModule[];
  readonly learningOutcomes: readonly string[];
}

export interface LearnerProgress {
  readonly enrolledTrackIds: readonly string[];
  readonly completedLessonIds: readonly string[];
  readonly quizResults: Record<string, { score: number; passed: boolean; completedAt: string }>;
  readonly lastActiveLesson: { trackId: string; lessonId: string } | null;
}
```

---

## 4. UI & Design System Alignment

1. **Straight Lines Exclusively**:
   - Zero rounded corners (`rounded-none`).
   - Cards, buttons, modal dialogs, tabs, progress bars, and badges are strictly orthogonal.
2. **Color Palette (OKLCH)**:
   - Background: `--background` (warm charcoal dark, warm off-white light).
   - Accents: `--primary` (candlelight amber/gold).
   - Surfaces: `--card`, `--border`, `--muted`.
   - Contrast check: All text meets WCAG AA standards.
3. **Typography**:
   - Headers: `font-heading` (`Inter Variable`).
   - Body: `font-sans` (`Inter Variable` / `Outfit`).
   - Monospace: Reserved solely for course codes (e.g. `CRS-FP-01`, `MOD-LS-03`) and timestamp telemetry.
4. **Artwork**:
   - Clean flat-vector raster illustrations with soft-gradient cel shading, warm dark charcoal backgrounds, and candlelight amber accents.
   - East Asian characters only for all human figures.

---

## 5. Editorial Illustration Generation Plan

We will generate 3 locked-style editorial images matching the art direction of the approved Campus Walk and Focus Studio assets:

1. **`lms-portal-hero`**:
   - Scene: An East Asian learner studying at a clean straight-edged modular learning desk with digital course tablets, warm amber lighting, notebooks, and focused study setup in a quiet Nordic studio.
2. **`lms-curriculum-pathway`**:
   - Scene: Two East Asian learners analyzing an angular modular skill blueprint and curriculum roadmap on a digital tablet at a minimalist desk.
3. **`lms-assessment-mastery`**:
   - Scene: An East Asian student receiving a geometric completion credential and celebrating skill achievement beside an instructor at a modern straight-edged podium.

All generated master PNGs will be processed via sharp into WebPs at `app/public/images/editorial/` and integrated into `lib/editorialIllustrations.ts`.

---

## 6. Testing and Validation Plan

1. **Unit & Component Testing**:
   - `Lms.test.tsx` testing track rendering, lesson navigation, completion toggling, progress calculation, and quiz grading.
2. **Design Compliance**:
   - Run `node scripts/check-ui-compliance.js` to ensure 0 rounded corners or unapproved styles.
3. **Build & Type Checking**:
   - Run `pnpm tsc -b` and `pnpm test:run`.
