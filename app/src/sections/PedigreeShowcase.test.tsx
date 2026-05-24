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
(globalThis as any).IntersectionObserver = IntersectionObserverMock as any;

// Mock ResizeObserver for JSDOM
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).ResizeObserver = ResizeObserverMock as any;

describe('PedigreeShowcase Component', () => {
  it('renders the Technical Pedigree section header', () => {
    render(<PedigreeShowcase />);
    expect(screen.getByText('Technical Pedigree & Advisory Network')).toBeDefined();
    expect(screen.getByText('Advisory Framework')).toBeDefined();
    expect(screen.getByText(/A robust framework of academic advisories/i)).toBeDefined();
  });

  it('renders all 4 bento cards', () => {
    render(<PedigreeShowcase />);
    expect(screen.getByText('Strategic Integrations')).toBeDefined();
    expect(screen.getByText('Real-time Guidance')).toBeDefined();
    expect(screen.getByText('Framework Ready')).toBeDefined();
    expect(screen.getByText('Institution Ready')).toBeDefined();
  });
});
