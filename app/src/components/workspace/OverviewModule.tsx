import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { supabase } from '../../lib/supabaseClient';

const sources = [
  ['Published news', 'news_posts'],
  ['Events', 'events'],
  ['Resources', 'resources'],
  ['Knowledge sources', 'knowledge_sources'],
  ['Open inquiries', 'contact_messages'],
] as const;

export function OverviewModule() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    Promise.all(sources.map(async ([label, table]) => {
      let query = supabase.from(table).select('id', { count: 'exact', head: true });
      if (table === 'news_posts') query = query.eq('status', 'published');
      if (table === 'contact_messages') query = query.neq('status', 'archived');
      const { count } = await query;
      return [label, count ?? 0] as const;
    })).then((values) => setCounts(Object.fromEntries(values)));
  }, []);

  return (
    <section>
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">Live operations</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold">Workspace overview</h1>
        <p className="mt-2 text-sm text-muted-foreground">Counts come directly from the production data model—no demo analytics.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {sources.map(([label]) => (
          <Card key={label} className="border border-border bg-card/50 p-6">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-3 font-heading text-4xl text-primary">{counts[label] ?? '—'}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
