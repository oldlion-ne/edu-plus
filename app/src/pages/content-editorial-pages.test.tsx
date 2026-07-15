import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  councilPortraits,
  editorialIllustrations,
} from '@/lib/editorialIllustrations';

import Council from './Council';
import KnowledgeHub from './KnowledgeHub';
import News from './News';
import appSource from '../App.tsx?raw';

const { knowledgeResponse } = vi.hoisted(() => ({
  knowledgeResponse: {
    current: {
      data: [] as Record<string, string>[],
      error: null as Error | null,
    },
  },
}));

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(async () => knowledgeResponse.current),
      })),
    })),
  },
}));

const focusClasses = [
  'focus-visible:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-foreground',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-background',
];

const knowledgeFixtures = [
  {
    id: 'video',
    title: 'Learning on video',
    description: 'A video resource',
    category: 'tutorial',
    media_type: 'video_embed',
    url: 'https://www.youtube.com/watch?v=abcdefghijk',
    author_name: 'EduPlus',
    created_at: '2026-05-01',
  },
  {
    id: 'document',
    title: 'Learning guide',
    description: 'A document resource',
    category: 'study_material',
    media_type: 'document_url',
    url: 'https://example.com/guide',
    author_name: 'EduPlus',
    created_at: '2026-04-01',
  },
];

function renderPage(page: React.ReactNode) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

function renderNewsRoute(entry: string) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<News />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Knowledge Hub editorial artwork and controls', () => {
  beforeEach(() => {
    knowledgeResponse.current = { data: [], error: null };
  });

  it('renders the knowledge hero and a decorative illustrated empty state', async () => {
    const { container } = renderPage(<KnowledgeHub />);

    expect(
      screen.getByRole('img', { name: editorialIllustrations.knowledge.alt }),
    ).toHaveAttribute('src', editorialIllustrations.knowledge.src);

    const emptyMessage = await screen.findByText(
      'Resources are being prepared. Please check back soon.',
    );
    expect(emptyMessage.closest('.py-20')).toHaveClass(
      'text-[14px]',
      'text-muted-foreground',
    );
    const emptyImage = container.querySelector<HTMLImageElement>(
      `img[src="${editorialIllustrations.knowledgeEmpty.src}"][alt=""]`,
    );
    expect(emptyImage).toHaveAttribute('alt', '');
    expect(emptyImage?.closest('[data-slot="editorial-media"]')).toHaveClass(
      'mb-8',
      'w-full',
      'max-w-[240px]',
    );
    expect(emptyImage?.closest('.py-20')).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'text-center',
    );
  });

  it('gives filter, watch, resource, and close controls the exact visible focus fragment', async () => {
    knowledgeResponse.current = { data: knowledgeFixtures, error: null };
    renderPage(<KnowledgeHub />);

    for (const filter of screen.getAllByRole('button').slice(0, 5)) {
      expect(filter).toHaveClass(...focusClasses);
    }

    const watch = await screen.findByRole('button', { name: /Watch/ });
    const resource = screen.getByRole('link', { name: /Open resource/ });
    expect(watch).toHaveClass(...focusClasses);
    expect(resource).toHaveClass(...focusClasses);

    fireEvent.click(watch);
    expect(screen.getByRole('button', { name: 'Close video' })).toHaveClass(
      ...focusClasses,
    );
  });

  it('distinguishes filtered-empty results and exposes pressed filter state', async () => {
    knowledgeResponse.current = { data: knowledgeFixtures, error: null };
    renderPage(<KnowledgeHub />);

    await screen.findByText('Learning on video');
    const filters = screen.getByRole('group', { name: 'Filter resources by category' });
    const allFilter = within(filters).getByRole('button', { name: 'All' });
    const podcastFilter = within(filters).getByRole('button', { name: 'Podcasts' });
    expect(allFilter).toHaveAttribute('aria-pressed', 'true');
    expect(podcastFilter).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(podcastFilter);

    expect(podcastFilter).toHaveAttribute('aria-pressed', 'true');
    expect(allFilter).toHaveAttribute('aria-pressed', 'false');
    expect(await screen.findByText('No resources match your query.')).toBeInTheDocument();
    expect(
      screen.queryByText('Resources are being prepared. Please check back soon.'),
    ).not.toBeInTheDocument();
  });

  it('shows a distinct alert when resources fail to load', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    knowledgeResponse.current = {
      data: [],
      error: new Error('knowledge unavailable'),
    };
    renderPage(<KnowledgeHub />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'We could not load resources right now. Please try again later.',
    );
    expect(screen.queryByText('No resources match your query.')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Resources are being prepared. Please check back soon.'),
    ).not.toBeInTheDocument();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('traps video focus and restores it to the exact Watch trigger on close', async () => {
    knowledgeResponse.current = { data: knowledgeFixtures, error: null };
    renderPage(<KnowledgeHub />);

    const watch = await screen.findByRole('button', { name: /Watch/ });
    const backgroundFilter = screen.getByRole('button', { name: 'All' });
    watch.focus();
    fireEvent.click(watch);

    const close = screen.getByRole('button', { name: 'Close video' });
    await waitFor(() => expect(close).toHaveFocus());
    backgroundFilter.focus();
    await waitFor(() => expect(close).toHaveFocus());

    fireEvent.click(close);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(watch).toHaveFocus();
  });
});

