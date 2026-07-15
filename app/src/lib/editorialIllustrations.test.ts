import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { councilPortraits, editorialIllustrations } from './editorialIllustrations';

const storyKeys = [
  'home',
  'about',
  'programs',
  'knowledge',
  'knowledgeEmpty',
  'council',
  'guidance',
  'news',
  'events',
  'contact',
  'login',
  'newsCommunity',
  'newsSpeech',
  'newsEnergy',
  'newsCoaching',
];

const portraitSlugs = [
  'bikash-oinam',
  'roshan-khumukcham',
  'ronen-akoijam',
  'soram-bobby-singh',
  'romen-ningthoujam',
  'khumukcham-roshaan-singh',
  'nutan-nongthongbam',
  'takhellambam-geetarani',
  'rojit-keisham',
  'ngangbam-shantikumar-meetei',
  'ronendrojit-akoijam',
  'purnimashi-moirangthem',
  'tomba-singh-thokchom',
  'usham-rojio',
];

describe('editorial illustration registry', () => {
  it('defines semantic, responsive, versioned WebP assets for every public story', () => {
    expect(Object.keys(editorialIllustrations)).toEqual(storyKeys);
    expect(Object.keys(editorialIllustrations)).toHaveLength(15);

    for (const asset of Object.values(editorialIllustrations)) {
      expect(asset.src).toMatch(/^\/images\/editorial\/.+-v2\.webp$/);
      expect(asset.alt.length).toBeGreaterThan(12);
      expect(asset.aspectClass).toMatch(/\baspect-/);
      expect(asset.objectPositionClass).toMatch(/^object-/);
      expect(asset.sizes.length).toBeGreaterThan(4);
    }
  });

  it('defines fourteen distinct, ordered, versioned council portraits', () => {
    const expectedPortraits = portraitSlugs.map(
      (slug) => `/images/editorial/council-${slug}-v2.webp`,
    );

    expect(councilPortraits).toEqual(expectedPortraits);
    expect(councilPortraits).toHaveLength(14);
    expect(new Set(councilPortraits).size).toBe(14);
    for (const portrait of councilPortraits) {
      expect(portrait).toMatch(/^\/images\/editorial\/council-.+-v2\.webp$/);
    }
  });

  it('references all 28 production files and no rejected portrait sheets', () => {
    const publicDirectory = resolve(
      dirname(fileURLToPath(import.meta.url)),
      '../../public',
    );
    const referencedPaths = [
      ...Object.values(editorialIllustrations).map((asset) => asset.src),
      ...councilPortraits,
    ];
    const uniquePaths = new Set(referencedPaths);
    const rejectedSheetPaths = new Set([
      '/images/editorial/council-portraits-a-v2.webp',
      '/images/editorial/council-portraits-b-v2.webp',
    ]);

    expect(uniquePaths.size).toBe(28);
    for (const registryPath of uniquePaths) {
      expect(rejectedSheetPaths.has(registryPath)).toBe(false);
      const productionFile = resolve(publicDirectory, registryPath.slice(1));
      expect(
        existsSync(productionFile),
        `Missing production editorial asset: ${productionFile}`,
      ).toBe(true);
    }
  });
});
