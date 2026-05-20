# Design Spec: Routed Site Contents Integration

## Goal Description
Integrate all site structure, copy, and features described in [contents.md](file:///C:/edu-plus/docs/contents.md) into a premium, responsive multi-page React application using React Router v7.

---

## Approved Architectural & Design Choices

### 1. Site Structure (Modular Routed SPA)
Each section defined in the global site structure maps directly to its own route and component:
*   `/` -> [Home.tsx](file:///c:/edu-plus/app/src/pages/Home.tsx)
*   `/about` -> [About.tsx](file:///c:/edu-plus/app/src/pages/About.tsx)
*   `/programs` -> [Programs.tsx](file:///c:/edu-plus/app/src/pages/Programs.tsx)
*   `/events` -> [SignatureExperiences.tsx](file:///c:/edu-plus/app/src/pages/SignatureExperiences.tsx)
*   `/council` -> [Council.tsx](file:///c:/edu-plus/app/src/pages/Council.tsx)
*   `/guidance` -> [Guidance.tsx](file:///c:/edu-plus/app/src/pages/Guidance.tsx)
*   `/news` -> [News.tsx](file:///c:/edu-plus/app/src/pages/News.tsx)
*   `/contact` -> [Contact.tsx](file:///c:/edu-plus/app/src/pages/Contact.tsx)

### 2. Backdrop & Styling Strategy (Hybrid Backdrop)
*   **Home Page**: Ambient loop video background using the newly requested Cloudinary source:
    `https://res.cloudinary.com/don7nlsnp/video/upload/v1779208942/hero-bg_dlyb9f.mp4`
*   **Sub-pages**: Sleek solid dark slate background (`#0B0F14`) featuring cyan (`#7DF9FF`) radial glows and `.liquid-glass` cards, maximizing content legibility and loading times.

### 3. Key Component Layouts
*   **Navigation & Footer**: Updated to use React Router’s `<Link>` and `<NavLink>` tags to facilitate client-side navigation.
*   **Programs Page**: Interactive grid with hover effects displaying the six core program pillars. Clicking any card displays a detailed overlay sheet with its full curriculum.
*   **Signature Experiences**: Grid cards displaying camp options (Winter Camp, Summer Camp, Education Fair) with duration, target audience, and overview details.
*   **Leadership & Expert Council**: Grid of profile cards filterable by category (Founders, Academic Research, Industry Experts, Community Leads) with hover cards showing biographies, backed by the 3D Holographic Text Ring rotating as a digital header centerpiece.
*   **One-to-One Guidance**: Tabbed view tailored for stakeholders (Students, Parents, Job Seekers, Teachers) with personalized roadmap milestones and contact CTA buttons.

---

## Detailed Directory and File Plan

### 1. Routing Setup
Modify `App.tsx` to integrate routes and render pages inside a flex layout containing `Navigation` and `Footer`.

### 2. Page Components
Create components under `src/pages/` using custom CSS, HSL colors, responsive grids, and subtle mount micro-animations.

---

## Verification Plan

### 1. Automated Checks
*   Verify that `pnpm run lint` compiles with 0 errors.
*   Verify that `pnpm run build` generates a successful production bundle.
*   Verify that `pnpm run test:run` runs unit tests successfully.

### 2. Manual Verification
*   Verify route switching happens instantly without page reloads.
*   Confirm the new video background displays correctly on the home page.
*   Confirm sub-pages render with high-contrast slate backgrounds and glow effects.
