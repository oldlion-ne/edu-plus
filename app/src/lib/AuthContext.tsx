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

  const roleFetchedForRef = useRef<string | null>(null);

  // ─── Role fetch via SECURITY DEFINER RPC (bypasses RLS entirely) ─────────────
  async function fetchUserRole(userId: string): Promise<boolean> {
    try {
      // Primary: use SECURITY DEFINER function — auth.uid() is always correct here
      const { data: rpcRole, error: rpcError } = await supabase.rpc('get_my_role');

      if (!rpcError && rpcRole && rpcRole !== 'none') {
        setRole(rpcRole as any);
        roleFetchedForRef.current = userId;
        return true;
      }

      // Fallback: direct table query
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setRole(data.role as any);
        roleFetchedForRef.current = userId;
        return true;
      }

      console.warn('[AuthContext] fetchUserRole: no role found', { userId, rpcError, error });
      setRole('none');
      roleFetchedForRef.current = userId;
      return false;
    } catch (err) {
      console.error('[AuthContext] fetchUserRole: unexpected error', err);
      setRole('none');
      roleFetchedForRef.current = userId;
      return false;
    }
  }

  // ─── Auto-retry when role lands as 'none' for a real authenticated user ──────
  // This handles the case where HMR hot-reloaded the module while the user was
  // already logged in, or where the initial fetch lost a timing race.
  useEffect(() => {
    if (!user || isSimulated || role !== 'none') return;

    const timer = setTimeout(async () => {
      console.info('[AuthContext] Role is "none" for authenticated user — retrying fetch...');
      roleFetchedForRef.current = null; // allow fresh fetch
      await fetchUserRole(user.id);
    }, 1200);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, role, isSimulated]);

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
      console.warn('Auth initialization timed out - forcing loading=false');
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
    roleFetchedForRef.current = null;
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
