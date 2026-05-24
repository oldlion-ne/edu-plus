import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../lib/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center text-primary font-mono p-8">
        <div className="border border-border p-6 bg-card rounded-none shadow-[0_0_15px_oklch(var(--primary)/0.1)] text-center max-w-md animate-pulse">
          <p className="text-xs tracking-[0.2em] mb-3 text-muted-foreground">SYSTEM SECURITY LOG</p>
          <p className="text-sm font-bold text-foreground mb-4">[ DECRYPTING_CREDENTIALS // PROCEED WITH CAUTION ]</p>
          <div className="w-12 h-1 bg-primary mx-auto animate-ping rounded-none"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
