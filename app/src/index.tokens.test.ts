/// <reference types="node" />

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const stylesheet = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8');

const extractRootTokens = (css: string) => {
  const rootBlock = css.match(/:root\s*\{(?<tokens>[\s\S]*?)\}/)?.groups?.tokens;

  if (!rootBlock) {
    throw new Error('Could not find the :root token block in index.css');
  }

  return Object.fromEntries(
    [...rootBlock.matchAll(/--(?<name>[\w-]+):\s*(?<value>[^;]+);/g)].map(
      ({ groups }) => [groups!.name, groups!.value.trim()],
    ),
  );
};

const relativeLuminance = (hex: string) => {
  const channels = hex.match(/[a-f\d]{2}/gi);

  if (!channels || channels.length !== 3) {
    throw new Error(`Expected a six-digit sRGB hex color, received ${hex}`);
  }

  const [red, green, blue] = channels.map((channel) => {
    const srgb = Number.parseInt(channel, 16) / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (foreground: string, background: string) => {
  const luminances = [relativeLuminance(foreground), relativeLuminance(background)];
  const lighter = Math.max(...luminances);
  const darker = Math.min(...luminances);

  return (lighter + 0.05) / (darker + 0.05);
};

describe('light Nordic interface tokens', () => {
  it('maps the :root interface palette to its accessible OKLCH values', () => {
    const tokens = extractRootTokens(stylesheet);

    expect(tokens).toMatchObject({
      background: '96.78% 0.0086 84.6deg',
      foreground: '25.03% 0.0059 56.1deg',
      primary: '52.99% 0.1 66.9deg',
      'primary-foreground': '96.78% 0.0086 84.6deg',
      'muted-foreground': '53.08% 0.0144 75.3deg',
      border: '86.35% 0.0157 77.1deg',
      input: '86.35% 0.0157 77.1deg',
      ring: '52.99% 0.1 66.9deg',
      'sidebar-primary': '52.99% 0.1 66.9deg',
      'sidebar-primary-foreground': '96.78% 0.0086 84.6deg',
    });
  });

  it('reserves artwork amber for non-interface use on Arctic Paper', () => {
    const artworkAmberContrast = contrastRatio('#D79A4B', '#F7F4EE');
    const interfaceAmberContrast = contrastRatio('#925F22', '#F7F4EE');

    expect(artworkAmberContrast).toBeCloseTo(2.22, 2);
    expect(artworkAmberContrast).toBeLessThan(4.5);
    expect(interfaceAmberContrast).toBeCloseTo(4.93, 2);
    expect(interfaceAmberContrast).toBeGreaterThanOrEqual(4.5);
  });
});
