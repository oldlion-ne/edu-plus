# Spec: Knowledge Hub & Cyberpunk Portal Command Center (Approach A)

**Date:** 2026-05-20  
**Author:** Antigravity (Project Manager & CTO, Silicon Valley Big Tech)  
**Status:** Approved  

---

## 1. Executive Summary & Objective

This specification details the architecture and implementation design for the new **Knowledge Hub** and **Cyberpunk Portal Admin Dashboard** in the Edu+ web application. 

By bridging public-facing instructional materials with an advanced, role-based, real-time command center, this system delivers an out-of-the-box experience. Features include a dynamic AI Chat Agent context compiler (allowing real-time custom training from the dashboard), a bespoke cyberpunk guided onboarding tour, real-time contact page synchronization, and a custom sonar-themed notification engine.

---

## 2. Technical Stack & Design Principles

1.  **Frontend Layout**: React 19, TypeScript, React Router v7, Tailwind CSS.
2.  **Design Theme**: Cyberpunk / Sci-Fi Telemetry. High-contrast neon-cyan accents (`#7DF9FF`), dark slate backgrounds (`#0B0F14`), clean glassmorphism (`liquid-glass`), and futuristic monospace telemetry readouts.
3.  **Straight-Line Compliance**: 100% adherence to the `CLAUDE.md` layout rule. **Every container, card, modal, button, and input element must have `rounded-none` borders.** No rounded corners are allowed.
4.  **Backend Integration**: Supabase (Auth, DB, Realtime, Policies).
5.  **Notifications**: `sonner` for toast notifications, customized with the cyberpunk telemetry styling, combined with a custom-pulsing Sonar Bell drop-down list.

---

## 3. Database Schema Design (Supabase PostgreSQL)

We will provision four new tables inside the `public` schema. RLS (Row Level Security) will be active on all tables.

### 3.1. Table: `public.user_roles`
Maps application users to system roles.
```sql
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role text NOT NULL CHECK (role IN ('admin', 'educator', 'resource_person')),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to roles" ON public.user_roles 
    FOR SELECT TO public USING (true);

CREATE POLICY "Allow admin to manage roles" ON public.user_roles 
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'
        )
    );
```

### 3.2. Table: `public.knowledge_hub`
Stores resources like tutorials, podcasts, webinars, and study materials.
```sql
CREATE TABLE public.knowledge_hub (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    category text NOT NULL CHECK (category IN ('tutorial', 'podcast', 'webinar', 'study_material')),
    media_type text NOT NULL CHECK (media_type IN ('video_embed', 'document_url', 'external_link')),
    url text NOT NULL,
    uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    author_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.knowledge_hub ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to content" ON public.knowledge_hub 
    FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated staff to upload content" ON public.knowledge_hub 
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role IN ('admin', 'educator', 'resource_person')
        )
    );
```

### 3.3. Table: `public.kb_documents`
Stores custom facts, rules, and Q&A to retrain/enrich the AI chatbot.
```sql
CREATE TABLE public.kb_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    question text NOT NULL,
    answer text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.kb_documents ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to kb" ON public.kb_documents 
    FOR SELECT TO public USING (true);

CREATE POLICY "Allow staff to manage kb" ON public.kb_documents 
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role IN ('admin', 'educator')
        )
    );
```

### 3.4. Table: `public.contact_messages`
Synchronizes submitted inquiries from `/contact` page with the admin console.
```sql
CREATE TABLE public.contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    profile text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'unread' NOT NULL CHECK (status IN ('unread', 'read', 'archived')),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public inserts" ON public.contact_messages 
    FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow staff to read/update messages" ON public.contact_messages 
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role IN ('admin', 'educator')
        )
    );
```

---

## 4. Architectural Workflows & Logic Specs

### 4.1. Dynamic AI Training Engine (`AIChatAgent.tsx`)
1.  On initialization, the chatbot calls `supabase.from('kb_documents').select('*').eq('is_active', true)`.
2.  If data is returned, it compiles a dynamic instruction block:
    ```text
    Additional verified site knowledge rules:
    [Fact 1] Question: ... Answer: ...
    [Fact 2] Question: ... Answer: ...
    ```
3.  This dynamic context block is appended to the main static `SYSTEM_PROMPT` payload, allowing instant chatbot "re-training" whenever database entries change.

### 4.2. Real-Time Sonar Syncing (Contact page to Dashboard)
1.  **Submission**: On `/contact`, the user submits the form. Instead of just client-side mockup success, the site calls `supabase.from('contact_messages').insert({ name, email, profile, message })`.
2.  **Listener**: On `/dashboard`, a `supabase.channel()` listener subscribes to `public.contact_messages` real-time events.
3.  **Action**:
    *   Fires a neon-styled `sonner` toast detailing the incoming transmission.
    *   Activates an `animate-ping` pulsing animation on the header's notification bell.
    *   Appends the new message dynamically to the message list without requiring a manual refresh.

### 4.3. Cyberpunk Spotlight Guided Tour
A bespoke `<DashboardOnboardingTour />` component loads on the dashboard if `localStorage.getItem('edu_plus_onboarding_completed')` is missing.
1.  It iterates over a sequence of element selectors:
    *   Step 1: `#nav-sidebar` (Navigation matrix)
    *   Step 2: `#view-overview` (Telemetry charts)
    *   Step 3: `#view-uploader` (Content Upload matrix)
    *   Step 4: `#view-ai-matrix` (AI Cognitive Training terminal)
    *   Step 5: `#view-message-hub` (Real-time Message Center)
2.  Using a `ResizeObserver` and `getBoundingClientRect()`, it draws a dark backdrop and projects a highlighted border-box (`border-2 border-[#7DF9FF] shadow-[0_0_15px_#7DF9FF] rounded-none`) exactly around the targets.
3.  Renders a floating, high-tech text instruction card with controls for `BACK`, `NEXT`, and `SKIP`.

---

## 5. UI/UX Specification

### 5.1. Front-Facing `/knowledge-hub`
*   **Hero Section**: Glassmorphic banner displaying current hub stats (e.g. `12 TUTORIALS // 4 WEBINARS`).
*   **Search and Filter Matrix**: Monospace input with cyan text. Responsive cards grouped by `tutorials`, `podcasts`, `webinars`, and `study_materials`.
*   **Dynamic Hover Card**: Shows a grid hover scanline effect. YouTube and Vimeo video resources load into a modal theatre within the page rather than jumping out to third-party sites.

### 5.2. Dashboard Console `/dashboard`
*   **Quick-Login Selector (Dev Node)**: Accessible in the header during review, enabling toggles between `Admin`, `Educator`, `Resource Person`, and `Public User` to test UI role layouts without needing complex signup cycles.
*   **UI Layout**: Sidebar navigation list, active role telemetry badge, content details grid showing charts built with Tailwind progress bars and styled components.
*   **Style**: `#0B0F14` background, cyan telemetry status indicators, 100% `rounded-none` borders.

---

## 7. Verification and Acceptance Criteria

1.  **Dynamic AI Chat**: Adding a custom fact about a unique program to `kb_documents` should immediately enable the AI Chat Agent to correctly answer questions using that specific fact.
2.  **Real-Time Sync**: Submitting a contact inquiry must trigger an instant toast and sound/radar ping on an open Admin Dashboard session.
3.  **Straight-Line Compliance**: Auditing the `/knowledge-hub` and `/dashboard` HTML elements must show 100% compliance with `rounded-none`. No browser rounded borders are allowed.
4.  **Guided Tour**: First-time login must launch the onboarding tour. Completion/skipping must persist in local storage. Manual reboot of onboarding must be accessible from dashboard settings.
