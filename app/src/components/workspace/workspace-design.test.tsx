import { describe, expect, test } from 'vitest';
import content from './ContentModule.tsx?raw';
import inbox from './InboxModule.tsx?raw';
import knowledge from './KnowledgeModule.tsx?raw';
import overview from './OverviewModule.tsx?raw';
import people from './PeopleModule.tsx?raw';

const modules = { ContentModule: content, InboxModule: inbox, KnowledgeModule: knowledge, OverviewModule: overview, PeopleModule: people };

describe('workspace design migration', () => {
  test.each(Object.entries(modules))('%s uses the shared workspace header and normal interface typography', (_name, source) => {
    expect(source).toContain('WorkspaceHeader');
    expect(source).not.toContain('font-mono');
  });

  test('overview uses accessible metric panels instead of generic cards', () => {
    expect(overview).toContain('MetricPanel');
    expect(overview).not.toContain('Live operations');
  });
});
