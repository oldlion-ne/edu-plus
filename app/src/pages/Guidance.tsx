import { useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';
import { BulletList, BulletItem } from '@/components/ui/bullet-list';
import { editorialIllustrations } from '@/lib/editorialIllustrations';

const TABS = [
  {
    id: 'students',
    label: 'For Students',
    title: 'Chart Your Personal Academic & Career Path',
    desc: 'Navigate academic choices, discover your passions, and understand how your strengths connect to real-world opportunities. From subject selection and career mapping to entrance exam strategies and higher studies planning, you receive a personal roadmap — not generic advice.',
    cta: 'Student Advisory',
    outcomes: [
      'Core strengths & passion discovery',
      'Customized subject & stream selection',
      'Entrance exam strategy (JEE, NEET, SAT)',
      'Higher studies & scholarship planning',
    ],
  },
  {
    id: 'parents',
    label: 'For Parents',
    title: 'Empower Your Child Without the Pressure',
    desc: 'Equip yourself with tools, frameworks, and information to support your child\'s professional and personal growth. Our sessions help you decode rapidly changing education and career landscapes so you can guide — not pressure — your child toward realistic, fulfilling paths.',
    cta: 'Parent Consultation',
    outcomes: [
      'Understanding psychometric results',
      'Mapping academic options objectively',
      'Collaborating with child on direction',
      'Long-term career landscape briefings',
    ],
  },
  {
    id: 'seekers',
    label: 'For Job Seekers',
    title: 'Bridge the Gap Between Learning & Placement',
    desc: 'Support your professional transition with structured career counselling, profile building, and targeted upskilling recommendations. Gain clarity on your core strengths, international options, and the actions required to move forward.',
    cta: 'Placement Pathway',
    outcomes: [
      'Resume & LinkedIn optimisation',
      'Interview coaching & mock sessions',
      'Industry sector alignment',
      'Global placement pipeline access',
    ],
  },
  {
    id: 'teachers',
    label: 'For Teachers',
    title: 'Evolve From Instructors Into Mentors',
    desc: 'Enhance your classroom impact, mentorship capabilities, and academic leadership profile. Through reflective coaching, modern pedagogy training, and technology integration workshops, learn how to guide students to life readiness.',
    cta: 'Educator Mentorship',
    outcomes: [
      'Modern pedagogy training',
      'AI-integration in classrooms',
      'Student mentoring frameworks',
      'Leadership & curriculum design',
    ],
  },
];

export default function Guidance() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (index + 1) % TABS.length;
        break;
      case 'ArrowLeft':
        nextIndex = (index - 1 + TABS.length) % TABS.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = TABS.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveTab(nextIndex);
    document.getElementById(`guidance-tab-${TABS[nextIndex].id}`)?.focus();
  };

  return (
    <div className="bg-background w-full min-h-screen">

      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="Advisory Services"
        title="One-to-One Guidance"
        illustration={editorialIllustrations.guidance}
        description="Dedicated, one-on-one support tailored to every stakeholder in the education ecosystem — students, parents, job seekers, and educators."
      >
        <Button asChild size="md" className="rounded-none bg-foreground text-background hover:bg-primary transition-colors duration-200">
          <Link to="/contact" /* ui-ignore */>Book</Link>
        </Button>
      </PageHero>

      {/* ── Stakeholder Tabs ── */}
      <section className="py-20 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">

        {/* Text tabs — underline active, no filled backgrounds */}
        <div
          role="tablist"
          aria-label="Guidance audiences"
          aria-orientation="horizontal"
          className="flex gap-8 border-b border-border/50 mb-16 overflow-x-auto"
        >
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`guidance-tab-${t.id}`}
              aria-selected={activeTab === i}
              aria-controls={`guidance-panel-${t.id}`}
              tabIndex={activeTab === i ? 0 : -1}
              onClick={() => setActiveTab(i)}
              onKeyDown={(event) => handleTabKeyDown(event, i)}
              className={`pb-4 text-[15px] font-medium whitespace-nowrap transition-colors duration-150 border-b-2 -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeTab === i
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Detail panels */}
        {TABS.map((audience, i) => (
          <div
            key={audience.id}
            role="tabpanel"
            id={`guidance-panel-${audience.id}`}
            aria-labelledby={`guidance-tab-${audience.id}`}
            hidden={activeTab !== i}
            className={activeTab === i ? 'grid md:grid-cols-2 gap-16' : 'hidden'}
          >
            <div>
              <h2 className="text-[28px] font-medium text-foreground mb-6 leading-snug">{audience.title}</h2>
              <p className="text-[16px] text-muted-foreground leading-relaxed mb-10 max-w-[55ch]">{audience.desc}</p>
              <Button asChild size="md" className="rounded-none bg-foreground text-background hover:bg-primary transition-colors duration-200">
                <Link to="/contact" /* ui-ignore */>{audience.cta}</Link>
              </Button>
            </div>
            <div>
              <span className="text-[13px] font-medium uppercase tracking-wide text-muted-foreground mb-6 block">
                What You Get
              </span>
              <BulletList>
                {audience.outcomes.map((outcome) => (
                  <BulletItem key={outcome}>{outcome}</BulletItem>
                ))}
              </BulletList>
            </div>
          </div>
        ))}

      </section>

      {/* ── Pricing block ── */}
      <section className="py-32 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="mx-auto max-w-xl">
          <div>
            <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-4 block">
              Get Started
            </span>
            <h2 className="text-3xl font-light text-foreground tracking-tight leading-[1.2] mb-10">
              Transform your learning & career journey
            </h2>
            <div className="p-12 bg-secondary">
              <div className="mb-8">
                <span className="text-[13px] text-muted-foreground uppercase tracking-wide block mb-2">Discovery Call</span>
                <div className="text-[52px] font-medium text-foreground leading-none">
                  Free
                </div>
                <span className="text-[14px] text-muted-foreground mt-2 block">Free forever for initial discovery sessions</span>
              </div>
              <ul className="flex flex-col gap-3 mb-10">
                <li className="text-[15px] text-foreground flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 bg-primary rounded-none shrink-0" />
                  1-on-1 personalised discovery session
                </li>
                <li className="text-[15px] text-foreground flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 bg-primary rounded-none shrink-0" />
                  Aptitude & cognitive mapping (DMIT)
                </li>
                <li className="text-[15px] text-foreground flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 bg-primary rounded-none shrink-0" />
                  Detailed career pathway & college prep report
                </li>
                <li className="text-[15px] text-foreground flex items-start gap-3">
                  <span className="mt-2 w-1 h-1 bg-primary rounded-none shrink-0" />
                  Alignment with global internships & programmes
                </li>
              </ul>
              <Button asChild size="md" className="w-full rounded-none bg-foreground text-background hover:bg-primary transition-colors duration-200">
                <Link to="/contact" /* ui-ignore */>Book Free Session</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
