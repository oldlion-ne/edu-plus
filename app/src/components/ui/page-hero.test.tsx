import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { editorialIllustrations } from '@/lib/editorialIllustrations';
import Hero from '@/sections/Hero';

import { PageHero } from './page-hero';

describe('PageHero', () => {
  it('renders a copy-only hero with a level-one heading and no image', () => {
    const { container } = render(
      <PageHero
        eyebrow="Label"
        title="Quiet title"
        description="Quiet description"
      />,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Quiet title' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(container.firstElementChild?.firstElementChild?.firstElementChild).toHaveClass(
      'min-h-[50vh]',
    );
  });

  it('places copy and CTA before priority artwork in the editorial grid', () => {
    const { container } = render(
      <PageHero
        eyebrow="Foundation"
        title="Where learning begins"
        description="Description"
        illustration={editorialIllustrations.home}
      >
        <button>Start</button>
      </PageHero>,
    );

    const eyebrow = screen.getByText('Foundation');
    const cta = screen.getByRole('button', { name: 'Start' });
    const image = screen.getByRole('img', {
      name: editorialIllustrations.home.alt,
    });
    const layout = container.firstElementChild?.firstElementChild?.firstElementChild;

    expect(
      cta.compareDocumentPosition(image) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('fetchpriority', 'high');
    expect(eyebrow).toHaveClass('text-primary');
    expect(layout).toHaveClass(
      'grid',
      'min-h-[55vh]',
      'lg:grid-cols-[55fr_45fr]',
    );
  });

  it('uses straight bordered artwork framing and registry mobile metadata', () => {
    const { container } = render(
      <PageHero
        eyebrow="Foundation"
        title="Where learning begins"
        description="Description"
        illustration={editorialIllustrations.home}
      />,
    );

    const image = screen.getByRole('img', {
      name: editorialIllustrations.home.alt,
    });
    const frame = container.querySelector('[data-slot="editorial-media"]');
    const artworkArea = frame?.parentElement;

    expect(artworkArea).toHaveClass(
      'border-t',
      'border-border/30',
      'lg:border-l',
      'lg:border-t-0',
    );
    expect(artworkArea?.className).not.toMatch(/(?:^|\s)(?:rounded(?!-none)|shadow)/);
    expect(frame).toHaveClass(
      'max-w-xl',
      'rounded-none',
      'border',
      'aspect-[4/3]',
      'max-md:aspect-[3/2]',
      'max-md:max-h-[360px]',
    );
    expect(frame?.className).not.toMatch(/(?:^|\s)shadow/);
    expect(image).toHaveAttribute('sizes', editorialIllustrations.home.sizes);
  });
});

describe('Home Hero', () => {
  it('uses the shared editorial hero with approved copy, routes, and artwork', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );

    expect(screen.getByText('Foundation')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Where Learning Begins',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Start' }),
    ).toHaveAttribute('href', '/contact');
    expect(
      screen.getByRole('link', { name: 'Explore' }),
    ).toHaveAttribute('href', '/about');
    expect(
      screen.getByRole('img', { name: editorialIllustrations.home.alt }),
    ).toHaveAttribute('src', editorialIllustrations.home.src);
  });
});
