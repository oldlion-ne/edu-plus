import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';
import type { EditorialIllustration } from './editorialIllustrations';
import { councilPortraits, editorialIllustrations } from './editorialIllustrations';

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends (<Value>() =>
    Value extends Right ? 1 : 2)
    ? true
    : false;

type ReadonlyKeys<Value> = {
  [Key in keyof Value]-?: Equal<
    Pick<Value, Key>,
    Readonly<Pick<Value, Key>>
  > extends true
    ? Key
    : never;
}[keyof Value];

type AllKeysReadonly<Value> = Equal<ReadonlyKeys<Value>, keyof Value>;

const runtimeBase = import.meta.env.BASE_URL;
const normalizedRuntimeBase = runtimeBase.endsWith('/')
  ? runtimeBase
  : `${runtimeBase}/`;

const stripRuntimeBase = (assetUrl: string) => {
  if (!assetUrl.startsWith(normalizedRuntimeBase)) {
    throw new Error(`Editorial URL does not use ${normalizedRuntimeBase}: ${assetUrl}`);
  }
  return assetUrl.slice(normalizedRuntimeBase.length);
};

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
      expect(stripRuntimeBase(asset.src)).toMatch(
        /^images\/editorial\/.+-v2\.webp$/,
      );
      expect(asset.alt.length).toBeGreaterThan(12);
      expect(asset.aspectClass).toMatch(/\baspect-/);
      expect(asset.objectPositionClass).toMatch(/^object-/);
      expect(asset.sizes.length).toBeGreaterThan(4);
    }
  });

  it('defines fourteen distinct, ordered, versioned council portraits', () => {
    const expectedPortraits = portraitSlugs.map(
      (slug) => `${normalizedRuntimeBase}images/editorial/council-${slug}-v2.webp`,
    );

    expect(councilPortraits).toEqual(expectedPortraits);
    expect(councilPortraits).toHaveLength(14);
    expect(new Set(councilPortraits).size).toBe(14);
    for (const portrait of councilPortraits) {
      expect(stripRuntimeBase(portrait)).toMatch(
        /^images\/editorial\/council-.+-v2\.webp$/,
      );
    }
  });

  it('uses the configured runtime base for every editorial URL', () => {
    const registryUrls = [
      ...Object.values(editorialIllustrations).map((asset) => asset.src),
      ...councilPortraits,
    ];

    for (const assetUrl of registryUrls) {
      expect(assetUrl.startsWith(runtimeBase)).toBe(true);
      expect(stripRuntimeBase(assetUrl)).toMatch(
        /^images\/editorial\/.+-v2\.webp$/,
      );
    }
  });

  it.each(['./', '/', '/sub/'])(
    'builds editorial URLs for the %s base',
    async (base) => {
      vi.stubEnv('BASE_URL', base);
      vi.resetModules();

      try {
        const basedRegistry = await import('./editorialIllustrations');
        const basedUrls = [
          ...Object.values(basedRegistry.editorialIllustrations).map(
            (asset) => asset.src,
          ),
          ...basedRegistry.councilPortraits,
        ];

        for (const assetUrl of basedUrls) {
          expect(assetUrl.startsWith(`${base}images/editorial/`)).toBe(true);
        }
      } finally {
        vi.unstubAllEnvs();
      }
    },
  );

  it('exports deeply frozen, readonly registry data', () => {
    expect(Object.isFrozen(editorialIllustrations)).toBe(true);
    for (const asset of Object.values(editorialIllustrations)) {
      expect(Object.isFrozen(asset)).toBe(true);
    }
    expect(Object.isFrozen(councilPortraits)).toBe(true);

    expectTypeOf<AllKeysReadonly<EditorialIllustration>>().toEqualTypeOf<true>();
    expectTypeOf<
      AllKeysReadonly<typeof editorialIllustrations>
    >().toEqualTypeOf<true>();
    expectTypeOf<typeof councilPortraits>().toEqualTypeOf<readonly string[]>();
  });

  it('references all 28 production files and no rejected portrait sheets', () => {
    const publicDirectory = resolve(
      dirname(fileURLToPath(import.meta.url)),
      '../../public',
    );
    const referencedUrls = [
      ...Object.values(editorialIllustrations).map((asset) => asset.src),
      ...councilPortraits,
    ];
    const uniquePaths = new Set(referencedUrls.map(stripRuntimeBase));
    const rejectedSheetPaths = new Set([
      'images/editorial/council-portraits-a-v2.webp',
      'images/editorial/council-portraits-b-v2.webp',
    ]);

    expect(uniquePaths.size).toBe(28);
    for (const registryPath of uniquePaths) {
      expect(rejectedSheetPaths.has(registryPath)).toBe(false);
      const productionFile = resolve(publicDirectory, registryPath);
      expect(
        existsSync(productionFile),
        `Missing production editorial asset: ${productionFile}`,
      ).toBe(true);
    }
  });
});
