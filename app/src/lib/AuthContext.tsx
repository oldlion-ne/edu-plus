import React, { useEffect, useRef, useState } from 'react';
import { supabase } from './supabaseClient';
import { AuthContext, type UserRole } from './useAuth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false);

  const roleFetchedForRef = useRef<string | null>(null);
  const roleFetchGenerationRef = useRef<number>(0);

  // ─── Role fetch via SECURITY DEFINER RPC (bypasses RLS entirely) ─────────────
  async function fetchUserRole(userId: string, token?: string): Promise<boolean> {
    const currentGeneration = ++roleFetchGenerationRef.current;
    try {
      const fetchPromise = (async () => {
        let accessToken = token;
        if (!accessToken) {
          try {
            const authItem = localStorage.getItem('edu_plus_auth');
            if (authItem) {
              const parsed = JSON.parse(authItem);
              accessToken = parsed.access_token;
            }
          } catch(e) {
            // ignore empty block
          }
        }
        const headers: Record<string, string> = {
          'apikey': import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY,
          'Content-Type': 'application/json'
        };
        if (accessToken) {
          headers['Authorization'] = `Bearer ${accessToken}`;
        }

        // Primary: use SECURITY DEFINER function via REST API
        try {
          const rpcRes = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/rpc/get_my_role`, {
            method: 'POST',
            headers
          });
          if (rpcRes.ok) {
            const rpcRole = await rpcRes.json();
            if (rpcRole && rpcRole !== 'none') {
              if (roleFetchGenerationRef.current === currentGeneration) {
                setRole(rpcRole as any);
                roleFetchedForRef.current = userId;
              }
              return true;
            }
          }
        } catch (e) {
          console.warn('RPC fetch failed', e);
        }

        // Fallback: direct table query via REST API
        try {
          const tableRes = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/user_roles?id=eq.${userId}&select=role`, {
            method: 'GET',
            headers
          });
          if (tableRes.ok) {
            const tableData = await tableRes.json();
            if (tableData && tableData.length > 0) {
              if (roleFetchGenerationRef.current === currentGeneration) {
                setRole(tableData[0].role as any);
                roleFetchedForRef.current = userId;
              }
              return true;
            }
          }
        } catch (e) {
          console.warn('Table fetch failed', e);
        }

        if (roleFetchGenerationRef.current === currentGeneration) {
          console.warn('[AuthContext] fetchUserRole: no role found');
          setRole('none');
          roleFetchedForRef.current = userId;
        }
        return false;
      })();

      let timeoutId: NodeJS.Timeout;
      const timeoutPromise = new Promise<boolean>((resolve) => {
        timeoutId = setTimeout(() => {
          if (roleFetchGenerationRef.current === currentGeneration) {
            console.warn('[AuthContext] fetchUserRole: timeout reached, assuming none');
            setRole('none');
            roleFetchedForRef.current = userId;
          }
          resolve(false);
        }, 5000);
      });

      const result = await Promise.race([fetchPromise, timeoutPromise]);
      clearTimeout(timeoutId!);
      return result;
    } catch (err) {
      console.error('[AuthContext] fetchUserRole: unexpected error', err);
      if (roleFetchGenerationRef.current === currentGeneration) {
        setRole('none');
        roleFetchedForRef.current = userId;
      }
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
          await fetchUserRole(session.user.id, session.access_token);
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

    // Race against a 2.5s timeout so the loading screen never hangs forever
    const timeout = new Promise<void>((resolve) => setTimeout(() => {
      console.info('[AuthContext] Auth initialization timed out - forcing loading=false');
      setLoading(false);
      resolve();
    }, 2500));

    Promise.race([initializeAuth(), timeout]);

    // 3. Listen to auth state changes (login/logout events)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (localStorage.getItem('edu_plus_sim_session')) return;

      if (session?.user) {
        setUser(session.user);
        // Only refetch if this is a different user or role hasn't been fetched yet
        if (roleFetchedForRef.current !== session.user.id) {
          await fetchUserRole(session.user.id, session.access_token);
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
      await fetchUserRole(data.user.id, data.session?.access_token);
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

  const signInSimulated = (selectedRole: UserRole) => {
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
