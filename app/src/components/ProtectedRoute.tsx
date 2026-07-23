import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../lib/useAuth';
import { supabase } from '../lib/supabaseClient';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isSimulated } = useAuth();
  const location = useLocation();
  const [aalLoading, setAalLoading] = useState(true);
  const [needsMfa, setNeedsMfa] = useState(false);

  useEffect(() => {
    if (loading) return;
    
    // If not logged in, or if it's a simulated session (tests/demo), skip AAL check
    if (!user || isSimulated) {
      setAalLoading(false);
      return;
    }

    supabase.auth.mfa.getAuthenticatorAssuranceLevel().then(({ data, error }) => {
      if (!error && data) {
        if (data.nextLevel === 'aal2' && data.currentLevel === 'aal1') {
          setNeedsMfa(true);
        }
      }
      setAalLoading(false);
    });
  }, [user, loading, isSimulated]);

  if (loading || aalLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-center items-center text-primary font-mono p-8">
        <div className="border border-border p-6 bg-card rounded-none shadow-[0_0_15px_oklch(var(--primary)/0.05)] text-center max-w-md animate-pulse">
          <p className="text-xs tracking-widest mb-3 text-muted-foreground uppercase">Authenticating</p>
          <p className="text-sm font-light text-foreground mb-4">Verifying session credentials...</p>
          <div className="w-12 h-0.5 bg-primary mx-auto animate-pulse rounded-none"></div>
        </div>
      </div>
    );
  }

  // If user is not authenticated or needs MFA, redirect to login
  if (!user || needsMfa) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
