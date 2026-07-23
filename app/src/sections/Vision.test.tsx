import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

// Override useInView so BlurFade's animate prop flips to "visible".
// Note: even with this, motion.div still writes initial opacity:0 as an
// inline style in JSDOM (no animation engine runs transitions), so we
// use toBeInTheDocument() for elements inside animated parents.
vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>();
  return { ...actual, useInView: () => true };
});

import Vision from './Vision';

// Ensure IntersectionObserver is available
class IntersectionObserverMock {
  callback: any;
  constructor(callback: any) { this.callback = callback; }
  observe() { this.callback([{ isIntersecting: true }]); }
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

describe('Vision Component', () => {
  it('renders the mission and vision as semantic copy', () => {
    const { container } = render(<Vision />);

    // Labels are inside a Framer Motion parent that starts at opacity:0 in JSDOM —
    // toBeInTheDocument() is correct here; toBeVisible() is incompatible with
    // Framer Motion's inline initial-state styles in a no-animation-engine env.
    expect(screen.getByText('01 / Our Mission')).toBeInTheDocument();
    expect(screen.getByText('02 / Our Vision')).toBeInTheDocument();

    // Full copy verified via textContent (unaffected by CSS opacity).
    expect(container.textContent).toMatch(/To become a leading skills development platform/i);
    expect(container.textContent).toMatch(/To empower individuals to acquire future-ready/i);
  });
});
