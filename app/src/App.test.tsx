import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import App from './App';

// Mock ResizeObserver for JSDOM
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).ResizeObserver = ResizeObserverMock;

// Mock IntersectionObserver for JSDOM
class IntersectionObserverMock {
  constructor(_callback: any, _options?: any) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
(globalThis as any).IntersectionObserver = IntersectionObserverMock as any;

// Mock html2canvas and canvas context
vi.mock('html2canvas', () => ({
  default: vi.fn().mockResolvedValue(document.createElement('canvas')),
}));

HTMLCanvasElement.prototype.getContext = vi.fn() as any;

describe('App Routing', () => {
  it('renders Home page layout default state', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Home renders the main application structure
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders About page title on /about', async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText(/Know Who/i, {}, { timeout: 5000 })).toBeInTheDocument();
  });
});
