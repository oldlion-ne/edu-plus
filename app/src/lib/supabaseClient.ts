import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY || '';

const isTestOrDev = import.meta.env.MODE === 'test' ||
  import.meta.env.DEV ||
  typeof process !== 'undefined' && process.env?.VITEST;

if (!supabaseUrl || !supabaseAnonKey) {
  if (isTestOrDev) {
    console.warn('Supabase credentials missing — using placeholders (test/dev only).');
  } else {
    console.error('FATAL: Supabase credentials missing in production. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_PUBLIC_KEY.');
  }
}

// In test/CI, use safe placeholders so createClient doesn't throw at module load.
// In production, real credentials are required — network calls will fail if missing.
const resolvedUrl = supabaseUrl || (isTestOrDev ? 'https://placeholder.supabase.co' : 'https://missing-config.supabase.co');
const resolvedKey = supabaseAnonKey || (isTestOrDev ? 'placeholder-anon-key' : 'missing-anon-key');

export const supabase = createClient(resolvedUrl, resolvedKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'edu_plus_auth',
  },
});
