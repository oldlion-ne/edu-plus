import {
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  rm,
  unlink,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultSourceDir = path.resolve(appDir, '..', 'tmp', 'imagegen', 'editorial');
const defaultOutputRoot = path.resolve(appDir, 'public', 'images');

export const genericSourceNames = [
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

export const portraitSourceNames = [
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

const genericSourceSet = new Set(genericSourceNames);
const requiredSourceNames = [...genericSourceNames, ...portraitSourceNames];
export const expectedOutputNames = requiredSourceNames
  .map((name) => name.replace(/\.png$/i, '.webp'))
  .sort((left, right) => left.localeCompare(right));
const expectedOutputNamesLower = expectedOutputNames.map((name) => name.toLowerCase());

if (expectedOutputNames.length !== 28 || new Set(expectedOutputNamesLower).size !== 28) {
  throw new Error(`Expected 28 unique configured outputs, found ${expectedOutputNames.length}`);
}

function normalizedPath(value) {
  const resolved = path.resolve(value);
  return process.platform === 'win32' ? resolved.toLowerCase() : resolved;
}

function isPathInside(parent, candidate) {
  const relative = path.relative(path.resolve(parent), path.resolve(candidate));
  return (
    relative !== '' &&
    relative !== '..' &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

function assertSafeOutputDirectory(outputRoot, outputDir) {
  const expectedOutputDir = path.join(outputRoot, 'editorial');
  if (
    !isPathInside(outputRoot, outputDir) ||
    normalizedPath(outputDir) !== normalizedPath(expectedOutputDir)
  ) {
    throw new Error('Editorial output directory must be the editorial child of the output root.');
  }
}

function assertSafeStagingDirectory(outputRoot, stagingDir) {
  if (
    !isPathInside(outputRoot, stagingDir) ||
    !path.basename(stagingDir).startsWith('.editorial-staging-')
  ) {
    throw new Error('Refusing to clean an unverified editorial staging directory.');
  }
}

function isWebp(name) {
  return name.toLowerCase().endsWith('.webp');
}

function validateManagedNames(names, location) {
  const managedNames = names.filter(isWebp);
  const managedNamesLower = managedNames.map((name) => name.toLowerCase());
  const managedNameSet = new Set(managedNamesLower);
  const missing = expectedOutputNames.filter((name) => !managedNameSet.has(name.toLowerCase()));
  const expectedNameSet = new Set(expectedOutputNamesLower);
  const unexpected = managedNames.filter((name) => !expectedNameSet.has(name.toLowerCase()));

  if (
    managedNames.length !== 28 ||
    managedNameSet.size !== 28 ||
    missing.length > 0 ||
    unexpected.length > 0
  ) {
    throw new Error([
      `Expected exactly 28 production WebPs in ${location}, found ${managedNames.length}.`,
      `Missing: ${missing.join(', ') || 'none'}`,
      `Unexpected: ${unexpected.join(', ') || 'none'}`,
    ].join('\n'));
  }

  return managedNames;
}

async function validateStagedOutputs(stagingDir, convertedOutputs) {
  const stagedNames = validateManagedNames(await readdir(stagingDir), stagingDir);
  const portraitOutputSet = new Set(
    portraitSourceNames.map((name) => name.replace(/\.png$/i, '.webp').toLowerCase()),
  );

  for (const name of stagedNames) {
    const outputInfo = convertedOutputs.get(name.toLowerCase());
    if (!outputInfo || outputInfo.format !== 'webp') {
      throw new Error(`Staged editorial output is not a valid WebP: ${name}`);
    }
    if (portraitOutputSet.has(name.toLowerCase())) {
      if (outputInfo.width !== 640 || outputInfo.height !== 800) {
        throw new Error(`Staged portrait has unexpected dimensions: ${name}`);
      }
    } else if (!outputInfo.width || outputInfo.width > 1600) {
      throw new Error(`Staged generic image exceeds 1600 pixels: ${name}`);
    }
  }

  return stagedNames;
}

async function convertSources(sourceDir, stagingDir) {
  const convertedOutputs = new Map();
  for (const sourceName of requiredSourceNames) {
    const input = path.join(sourceDir, sourceName);
    const outputName = sourceName.replace(/\.png$/i, '.webp');
    const output = path.join(stagingDir, outputName);

    if (genericSourceSet.has(sourceName)) {
      const outputInfo = await sharp(input)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 88, effort: 6 })
        .toFile(output);
      convertedOutputs.set(outputName.toLowerCase(), outputInfo);
      continue;
    }

    const outputInfo = await sharp(input)
      .resize({ width: 640, height: 800, fit: 'cover', position: 'centre' })
      .webp({ quality: 90, effort: 6 })
      .toFile(output);
    convertedOutputs.set(outputName.toLowerCase(), outputInfo);
  }
  return convertedOutputs;
}

async function reconcileOutputs(stagingDir, outputDir, stagedNames) {
  await mkdir(outputDir, { recursive: true });
  const existingEntries = await readdir(outputDir, { withFileTypes: true });
  for (const entry of existingEntries) {
    if ((entry.isFile() || entry.isSymbolicLink()) && isWebp(entry.name)) {
      await unlink(path.join(outputDir, entry.name));
    }
  }

  for (const name of stagedNames) {
    await copyFile(path.join(stagingDir, name), path.join(outputDir, name));
  }

  validateManagedNames(await readdir(outputDir), outputDir);
}

export async function prepareEditorialImages(options = {}) {
  const sourceDir = path.resolve(options.sourceDir ?? defaultSourceDir);
  const outputRoot = path.resolve(options.outputRoot ?? defaultOutputRoot);
  const outputDir = path.resolve(options.outputDir ?? path.join(outputRoot, 'editorial'));
  assertSafeOutputDirectory(outputRoot, outputDir);

  const sourceNames = new Set(await readdir(sourceDir));
  const missingSourceNames = requiredSourceNames.filter((name) => !sourceNames.has(name));
  if (missingSourceNames.length > 0) {
    throw new Error(`Missing required editorial sources:\n${missingSourceNames.join('\n')}`);
  }

  await mkdir(outputRoot, { recursive: true });
  const stagingDir = await mkdtemp(path.join(outputRoot, '.editorial-staging-'));
  assertSafeStagingDirectory(outputRoot, stagingDir);

  try {
    const convertedOutputs = await convertSources(sourceDir, stagingDir);
    const stagedNames = await validateStagedOutputs(stagingDir, convertedOutputs);
    await reconcileOutputs(stagingDir, outputDir, stagedNames);
  } finally {
    assertSafeStagingDirectory(outputRoot, stagingDir);
    await rm(stagingDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }

  return { outputDir, outputNames: [...expectedOutputNames] };
}

function isMainModule() {
  if (!process.argv[1]) return false;
  return normalizedPath(process.argv[1]) === normalizedPath(fileURLToPath(import.meta.url));
}

if (isMainModule()) {
  const result = await prepareEditorialImages();
  console.log(`Prepared and verified 28 editorial assets in ${result.outputDir}`);
}
