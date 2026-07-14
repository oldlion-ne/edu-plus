import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/ui/page-hero';

const VALUES = [
  {
    num: '01',
    title: 'Clarity of Direction',
    desc: 'Reducing confusion, demystifying career decisions, and making high-quality guidance accessible to learners as early as school.',
  },
  {
    num: '02',
    title: 'Access to Opportunity',
    desc: 'Ensuring geography never dictates potential — from communities in Manipur to global academic and corporate networks.',
  },
  {
    num: '03',
    title: 'Right Skills at the Right Time',
    desc: 'Empowering learners with critical soft skills, professional toolkits, and technical readiness for a fast-changing global economy.',
  },
];

const DOMAINS = [
  'Education',
  'Corporate Leadership',
  'Community Development',
  'Research',
  'Healthcare',
  'Law',
  'Maritime',
  'Communication',
  'Global Academia',
];

const TIMELINE = [
  {
    chapter: '01 — The Roots',
    title: 'Nurturing Local Potential',
    desc: 'EduPlus Skills originated from a conviction that geography should never dictate opportunity. Beginning at the grassroot level in Manipur, we built pathways connecting local talent with world-class standards.',
  },
  {
    chapter: '02 — The Hub Model',
    title: 'Connecting East India to Global Networks',
    desc: 'We developed a distributed network linking local communities to national and international metropolises — operating across Manipur, Kolkata, Delhi, and Singapore.',
  },
  {
    chapter: '03 — Core Pillars',
    title: 'Values & Enablement',
    desc: 'Psychometric guidance, global network connectivity, and a multi-domain advisory council form the three pillars of our operational framework.',
  },
  {
    chapter: '04 — Foundations',
    title: 'Professional Pedigree',
    desc: 'Our team combines experience across nine domains: education, corporate leadership, community development, research, healthcare, law, maritime, communication, and global academia.',
  },
];

export default function About() {
  return (
    <div className="bg-background w-full min-h-screen">

      {/* ── Typographic Hero ── */}
      <PageHero
        eyebrow="About EduPlus"
        title="Know Who We Are"
        description="EduPlus Skills is an innovation-led skills and career platform that seamlessly combines education, training, and employment enablement — operating both online and offline across regions from Manipur to global career pathways."
      >
        <Button asChild className="rounded-none h-[52px] px-[28px] bg-foreground text-background hover:bg-primary transition-colors duration-200">
          <Link to="/contact" /* ui-ignore */>Get in Touch</Link>
        </Button>
      </PageHero>

      {/* ── What We Stand For ── */}
      <section className="py-32 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-4 block">
          What We Stand For
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2] mb-20 max-w-2xl">
          Every learner deserves clarity, access, and the right skills at the right time.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {VALUES.map((v) => (
            <div key={v.num} className="p-10 bg-transparent hover:bg-secondary transition-colors duration-200">
              <span className="text-[13px] font-medium text-primary mb-4 block">{v.num}</span>
              <h3 className="text-[20px] font-medium text-foreground mb-4">{v.title}</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Journey Timeline ── */}
      <section className="py-32 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-4 block">
          Our Journey
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2] mb-20">
          A journey built on purpose
        </h2>
        <div className="flex flex-col gap-0">
          {TIMELINE.map((item, i) => (
            <div
              key={item.chapter}
              className={`grid md:grid-cols-[1fr_3fr] gap-8 md:gap-16 py-12 ${i < TIMELINE.length - 1 ? 'border-b border-border/50' : ''}`}
            >
              <div>
                <span className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide block">{item.chapter}</span>
              </div>
              <div>
                <h3 className="text-[22px] font-medium text-foreground mb-4">{item.title}</h3>
                <p className="text-[16px] text-muted-foreground leading-relaxed max-w-[55ch]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Multi-Domain Expertise ── */}
      <section className="py-32 border-t border-border/50 px-6 md:px-12 max-w-[1440px] mx-auto">
        <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-4 block">
          Professional Pedigree
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2] mb-10 max-w-2xl">
          Multi-domain expertise grounded in reality
        </h2>
        <p className="text-[16px] text-muted-foreground leading-relaxed max-w-2xl mb-16">
          Our team combines experience across nine domains, allowing us to build programs that are aspirational yet deeply practical.
        </p>
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          {DOMAINS.map((d, i) => (
            <span key={d} className="text-[15px] font-medium text-muted-foreground">
              <span className="text-[11px] text-primary/60 mr-2">{String(i + 1).padStart(2, '0')}</span>
              {d}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
}
