import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  councilPortraits,
  editorialIllustrations,
} from '@/lib/editorialIllustrations';

import Council from './Council';
import KnowledgeHub from './KnowledgeHub';
import News from './News';

const { knowledgeItems } = vi.hoisted(() => ({
  knowledgeItems: { current: [] as Record<string, string>[] },
}));

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(async () => ({ data: knowledgeItems.current, error: null })),
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

function renderPage(page: React.ReactNode) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

describe('Knowledge Hub editorial artwork and controls', () => {
  beforeEach(() => {
    knowledgeItems.current = [];
  });

  it('renders the knowledge hero and a decorative illustrated empty state', async () => {
    const { container } = renderPage(<KnowledgeHub />);

    expect(
      screen.getByRole('img', { name: editorialIllustrations.knowledge.alt }),
    ).toHaveAttribute('src', editorialIllustrations.knowledge.src);

    const emptyMessage = await screen.findByText('No resources match your query.');
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
    knowledgeItems.current = [
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

  it('opens the selected member detail with Enter and Space', async () => {
    renderPage(<Council />);

    const cards = screen.getAllByRole('button');
    expect(cards).toHaveLength(14);
    for (const card of cards) {
      expect(card).toHaveAttribute('tabindex', '0');
      expect(card).toHaveClass(...focusClasses);
    }

    const firstCard = cards[0];
    firstCard.focus();
    fireEvent.keyDown(firstCard, { key: 'Enter' });
    expect(screen.getByRole('dialog')).toHaveTextContent('Mr. Bikash Oinam');

    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());

    firstCard.focus();
    const spaceEvent = new KeyboardEvent('keydown', {
      key: ' ',
      bubbles: true,
      cancelable: true,
    });
    fireEvent(firstCard, spaceEvent);
    expect(spaceEvent.defaultPrevented).toBe(true);
    expect(screen.getByRole('dialog')).toHaveTextContent('Mr. Bikash Oinam');
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
});
