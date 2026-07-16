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
  it('renders the mission and vision as semantic copy', () => {
    const { container } = render(<Vision />);

    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(container.textContent).toMatch(/To become a leading skills development platform/i);
    expect(screen.getByText('Our Vision')).toBeInTheDocument();
    expect(container.textContent).toMatch(/To empower individuals to acquire future-ready/i);
  });
});
