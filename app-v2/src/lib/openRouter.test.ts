import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendChatMessage } from './openRouter';

describe('openRouter helper', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.stubEnv('VITE_OPENROUTER_API', 'test-key');
  });

  it('successfully calls OpenRouter API and returns content', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Hello, I am EduPlus Assistant.'
          }
        }
      ]
    };

    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const reply = await sendChatMessage([{ role: 'user', content: 'hi' }]);
    expect(reply).toBe('Hello, I am EduPlus Assistant.');
  });

  it('throws error when OpenRouter API key is missing', async () => {
    vi.stubEnv('VITE_OPENROUTER_API', '');
    await expect(sendChatMessage([{ role: 'user', content: 'hi' }])).rejects.toThrow(
      'OpenRouter API key is not configured.'
    );
  });
});
