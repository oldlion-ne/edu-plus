import "@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend";

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://eduplus-skills.vercel.app'
];

function escapeHtml(unsafe: string): string {
  return (unsafe || '').toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('Origin') || '';
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);
  
  // Default to a safe origin or the matching one if allowed
  const corsOrigin = isAllowedOrigin ? origin : ALLOWED_ORIGINS[0];

  const corsHeaders = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (!isAllowedOrigin) {
      throw new Error('Unauthorized origin');
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }

    const resend = new Resend(RESEND_API_KEY);
    const body = await req.json();
    const { type, email, name, message, mobile } = body;

    // Validate size to prevent oversized payloads
    if (
      (email && email.length > 255) ||
      (name && name.length > 255) ||
      (message && message.length > 5000) ||
      (mobile && mobile.length > 30)
    ) {
      throw new Error('Payload size exceeded limits');
    }

    let subject = 'New Inquiry from EduPlus';
    let htmlTemplate = '';

    if (type === 'newsletter') {
      subject = 'New Newsletter Subscription';
      htmlTemplate = `<p><strong>Email:</strong> ${escapeHtml(email)}</p><p>Subscribed to the newsletter.</p>`;
    } else {
      const mobileHtml = mobile ? `<p><strong>Mobile:</strong> ${escapeHtml(mobile)}</p>` : '';
      htmlTemplate = `<p><strong>Name:</strong> ${escapeHtml(name || 'N/A')}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p>${mobileHtml}<p><strong>Message:</strong><br/>${escapeHtml(message)}</p>`;
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'eduplusskills8@gmail.com',
      subject: subject,
      html: htmlTemplate,
      replyTo: escapeHtml(email),
    });

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
