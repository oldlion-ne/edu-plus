import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PedigreeShowcase from './PedigreeShowcase';

// Mock IntersectionObserver for JSDOM
class IntersectionObserverMock {
  callback: any;
  constructor(callback: any) {
    this.callback = callback;
  }
  observe() {
    this.callback([{ isIntersecting: true }]);
  }
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;

// Mock ResizeObserver for JSDOM
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;

describe('PedigreeShowcase Component', () => {
  it('renders the Technical Pedigree section header', () => {
    render(<PedigreeShowcase />);
    expect(screen.getByText(/Technical Pedigree/i)).toBeDefined();
    expect(screen.getByText(/world-class organizations/i)).toBeDefined();
  });

  it('renders all 4 typographic cards', () => {
    render(<PedigreeShowcase />);
    expect(screen.getByText('Strategic Integrations')).toBeDefined();
    expect(screen.getByText('Real-time Guidance')).toBeDefined();
    expect(screen.getByText('Framework Ready')).toBeDefined();
    expect(screen.getByText('Institution Ready')).toBeDefined();
  });
});
