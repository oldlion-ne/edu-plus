import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabaseClient';
import type { AppRole } from '../../types/auth';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Profile = { id: string; display_name: string; role: AppRole; created_at: string };

export function PeopleModule() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const load = async () => { const { data } = await supabase.from('profiles').select('id, display_name, role, created_at').order('created_at', { ascending: false }); setProfiles((data ?? []) as Profile[]); };
  useEffect(() => { load(); }, []);
  const setRole = async (profileId: string, nextRole: AppRole) => {
    const { error } = await supabase.rpc('set_user_role', { target_user_id: profileId, next_role: nextRole });
    if (error) toast.error('Role change failed', { description: error.message }); else { toast.success('Role updated and audited'); load(); }
  };
  return <section><div className="mb-7"><p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Administrator only</p><h1 className="mt-2 font-heading text-3xl font-semibold">People & access</h1><p className="mt-2 text-sm text-muted-foreground">New accounts always start as members. Every role change is server-authorized and audited.</p></div><div className="space-y-3">{profiles.map((profile) => <Card key={profile.id} className="flex flex-col justify-between gap-4 border border-border bg-card/40 p-5 sm:flex-row sm:items-center"><div><h3 className="font-medium">{profile.display_name || 'Unnamed member'}</h3><p className="mt-1 font-mono text-[9px] text-muted-foreground">{profile.id}</p></div><Select value={profile.role} onValueChange={(value) => setRole(profile.id, value as AppRole)}><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="member">Member</SelectItem><SelectItem value="resource_person">Resource person</SelectItem><SelectItem value="admin">Administrator</SelectItem></SelectContent></Select></Card>)}</div></section>;
}
