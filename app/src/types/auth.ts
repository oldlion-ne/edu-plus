import type { AuthError, User } from '@supabase/supabase-js';

export type AppRole = 'admin' | 'resource_person' | 'member';

export interface AuthResult {
  error: AuthError | null;
}

export interface AuthContextValue {
  user: User | null;
  role: AppRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  requestPasswordReset: (email: string) => Promise<AuthResult>;
  updatePassword: (password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}
