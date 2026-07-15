import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(process.cwd(), '..');
const sourceDir = path.join(root, 'tmp', 'imagegen', 'editorial');
const outputDir = path.join(process.cwd(), 'public', 'images', 'editorial');

const genericSourceNames = [
  'home-campus-walk-v2.png',
  'programs-focus-studio-v2.png',
  'about-mentorship-table-v2.png',
  'knowledge-quiet-archive-v2.png',
  'council-roundtable-v2.png',
  'guidance-pathfinding-v2.png',
  'news-field-notes-v2.png',
  'events-learning-beyond-walls-v2.png',
  'contact-open-channel-v2.png',
  'login-threshold-v2.png',
  'news-community-classroom-v2.png',
  'news-speech-intervention-v2.png',
  'news-green-energy-v2.png',
  'news-behavioral-coaching-v2.png',
];

const portraitSourceNames = [
  'council-bikash-oinam-v2.png',
  'council-roshan-khumukcham-v2.png',
  'council-ronen-akoijam-v2.png',
  'council-soram-bobby-singh-v2.png',
  'council-romen-ningthoujam-v2.png',
  'council-khumukcham-roshaan-singh-v2.png',
  'council-nutan-nongthongbam-v2.png',
  'council-takhellambam-geetarani-v2.png',
  'council-rojit-keisham-v2.png',
  'council-ngangbam-shantikumar-meetei-v2.png',
  'council-ronendrojit-akoijam-v2.png',
  'council-purnimashi-moirangthem-v2.png',
  'council-tomba-singh-thokchom-v2.png',
  'council-usham-rojio-v2.png',
];

const rejectedSheetNames = new Set([
  'council-portraits-a-v2.png',
  'council-portraits-b-v2.png',
]);

const genericSourceSet = new Set(genericSourceNames);
const portraitSourceSet = new Set(portraitSourceNames);
const requiredSourceNames = [...genericSourceNames, ...portraitSourceNames];
const expectedOutputNames = requiredSourceNames
  .map((name) => name.replace(/\.png$/i, '.webp'))
  .sort();

if (expectedOutputNames.length !== 28) {
  throw new Error(`Expected 28 configured outputs, found ${expectedOutputNames.length}`);
}

await mkdir(outputDir, { recursive: true });
const sourceNames = await readdir(sourceDir);
const sourceNameSet = new Set(sourceNames);
const missingSourceNames = requiredSourceNames.filter((name) => !sourceNameSet.has(name));

if (missingSourceNames.length > 0) {
  throw new Error(`Missing required editorial sources:\n${missingSourceNames.join('\n')}`);
}

for (const file of sourceNames) {
  if (rejectedSheetNames.has(file)) continue;
  if (!genericSourceSet.has(file) && !portraitSourceSet.has(file)) continue;

  const input = path.join(sourceDir, file);
  const outputName = file.replace(/\.png$/i, '.webp');
  const output = path.join(outputDir, outputName);

  if (portraitSourceSet.has(file)) {
    await sharp(input)
      .resize({ width: 640, height: 800, fit: 'cover', position: 'centre' })
      .webp({ quality: 90, effort: 6 })
      .toFile(output);
    continue;
  }

  await sharp(input)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(output);
}

const actualOutputNames = (await readdir(outputDir))
  .filter((name) => name.endsWith('.webp'))
  .sort();
const missingOutputNames = expectedOutputNames.filter((name) => !actualOutputNames.includes(name));
const unexpectedOutputNames = actualOutputNames.filter((name) => !expectedOutputNames.includes(name));

if (
  actualOutputNames.length !== 28 ||
  missingOutputNames.length > 0 ||
  unexpectedOutputNames.length > 0
) {
  throw new Error([
    `Expected exactly 28 production WebPs, found ${actualOutputNames.length}.`,
    `Missing: ${missingOutputNames.join(', ') || 'none'}`,
    `Unexpected: ${unexpectedOutputNames.join(', ') || 'none'}`,
  ].join('\n'));
}

console.log(`Prepared and verified 28 editorial assets in ${outputDir}`);
