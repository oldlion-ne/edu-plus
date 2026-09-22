export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

import { supabase } from './supabaseClient';

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  const { data, error } = await supabase.functions.invoke('chat', {
    body: { messages },
  });

  if (error) {
    throw new Error(`Chat API error: ${error.message}`);
  }

  if (data?.error) {
    throw new Error(`Chat API error: ${data.error}`);
  }

  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error('Invalid response structure from Chat API.');
  }
  return reply;
}
