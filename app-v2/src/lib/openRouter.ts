export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API;
  if (!apiKey) {
    throw new Error('OpenRouter API key is not configured.');
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://eduplus.co',
      'X-Title': 'EduPlus AI Agent',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: messages,
      max_tokens: 1500,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error('Invalid response structure from OpenRouter API.');
  }
  return reply;
}
