import { useEffect, useRef, useState } from 'react';
import { Spotlight, SpotLightItem } from '../components/effects/Spotlight';

// ── Official EduPlus program data (from contents.md) ─────────────────────────
interface ServiceNode {
  id:          string;
  name:        string;
  tagline:     string;
  description: string;
  tag:         string;
  icon:        string;
}

const SERVICES: ServiceNode[] = [
  {
    id: '01',
    name: 'FuturePath Navigator',
    tagline: 'Discover Your True Potential',
    tag: 'Career Path Exploration',
    description:
      'Scientifically designed psychometric assessments and DMIT-based evaluations decode each learner's natural strengths, interests, and aptitudes — turning data into a clear, personalised academic and career roadmap.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    id: '02',
    name: 'LifeSkills Lab',
    tagline: "Building Tomorrow's Leaders Today",
    tag: 'Lifeskills Mastery Training',
    description:
      'Communication, critical thinking, emotional intelligence, financial literacy, and digital readiness — the non-negotiable human capabilities that define success far beyond grades.',
    icon: 'M12 3L1 9l11 6 9-4.5V17m0 0v-6.5L12 16l-9-4.5',
  },
  {
    id: '03',
    name: 'Expert Connect Live',
    tagline: 'Learn from the Best',
    tag: 'Subject Experts Interaction',
    description:
      'Live Q&A sessions, webinars, panel discussions, and hands-on project guidance that connect students directly with frontier researchers, industry leaders, and global academics.',
    icon: 'M12 2a7 7 0 0 0-7 7c0 3.5 2.5 6.5 7 11 4.5-4.5 7-7.5 7-11a7 7 0 0 0-7-7z',
  },
  {
    id: '04',
    name: 'Global Admissions Studio',
    tagline: 'Your Gateway to Global Education',
    tag: 'Higher Studies Guidance',
    description:
      'End-to-end support for domestic competitive exams (JEE, NEET, CUET, CLAT) and international university pathways across the USA, UK, Canada, Australia, Europe, and Asia, including SAT, GRE, IELTS, visa guidance, and SOP crafting.',
    icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  },
  {
    id: '05',
    name: 'Career Launchpad',
    tagline: 'Launch Your Career with Confidence',
    tag: 'Job Placement Opportunities',
    description:
      'Resume and LinkedIn portfolio building, mock interview coaching, and a corporate network spanning IT, healthcare, finance, and engineering — placing talent across India, the Middle East, Europe, and beyond.',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  },
  {
    id: '06',
    name: 'Innovation Studio & Educator Academy',
    tagline: 'Innovation in Education Starts Here',
    tag: 'Alpha Projects & Teacher Training',
    description:
      'STEM labs, robotics spaces, and entrepreneurship programs transform schools into innovation hubs — while Educator Academy equips teachers with modern pedagogy, e-learning tools, and leadership frameworks for sustained impact.',
    icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  },
];

// ── Individual card ───────────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: ServiceNode; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative border border-border bg-card p-8 flex flex-col justify-between min-h-[340px] cursor-default transition-all duration-500 overflow-hidden ${
        hovered ? 'border-primary/40 shadow-lg shadow-primary/5' : ''
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, oklch(var(--primary)/0.06) 0%, transparent 100%)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Top: node ID + tag chip */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <span
          className={`font-mono text-5xl font-light leading-none select-none transition-colors duration-300 ${
            hovered ? 'text-primary/30' : 'text-foreground/10'
          }`}
        >
          {service.id}
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-2 py-1 bg-background">
          {service.tag}
        </span>
      </div>

      {/* Icon */}
      <div className="mb-5 relative z-10">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={hovered ? 'oklch(var(--primary))' : 'oklch(var(--foreground)/0.6)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300"
        >
          <path d={service.icon} />
        </svg>
      </div>

      {/* Body: name + tagline + description */}
      <div className="space-y-3 relative z-10 flex-1">
        <span className={`block text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${hovered ? 'text-primary' : 'text-primary/60'}`}>
          {service.tagline}
        </span>
        <h3
          className={`font-heading text-xl font-light leading-snug transition-colors duration-300 ${
            hovered ? 'text-primary' : 'text-foreground'
          }`}
        >
          {service.name}
        </h3>
        <p className="font-sans text-xs text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Bottom: animated bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-500"
        style={{
          width: hovered ? '100%' : '0%',
          background: 'linear-gradient(90deg, oklch(var(--primary)), transparent)',
        }}
      />
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function ServicesMatrix() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="building"
      className="relative w-full py-40 md:py-52 bg-background"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Section header */}
        <div className="mb-20">
          <span
            className={`text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary mb-4 block transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Future-Ready Programs
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className={`font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground max-w-2xl leading-tight transition-all duration-1000 delay-100 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Six execution nodes
            </h2>
            <p
              className={`font-sans text-sm text-muted-foreground max-w-xs leading-relaxed transition-all duration-1000 delay-200 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              From classroom curiosity to career readiness — interconnected modules that support every milestone.
            </p>
          </div>

          {/* Horizontal rule with counter */}
          <div
            className={`mt-8 flex items-center gap-4 transition-all duration-1000 delay-300 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.3em]">
              06 PROGRAMS // ACTIVE
            </span>
          </div>
        </div>

        {/* Programs grid */}
        <Spotlight
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border transition-all duration-1000 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {SERVICES.map((service, index) => (
            <SpotLightItem key={service.id}>
              <ServiceCard service={service} index={index} />
            </SpotLightItem>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
