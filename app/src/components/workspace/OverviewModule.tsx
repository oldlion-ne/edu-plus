import { useEffect, useState } from 'react';
import { MetricPanel } from '../layout/MetricPanel';
import { WorkspaceHeader } from '../layout/WorkspaceHeader';
import { supabase } from '../../lib/supabaseClient';

const sources = [
  ['Published news', 'news_posts', 'Stories currently visible to the community'],
  ['Events', 'events', 'Scheduled learning and community gatherings'],
  ['Resources', 'resources', 'Published and draft learning materials'],
  ['Knowledge sources', 'knowledge_sources', 'Reviewed sources grounding AI guidance'],
  ['Open inquiries', 'contact_messages', 'Messages that still need a team response'],
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
      <WorkspaceHeader
        eyebrow="Current activity"
        title="Workspace overview"
        description="A direct view of EduPlus content, knowledge, events, and community support work. Every count comes from the current data model."
      />
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
        {sources.map(([label, , context], index) => (
          <MetricPanel
            key={label}
            label={label}
            value={counts[label] ?? '—'}
            context={context}
            tone={index === 0 ? 'accent' : 'default'}
            className="border-0"
          />
        ))}
      </div>
    </section>
  );
}
