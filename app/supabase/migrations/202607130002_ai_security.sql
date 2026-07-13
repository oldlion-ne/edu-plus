alter table public.news_posts add column if not exists category text not null default 'general';
alter table public.events add column if not exists registration_open boolean not null default true;

create table if not exists public.ai_chat_sessions (
  id text primary key check (char_length(id) between 12 and 128),
  created_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.ai_chat_messages (
  id bigint generated always as identity primary key,
  session_id text not null references public.ai_chat_sessions(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null check (char_length(content) between 1 and 4000),
  created_at timestamptz not null default now()
);
create index if not exists ai_chat_messages_session_idx
  on public.ai_chat_messages(session_id, created_at desc);

create table if not exists public.ai_rate_limits (
  bucket text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0 check (request_count >= 0)
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint newsletter_email_format check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$')
);
create unique index if not exists newsletter_email_unique_idx on public.newsletter_subscribers(lower(email));

alter table public.ai_chat_sessions enable row level security;
alter table public.ai_chat_messages enable row level security;
alter table public.ai_rate_limits enable row level security;
alter table public.newsletter_subscribers enable row level security;

create policy "public newsletter subscribe" on public.newsletter_subscribers
  for insert with check (active = true);
create policy "staff newsletter read" on public.newsletter_subscribers
  for select to authenticated using (public.current_app_role() in ('admin', 'resource_person'));

drop policy if exists "profiles staff read" on public.profiles;
create policy "admin profiles read" on public.profiles for select to authenticated
  using (public.current_app_role() = 'admin');

drop policy if exists "staff news create" on public.news_posts;
drop policy if exists "authors edit news" on public.news_posts;
create policy "admin news manage" on public.news_posts for all to authenticated
  using (public.current_app_role() = 'admin') with check (public.current_app_role() = 'admin');
create policy "resource people create news drafts" on public.news_posts for insert to authenticated
  with check (public.current_app_role() = 'resource_person' and author_id = auth.uid() and status in ('draft', 'review'));
create policy "resource people edit own news drafts" on public.news_posts for update to authenticated
  using (public.current_app_role() = 'resource_person' and author_id = auth.uid() and status in ('draft', 'review'))
  with check (author_id = auth.uid() and status in ('draft', 'review'));

drop policy if exists "staff events manage" on public.events;
create policy "admin events manage" on public.events for all to authenticated
  using (public.current_app_role() = 'admin') with check (public.current_app_role() = 'admin');
create policy "resource people create event drafts" on public.events for insert to authenticated
  with check (public.current_app_role() = 'resource_person' and author_id = auth.uid() and status in ('draft', 'review'));
create policy "resource people edit own event drafts" on public.events for update to authenticated
  using (public.current_app_role() = 'resource_person' and author_id = auth.uid() and status in ('draft', 'review'))
  with check (author_id = auth.uid() and status in ('draft', 'review'));

drop policy if exists "staff resources manage" on public.resources;
create policy "admin resources manage" on public.resources for all to authenticated
  using (public.current_app_role() = 'admin') with check (public.current_app_role() = 'admin');
create policy "resource people create resource drafts" on public.resources for insert to authenticated
  with check (public.current_app_role() = 'resource_person' and author_id = auth.uid() and status in ('draft', 'review'));
create policy "resource people edit own resource drafts" on public.resources for update to authenticated
  using (public.current_app_role() = 'resource_person' and author_id = auth.uid() and status in ('draft', 'review'))
  with check (author_id = auth.uid() and status in ('draft', 'review'));

drop policy if exists "staff knowledge sources" on public.knowledge_sources;
create policy "admin knowledge sources manage" on public.knowledge_sources for all to authenticated
  using (public.current_app_role() = 'admin') with check (public.current_app_role() = 'admin');
create policy "resource people manage own knowledge drafts" on public.knowledge_sources for all to authenticated
  using (public.current_app_role() = 'resource_person' and created_by = auth.uid() and status in ('draft', 'review'))
  with check (created_by = auth.uid() and status in ('draft', 'review'));

drop policy if exists "staff knowledge entries" on public.knowledge_entries;
create policy "admin knowledge entries manage" on public.knowledge_entries for all to authenticated
  using (public.current_app_role() = 'admin') with check (public.current_app_role() = 'admin');
create policy "resource people manage unapproved entries" on public.knowledge_entries for all to authenticated
  using (public.current_app_role() = 'resource_person' and approved = false and exists (
    select 1 from public.knowledge_sources source where source.id = knowledge_entries.source_id and source.created_by = auth.uid()
  ))
  with check (approved = false and exists (
    select 1 from public.knowledge_sources source where source.id = knowledge_entries.source_id and source.created_by = auth.uid()
  ));

create or replace function public.consume_ai_rate_limit(
  p_bucket text,
  p_limit integer default 8,
  p_window_seconds integer default 60
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_row public.ai_rate_limits%rowtype;
begin
  if char_length(p_bucket) < 16 or p_limit < 1 or p_window_seconds < 1 then
    return false;
  end if;

  insert into public.ai_rate_limits(bucket, request_count)
  values (p_bucket, 0)
  on conflict (bucket) do nothing;

  select * into current_row
  from public.ai_rate_limits
  where bucket = p_bucket
  for update;

  if current_row.window_started_at <= now() - make_interval(secs => p_window_seconds) then
    update public.ai_rate_limits
    set window_started_at = now(), request_count = 1
    where bucket = p_bucket;
    return true;
  end if;

  if current_row.request_count >= p_limit then
    return false;
  end if;

  update public.ai_rate_limits
  set request_count = request_count + 1
  where bucket = p_bucket;
  return true;
end;
$$;

create or replace function public.search_approved_knowledge(
  p_query text,
  p_limit integer default 5
)
returns table(heading text, content text)
language sql
stable
security definer
set search_path = public
as $$
  select entry.heading, left(entry.content, 1600)
  from public.knowledge_entries entry
  join public.knowledge_sources source on source.id = entry.source_id
  where entry.approved = true
    and source.status = 'published'
    and entry.search_vector @@ websearch_to_tsquery('english', left(p_query, 300))
  order by ts_rank(entry.search_vector, websearch_to_tsquery('english', left(p_query, 300))) desc
  limit least(greatest(p_limit, 1), 8);
$$;

revoke all on public.ai_chat_sessions from anon, authenticated;
revoke all on public.ai_chat_messages from anon, authenticated;
revoke all on public.ai_rate_limits from anon, authenticated;
revoke all on function public.consume_ai_rate_limit(text, integer, integer) from public, anon, authenticated;
revoke all on function public.search_approved_knowledge(text, integer) from public, anon, authenticated;
grant execute on function public.consume_ai_rate_limit(text, integer, integer) to service_role;
grant execute on function public.search_approved_knowledge(text, integer) to service_role;
