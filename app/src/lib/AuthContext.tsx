import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { supabase } from './supabaseClient';

interface AuthContextType {
  user: any | null;
  role: 'admin' | 'educator' | 'resource_person' | null;
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
  const [role, setRole] = useState<'admin' | 'educator' | 'resource_person' | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false);

  // Track which user ID has already had its role fetched to prevent
  // the onAuthStateChange listener from firing a redundant DB call
  // immediately after getSession resolves (eliminating 4→2 network calls).
  const roleFetchedForRef = useRef<string | null>(null);

  useEffect(() => {
    // 1. Check simulated session in localStorage — resolves instantly, no network
    const cachedSim = localStorage.getItem('edu_plus_sim_session');
    if (cachedSim) {
      const parsed = JSON.parse(cachedSim);
      setUser(parsed.user);
      setRole(parsed.role);
      setIsSimulated(true);
      setLoading(false);
      return;
    }

    // 2. Fetch Supabase session — resolves from localStorage with persistSession: true
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // Only fetch role if we haven't already for this user
        if (roleFetchedForRef.current !== session.user.id) {
          await fetchUserRole(session.user.id);
          roleFetchedForRef.current = session.user.id;
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    };

    initializeAuth();

    // 3. Listen to auth changes — skip redundant role fetch if already fetched
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (localStorage.getItem('edu_plus_sim_session')) return;

      if (session?.user) {
        setUser(session.user);
        // Deduplicate: skip fetchUserRole if initializeAuth already fetched it
        if (roleFetchedForRef.current !== session.user.id) {
          await fetchUserRole(session.user.id);
          roleFetchedForRef.current = session.user.id;
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

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('id', userId)
        .single();

      if (data && !error) {
        setRole(data.role as any);
      } else {
        setRole('resource_person');
      }
    } catch (err) {
      setRole('resource_person');
    }
  };

  const signIn = async (email: string, password: string) => {
    localStorage.removeItem('edu_plus_sim_session');
    roleFetchedForRef.current = null; // Reset so next auth event fetches fresh role
    const { error } = await supabase.auth.signInWithPassword({ email, password });
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

