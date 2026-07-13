import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../lib/AuthContext';
import { supabase } from '../../lib/supabaseClient';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { WorkspaceHeader } from '../layout/WorkspaceHeader';

type Source = { id: string; title: string; status: string; created_at: string };
const acceptedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'text/plain', 'image/png', 'image/jpeg', 'image/webp'];

export function KnowledgeModule() {
  const { user, role } = useAuth();
  const [sources, setSources] = useState<Source[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('knowledge_sources').select('id, title, status, created_at').order('created_at', { ascending: false });
    setSources((data ?? []) as Source[]);
  };
  useEffect(() => { load(); }, []);

  const createTextSource = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setBusy(true);
    const status = role === 'admin' ? 'published' : 'draft';
    const { data: source, error } = await supabase.from('knowledge_sources').insert({ title, created_by: user.id, status }).select('id').single();
    if (!error && source) {
      const { error: entryError } = await supabase.from('knowledge_entries').insert({ source_id: source.id, heading: title, content, approved: role === 'admin' });
      if (!entryError) {
        toast.success(role === 'admin' ? 'Knowledge approved' : 'Knowledge submitted for approval');
        setTitle(''); setContent(''); load(); setBusy(false); return;
      }
    }
    toast.error('Could not save knowledge source', { description: error?.message });
    setBusy(false);
  };

  const upload = async (file: File | null) => {
    if (!file || !user) return;
    if (file.size > 25 * 1024 * 1024 || !acceptedTypes.includes(file.type)) return toast.error('Use a supported document or image up to 25 MB.');
    setBusy(true);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const objectPath = `${user.id}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from('content-assets').upload(objectPath, file);
    if (uploadError) { setBusy(false); return toast.error('Upload failed', { description: uploadError.message }); }
    const { data: asset, error: assetError } = await supabase.from('media_assets').insert({ object_path: objectPath, original_name: file.name, mime_type: file.type, size_bytes: file.size, uploaded_by: user.id }).select('id').single();
    if (assetError || !asset) { setBusy(false); return toast.error('Could not register uploaded file.'); }
    const { data: source, error: sourceError } = await supabase.from('knowledge_sources').insert({ title: title || file.name, asset_id: asset.id, created_by: user.id }).select('id').single();
    if (sourceError || !source) { setBusy(false); return toast.error('Could not create knowledge source.'); }
    await supabase.from('ingestion_jobs').insert({ source_id: source.id, created_by: user.id, status: 'queued', message: 'Awaiting secure extraction and review.' });
    toast.success('File queued for ingestion and review');
    setBusy(false); load();
  };

  const approve = async (sourceId: string) => {
    const { error } = await supabase.from('knowledge_sources').update({ status: 'published' }).eq('id', sourceId);
    if (!error) await supabase.from('knowledge_entries').update({ approved: true }).eq('source_id', sourceId);
    if (error) toast.error('Approval failed'); else { toast.success('Knowledge source approved'); load(); }
  };

  return (
    <section>
      <WorkspaceHeader eyebrow="Grounded guidance" title="Knowledge base" description="Add reviewed facts or queue documents and images for secure ingestion. Provider fine-tuning is intentionally not used." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border border-border bg-card/50 p-6">
          <form onSubmit={createTextSource} className="space-y-4"><div className="space-y-2"><Label htmlFor="kb-title">Source title</Label><Input id="kb-title" required value={title} onChange={(e) => setTitle(e.target.value)} /></div><div className="space-y-2"><Label htmlFor="kb-content">Approved factual content</Label><Textarea id="kb-content" className="min-h-52" required value={content} onChange={(e) => setContent(e.target.value)} /></div><Button disabled={busy} className="w-full">{role === 'admin' ? 'Add and approve' : 'Submit for review'}</Button></form>
          <div className="my-6 border-t border-border" />
          <Label htmlFor="kb-file">Upload document or image (25 MB max)</Label><Input id="kb-file" type="file" disabled={busy} accept={acceptedTypes.join(',')} className="mt-2" onChange={(e) => upload(e.target.files?.[0] ?? null)} />
        </Card>
        <div className="space-y-3">{sources.map((source) => <Card key={source.id} className="flex items-center justify-between gap-4 border border-border bg-card/30 p-4"><div><h3 className="font-medium">{source.title}</h3><p className="mt-1 font-sans text-xs uppercase text-muted-foreground">{source.status}</p></div>{role === 'admin' && source.status !== 'published' && <Button size="sm" variant="outline" onClick={() => approve(source.id)}>Approve</Button>}</Card>)}{sources.length === 0 && <p className="border border-border p-6 text-sm text-muted-foreground">No knowledge sources yet.</p>}</div>
      </div>
    </section>
  );
}
