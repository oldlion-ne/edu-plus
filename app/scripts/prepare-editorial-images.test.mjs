import assert from 'node:assert/strict';
import { mkdir, readdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

let test;
if (process.env.VITEST) {
  const { test: vitestTest } = await import('vitest');
  test = (name, implementation) => vitestTest(name, implementation, 60_000);
} else {
  test = (await import('node:test')).default;
}

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = path.resolve(appDir, 'public', 'images', 'editorial');

const genericOutputNames = [
  'home-campus-walk-v2.webp',
  'programs-focus-studio-v2.webp',
  'about-mentorship-table-v2.webp',
  'knowledge-quiet-archive-v2.webp',
  'council-roundtable-v2.webp',
  'guidance-pathfinding-v2.webp',
  'news-field-notes-v2.webp',
  'events-learning-beyond-walls-v2.webp',
  'contact-open-channel-v2.webp',
  'login-threshold-v2.webp',
  'news-community-classroom-v2.webp',
  'news-speech-intervention-v2.webp',
  'news-green-energy-v2.webp',
  'news-behavioral-coaching-v2.webp',
];

const portraitOutputNames = [
  'council-bikash-oinam-v2.webp',
  'council-roshan-khumukcham-v2.webp',
  'council-ronen-akoijam-v2.webp',
  'council-soram-bobby-singh-v2.webp',
  'council-romen-ningthoujam-v2.webp',
  'council-khumukcham-roshaan-singh-v2.webp',
  'council-nutan-nongthongbam-v2.webp',
  'council-takhellambam-geetarani-v2.webp',
  'council-rojit-keisham-v2.webp',
  'council-ngangbam-shantikumar-meetei-v2.webp',
  'council-ronendrojit-akoijam-v2.webp',
  'council-purnimashi-moirangthem-v2.webp',
  'council-tomba-singh-thokchom-v2.webp',
  'council-usham-rojio-v2.webp',
];

const expectedOutputNames = [...genericOutputNames, ...portraitOutputNames].sort();
const rejectedOutputNames = [
  'council-portraits-a-v2.webp',
  'council-portraits-b-v2.webp',
];

test('prepares exactly the standalone editorial WebP assets', async () => {
  assert.equal(
    outputDir,
    path.resolve(appDir, 'public', 'images', 'editorial'),
    'output cleanup must remain scoped to the editorial image directory',
  );
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  const result = spawnSync(process.execPath, ['scripts/prepare-editorial-images.mjs'], {
    cwd: appDir,
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);

  const actualOutputNames = (await readdir(outputDir)).sort();
  assert.deepEqual(actualOutputNames, expectedOutputNames);
  for (const rejectedOutputName of rejectedOutputNames) {
    assert.ok(!actualOutputNames.includes(rejectedOutputName));
  }

  for (const name of portraitOutputNames) {
    const metadata = await sharp(path.join(outputDir, name)).metadata();
    assert.equal(metadata.format, 'webp', `${name} must be a valid WebP`);
    assert.equal(metadata.width, 640, `${name} must be 640 pixels wide`);
    assert.equal(metadata.height, 800, `${name} must be 800 pixels tall`);
  }

  for (const name of genericOutputNames) {
    const metadata = await sharp(path.join(outputDir, name)).metadata();
    assert.equal(metadata.format, 'webp', `${name} must be a valid WebP`);
    assert.ok(metadata.width <= 1600, `${name} must be at most 1600 pixels wide`);
  }
});
