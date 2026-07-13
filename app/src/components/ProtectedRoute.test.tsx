import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';
import { MemoryRouter, Route, Routes } from 'react-router';

let authState = {
  user: null as { id: string } | null,
  loading: true,
  role: null as 'admin' | 'resource_person' | 'member' | null,
};

vi.mock('../lib/AuthContext', () => ({
  useAuth: () => authState,
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
    expect(screen.getByText(/checking your access/i)).toBeDefined();
  });

  it('redirects an authenticated member away from an admin-only route', () => {
    authState = { user: { id: 'member-1' }, loading: false, role: 'member' };

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/" element={<div>Public home</div>} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div>Admin content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Public home')).toBeDefined();
    expect(screen.queryByText('Admin content')).toBeNull();
  });
});
