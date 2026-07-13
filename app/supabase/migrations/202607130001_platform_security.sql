begin;

do $$ begin
  create type public.app_role as enum ('admin', 'resource_person', 'member');
exception when duplicate_object then null;
end $$;

do $$ begin create type public.content_status as enum ('draft', 'review', 'published', 'archived'); exception when duplicate_object then null; end $$;
do $$ begin create type public.event_registration_status as enum ('confirmed', 'waitlisted', 'cancelled'); exception when duplicate_object then null; end $$;
do $$ begin create type public.ingestion_status as enum ('queued', 'processing', 'review', 'complete', 'failed'); exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'member',
  display_name text not null default '',
  avatar_url text,
  bio text,
  account_status text not null default 'active' check (account_status in ('active', 'suspended')),
  last_active_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if to_regclass('public.user_roles') is not null then
    insert into public.profiles (id, role)
    select id,
      case when role::text = 'admin' then 'admin'::public.app_role
           when role::text in ('educator', 'resource_person') then 'resource_person'::public.app_role
           else 'member'::public.app_role end
    from public.user_roles
    on conflict (id) do update set role = excluded.role;
  end if;
end $$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, display_name)
  values (new.id, 'member', coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.current_app_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$ select role from public.profiles where id = auth.uid() and account_status = 'active' $$;

revoke update on public.profiles from authenticated;
grant update(display_name, avatar_url, bio, last_active_at) on public.profiles to authenticated;

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.set_user_role(target_user_id uuid, next_role public.app_role)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare previous_role public.app_role;
begin
  if public.current_app_role() <> 'admin' then raise exception 'insufficient_privilege'; end if;
  if target_user_id = auth.uid() then raise exception 'cannot_change_own_role'; end if;
  select role into previous_role from public.profiles where id = target_user_id for update;
  if previous_role is null then raise exception 'profile_not_found'; end if;
  update public.profiles set role = next_role, updated_at = now() where id = target_user_id;
  insert into public.audit_events(actor_id, action, entity_type, entity_id, metadata)
  values(auth.uid(), 'role.changed', 'profile', target_user_id, jsonb_build_object('from', previous_role, 'to', next_role));
end;
$$;

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  status public.content_status not null default 'draft',
  cover_asset_id uuid,
  author_id uuid not null references auth.users(id) on delete restrict,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  description text not null default '',
  location text,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  registration_opens_at timestamptz,
  registration_closes_at timestamptz,
  capacity integer check (capacity is null or capacity > 0),
  status public.content_status not null default 'draft',
  author_id uuid not null references auth.users(id) on delete restrict,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  status public.event_registration_status not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(event_id, user_id)
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  category text not null,
  media_type text not null,
  external_url text,
  status public.content_status not null default 'draft',
  author_id uuid not null references auth.users(id) on delete restrict,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

do $$
begin
  if to_regclass('public.knowledge_hub') is not null then
    insert into public.resources (id, slug, title, description, category, media_type, external_url, status, author_id, published_at, created_at)
    select id, coalesce(nullif(regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g'), ''), id::text), title,
      coalesce(description, ''), category, media_type, url, 'published', uploaded_by, created_at, created_at
    from public.knowledge_hub where uploaded_by is not null
    on conflict (id) do nothing;
  end if;
end $$;

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  object_path text not null unique,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 26214400),
  status public.content_status not null default 'draft',
  uploaded_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.knowledge_sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  asset_id uuid references public.media_assets(id) on delete set null,
  status public.content_status not null default 'draft',
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.knowledge_entries (
  id uuid primary key default gen_random_uuid(),
  source_id uuid references public.knowledge_sources(id) on delete cascade,
  heading text not null default '',
  content text not null,
  search_vector tsvector generated always as (to_tsvector('english', coalesce(heading, '') || ' ' || content)) stored,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists knowledge_entries_search_idx on public.knowledge_entries using gin(search_vector);

create table if not exists public.ingestion_jobs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.knowledge_sources(id) on delete cascade,
  status public.ingestion_status not null default 'queued',
  message text,
  started_at timestamptz,
  finished_at timestamptz,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  profile text not null,
  message text not null,
  status text not null default 'unread' check (status in ('unread', 'read', 'archived')),
  created_at timestamptz not null default now()
);

alter table if exists public.contact_messages add column if not exists assignee_id uuid references auth.users(id) on delete set null;
alter table if exists public.contact_messages add column if not exists priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent'));
alter table if exists public.contact_messages add column if not exists tags text[] not null default '{}';
alter table if exists public.contact_messages add column if not exists internal_notes text not null default '';

create or replace function public.register_for_event(target_event_id uuid)
returns public.event_registration_status
language plpgsql
security definer
set search_path = public
as $$
declare target public.events%rowtype; confirmed_count integer; next_status public.event_registration_status;
begin
  if auth.uid() is null then raise exception 'authentication_required'; end if;
  select * into target from public.events where id = target_event_id for update;
  if target.id is null or target.status <> 'published' then raise exception 'event_unavailable'; end if;
  if target.registration_opens_at is not null and now() < target.registration_opens_at then raise exception 'registration_not_open'; end if;
  if target.registration_closes_at is not null and now() > target.registration_closes_at then raise exception 'registration_closed'; end if;
  select count(*) into confirmed_count from public.event_registrations where event_id = target_event_id and status = 'confirmed';
  next_status := case when target.capacity is null or confirmed_count < target.capacity then 'confirmed' else 'waitlisted' end;
  insert into public.event_registrations(event_id, user_id, status) values(target_event_id, auth.uid(), next_status)
  on conflict(event_id, user_id) do update set status = excluded.status, updated_at = now();
  return next_status;
end;
$$;

create or replace function public.cancel_event_registration(target_event_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare promoted_id uuid;
begin
  perform 1 from public.events where id = target_event_id for update;
  update public.event_registrations set status = 'cancelled', updated_at = now()
  where event_id = target_event_id and user_id = auth.uid();
  select id into promoted_id from public.event_registrations
  where event_id = target_event_id and status = 'waitlisted' order by created_at for update skip locked limit 1;
  if promoted_id is not null then update public.event_registrations set status = 'confirmed', updated_at = now() where id = promoted_id; end if;
end;
$$;

alter table public.profiles enable row level security;
alter table public.audit_events enable row level security;
alter table public.news_posts enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.resources enable row level security;
alter table public.media_assets enable row level security;
alter table public.knowledge_sources enable row level security;
alter table public.knowledge_entries enable row level security;
alter table public.ingestion_jobs enable row level security;
alter table public.contact_messages enable row level security;

create policy "profiles own read" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles staff read" on public.profiles for select to authenticated using (public.current_app_role() in ('admin','resource_person'));
create policy "profiles own update" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "published news read" on public.news_posts for select using (status = 'published');
create policy "staff news read" on public.news_posts for select to authenticated using (public.current_app_role() in ('admin','resource_person'));
create policy "staff news create" on public.news_posts for insert to authenticated with check (public.current_app_role() in ('admin','resource_person') and author_id = auth.uid());
create policy "authors edit news" on public.news_posts for update to authenticated using (public.current_app_role() = 'admin' or (public.current_app_role() = 'resource_person' and author_id = auth.uid() and status <> 'published'));
create policy "published events read" on public.events for select using (status = 'published');
create policy "staff events manage" on public.events for all to authenticated using (public.current_app_role() = 'admin' or (public.current_app_role() = 'resource_person' and author_id = auth.uid())) with check (public.current_app_role() in ('admin','resource_person'));
create policy "own registrations read" on public.event_registrations for select to authenticated using (user_id = auth.uid() or public.current_app_role() in ('admin','resource_person'));
create policy "published resources read" on public.resources for select using (status = 'published');
create policy "staff resources manage" on public.resources for all to authenticated using (public.current_app_role() = 'admin' or (public.current_app_role() = 'resource_person' and author_id = auth.uid())) with check (public.current_app_role() in ('admin','resource_person'));
create policy "staff assets manage" on public.media_assets for all to authenticated using (public.current_app_role() = 'admin' or uploaded_by = auth.uid()) with check (public.current_app_role() in ('admin','resource_person'));
create policy "staff knowledge sources" on public.knowledge_sources for all to authenticated using (public.current_app_role() = 'admin' or created_by = auth.uid()) with check (public.current_app_role() in ('admin','resource_person'));
create policy "staff knowledge entries" on public.knowledge_entries for all to authenticated using (public.current_app_role() in ('admin','resource_person')) with check (public.current_app_role() in ('admin','resource_person'));
create policy "staff ingestion jobs" on public.ingestion_jobs for all to authenticated using (public.current_app_role() = 'admin' or created_by = auth.uid()) with check (public.current_app_role() in ('admin','resource_person'));
create policy "admin audit read" on public.audit_events for select to authenticated using (public.current_app_role() = 'admin');
drop policy if exists "Allow public insert contact messages" on public.contact_messages;
drop policy if exists "Allow staff to read/update contact messages" on public.contact_messages;
create policy "public message create" on public.contact_messages for insert with check (true);
create policy "staff message manage" on public.contact_messages for all to authenticated using (public.current_app_role() in ('admin','resource_person')) with check (public.current_app_role() in ('admin','resource_person'));

revoke all on function public.set_user_role(uuid, public.app_role) from public;
grant execute on function public.set_user_role(uuid, public.app_role) to authenticated;
grant execute on function public.register_for_event(uuid) to authenticated;
grant execute on function public.cancel_event_registration(uuid) to authenticated;

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values('content-assets', 'content-assets', false, 26214400, array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.presentationml.presentation','text/plain','image/png','image/jpeg','image/webp'])
on conflict(id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "staff upload content assets" on storage.objects for insert to authenticated
with check (bucket_id = 'content-assets' and public.current_app_role() in ('admin','resource_person') and (storage.foldername(name))[1] = auth.uid()::text);
create policy "staff read own content assets" on storage.objects for select to authenticated
using (bucket_id = 'content-assets' and (public.current_app_role() = 'admin' or (storage.foldername(name))[1] = auth.uid()::text));

commit;
