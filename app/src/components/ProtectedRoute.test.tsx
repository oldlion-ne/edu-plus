import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';
import { MemoryRouter } from 'react-router';

vi.mock('../lib/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: true,
    role: null
  })
}));

describe('ProtectedRoute', () => {
  it('renders loader when loading is active', () => {
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Private Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.getByText(/DECRYPTING_CREDENTIALS/i)).toBeDefined();
  });
});
