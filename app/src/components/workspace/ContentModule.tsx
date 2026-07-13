import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { makeSlug, formatTimestamp } from './content-utils';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { WorkspaceHeader } from '../layout/WorkspaceHeader';

type ContentKind = 'resource' | 'news' | 'event';
type ContentRow = { id: string; title: string; status: string; created_at?: string; published_at?: string; starts_at?: string };

const tableFor = { resource: 'resources', news: 'news_posts', event: 'events' } as const;

export function ContentModule() {
  const { user, role } = useAuth();
  const [kind, setKind] = useState<ContentKind>('resource');
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', body: '', category: 'general', url: '', startsAt: '', location: '', capacity: '' });

  const load = useCallback(async () => {
    const { data, error } = await supabase.from(tableFor[kind]).select('*').order('created_at', { ascending: false });
    if (!error) setRows((data ?? []) as ContentRow[]);
  }, [kind]);
  useEffect(() => { load(); }, [load]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    const status = role === 'admin' ? 'published' : 'draft';
    const common = { slug: `${makeSlug(form.title)}-${Date.now().toString().slice(-5)}`, title: form.title.trim(), status, author_id: user.id };
    const result = kind === 'resource'
      ? await supabase.from('resources').insert({ ...common, description: form.description, category: form.category, media_type: form.url.includes('youtu') ? 'video_embed' : 'external_link', external_url: form.url || null, published_at: status === 'published' ? new Date().toISOString() : null })
      : kind === 'news'
        ? await supabase.from('news_posts').insert({ ...common, excerpt: form.description, body: form.body, category: form.category, published_at: status === 'published' ? new Date().toISOString() : null })
        : await supabase.from('events').insert({ ...common, description: form.description, location: form.location, starts_at: new Date(form.startsAt).toISOString(), ends_at: new Date(new Date(form.startsAt).getTime() + 2 * 60 * 60 * 1000).toISOString(), capacity: form.capacity ? Number(form.capacity) : null, registration_open: true, published_at: status === 'published' ? new Date().toISOString() : null });
    const { error } = result;
    setSaving(false);
    if (error) return toast.error('Could not save content', { description: error.message });
    toast.success(role === 'admin' ? 'Published successfully' : 'Draft saved for review');
    setForm({ title: '', description: '', body: '', category: 'general', url: '', startsAt: '', location: '', capacity: '' });
    load();
  };

  return (
    <section>
      <WorkspaceHeader
        eyebrow="Publishing workflow"
        title="Content studio"
        description="Create resources, stories, and events with role-aware review and publication states."
        actions={<Select value={kind} onValueChange={(value) => setKind(value as ContentKind)}><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="resource">Resource</SelectItem><SelectItem value="news">News</SelectItem><SelectItem value="event">Event</SelectItem></SelectContent></Select>}
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)]">
        <Card className="border border-border bg-card/50 p-6">
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2"><Label htmlFor="content-title">Title</Label><Input id="content-title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div className="space-y-2"><Label htmlFor="content-summary">{kind === 'news' ? 'Excerpt' : 'Description'}</Label><Textarea id="content-summary" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            {kind === 'news' && <div className="space-y-2"><Label htmlFor="content-body">Article</Label><Textarea id="content-body" className="min-h-48" required value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} /></div>}
            {kind !== 'event' && <div className="space-y-2"><Label htmlFor="content-category">Category</Label><Input id="content-category" required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>}
            {kind === 'resource' && <div className="space-y-2"><Label htmlFor="content-url">Video or external URL</Label><Input id="content-url" type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} /></div>}
            {kind === 'event' && <><div className="space-y-2"><Label htmlFor="event-start">Start date and time</Label><Input id="event-start" type="datetime-local" required value={form.startsAt} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} /></div><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="event-location">Location</Label><Input id="event-location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div><div className="space-y-2"><Label htmlFor="event-capacity">Capacity</Label><Input id="event-capacity" type="number" min="1" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} /></div></div></>}
            <Button disabled={saving} className="w-full">{saving ? 'Saving...' : role === 'admin' ? 'Publish' : 'Save draft'}</Button>
          </form>
        </Card>
        <div className="space-y-3">
          {rows.map((row) => <Card key={row.id} className="border border-border bg-card/30 p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-medium">{row.title}</h3><p className="mt-1 text-xs text-muted-foreground">{formatTimestamp(row.published_at ?? row.starts_at ?? row.created_at)}</p></div><Badge variant="secondary" className="rounded-none">{row.status}</Badge></div></Card>)}
          {rows.length === 0 && <p className="border border-border p-6 text-sm text-muted-foreground">No {kind} entries yet.</p>}
        </div>
      </div>
    </section>
  );
}
