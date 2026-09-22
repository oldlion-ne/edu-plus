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

-- Allow public to insert conversations (user_id must match auth.uid() if authenticated)
CREATE POLICY "Allow public insert on conversations" ON public.conversations
    FOR INSERT TO public
    WITH CHECK (user_id IS NULL OR user_id = auth.uid());

-- Allow authenticated users and owners to read conversations
CREATE POLICY "Allow select on conversations" ON public.conversations
    FOR SELECT
    USING (auth.uid() IS NOT NULL OR user_id = auth.uid());

-- Allow updating only by authenticated users or owners
CREATE POLICY "Allow update on conversations" ON public.conversations
    FOR UPDATE
    USING (auth.uid() IS NOT NULL OR user_id = auth.uid())
    WITH CHECK (auth.uid() IS NOT NULL OR user_id = auth.uid());

-- Allow deletion by authenticated users (for the dashboard)
CREATE POLICY "Allow delete on conversations" ON public.conversations
    FOR DELETE
    USING (auth.uid() IS NOT NULL);

-- Allow inserting messages into owned or anonymous conversations
CREATE POLICY "Allow public insert on chat_messages" ON public.chat_messages
    FOR INSERT TO public
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.conversations c 
            WHERE c.id = conversation_id 
            AND (c.user_id IS NULL OR c.user_id = auth.uid())
        )
    );

-- Allow reading messages for authenticated users or owners
CREATE POLICY "Allow select on chat_messages" ON public.chat_messages
    FOR SELECT
    USING (
        auth.uid() IS NOT NULL OR EXISTS (
            SELECT 1 FROM public.conversations c 
            WHERE c.id = chat_messages.conversation_id AND c.user_id = auth.uid()
        )
    );
