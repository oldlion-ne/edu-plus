/// <reference types="node" />
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { describe, expect, test } from 'vitest';

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), 'utf8');

function sourceFiles(directory: string): string[] {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return ['.tsx', '.ts'].includes(extname(entry.name)) ? [path] : [];
  });
}

describe('responsive layout contract', () => {
  test('uses a fluid, accessible root viewport without locking browser scaling', () => {
    const css = read('src/index.css');
    const app = read('src/App.tsx');
    const html = read('index.html');

    expect(css).not.toMatch(/width:\s*100vw/);
    expect(css).toMatch(/html,\s*body,\s*#root\s*\{/);
    expect(app).not.toContain('[touch-action:none]');
    expect(html).not.toMatch(/maximum-scale|user-scalable/);
  });

  test('never renders public interface copy below twelve CSS pixels', () => {
    const files = [
      ...sourceFiles('src/pages'),
      ...sourceFiles('src/sections'),
      ...sourceFiles('src/components/layout'),
      ...sourceFiles('src/components/workspace'),
      ...sourceFiles('src/components/events'),
      'src/components/AIChatAgent.tsx',
      'src/components/DashboardOnboardingTour.tsx',
    ];
    const violations = files.flatMap((file) => {
      const source = read(file);
      return [...source.matchAll(/text-\[(\d+)px\]/g)]
        .filter((match) => Number(match[1]) < 12)
        .map((match) => `${file}:${match[0]}`);
    });

    expect(violations).toEqual([]);
  });

  test('keeps shared heroes and guidance navigation intrinsically sized', () => {
    const hero = read('src/components/layout/EditorialHero.tsx');
    const guidance = read('src/pages/Guidance.tsx');

    expect(hero).not.toMatch(/min-h-\[(?:600|620|640|680)px\]/);
    expect(hero).toContain('pt-[72px]');
    expect(hero).toContain('md:grid-cols-12');
    expect(hero).not.toContain('lg:grid-cols-12');
    expect(guidance).not.toContain('overflow-x-auto');
    expect(guidance).not.toContain('whitespace-nowrap');
  });

  test('does not combine twelve grid tracks with page-level gaps', () => {
    const files = [...sourceFiles('src/pages'), ...sourceFiles('src/sections')];
    const violations = files.flatMap((file) =>
      read(file)
        .split(/\r?\n/)
        .filter((line) => line.includes('grid-cols-12') && /\bgap-[1-9]/.test(line))
        .map(() => file),
    );

    expect(violations).toEqual([]);
  });

  test('lets shared content cards grow with readable copy', () => {
    const surfaceCard = read('src/components/effects/SurfaceCard.tsx');
    const pages = sourceFiles('src/pages').map(read).join('\n');

    expect(surfaceCard).not.toMatch(/= 'h-\[/);
    expect(surfaceCard).not.toContain('overflow-hidden');
    expect(pages).not.toMatch(/heightClass="h-\[/);
  });

  test('keeps public section spacing within a readable viewport scale', () => {
    const publicSource = [...sourceFiles('src/pages'), ...sourceFiles('src/sections')]
      .map(read)
      .join('\n');

    expect(publicSource).not.toMatch(/(?:^|:)py-(?:32|40|52)\b/);
  });

  test('contains authenticated workspace modules inside the viewport shell', () => {
    const workspace = read('src/components/workspace/WorkspaceShell.tsx');

    expect(workspace).toContain('h-[100dvh] w-full min-w-0 overflow-hidden');
    expect(workspace).toContain('min-w-0 flex-1 overflow-x-hidden overflow-y-auto');
  });
});
