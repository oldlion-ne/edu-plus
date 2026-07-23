// @ts-nocheck
// Suppress VSCode TypeScript errors since this is a Deno environment, not Node.js
import "@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set');
    }

    const resend = new Resend(RESEND_API_KEY);
    const body = await req.json();
    const { type, email, name, message } = body;

    let subject = 'New Inquiry from EduPlus';
    let htmlTemplate = '';

    if (type === 'newsletter') {
      subject = 'New Newsletter Subscription';
      htmlTemplate = `<p><strong>Email:</strong> ${email}</p><p>Subscribed to the newsletter.</p>`;
    } else {
      htmlTemplate = `<p><strong>Name:</strong> ${name || 'N/A'}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`;
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'eduplusskills8@gmail.com',
      subject: subject,
      html: htmlTemplate,
      reply_to: email,
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
