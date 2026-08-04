import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

// ─── CORS ─────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://eduplus-skills.vercel.app',
];

function corsHeaders(origin: string) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

// ─── Allowed Actions ─────────────────────────────────────────────────────────
type Action = 'update_role' | 'update_password' | 'toggle_ban' | 'delete';

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
    // SUPABASE_SERVICE_ROLE_KEY is auto-injected by the Supabase runtime.
    // It never leaves the server and is NEVER exposed to browser clients.
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const body = await req.json();
    const { action, userId } = body as { action: Action; userId: string; [k: string]: any };

    if (!action || !userId) throw new Error('Missing required fields: action, userId');

    // ── Dispatch Action ───────────────────────────────────────────────────────
    switch (action) {
      case 'update_role': {
        const { role } = body;
        if (!role) throw new Error('Missing field: role');
        const { error } = await adminClient
          .from('user_roles')
          .upsert({ id: userId, role }, { onConflict: 'id' });
        if (error) throw error;
        break;
      }

      case 'update_password': {
        const { newPassword } = body;
        if (!newPassword || newPassword.length < 6) throw new Error('Password must be at least 6 characters');
        const { error } = await adminClient.auth.admin.updateUserById(userId, { password: newPassword });
        if (error) throw error;
        break;
      }

      case 'toggle_ban': {
        const { ban } = body;
        const bannedUntil = ban ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 3650).toISOString() : null;
        const { error } = await adminClient.auth.admin.updateUserById(userId, {
          ban_duration: ban ? '876000h' : 'none',
        });
        if (error) throw error;
        break;
      }

      case 'delete': {
        const { error } = await adminClient.auth.admin.deleteUser(userId);
        if (error) throw error;
        // Clean up role mapping — throw if this fails to prevent stale mappings
        const { error: roleCleanupError } = await adminClient
          .from('user_roles')
          .delete()
          .eq('id', userId);
        if (roleCleanupError) throw roleCleanupError;
        break;
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify({ success: true }), {
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
