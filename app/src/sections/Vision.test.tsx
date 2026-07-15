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
    render(<Vision />);

    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /To become a leading skills development platform/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Our Vision')).toBeInTheDocument();
    expect(
      screen.getByText(/To empower individuals to acquire future-ready/i),
    ).toBeInTheDocument();
  });
});
