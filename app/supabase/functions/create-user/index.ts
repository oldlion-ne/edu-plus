import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

// ─── CORS ─────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://eduplus-skills.vercel.app',
  'https://eduplusskills.in',
  'https://www.eduplusskills.in',
];

function corsHeaders(origin: string) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────
Deno.serve(async (req: Request) => {
  const origin = req.headers.get('Origin') || '';
  const headers = corsHeaders(origin);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    // ── Auth: verify caller is admin ──────────────────────────────────────────
    const anonClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) throw new Error('Missing Authorization header');

    const { data: { user }, error: authError } = await anonClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );
    if (authError || !user) throw new Error('Unauthorized');

    const { data: roleRow } = await anonClient
      .from('user_roles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (roleRow?.role !== 'admin') throw new Error('Forbidden: admin role required');

    // ── Service Role Client (server-side only) ────────────────────────────────
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const body = await req.json();
    const { email, password, role } = body as { email: string; password?: string; role: string };

    if (!email || !role || !password) {
      throw new Error('Missing required fields: email, password, role');
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      throw new Error('Temporary password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
    }

    // ── Create Auth User ───────────────────────────────────────────────────────
    const { data: authData, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
    });

    if (createError) throw createError;
    if (!authData.user) throw new Error('Failed to create user');

    // ── Assign Role ────────────────────────────────────────────────────────────
    const { error: roleError } = await adminClient
      .from('user_roles')
      .insert({ id: authData.user.id, role });

    if (roleError) {
      // Rollback auth user creation if role assignment fails
      const { error: deleteError } = await adminClient.auth.admin.deleteUser(authData.user.id);
      if (deleteError) {
        console.error('Rollback failure: could not delete user', deleteError);
        throw new Error(`Role assignment failed, and rollback failed to delete user: ${deleteError.message}`);
      }
      throw roleError;
    }

    return new Response(JSON.stringify({ success: true, user: authData.user }), {
      headers: { ...headers, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: any) {
    console.error('Error creating user:', err);
    const status = err.message.startsWith('Forbidden') ? 403
      : err.message.startsWith('Unauthorized') ? 401
      : 400;
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { ...headers, 'Content-Type': 'application/json' },
      status,
    });
  }
});
