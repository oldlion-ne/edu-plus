import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';
import { BulletList } from '@/components/ui/bullet-list';
import { editorialIllustrations } from '@/lib/editorialIllustrations';
import { MagicCard } from '@/components/magicui/MagicCard';

import { ScrollReveal } from '@/components/effects/ScrollReveal';

const PROGRAMS = [
  {
    num: '01',
    title: 'MBBS Abroad (Vietnam)',
    tag: 'Medical Admissions',
    desc: 'Affordable, high-quality English-medium medical programs in Vietnam with excellent clinical exposure. We provide personalized guidance throughout your admission journey.',
    outcomes: [
      'NMC guideline compliance',
      'End-to-end documentation support',
      'Modern laboratory exposure',
      'Pre-departure orientation',
    ],
  },
  {
    num: '02',
    title: 'Overseas Placement & Dubai Jobs',
    tag: 'Global Careers',
    desc: 'Career mapping and international placements for rewarding global careers. Access walk-in interviews, attractive salary packages, and vocational training.',
    outcomes: [
      '100% placement assistance',
      'Dubai industry walk-ins',
      'Attractive salary packages',
      'International networking',
    ],
  },
  {
    num: '03',
    title: 'Summer Camps & Skills Development',
    tag: 'Immersive Learning',
    desc: 'Immersive regional camps in collaboration with NIELIT, CIPET, and RIMS, focusing on IoT, Robotics, Plastic Engineering, and Medical Awareness.',
    outcomes: [
      'Industrial expo exposure',
      'Robotics & IoT training',
      'Medical & Oral Health awareness',
      'Community mentorship',
    ],
  },
  {
    num: '04',
    title: 'Vision Talk & Expert Mentorship',
    tag: 'Professional Guidance',
    desc: 'An exclusive 4-month mentorship program bridging the gap between classroom and career, featuring industry experts and academic innovators.',
    outcomes: [
      '4-month deep immersion',
      'Leadership & team building',
      'Public speaking training',
      'Industry expert connect',
    ],
  },
  {
    num: '05',
    title: 'Domestic & Global Admissions',
    tag: 'Higher Studies',
    desc: 'End-to-end guidance for competitive domestic preparation (JEE, NEET, IMU CET) and securing seats in premier global universities.',
    outcomes: [
      'Domestic competitive prep',
      'IMU CET counseling',
      'International admissions support',
      'Scholarship identification',
    ],
  },
  {
    num: '06',
    title: 'Innovation Studio & Educator Academy',
    tag: 'Alpha Projects',
    desc: 'Setting up STEM and robotics innovation labs in schools, alongside professional pedagogical growth training for modern educators.',
    outcomes: [
      'STEM & robotics lab setup',
      'Educator workshop series',
      'AI-integration in classrooms',
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
    <div className="bg-background w-full flex-1">

      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="Curriculum Pathways"
        title="Future-Ready Programs"
        description="Six interconnected modules supporting learners at every milestone — from discovering their strengths to launching global careers."
        illustration={editorialIllustrations.programs}
      />

      {/* ── Program Explorer ── */}
      <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <ScrollReveal>
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
                className={`relative text-left py-4 px-4 transition-colors duration-150 flex items-start gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  selected === i
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60'
                }`}
              >
                {selected === i && (
                  <motion.div
                    layoutId="activeProgramTab"
                    className="absolute inset-0 bg-secondary/80 border-l-[3px] border-primary z-0"
                    transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 font-sans text-[11px] font-semibold text-primary/70 mt-0.5 shrink-0">{p.num}</span>
                <span className="relative z-10 font-sans text-[15px] font-medium leading-snug">{p.title}</span>
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
                className={selected === i ? 'h-full' : 'hidden'}
              >
                {selected === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                    className="h-full"
                  >
                    <MagicCard 
                      className="h-full border border-border/50 p-8 md:p-12 rounded-none bg-card/30"
                      gradientColor="oklch(var(--primary) / 0.05)"
                    >
                    <motion.span 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                      className="font-sans text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-3 block">
                      {program.tag}
                    </motion.span>
                    <motion.h2 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                      className="font-heading text-[32px] font-medium text-foreground mb-6 leading-snug">
                      {program.title}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                      className="font-sans text-[16px] text-muted-foreground leading-relaxed mb-12 max-w-[55ch]">
                      {program.desc}
                    </motion.p>

                    <div className="mb-12">
                      <motion.span 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                        className="font-sans text-[13px] font-medium uppercase tracking-wide text-muted-foreground mb-6 block">
                        Core Outcomes
                      </motion.span>
                      <BulletList>
                        {program.outcomes.map((outcome, idx) => (
                          <motion.li
                            key={outcome}
                            className="font-sans text-[15px] text-foreground flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.05, type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                          >
                            <span className="mt-2 w-1 h-1 bg-primary rounded-none shrink-0" />
                            {outcome}
                          </motion.li>
                        ))}
                      </BulletList>
                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      <Button asChild size="md" className="font-sans rounded-none bg-foreground text-background hover:bg-primary transition-colors duration-200">
                        <Link to="/contact" /* ui-ignore */>Advisory</Link>
                      </Button>
                    </motion.div>
                    </MagicCard>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
