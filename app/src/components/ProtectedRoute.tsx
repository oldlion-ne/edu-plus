import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../lib/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F14] flex flex-col justify-center items-center text-[#7DF9FF] font-mono p-8">
        <div className="border border-[#7DF9FF]/30 p-6 bg-[#0E131A] rounded-none shadow-[0_0_15px_rgba(125,249,255,0.1)] text-center max-w-md animate-pulse">
          <p className="text-xs tracking-[0.2em] mb-3">SYSTEM SECURITY LOG</p>
          <p className="text-sm font-bold text-white mb-4">[ DECRYPTING_CREDENTIALS // PROCEED WITH CAUTION ]</p>
          <div className="w-12 h-1 bg-[#7DF9FF] mx-auto animate-ping rounded-none"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
