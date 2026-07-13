import { describe, expect, test } from 'vitest';
import css from './index.css?raw';

describe('Integrated Nordic Optics foundation', () => {
  test('defines semantic surfaces, edges, status colors, and motion', () => {
    for (const token of [
      '--surface-base',
      '--surface-raised',
      '--surface-sunken',
      '--edge-strong',
      '--status-success',
      '--motion-standard',
    ]) {
      expect(css).toContain(token);
    }
  });

  test('keeps square geometry and reduced-motion support', () => {
    expect(css).toContain('--radius: 0rem');
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });
});