describe('Council editorial portraits and keyboard access', () => {
  it('renders the council hero and 14 distinct versioned portraits in registry order', () => {
    const { container } = renderPage(<Council />);

    expect(
      screen.getByRole('img', { name: editorialIllustrations.council.alt }),
    ).toHaveAttribute('src', editorialIllustrations.council.src);

    const portraits = Array.from(
      container.querySelectorAll<HTMLImageElement>(
        'img[src*="/council-"]:not([src*="roundtable"])',
      ),
    );
    expect(portraits).toHaveLength(14);
    expect(portraits.map((portrait) => portrait.getAttribute('src'))).toEqual(
      councilPortraits,
    );
    expect(new Set(portraits.map((portrait) => portrait.src)).size).toBe(14);
    for (const portrait of portraits) {
      expect(portrait.src).toMatch(/council-[\w-]+-v2\.webp$/);
      expect(portrait.src).not.toContain('roundtable');
      expect(portrait.alt).toMatch(/.+, .+/);
      expect(portrait).toHaveAttribute('loading', 'lazy');
      expect(portrait).toHaveAttribute('decoding', 'async');
      expect(portrait).toHaveClass(
        'object-cover',
        'grayscale',
        'group-hover:grayscale-0',
      );
      fireEvent.error(portrait);
      expect(portrait).not.toHaveStyle({ display: 'none' });
    }
  });

  it('uses a refined filter-only transition for all 14 portraits', () => {
    const { container } = renderPage(<Council />);
    const portraits = Array.from(
      container.querySelectorAll<HTMLImageElement>(
        'img[src*="/council-"]:not([src*="roundtable"])',
      ),
    );

    expect(portraits).toHaveLength(14);
    for (const portrait of portraits) {
      expect(portrait).toHaveClass('transition-[filter]', 'duration-200');
      expect(portrait).not.toHaveClass('transition-all', 'duration-300');
    }
  });

  it('uses an exhaustive reorder-safe portrait mapping keyed by member name', async () => {
    const councilModule = await import('./Council');
    const portraitByName = (
      councilModule as unknown as {
        COUNCIL_PORTRAIT_BY_NAME?: Record<string, string>;
      }
    ).COUNCIL_PORTRAIT_BY_NAME;
    const expectedNames = [
      'Mr. Bikash Oinam',
      'Mr. Roshan Khumukcham',
      'Mr. Ronen Akoijam',
      'Dr. Soram Bobby Singh',
      'Shri Romen Ningthoujam',
      'Shri Khumukcham Roshaan Singh',
      'Smt. Nutan Nongthongbam',
      'Ms. Takhellambam Geetarani, LL.M.',
      'Shri Rojit Keisham',
      'Dr. Ngangbam Shantikumar Meetei',
      'Shri Ronendrojit Akoijam',
      'Smt. Purnimashi Moirangthem',
      'Dr. Tomba Singh Thokchom',
      'Dr. Usham Rojio',
    ];

    expect(portraitByName).toBeDefined();
    if (!portraitByName) return;
    expect(Object.keys(portraitByName)).toEqual(expectedNames);
    expect(expectedNames.map((name) => portraitByName[name])).toEqual(councilPortraits);
    expect(new Set(Object.values(portraitByName)).size).toBe(14);
  });

  it('uses native card triggers with visible keyboard focus', () => {
    renderPage(<Council />);

    const cards = screen.getAllByRole('button');
    expect(cards).toHaveLength(14);
    for (const card of cards) {
      expect(card).toHaveAttribute('type', 'button');
      expect(card.tabIndex).toBe(0);
      expect(card).toHaveClass(...focusClasses);
    }
  });

  it('traps member-dialog focus and restores it to the exact card on Escape', async () => {
    renderPage(<Council />);

    const cards = screen.getAllByRole('button');
    const firstCard = cards[0];
    const backgroundCard = cards[1];
    firstCard.focus();
    fireEvent.click(firstCard);
    expect(screen.getByRole('dialog')).toHaveTextContent('Mr. Bikash Oinam');

    const close = screen.getByRole('button', { name: 'Close dialog' });
    await waitFor(() => expect(close).toHaveFocus());
    backgroundCard.focus();
    await waitFor(() => expect(close).toHaveFocus());

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(firstCard).toHaveFocus();
  });
});

