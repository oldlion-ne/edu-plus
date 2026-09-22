import { createClient } from '@supabase/supabase-js';

const url = "https://bichdmoktcdnppctjmrc.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY2hkbW9rdGNkbnBwY3RqbXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTk4NTEsImV4cCI6MjA5NDc5NTg1MX0.-lC49TzsiP2T7MRnC9eKL3V1Hj0R0tquC0qLhxQAlS8";
const supabase = createClient(url, key);

async function check() {
  const t1 = await supabase.from('messages').select('count', { count: 'exact' });
  const t2 = await supabase.from('ai_messages').select('count', { count: 'exact' });
  const t3 = await supabase.from('ai_chat_messages').select('count', { count: 'exact' });
  const t4 = await supabase.from('conversation_messages').select('count', { count: 'exact' });
  const t5 = await supabase.from('chat_messages').select('count', { count: 'exact' });

  console.log("messages:", t1.error ? t1.error.message : t1.count);
  console.log("ai_messages:", t2.error ? t2.error.message : t2.count);
  console.log("ai_chat_messages:", t3.error ? t3.error.message : t3.count);
  console.log("conversation_messages:", t4.error ? t4.error.message : t4.count);
  console.log("chat_messages:", t5.error ? t5.error.message : t5.count);
}

check();
