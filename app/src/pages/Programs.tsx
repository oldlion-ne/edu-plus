import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';
import { BulletList, BulletItem } from '@/components/ui/bullet-list';
import { editorialIllustrations } from '@/lib/editorialIllustrations';

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

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowDown':
        nextIndex = (index + 1) % PROGRAMS.length;
        break;
      case 'ArrowUp':
        nextIndex = (index - 1 + PROGRAMS.length) % PROGRAMS.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = PROGRAMS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setSelected(nextIndex);
    document.getElementById(`program-tab-${PROGRAMS[nextIndex].num}`)?.focus();
  };

  return (
    <div className="bg-background w-full min-h-screen">

      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="Curriculum Pathways"
        title="Future-Ready Programs"
        description="Six interconnected modules supporting learners at every milestone — from discovering their strengths to launching global careers."
        illustration={editorialIllustrations.programs}
      />

      {/* ── Program Explorer ── */}
      <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-[280px_1fr] gap-16">

          {/* Left: Program list */}
          <div
            role="tablist"
            aria-label="Program pathways"
            aria-orientation="vertical"
            className="border-r border-border/50 pr-8 flex flex-col gap-1"
          >
            {PROGRAMS.map((p, i) => (
              <button
                key={p.num}
                type="button"
                role="tab"
                id={`program-tab-${p.num}`}
                aria-selected={selected === i}
                aria-controls={`program-panel-${p.num}`}
                tabIndex={selected === i ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(event) => handleTabKeyDown(event, i)}
                className={`text-left py-4 px-4 transition-colors duration-150 flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
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

          {/* Right: Detail panels */}
          <div>
            {PROGRAMS.map((program, i) => (
              <div
                key={program.num}
                role="tabpanel"
                id={`program-panel-${program.num}`}
                aria-labelledby={`program-tab-${program.num}`}
                hidden={selected !== i}
                className={selected === i ? 'py-4' : 'hidden'}
              >
                <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-3 block">
                  {program.tag}
                </span>
                <h2 className="text-[32px] font-medium text-foreground mb-6 leading-snug">
                  {program.title}
                </h2>
                <p className="text-[16px] text-muted-foreground leading-relaxed mb-12 max-w-[55ch]">
                  {program.desc}
                </p>

                <div className="mb-12">
                  <span className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground mb-6 block">
                    Core Outcomes
                  </span>
                  <BulletList>
                    {program.outcomes.map((outcome) => (
                      <BulletItem key={outcome}>{outcome}</BulletItem>
                    ))}
                  </BulletList>
                </div>

                <Button asChild className="rounded-none h-[52px] px-[28px] bg-foreground text-background hover:bg-primary transition-colors duration-200">
                  <Link to="/contact" /* ui-ignore */>Request Advisory Consult</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