describe('News editorial artwork and links', () => {
  it('renders the news hero and exact article thumbnails through EditorialMedia', () => {
    const { container } = renderPage(<News />);

    expect(
      screen.getByRole('img', { name: editorialIllustrations.news.alt }),
    ).toHaveAttribute('src', editorialIllustrations.news.src);

    const expected = [
      editorialIllustrations.newsCommunity,
      editorialIllustrations.newsSpeech,
      editorialIllustrations.newsEnergy,
      editorialIllustrations.newsCoaching,
    ];
    const articleImages = expected.map((asset) =>
      screen.getByRole('img', { name: asset.alt }),
    );
    expect(articleImages.map((image) => image.getAttribute('src'))).toEqual(
      expected.map((asset) => asset.src),
    );
    for (const image of articleImages) {
      expect(image.closest('[data-slot="editorial-media"]')).toBeInTheDocument();
    }
    expect(container.querySelectorAll('.aspect-\\[3\\/2\\] > span')).toHaveLength(0);
  });

  it('gives all four article links the exact visible focus fragment', () => {
    renderPage(<News />);

    const links = screen.getAllByRole('link', { name: /Read Article/ });
    expect(links).toHaveLength(4);
    for (const link of links) {
      expect(link).toHaveClass(...focusClasses);
    }
  });

  it('registers the stable article route in the application router', () => {
    expect(appSource).toContain('<Route path="/news/:slug" element={<News />} />');
  });

  it('resolves a Read Article destination to meaningful detail content', async () => {
    renderNewsRoute('/news');

    const firstLink = screen.getAllByRole('link', { name: /Read Article/ })[0];
    expect(firstLink).toHaveAttribute(
      'href',
      '/news/transforming-learning-at-mommy-complex-nambol-bazar',
    );
    fireEvent.click(firstLink);

    expect(
      await screen.findByRole('heading', {
        name: 'Transforming Learning at Mommy Complex, Nambol Bazar',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Grassroots Impact')).toBeInTheDocument();
    expect(screen.getByText('May 12, 2026')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: editorialIllustrations.newsCommunity.alt }),
    ).toHaveAttribute('src', editorialIllustrations.newsCommunity.src);
    expect(screen.getByText(/Establishing our new offline learning center/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to News' })).toHaveClass(
      ...focusClasses,
    );
    expect(screen.queryByRole('link', { name: /Read Article/ })).not.toBeInTheDocument();
  });

  it('renders a useful fallback for an invalid article slug', () => {
    renderNewsRoute('/news/not-a-real-article');

    expect(
      screen.getByRole('heading', { name: 'Article not found' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/could not find the news article/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to News' })).toHaveClass(
      ...focusClasses,
    );
  });
});
