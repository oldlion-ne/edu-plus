import { describe, expect, test } from 'vitest';
import about from './pages/About.tsx?raw';
import contact from './pages/Contact.tsx?raw';
import council from './pages/Council.tsx?raw';
import guidance from './pages/Guidance.tsx?raw';
import knowledgeHub from './pages/KnowledgeHub.tsx?raw';
import news from './pages/News.tsx?raw';
import programs from './pages/Programs.tsx?raw';
import signatureExperiences from './pages/SignatureExperiences.tsx?raw';

const routes = {
  About: about,
  Programs: programs,
  KnowledgeHub: knowledgeHub,
  News: news,
  SignatureExperiences: signatureExperiences,
  Council: council,
  Guidance: guidance,
  Contact: contact,
};

describe('public route design migration', () => {
  test.each(Object.entries(routes))('%s uses the editorial hero without legacy telemetry', (_name, source) => {
    expect(source).toContain('EditorialHero');
    expect(source).not.toMatch(/ImmersiveHero|telemetryLeft|telemetryRight|font-mono|backdrop-blur/);
  });
});
