import { supabase } from '../supabaseClient';

export interface PublishedNewsPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  published_at: string | null;
}

export interface PublishedEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  starts_at: string;
  ends_at: string | null;
  capacity: number | null;
  registration_open: boolean;
}

export interface PublishedResource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  media_type: string;
  external_url: string | null;
  created_at: string;
}

async function unwrap<T>(result: { data: T[] | null; error: { message: string } | null }) {
  if (result.error) throw new Error(result.error.message);
  return result.data ?? [];
}

export async function loadPublishedNews(): Promise<PublishedNewsPost[]> {
  const result = await supabase
    .from('news_posts')
    .select('id, slug, title, excerpt, body, category, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return unwrap(result as { data: PublishedNewsPost[] | null; error: { message: string } | null });
}

export async function loadPublishedEvents(): Promise<PublishedEvent[]> {
  const result = await supabase
    .from('events')
    .select('id, slug, title, description, location, starts_at, ends_at, capacity, registration_open')
    .eq('status', 'published')
    .order('starts_at', { ascending: true });
  return unwrap(result as { data: PublishedEvent[] | null; error: { message: string } | null });
}

export async function loadPublishedResources(): Promise<PublishedResource[]> {
  const result = await supabase
    .from('resources')
    .select('id, slug, title, description, category, media_type, external_url, created_at')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  return unwrap(result as { data: PublishedResource[] | null; error: { message: string } | null });
}
