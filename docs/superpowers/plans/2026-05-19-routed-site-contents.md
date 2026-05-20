# Routed Site Contents Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate routed multi-page site structure, copy, and visual features from `contents.md` into the EduPlus Skills React application.

**Architecture:** Create dedicated page components under `src/pages/` utilizing React Router v7 client-side navigation. Apply a hybrid backdrop model (video background on Home, slate backgrounds on sub-pages) with custom HSL variables and glowing glassmorphic elements.

**Tech Stack:** React 19, React Router v7, Three.js (React Three Fiber), Tailwind CSS, Vitest.

---

## Proposed Changes

### Task 1: Client-Side Routing and Navigation Setup

**Files:**
- Create: [App.test.tsx](file:///c:/edu-plus/app/src/App.test.tsx)
- Modify: [App.tsx](file:///c:/edu-plus/app/src/App.tsx)
- Modify: [Navigation.tsx](file:///c:/edu-plus/app/src/sections/Navigation.tsx)
- Modify: [Footer.tsx](file:///c:/edu-plus/app/src/sections/Footer.tsx)

- [ ] **Step 1: Write routing unit tests**
  Create `src/App.test.tsx` containing tests for route navigation:
  ```typescript
  import { render, screen } from '@testing-library/react'
  import { MemoryRouter } from 'react-router'
  import { describe, it, expect } from 'vitest'
  import App from './App'

  describe('App Routing', () => {
    it('renders Home page title by default', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    })

    it('renders About page title on /about', () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <App />
        </MemoryRouter>
      )
      expect(screen.getByText(/Know Who We Are/i)).toBeInTheDocument()
    })
  })
  ```

- [ ] **Step 2: Run test suite to verify failure**
  Run: `pnpm run test:run`
  Expected: Failure due to missing routes/pages.

- [ ] **Step 3: Define Route Paths and Skeletons**
  Create empty skeleton files for pages under `src/pages/` so they compile:
  - `src/pages/Home.tsx`
  - `src/pages/About.tsx`
  - `src/pages/Programs.tsx`
  - `src/pages/SignatureExperiences.tsx`
  - `src/pages/Council.tsx`
  - `src/pages/Guidance.tsx`
  - `src/pages/News.tsx`
  - `src/pages/Contact.tsx`

  Update `src/App.tsx` to handle routing:
  ```typescript
  import { Routes, Route } from 'react-router';
  import Navigation from './sections/Navigation';
  import Footer from './sections/Footer';
  import Home from './pages/Home';
  import About from './pages/About';
  import Programs from './pages/Programs';
  import SignatureExperiences from './pages/SignatureExperiences';
  import Council from './pages/Council';
  import Guidance from './pages/Guidance';
  import News from './pages/News';
  import Contact from './pages/Contact';

  function App() {
    return (
      <div className="relative min-h-screen bg-[#0B0F14] flex flex-col justify-between">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/events" element={<SignatureExperiences />} />
            <Route path="/council" element={<Council />} />
            <Route path="/guidance" element={<Guidance />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }

  export default App;
  ```

- [ ] **Step 4: Update Navigation and Footer components**
  Modify `src/sections/Navigation.tsx` and `src/sections/Footer.tsx` to use `<Link>` and `<NavLink>` from `react-router` mapping to routes rather than anchor hashes.

- [ ] **Step 5: Run tests and verify success**
  Run: `pnpm run test:run`
  Expected: PASS

---

### Task 2: Home Page Integration and Hero Video Update

**Files:**
- Modify: [Home.tsx](file:///c:/edu-plus/app/src/pages/Home.tsx)
- Modify: [Hero.tsx](file:///c:/edu-plus/app/src/sections/Hero.tsx)

- [ ] **Step 1: Replace Hero video source url**
  Update the `<video>` component src inside `src/sections/Hero.tsx` to use the Cloudinary URL:
  `https://res.cloudinary.com/don7nlsnp/video/upload/v1779208942/hero-bg_dlyb9f.mp4`

- [ ] **Step 2: Implement Home page sections**
  Update `src/pages/Home.tsx` to render the home layout:
  ```typescript
  import Hero from '../sections/Hero';
  import Vision from '../sections/Vision';
  import ServicesMatrix from '../sections/ServicesMatrix';

  export default function Home() {
    return (
      <>
        <Hero />
        <Vision />
        <ServicesMatrix />
      </>
    );
  }
  ```

- [ ] **Step 3: Verify linter and build**
  Run: `pnpm run lint` and `pnpm run build`
  Expected: Success.

---

### Task 3: About Page Component Implementation

**Files:**
- Modify: [About.tsx](file:///c:/edu-plus/app/src/pages/About.tsx)

- [ ] **Step 1: Implement copy and values grid**
  Create `src/pages/About.tsx` with page layouts for "Know Who We Are", "Inside EduPlus Skills", and the values matrix ("What We Stand For").
  Use glowing liquid-glass cards displaying details for:
  - *Clarity of Direction*
  - *Access to Opportunity*
  - *Right Skills at the Right Time*

- [ ] **Step 2: Verify build**
  Run: `pnpm run build`
  Expected: Success.

---

### Task 4: Programs Page Component Implementation

**Files:**
- Modify: [Programs.tsx](file:///c:/edu-plus/app/src/pages/Programs.tsx)

- [ ] **Step 1: Implement 6 pillars interactive grid**
  Write code in `src/pages/Programs.tsx` to display all six programs: FuturePath Navigator, LifeSkills Lab, Expert Connect Live, Global Admissions Studio, Career Launchpad, Innovation Studio & Educator Academy.
  Implement a drawer/sheet modal component that displays detailed copy and target outcomes when clicking a program.

- [ ] **Step 2: Verify build**
  Run: `pnpm run build`
  Expected: Success.

---

### Task 5: Signature Experiences Component Implementation

**Files:**
- Modify: [SignatureExperiences.tsx](file:///c:/edu-plus/app/src/pages/SignatureExperiences.tsx)

- [ ] **Step 1: Implement Flagship Events layout**
  Write cards for Winter Camp, Summer Camp, and Education Fair, mapping details (Duration, Focus, and Highlights) from `contents.md` into responsive sections.

- [ ] **Step 2: Verify build**
  Run: `pnpm run build`
  Expected: Success.

---

### Task 6: Leadership & Global Expert Council Integration

**Files:**
- Modify: [Council.tsx](file:///c:/edu-plus/app/src/pages/Council.tsx)

- [ ] **Step 1: Integrate 3D Holographic Text Ring**
  Place the `<HolographicTextRing />` canvas layer at the top of the Council page, adjusting layout bounds to form a futuristic visual header.

- [ ] **Step 2: Build filterable members grid**
  Integrate the Founding Team and the 11 Expert Council members. Render quick-action category filters at the top of the section (e.g. *Founders, Science Research, Community Development, Maritime & Career Mentorship*). Cards display titles, domains, and full bios on hover.

- [ ] **Step 3: Verify build**
  Run: `pnpm run build`
  Expected: Success.

---

### Task 7: One-to-One Guidance Component Implementation

**Files:**
- Modify: [Guidance.tsx](file:///c:/edu-plus/app/src/pages/Guidance.tsx)

- [ ] **Step 1: Implement tabbed stakeholder navigator**
  Write tab-switching logic for Students, Parents, Job Seekers, and Teachers, presenting customized guidance copy and call-to-action buttons.

- [ ] **Step 2: Verify build**
  Run: `pnpm run build`
  Expected: Success.

---

### Task 8: News & Insights Component Implementation

**Files:**
- Modify: [News.tsx](file:///c:/edu-plus/app/src/pages/News.tsx)

- [ ] **Step 1: Implement Stories & updates grid**
  Create visual news cards simulating real platforms events (such as the launch of regional innovation labs, Singapore speech therapist collaborations, and placement tracks).

- [ ] **Step 2: Verify build**
  Run: `pnpm run build`
  Expected: Success.

---

### Task 9: Contact & Locations Component Implementation

**Files:**
- Modify: [Contact.tsx](file:///c:/edu-plus/app/src/pages/Contact.tsx)

- [ ] **Step 1: Implement details and newsletter subscription**
  Render Manipur Bazar address details, telephone lines, and a newsletter sign-up form utilizing input components styled in `.liquid-glass`.

- [ ] **Step 2: Verify build**
  Run: `pnpm run build`
  Expected: Success.

---

### Task 10: Final Verification & Test Runs

- [ ] **Step 1: Verify linter, build, and tests**
  Run commands:
  - `pnpm run lint`
  - `pnpm run test:run`
  - `pnpm run build`
  Expected: Zero errors.
