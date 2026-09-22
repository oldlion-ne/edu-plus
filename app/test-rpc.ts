import { createClient } from '@supabase/supabase-js';

const url = "https://bichdmoktcdnppctjmrc.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY2hkbW9rdGNkbnBwY3RqbXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTk4NTEsImV4cCI6MjA5NDc5NTg1MX0.-lC49TzsiP2T7MRnC9eKL3V1Hj0R0tquC0qLhxQAlS8";
const supabase = createClient(url, key);

async function test() {
  const { data: convs } = await supabase.from('conversations').select('id').limit(1);
  if (convs && convs.length > 0) {
    const { data, error } = await supabase.rpc('get_conversation_messages', { p_conversation_id: convs[0].id });
    console.log("RPC Data length:", data ? data.length : 0, "Error:", error);
    console.log(data);
  }
}

test();
