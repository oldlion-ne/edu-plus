import { describe, expect, it } from 'vitest';
import { makeSlug } from './content-utils';

describe('workspace content utilities', () => {
  it('creates stable URL-safe slugs', () => {
    expect(makeSlug('  Future Skills: 2026 Cohort! ')).toBe('future-skills-2026-cohort');
  });
});
