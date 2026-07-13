import { describe, expect, it } from 'vitest';

import { passwordSchema, signInSchema, signUpSchema } from './authSchemas';

describe('authentication validation', () => {
  it('rejects malformed sign-in credentials', () => {
    expect(signInSchema.safeParse({ email: 'invalid', password: '' }).success).toBe(false);
  });

  it('requires a strong account password', () => {
    expect(passwordSchema.safeParse('short').success).toBe(false);
    expect(passwordSchema.safeParse('quiet-candle-forest-27').success).toBe(true);
  });

  it('rejects a sign-up confirmation that does not match', () => {
    const result = signUpSchema.safeParse({
      email: 'member@example.com',
      password: 'quiet-candle-forest-27',
      confirmPassword: 'different-candle-forest-27',
    });

    expect(result.success).toBe(false);
  });
});
