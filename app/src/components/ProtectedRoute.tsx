import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../lib/AuthContext';
import type { AppRole } from '@/types/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: readonly AppRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center p-8">
        <div className="border border-border p-6 bg-card rounded-none shadow-sm text-center max-w-md">
          <p className="text-xs tracking-[0.12em] mb-3 text-muted-foreground uppercase">Secure workspace</p>
          <p className="text-sm font-semibold text-foreground mb-4">Checking your access…</p>
          <div className="w-12 h-1 bg-primary mx-auto rounded-none"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
