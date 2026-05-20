-- 1. Create user_roles Table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role text NOT NULL CHECK (role IN ('admin', 'educator', 'resource_person')),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 2. Create knowledge_hub Table
CREATE TABLE IF NOT EXISTS public.knowledge_hub (
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

-- 3. Create kb_documents Table
CREATE TABLE IF NOT EXISTS public.kb_documents (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    question text NOT NULL,
    answer text NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 4. Create contact_messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    profile text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'unread' NOT NULL CHECK (status IN ('unread', 'read', 'archived')),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_hub ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kb_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- user_roles policies
DROP POLICY IF EXISTS "Allow public read access to roles" ON public.user_roles;
CREATE POLICY "Allow public read access to roles" ON public.user_roles 
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin to manage roles" ON public.user_roles;
CREATE POLICY "Allow admin to manage roles" ON public.user_roles 
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role = 'admin'
        )
    );

-- knowledge_hub policies
DROP POLICY IF EXISTS "Allow public read access to knowledge content" ON public.knowledge_hub;
CREATE POLICY "Allow public read access to knowledge content" ON public.knowledge_hub 
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated staff to manage knowledge content" ON public.knowledge_hub;
CREATE POLICY "Allow authenticated staff to manage knowledge content" ON public.knowledge_hub 
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role IN ('admin', 'educator', 'resource_person')
        )
    );

-- kb_documents policies
DROP POLICY IF EXISTS "Allow public read access to kb" ON public.kb_documents;
CREATE POLICY "Allow public read access to kb" ON public.kb_documents 
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow staff to manage kb documents" ON public.kb_documents;
CREATE POLICY "Allow staff to manage kb documents" ON public.kb_documents 
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role IN ('admin', 'educator')
        )
    );

-- contact_messages policies
DROP POLICY IF EXISTS "Allow public insert contact messages" ON public.contact_messages;
CREATE POLICY "Allow public insert contact messages" ON public.contact_messages 
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow staff to read/update contact messages" ON public.contact_messages;
CREATE POLICY "Allow staff to read/update contact messages" ON public.contact_messages 
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.user_roles 
            WHERE user_roles.id = auth.uid() AND user_roles.role IN ('admin', 'educator')
        )
    );
