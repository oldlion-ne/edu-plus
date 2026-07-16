import { render, screen, waitFor } from '@testing-library/react';
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
  it('renders the mission and vision as semantic copy', async () => {
    const { container } = render(<Vision />);

    await waitFor(() => {
      expect(screen.getByText('Our Mission')).toBeVisible();
    });
    expect(container.textContent).toMatch(/To become a leading skills development platform/i);
    await waitFor(() => {
      expect(screen.getByText('Our Vision')).toBeVisible();
    });
    expect(container.textContent).toMatch(/To empower individuals to acquire future-ready/i);
  });
});
