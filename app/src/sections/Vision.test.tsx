import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Vision from './Vision';

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

describe('Vision Component', () => {
  it('renders the Vision section with The Mission label and scroll reveal text', () => {
    render(<Vision />);
    
    // Check for "The Mission" label
    expect(screen.getByText('The Mission')).toBeInTheDocument();
    
    // Check that individual key words from the mission statement are rendered in the DOM
    expect(screen.getAllByText('construct').length).toBeGreaterThan(0);
    expect(screen.getAllByText('definitive').length).toBeGreaterThan(0);
    expect(screen.getAllByText('learning').length).toBeGreaterThan(0);
    expect(screen.getAllByText('capability').length).toBeGreaterThan(0);
  });
});
