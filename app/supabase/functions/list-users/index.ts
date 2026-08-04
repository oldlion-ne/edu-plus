import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

// ─── CORS ─────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://eduplus-skills.vercel.app',
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
    // Verify the caller is an authenticated admin.
    // SUPABASE_URL and SUPABASE_ANON_KEY are always auto-injected by the runtime.
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

    // Check caller has admin role.
    const { data: roleRow } = await anonClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();
    if (roleRow?.role !== 'admin') throw new Error('Forbidden: admin role required');

    // ── Service Role Client (server-side only) ────────────────────────────────
    // SUPABASE_SERVICE_ROLE_KEY is injected by Supabase at runtime and is NEVER
    // exposed to the browser. This is the correct place for admin auth operations.
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // Fetch all auth users (admin API).
    const { data: { users }, error: listError } = await adminClient.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    if (listError) throw listError;

    // Fetch all role mappings.
    const { data: roles } = await adminClient
      .from('user_roles')
      .select('user_id, role');

    const roleMap = new Map((roles || []).map((r: any) => [r.user_id, r.role]));

    const result = users.map((u: any) => ({
      id: u.id,
      email: u.email,
      role: roleMap.get(u.id) || 'none',
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
      banned_until: u.banned_until,
    }));

    return new Response(JSON.stringify({ success: true, users: result }), {
      headers: { ...headers, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err: any) {
    const status = err.message.startsWith('Forbidden') ? 403
      : err.message.startsWith('Unauthorized') ? 401
      : 400;
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { ...headers, 'Content-Type': 'application/json' },
      status,
    });
  }
});
