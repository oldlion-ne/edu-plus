import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';

import type { EditorialIllustration } from '@/lib/editorialIllustrations';

import { EditorialMedia } from './editorial-media';

const heroAsset: EditorialIllustration = {
  src: '/images/editorial/home-campus-walk-v2.webp',
  alt: 'East Asian learners approaching an amber-lit education pavilion',
  aspectClass: 'aspect-[4/3] max-md:aspect-[3/2] max-md:max-h-[360px]',
  objectPositionClass: 'object-center',
  sizes: '(min-width: 1024px) 45vw, 100vw',
};

describe('EditorialMedia', () => {
  it('renders priority meaningful art with registry presentation metadata', () => {
    render(<EditorialMedia asset={heroAsset} priority />);

    const image = screen.getByRole('img', { name: heroAsset.alt });
    const frame = image.parentElement;

    expect(image).toHaveAttribute('src', heroAsset.src);
    expect(image).toHaveAttribute('alt', heroAsset.alt);
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('fetchpriority', 'high');
    expect(image).toHaveAttribute('sizes', heroAsset.sizes);
    expect(image).toHaveAttribute('decoding', 'async');
    expect(image).toHaveClass('h-full', 'w-full', 'object-cover', 'object-center');
    expect(frame).toHaveClass(
      'w-full',
      'overflow-hidden',
      'rounded-none',
      'border',
      'border-border',
      'bg-[#24211F]',
      'aspect-[4/3]',
      'max-md:aspect-[3/2]',
      'max-md:max-h-[360px]',
    );
  });

  it('uses lazy loading and automatic fetch priority by default', () => {
    render(<EditorialMedia asset={heroAsset} />);

    const image = screen.getByRole('img', { name: heroAsset.alt });
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('fetchpriority', 'auto');
  });

  it('renders decorative art with an empty alt and composes caller classes', () => {
    const { container } = render(
      <EditorialMedia
        asset={heroAsset}
        decorative
        frameClassName="test-frame"
        imageClassName="test-image"
        className="caller-image"
      />,
    );

    const frame = container.firstElementChild;
    const image = frame?.querySelector('img');

    expect(frame).toHaveClass('test-frame');
    expect(image).toHaveAttribute('alt', '');
    expect(image).toHaveClass('test-image', 'caller-image');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('removes a failed image, preserves the poster field, and calls onError', () => {
    const onError = vi.fn();
    const { container } = render(
      <EditorialMedia asset={heroAsset} decorative onError={onError} />,
    );
    const frame = container.firstElementChild;
    const image = frame?.querySelector('img');

    expect(image).not.toBeNull();
    fireEvent.error(image as HTMLImageElement);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(frame?.querySelector('img')).not.toBeInTheDocument();
    expect(frame).toHaveClass(
      'w-full',
      'overflow-hidden',
      'rounded-none',
      'border',
      'border-border',
      'bg-[#24211F]',
      'aspect-[4/3]',
    );
    expect(frame).not.toHaveAttribute('role');
    expect(frame).not.toHaveAttribute('aria-label');
  });

  it('keeps an equivalent accessible image name when meaningful art fails', () => {
    const { container } = render(<EditorialMedia asset={heroAsset} />);
    const image = screen.getByRole('img', { name: heroAsset.alt });

    fireEvent.error(image);

    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: heroAsset.alt })).toBe(
      container.firstElementChild,
    );
  });

  it('renders a replacement when the asset source changes after a failure', async () => {
    const { rerender } = render(<EditorialMedia asset={heroAsset} />);
    fireEvent.error(screen.getByRole('img', { name: heroAsset.alt }));

    const replacement: EditorialIllustration = {
      ...heroAsset,
      src: '/images/editorial/about-mentorship-table-v2.webp',
      alt: 'Founders and a learner sharing ideas at a mentorship table',
    };
    rerender(<EditorialMedia asset={replacement} />);

    await waitFor(() => {
      expect(
        screen.getByRole('img', { name: replacement.alt }),
      ).toHaveAttribute('src', replacement.src);
    });
  });
});
