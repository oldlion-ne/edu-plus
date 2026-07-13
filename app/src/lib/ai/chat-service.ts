import { supabase } from '../supabaseClient';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  sessionId: string,
): Promise<string> {
  const { data, error } = await supabase.functions.invoke('ai-chat', {
    body: { messages, sessionId },
  });

  if (error || typeof data?.reply !== 'string' || !data.reply.trim()) {
    throw new Error('AI advisor is temporarily unavailable.');
  }

  return data.reply;
}
