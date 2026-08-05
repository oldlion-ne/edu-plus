import { createContext, useContext } from 'react';

export type UserRole = 'admin' | 'educator' | 'resource_person' | 'none';

export interface AuthContextType {
  user: any | null;
  role: UserRole | null;
  loading: boolean;
  isSimulated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, role: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInSimulated: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
