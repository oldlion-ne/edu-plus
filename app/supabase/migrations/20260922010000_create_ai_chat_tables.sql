CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to create and read their own conversations (in a real app, this might be tied to an anonymous session ID, but for this demo we'll just allow insert, and read all for admin)
CREATE POLICY "Allow public insert on conversations" ON public.conversations
    FOR INSERT TO public
    WITH CHECK (true);

-- Usually, we want people to read their own conversations. Since we don't have session tracking for anons right now, 
-- we will allow public select just for the sake of the widget to work statelessly if needed. 
-- In a real app we'd scope this by a cookie session id.
CREATE POLICY "Allow public select on conversations" ON public.conversations
    FOR SELECT TO public
    USING (true);

CREATE POLICY "Allow public update on conversations" ON public.conversations
    FOR UPDATE TO public
    USING (true);

CREATE POLICY "Allow public insert on chat_messages" ON public.chat_messages
    FOR INSERT TO public
    WITH CHECK (true);

CREATE POLICY "Allow public select on chat_messages" ON public.chat_messages
    FOR SELECT TO public
    USING (true);
