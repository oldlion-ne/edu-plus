import { describe, expect, it } from 'vitest';

import { isSupabaseConfigured, supabase } from './supabaseClient';

describe('supabase client configuration', () => {
  it('creates a safe client when environment credentials are absent', () => {
    expect(isSupabaseConfigured).toBe(false);
    expect(supabase).toBeDefined();
  });
});
