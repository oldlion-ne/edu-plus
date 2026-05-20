import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AIChatAgent from './AIChatAgent';

// Mock supabase
vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => Promise.resolve({ data: { id: 'test-conversation-id' }, error: null })),
        eq: vi.fn(() => ({
          order: vi.fn(() => Promise.resolve({ data: [], error: null }))
        }))
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: { id: 'test-conversation-id' }, error: null }))
        }))
      }))
    })),
    rpc: vi.fn(() => Promise.resolve({ data: [], error: null }))
  }
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('AIChatAgent component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders initial AI toggle button', () => {
    render(<AIChatAgent />);
    expect(screen.getByRole('button', { name: /open ai chat support/i })).toBeDefined();
  });

  it('opens chat window on toggle button click', async () => {
    render(<AIChatAgent />);
    const button = screen.getByRole('button', { name: /open ai chat support/i });
    fireEvent.click(button);
    
    expect(screen.getByText('EDU+ COGNITIVE LINK')).toBeDefined();
    expect(screen.getByPlaceholderText('Transmit query...')).toBeDefined();
  });
});
