-- Add optional mobile number column to contact_messages
ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS mobile text;
