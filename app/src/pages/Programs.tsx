import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';

const PROGRAMS = [
  {
    num: '01',
    title: 'FuturePath Navigator',
    tag: 'Career Exploration',
    desc: 'Decodes natural strengths, interests, and aptitudes using psychometric assessments and DMIT evaluations for smarter stream and career selection.',
    outcomes: [
      'Scientific strengths mapping',
      '1-on-1 counselling sessions',
      'Custom academic and career roadmaps',
      'Board & subject selection clarity',
    ],
  },
  {
    num: '02',
    title: 'LifeSkills Lab',
    tag: 'Mastery Training',
    desc: 'Trains communication, resilience, financial literacy, emotional intelligence, and AI-readiness — the complete toolkit for a modern professional.',
    outcomes: [
      'Soft skills & corporate communication',
      'Financial literacy frameworks',
      'AI & tech adaptability training',
      'Leadership & team dynamics',
    ],
  },
  {
    num: '03',
    title: 'Expert Connect Live',
    tag: 'Mentorship',
    desc: 'Connects learners directly to industry experts, researchers, and global academics for guided career mentorship and insight sessions.',
    outcomes: [
      'Curated expert matching',
      'Live mentorship sessions',
      'Industry insight access',
      'Research and field introductions',
    ],
  },
  {
    num: '04',
    title: 'Global Admissions Studio',
    tag: 'Higher Studies',
    desc: 'End-to-end support for competitive domestic preparation (JEE, NEET) and international university admissions (SAT, GRE, IELTS).',
    outcomes: [
      'Domestic competitive prep',
      'International admissions support',
      'Application strategy & essays',
      'Scholarship identification',
    ],
  },
  {
    num: '05',
    title: 'Career Launchpad',
    tag: 'Job Placement',
    desc: 'Resume optimisation, LinkedIn strategy, mock interviews, and direct placement support for job-ready graduates.',
    outcomes: [
      'Professional resume & LinkedIn',
      'Mock interview coaching',
      'Placement network access',
      'Salary negotiation training',
    ],
  },
  {
    num: '06',
    title: 'Innovation Studio & Educator Academy',
    tag: 'Alpha Projects',
    desc: 'Sets up STEM and robotics innovation labs in schools while providing professional pedagogical growth training for educators.',
    outcomes: [
      'STEM & robotics lab setup',
      'Educator workshop series',
      'Curriculum innovation support',
      'Institutional partnership programs',
    ],
  },
];

export default function Programs() {
  const [selected, setSelected] = useState<number>(0);
  const active = PROGRAMS[selected];

  return (
    <div className="bg-background w-full min-h-screen">

      {/* ── Typographic Hero ── */}
      <section className="pt-40 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-6 block">
          Curriculum Pathways
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-medium text-foreground tracking-tight leading-[1.15] max-w-3xl mb-8">
          Future-Ready Programs
        </h1>
        <p className="text-[18px] text-muted-foreground leading-relaxed max-w-2xl">
          Six interconnected modules supporting learners at every milestone — from discovering their strengths to launching global careers.
        </p>
      </section>

      {/* ── Program Explorer ── */}
      <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-[280px_1fr] gap-16">

          {/* Left: Program list */}
          <div className="border-r border-border/50 pr-8 flex flex-col gap-1">
            {PROGRAMS.map((p, i) => (
              <button
                key={p.num}
                onClick={() => setSelected(i)}
                className={`text-left py-4 px-4 transition-colors duration-150 flex items-start gap-4 ${
                  selected === i
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                <span className="text-[11px] font-semibold text-primary/70 mt-0.5 shrink-0">{p.num}</span>
                <span className="text-[15px] font-medium leading-snug">{p.title}</span>
              </button>
            ))}
          </div>

          {/* Right: Detail panel */}
          <div className="py-4">
            <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-3 block">
              {active.tag}
            </span>
            <h2 className="text-[32px] font-medium text-foreground mb-6 leading-snug">
              {active.title}
            </h2>
            <p className="text-[16px] text-muted-foreground leading-relaxed mb-12 max-w-[55ch]">
              {active.desc}
            </p>

            <div className="mb-12">
              <span className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground mb-6 block">
                Core Outcomes
              </span>
              <ul className="flex flex-col gap-3">
                {active.outcomes.map((o) => (
                  <li key={o} className="text-[15px] text-foreground flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 bg-primary rounded-none shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild className="rounded-none h-[52px] px-[28px] bg-foreground text-background hover:bg-primary transition-colors duration-200">
              <Link to="/contact" /* ui-ignore */>Request Advisory Consult</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
