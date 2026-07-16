import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from './supabaseClient';

interface AuthContextType {
  user: any | null;
  role: 'admin' | 'educator' | 'resource_person' | 'none' | null;
  loading: boolean;
  isSimulated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, role: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInSimulated: (role: 'admin' | 'educator' | 'resource_person') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<'admin' | 'educator' | 'resource_person' | 'none' | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false);

  // Track which user ID has already had its role fetched to prevent
  // the onAuthStateChange listener from firing a redundant DB call
  // immediately after getSession resolves (eliminating 4→2 network calls).
  const roleFetchedForRef = useRef<string | null>(null);

  async function fetchUserRole(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setRole(data.role as any);
        roleFetchedForRef.current = userId;
        return true;
      } else {
        // Log the actual error so we can diagnose issues
        console.warn('[AuthContext] fetchUserRole: no role row found or error', { userId, error });
        setRole('none');
        roleFetchedForRef.current = userId;
        return false;
      }
    } catch (err) {
      console.error('[AuthContext] fetchUserRole: unexpected error', err);
      setRole('none');
      roleFetchedForRef.current = userId;
      return false;
    }
  }

  useEffect(() => {
    // 1. Check simulated session in localStorage — resolves instantly, no network
    const cachedSim = localStorage.getItem('edu_plus_sim_session');
    if (cachedSim) {
      try {
        const parsed = JSON.parse(cachedSim);
        setUser(parsed.user);
        setRole(parsed.role);
        setIsSimulated(true);
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem('edu_plus_sim_session');
      }
    }

    // 2. Fetch Supabase session — resolves from localStorage with persistSession: true
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          setUser(session.user);
          // Always fetch role fresh — don't rely on ref to deduplicate here
          await fetchUserRole(session.user.id);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (err) {
        console.error('Failed to initialize auth session', err);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    // Race against a 5s timeout so the loading screen never hangs forever
    const timeout = new Promise<void>((resolve) => setTimeout(() => {
      console.warn('Auth initialization timed out — forcing loading=false');
      setLoading(false);
      resolve();
    }, 5000));

    Promise.race([initializeAuth(), timeout]);

    // 3. Listen to auth state changes (login/logout events)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (localStorage.getItem('edu_plus_sim_session')) return;

      if (session?.user) {
        setUser(session.user);
        // Only refetch if this is a different user or role hasn't been fetched yet
        if (roleFetchedForRef.current !== session.user.id) {
          await fetchUserRole(session.user.id);
        }
      } else {
        setUser(null);
        setRole(null);
        setIsSimulated(false);
        roleFetchedForRef.current = null;
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    localStorage.removeItem('edu_plus_sim_session');
    roleFetchedForRef.current = null; // Reset so next auth event fetches fresh role
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // Explicitly fetch role after sign-in so we don't rely solely on the async
    // onAuthStateChange event which can arrive before state is fully settled.
    if (data?.user && !error) {
      await fetchUserRole(data.user.id);
    }
    return { error };
  };

  const signUp = async (email: string, password: string, selectedRole: string) => {
    localStorage.removeItem('edu_plus_sim_session');
    roleFetchedForRef.current = null;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (data?.user && !error) {
      await supabase.from('user_roles').insert({
        id: data.user.id,
        role: selectedRole
      });
    }
    return { error };
  };

  const signOut = async () => {
    localStorage.removeItem('edu_plus_sim_session');
    roleFetchedForRef.current = null;
    setIsSimulated(false);
    setUser(null);
    setRole(null);
    await supabase.auth.signOut();
  };

  const signInSimulated = (selectedRole: 'admin' | 'educator' | 'resource_person') => {
    const mockUser = {
      id: '00000000-0000-0000-0000-000000000000',
      email: `simulated_${selectedRole}@eduplus.dev`,
      user_metadata: { full_name: `Simulated ${selectedRole.toUpperCase()}` }
    };
    const session = { user: mockUser, role: selectedRole };
    localStorage.setItem('edu_plus_sim_session', JSON.stringify(session));
    setUser(mockUser);
    setRole(selectedRole);
    setIsSimulated(true);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, isSimulated, signIn, signUp, signOut, signInSimulated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
