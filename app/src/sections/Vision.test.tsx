import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Vision from './Vision';

// Mock IntersectionObserver cleanly for JSDOM
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
  it('renders the Vision section with Our Mission label and scroll reveal text', () => {
    render(<Vision />);
    
    // Check for "Our Mission" label
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    
    // Check that individual key words from the mission statement are rendered in the DOM
    expect(screen.getAllByText('become').length).toBeGreaterThan(0);
    expect(screen.getAllByText('skills').length).toBeGreaterThan(0);
    expect(screen.getAllByText('work').length).toBeGreaterThan(0);
    expect(screen.getAllByText('workforce').length).toBeGreaterThan(0);
  });
});
