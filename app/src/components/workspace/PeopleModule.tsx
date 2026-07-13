import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabaseClient';
import type { AppRole } from '../../types/auth';
import { WorkspaceHeader } from '../layout/WorkspaceHeader';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Profile = { id: string; display_name: string; role: AppRole; created_at: string };

export function PeopleModule() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const load = async () => { const { data } = await supabase.from('profiles').select('id, display_name, role, created_at').order('created_at', { ascending: false }); setProfiles((data ?? []) as Profile[]); };
  useEffect(() => { load(); }, []);

  const setRole = async (profileId: string, nextRole: AppRole) => {
    const { error } = await supabase.rpc('set_user_role', { target_user_id: profileId, next_role: nextRole });
    if (error) toast.error('Role change failed', { description: error.message });
    else { toast.success('Role updated and audited'); load(); }
  };

  return (
    <section>
      <WorkspaceHeader eyebrow="Administrator only" title="People & access" description="New accounts always start as members. Every role change is server-authorized and audited." />
      <div className="space-y-3">
        {profiles.map((profile) => (
          <Card key={profile.id} variant="base" className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
            <div><div className="flex items-center gap-3"><h3 className="font-medium">{profile.display_name || 'Unnamed member'}</h3><Badge variant="outline">{profile.role.replace('_', ' ')}</Badge></div><p className="mt-2 text-xs text-muted-foreground">Account {profile.id.slice(0, 8)}</p></div>
            <Select value={profile.role} onValueChange={(value) => setRole(profile.id, value as AppRole)}><SelectTrigger className="w-48"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="member">Member</SelectItem><SelectItem value="resource_person">Resource person</SelectItem><SelectItem value="admin">Administrator</SelectItem></SelectContent></Select>
          </Card>
        ))}
        {profiles.length === 0 ? <p className="surface-sunken p-6 text-sm text-muted-foreground">No profiles are available.</p> : null}
      </div>
    </section>
  );
}
