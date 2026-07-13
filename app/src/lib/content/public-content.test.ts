import { beforeEach, describe, expect, it, vi } from 'vitest';

const { from } = vi.hoisted(() => ({ from: vi.fn() }));
vi.mock('../supabaseClient', () => ({ supabase: { from } }));

import { loadPublishedNews, loadPublishedResources } from './public-content';

const queryResult = (data: unknown[]) => {
  const query: Record<string, ReturnType<typeof vi.fn>> = {};
  query.select = vi.fn(() => query);
  query.eq = vi.fn(() => query);
  query.order = vi.fn(() => Promise.resolve({ data, error: null }));
  return query;
};

describe('public content service', () => {
  beforeEach(() => from.mockReset());

  it('loads only published news through the public content table', async () => {
    const query = queryResult([{ id: '1', title: 'New cohort' }]);
    from.mockReturnValue(query);

    await expect(loadPublishedNews()).resolves.toEqual([{ id: '1', title: 'New cohort' }]);
    expect(from).toHaveBeenCalledWith('news_posts');
    expect(query.eq).toHaveBeenCalledWith('status', 'published');
  });

  it('loads resources from the secured resources table', async () => {
    const query = queryResult([{ id: '2', title: 'Admissions guide' }]);
    from.mockReturnValue(query);

    await expect(loadPublishedResources()).resolves.toHaveLength(1);
    expect(from).toHaveBeenCalledWith('resources');
    expect(query.eq).toHaveBeenCalledWith('status', 'published');
  });
});
