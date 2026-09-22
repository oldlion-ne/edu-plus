import { createClient } from '@supabase/supabase-js';

const url = "https://bichdmoktcdnppctjmrc.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY2hkbW9rdGNkbnBwY3RqbXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTk4NTEsImV4cCI6MjA5NDc5NTg1MX0.-lC49TzsiP2T7MRnC9eKL3V1Hj0R0tquC0qLhxQAlS8";

const supabase = createClient(url, key);

async function listTables() {
  const { data, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public');
  console.log("Tables:", data, "Error:", error);
}

listTables();
