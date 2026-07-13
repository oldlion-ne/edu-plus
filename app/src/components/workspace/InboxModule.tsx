import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabaseClient';
import { WorkspaceHeader } from '../layout/WorkspaceHeader';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

type Message = { id: string; name: string; email: string; profile: string; message: string; status: string; priority: string; internal_notes: string; created_at: string };

export function InboxModule() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const load = async () => { const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false }); setMessages((data ?? []) as Message[]); };
  useEffect(() => { load(); }, []);

  const update = async (changes: Partial<Message>) => {
    if (!selected) return;
    const { error } = await supabase.from('contact_messages').update(changes).eq('id', selected.id);
    if (error) return toast.error('Could not update inquiry');
    setSelected({ ...selected, ...changes });
    load();
  };

  const selectMessage = async (item: Message) => {
    const next = item.status === 'unread' ? { ...item, status: 'read' } : item;
    setSelected(next);
    if (item.status === 'unread') {
      await supabase.from('contact_messages').update({ status: 'read' }).eq('id', item.id);
      load();
    }
  };

  return (
    <section>
      <WorkspaceHeader eyebrow="Team triage" title="Message hub" description="Review community inquiries, coordinate priority, and preserve the context behind every response." />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-2">
          {messages.map((item) => (
            <button key={item.id} type="button" onClick={() => selectMessage(item)} className="w-full border border-border bg-card p-4 text-left transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <div className="flex justify-between gap-3"><span className="font-medium">{item.name}</span><Badge variant={item.priority === 'urgent' ? 'warning' : 'secondary'}>{item.priority}</Badge></div>
              <p className="mt-1 truncate text-xs text-muted-foreground">{item.message}</p>
            </button>
          ))}
          {messages.length === 0 ? <p className="surface-sunken p-6 text-sm text-muted-foreground">No inquiries are waiting for review.</p> : null}
        </div>
        {selected ? (
          <Card variant="raised" className="p-6">
            <div className="border-b border-border pb-4"><h2 className="font-heading text-2xl">{selected.name}</h2><a href={`mailto:${selected.email}`} className="mt-1 block text-xs text-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{selected.email}</a></div>
            <p className="my-6 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{selected.message}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Priority</Label><Select value={selected.priority} onValueChange={(priority) => update({ priority })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="normal">Normal</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="urgent">Urgent</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label>Status</Label><Select value={selected.status} onValueChange={(status) => update({ status })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="unread">Unread</SelectItem><SelectItem value="read">Read</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent></Select></div>
            </div>
            <div className="mt-4 space-y-2"><Label htmlFor="internal-notes">Internal notes</Label><Textarea id="internal-notes" value={selected.internal_notes} onChange={(event) => setSelected({ ...selected, internal_notes: event.target.value })} /><Button variant="outline" onClick={() => update({ internal_notes: selected.internal_notes })}>Save notes</Button></div>
          </Card>
        ) : <div className="surface-sunken p-8 text-sm text-muted-foreground">Select an inquiry to review its context and next actions.</div>}
      </div>
    </section>
  );
}
