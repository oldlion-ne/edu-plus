import type { AppRole } from './auth';

export type ContentStatus = 'draft' | 'review' | 'published' | 'archived';
export type EventRegistrationStatus = 'confirmed' | 'waitlisted' | 'cancelled';
export type IngestionStatus = 'queued' | 'processing' | 'review' | 'complete' | 'failed';

export interface ProfileRow {
  id: string;
  role: AppRole;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  account_status: 'active' | 'suspended';
  last_active_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsPostRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  status: ContentStatus;
  author_id: string;
  published_at: string | null;
  created_at: string;
}

export interface EventRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  location: string | null;
  starts_at: string;
  ends_at: string;
  registration_opens_at: string | null;
  registration_closes_at: string | null;
  capacity: number | null;
  status: ContentStatus;
  author_id: string;
}

export interface ResourceRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  media_type: string;
  external_url: string | null;
  status: ContentStatus;
  author_id: string;
  published_at: string | null;
  created_at: string;
}
