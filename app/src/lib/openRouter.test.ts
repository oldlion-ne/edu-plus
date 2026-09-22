import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendChatMessage } from './openRouter';
import { supabase } from './supabaseClient';

vi.mock('./supabaseClient', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    }
  }
}));

describe('openRouter helper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('successfully calls chat edge function and returns content', async () => {
    const mockResponse = {
      data: {
        choices: [
          {
            message: {
              content: 'Hello, I am EduPlus Assistant.'
            }
          }
        ]
      },
      error: null
    };

    (supabase.functions.invoke as any).mockResolvedValue(mockResponse);

    const reply = await sendChatMessage([{ role: 'user', content: 'hi' }]);
    expect(reply).toBe('Hello, I am EduPlus Assistant.');
    expect(supabase.functions.invoke).toHaveBeenCalledWith('chat', {
      body: { messages: [{ role: 'user', content: 'hi' }] }
    });
  });

  it('throws error when edge function returns error', async () => {
    (supabase.functions.invoke as any).mockResolvedValue({
      data: null,
      error: new Error('Network error')
    });
    
    await expect(sendChatMessage([{ role: 'user', content: 'hi' }])).rejects.toThrow(
      'Chat API error: Network error'
    );
  });
  
  it('throws error when response structure is invalid', async () => {
    (supabase.functions.invoke as any).mockResolvedValue({
      data: { choices: [] },
      error: null
    });
    
    await expect(sendChatMessage([{ role: 'user', content: 'hi' }])).rejects.toThrow(
      'Invalid response structure from Chat API.'
    );
  });
});
