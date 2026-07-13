import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';

import type { AppRole, AuthContextValue } from '@/types/auth';
import { isSupabaseConfigured, supabase } from './supabaseClient';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const validRoles = new Set<AppRole>(['admin', 'resource_person', 'member']);

function asAppRole(value: unknown): AppRole | null {
  return typeof value === 'string' && validRoles.has(value as AppRole)
    ? (value as AppRole)
    : null;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const roleFetchedForRef = useRef<string | null>(null);

  async function fetchUserRole(userId: string): Promise<AppRole | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      if (error) return null;
      return asAppRole(data?.role);
    } catch {
      return null;
    }
  }

  async function applyUser(nextUser: User | null) {
    setUser(nextUser);
    if (!nextUser) {
      setRole(null);
      roleFetchedForRef.current = null;
      return;
    }

    if (roleFetchedForRef.current !== nextUser.id) {
      const nextRole = await fetchUserRole(nextUser.id);
      setRole(nextRole);
      roleFetchedForRef.current = nextUser.id;
    }
  }

  useEffect(() => {
    let active = true;

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (active) await applyUser(data.session?.user ?? null);
      } finally {
        if (active) setLoading(false);
      }
    };

    void initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      void applyUser(session?.user ?? null).finally(() => {
        if (active) setLoading(false);
      });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    roleFetchedForRef.current = null;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    roleFetchedForRef.current = null;
    const { error } = await supabase.auth.signUp({ email, password });
    return { error };
  };

  const requestPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    return { error };
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    return { error };
  };

  const signOut = async () => {
    roleFetchedForRef.current = null;
    setUser(null);
    setRole(null);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signIn,
        signUp,
        requestPasswordReset,
        updatePassword,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
