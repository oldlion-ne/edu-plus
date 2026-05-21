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
    // Instantly trigger callback to simulate element visibility when observed
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
    expect(screen.getByText('Expert Registry')).toBeDefined();
    expect(screen.getByText('Technical Pedigree')).toBeDefined();
  });

  it('renders all 8 advisors in the bento grid', () => {
    render(<PedigreeShowcase />);
    
    const expectedAdvisors = [
      'Dr. Soram Bobby Singh',
      'Ms. Geetarani Takhellambam',
      'Smt. Purnimashi Moirangthem',
      'Dr. Ngangbam Shantikumar Meetei',
      'Khumukcham Roshaan Singh',
      'Shri Romen Ningthoujam',
      'Smt. Nutan Nongthongbam',
      'Shri Rojit Keisham'
    ];

    expectedAdvisors.forEach(name => {
      expect(screen.getByText(name)).toBeDefined();
    });
  });
});
