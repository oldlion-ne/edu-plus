import React, { createContext, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    // 1. Check simulated session in localStorage
    const cachedSim = localStorage.getItem('edu_plus_sim_session');
    if (cachedSim) {
      const parsed = JSON.parse(cachedSim);
      setUser(parsed.user);
      setRole(parsed.role);
      setIsSimulated(true);
      setLoading(false);
      return;
    }

    // 2. Fetch Supabase session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    };

    initializeAuth();

    // 3. Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (localStorage.getItem('edu_plus_sim_session')) return; // Ignore if simulated is active

      if (session?.user) {
        setUser(session.user);
        await fetchUserRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
        setIsSimulated(false);
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
        setRole('resource_person'); // Default fallback
      }
    } catch (err) {
      setRole('resource_person');
    }
  };

  const signIn = async (email: string, password: string) => {
    localStorage.removeItem('edu_plus_sim_session');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, selectedRole: string) => {
    localStorage.removeItem('edu_plus_sim_session');
    const { data, error } = await supabase.auth.signUp({ email, password });
    
    if (data?.user && !error) {
      // Insert into public.user_roles
      await supabase.from('user_roles').insert({
        id: data.user.id,
        role: selectedRole
      });
    }
    return { error };
  };

  const signOut = async () => {
    localStorage.removeItem('edu_plus_sim_session');
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
