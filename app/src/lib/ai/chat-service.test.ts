import { beforeEach, describe, expect, it, vi } from 'vitest';

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));

vi.mock('../supabaseClient', () => ({
  supabase: { functions: { invoke } },
}));

import { sendChatMessage } from './chat-service';

describe('AI chat service', () => {
  beforeEach(() => invoke.mockReset());

  it('uses the protected server function and returns its reply', async () => {
    invoke.mockResolvedValue({ data: { reply: 'A grounded answer.' }, error: null });

    const reply = await sendChatMessage(
      [{ role: 'user', content: 'Which program fits me?' }],
      'session-123',
    );

    expect(invoke).toHaveBeenCalledWith('ai-chat', {
      body: {
        messages: [{ role: 'user', content: 'Which program fits me?' }],
        sessionId: 'session-123',
      },
    });
    expect(reply).toBe('A grounded answer.');
  });

  it('surfaces a safe error when the function fails', async () => {
    invoke.mockResolvedValue({ data: null, error: new Error('network details') });

    await expect(
      sendChatMessage([{ role: 'user', content: 'Hello' }], 'session-123'),
    ).rejects.toThrow('AI advisor is temporarily unavailable.');
  });
});
