// @vitest-environment node
import assert from 'node:assert/strict';
import { readFile, mkdir, mkdtemp, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

let test;
if (process.env.VITEST) {
  const { test: vitestTest } = await import('vitest');
  test = (name, implementation) => vitestTest(name, implementation, 120_000);
} else {
  test = (await import('node:test')).default;
}

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const moduleUrl = pathToFileURL(path.join(appDir, 'scripts', 'prepare-editorial-images.mjs')).href;
const sharpModuleUrl = import.meta.resolve('sharp');

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

const requiredSourceNames = [...genericSourceNames, ...portraitSourceNames];
const expectedOutputNames = requiredSourceNames
  .map((name) => name.replace(/\.png$/i, '.webp'))
  .sort((left, right) => left.localeCompare(right));
const rejectedSheetNames = [
  'council-portraits-a-v2.png',
  'council-portraits-b-v2.png',
];

function isPathInside(parent, candidate) {
  const relative = path.relative(path.resolve(parent), path.resolve(candidate));
  return (
    relative !== '' &&
    relative !== '..' &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

async function createSandbox() {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'edu-plus-editorial-'));
  const sourceDir = path.join(tempRoot, 'tmp', 'imagegen', 'editorial');
  const sandboxAppDir = path.join(tempRoot, 'app');
  const outputRoot = path.join(tempRoot, 'output-root');
  const outputDir = path.join(outputRoot, 'editorial');
  await Promise.all([
    mkdir(sourceDir, { recursive: true }),
    mkdir(sandboxAppDir, { recursive: true }),
    mkdir(outputDir, { recursive: true }),
  ]);
  return { tempRoot, sourceDir, sandboxAppDir, outputRoot, outputDir };
}

async function cleanupSandbox(tempRoot) {
  const resolvedTempRoot = path.resolve(tempRoot);
  assert.ok(isPathInside(os.tmpdir(), resolvedTempRoot), 'sandbox cleanup must stay inside the OS temp directory');
  assert.match(path.basename(resolvedTempRoot), /^edu-plus-editorial-/);
  await rm(resolvedTempRoot, {
    recursive: true,
    force: true,
    maxRetries: 10,
    retryDelay: 100,
  });
}

async function writePngFixtures(sourceDir, names = requiredSourceNames) {
  for (const [index, name] of names.entries()) {
    await sharp({
      create: {
        width: 32,
        height: 24,
        channels: 3,
        background: {
          r: (index * 31) % 255,
          g: (index * 47) % 255,
          b: (index * 61) % 255,
        },
      },
    }).png().toFile(path.join(sourceDir, name));
  }
}

function runPreparation({ sourceDir, outputRoot, outputDir, cwd }) {
  const invocation = `
    const { prepareEditorialImages } = await import(process.env.EDITORIAL_MODULE_URL);
    const options = JSON.parse(process.env.EDITORIAL_OPTIONS);
    await prepareEditorialImages(options);
  `;
  return spawnSync(process.execPath, ['--input-type=module', '--eval', invocation], {
    cwd,
    encoding: 'utf8',
    env: {
      ...process.env,
      EDITORIAL_MODULE_URL: moduleUrl,
      EDITORIAL_OPTIONS: JSON.stringify({ sourceDir, outputRoot, outputDir }),
    },
  });
}

async function managedOutputNames(outputDir) {
  return (await readdir(outputDir))
    .filter((name) => name.toLowerCase().endsWith('.webp'))
    .sort((left, right) => left.localeCompare(right));
}

async function outputDimensions(outputDir, names) {
  const inspection = `
    const { default: sharp } = await import(process.env.SHARP_MODULE_URL);
    const { default: path } = await import('node:path');
    const { outputDir, names } = JSON.parse(process.env.EDITORIAL_INSPECTION);
    const rows = {};
    for (const name of names) {
      const metadata = await sharp(path.join(outputDir, name)).metadata();
      rows[name] = { format: metadata.format, width: metadata.width, height: metadata.height };
    }
    console.log(JSON.stringify(rows));
  `;
  const result = spawnSync(process.execPath, ['--input-type=module', '--eval', inspection], {
    cwd: appDir,
    encoding: 'utf8',
    env: {
      ...process.env,
      SHARP_MODULE_URL: sharpModuleUrl,
      EDITORIAL_INSPECTION: JSON.stringify({ outputDir, names }),
    },
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return JSON.parse(result.stdout);
}

test('reconciles stale WebPs and produces the same exact standalone set on rerun', async () => {
  const sandbox = await createSandbox();
  try {
    await writePngFixtures(sandbox.sourceDir);
    await writePngFixtures(sandbox.sourceDir, rejectedSheetNames);
    await writeFile(path.join(sandbox.outputDir, 'STALE.WEBP'), 'stale output');
    await writeFile(path.join(sandbox.outputDir, 'keep.txt'), 'preserve me');

    const first = runPreparation({
      sourceDir: sandbox.sourceDir,
      outputRoot: sandbox.outputRoot,
      outputDir: sandbox.outputDir,
      cwd: sandbox.sandboxAppDir,
    });
    assert.equal(first.status, 0, first.stderr || first.stdout);

    const firstNames = await managedOutputNames(sandbox.outputDir);
    assert.deepEqual(firstNames, expectedOutputNames);
    assert.ok(!firstNames.some((name) => name.toLowerCase().includes('portraits-a')));
    assert.ok(!firstNames.some((name) => name.toLowerCase().includes('portraits-b')));
    assert.equal(await readFile(path.join(sandbox.outputDir, 'keep.txt'), 'utf8'), 'preserve me');

    const firstDimensions = await outputDimensions(sandbox.outputDir, firstNames);
    for (const name of portraitSourceNames.map((source) => source.replace(/\.png$/i, '.webp'))) {
      assert.deepEqual(firstDimensions[name], { format: 'webp', width: 640, height: 800 });
    }
    for (const name of genericSourceNames.map((source) => source.replace(/\.png$/i, '.webp'))) {
      assert.equal(firstDimensions[name].format, 'webp');
      assert.ok(firstDimensions[name].width <= 1600);
    }

    const second = runPreparation({
      sourceDir: sandbox.sourceDir,
      outputRoot: sandbox.outputRoot,
      outputDir: sandbox.outputDir,
      cwd: sandbox.sandboxAppDir,
    });
    assert.equal(second.status, 0, second.stderr || second.stdout);
    const secondNames = await managedOutputNames(sandbox.outputDir);
    assert.deepEqual(secondNames, expectedOutputNames);
    assert.deepEqual(await outputDimensions(sandbox.outputDir, secondNames), firstDimensions);
  } finally {
    await cleanupSandbox(sandbox.tempRoot);
  }
});

test('missing source failure leaves an existing production WebP untouched', async () => {
  const sandbox = await createSandbox();
  try {
    await writePngFixtures(sandbox.sourceDir, requiredSourceNames.slice(1));
    const sentinelPath = path.join(sandbox.outputDir, 'sentinel.WebP');
    await sharp({
      create: { width: 5, height: 5, channels: 3, background: '#c58b45' },
    }).webp().toFile(sentinelPath);
    const sentinelBefore = await readFile(sentinelPath);

    const result = runPreparation({
      sourceDir: sandbox.sourceDir,
      outputRoot: sandbox.outputRoot,
      outputDir: sandbox.outputDir,
      cwd: sandbox.sandboxAppDir,
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Missing required editorial sources/);
    assert.deepEqual(await readFile(sentinelPath), sentinelBefore);
    assert.deepEqual(await managedOutputNames(sandbox.outputDir), ['sentinel.WebP']);
    assert.ok(!(await readdir(sandbox.outputRoot)).some((name) => name.startsWith('.editorial-staging-')));
  } finally {
    await cleanupSandbox(sandbox.tempRoot);
  }
});

test('rejects an output directory that is not the editorial child of its output root', async () => {
  const sandbox = await createSandbox();
  try {
    await writePngFixtures(sandbox.sourceDir);
    const unsafeOutputDir = path.join(sandbox.tempRoot, 'outside-output-root');
    await mkdir(unsafeOutputDir);
    const sentinelPath = path.join(unsafeOutputDir, 'sentinel.webp');
    await writeFile(sentinelPath, 'do not touch');

    const result = runPreparation({
      sourceDir: sandbox.sourceDir,
      outputRoot: sandbox.outputRoot,
      outputDir: unsafeOutputDir,
      cwd: sandbox.sandboxAppDir,
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /editorial child of the output root/i);
    assert.equal(await readFile(sentinelPath, 'utf8'), 'do not touch');
  } finally {
    await cleanupSandbox(sandbox.tempRoot);
  }
});

test('rejects a linked editorial output without touching its victim', async () => {
  const sandbox = await createSandbox();
  const linkType = process.platform === 'win32' ? 'junction' : 'dir';
  try {
    await writePngFixtures(sandbox.sourceDir);
    const victimDir = path.join(sandbox.tempRoot, 'victim');
    const victimPath = path.join(victimDir, 'victim.WEBP');
    await mkdir(victimDir);
    await writeFile(victimPath, 'victim must survive');

    assert.ok(isPathInside(sandbox.tempRoot, sandbox.outputDir));
    await rm(sandbox.outputDir, { recursive: true });
    await symlink(victimDir, sandbox.outputDir, linkType);

    const result = runPreparation({
      sourceDir: sandbox.sourceDir,
      outputRoot: sandbox.outputRoot,
      outputDir: sandbox.outputDir,
      cwd: sandbox.sandboxAppDir,
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /symbolic link|junction|linked output/i);
    assert.equal(await readFile(victimPath, 'utf8'), 'victim must survive');
  } finally {
    await cleanupSandbox(sandbox.tempRoot);
  }
});

test('rejects a filesystem root as the output root before processing sources', async () => {
  const sandbox = await createSandbox();
  try {
    const filesystemRoot = path.parse(sandbox.tempRoot).root;
    const result = runPreparation({
      sourceDir: sandbox.sourceDir,
      outputRoot: filesystemRoot,
      outputDir: path.join(filesystemRoot, 'editorial'),
      cwd: sandbox.sandboxAppDir,
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /filesystem root/i);
  } finally {
    await cleanupSandbox(sandbox.tempRoot);
  }
});
