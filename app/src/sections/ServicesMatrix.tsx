import { useEffect, useRef, useState } from 'react';
import Marquee from '../components/magicui/Marquee';
import { cn } from '../lib/utils';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';

// ── EduPlus program data (contents.md) ───────────────────────────────────────
const PROGRAMS = [
  { id: '01', name: 'FuturePath Navigator',                tag: 'Career Exploration'    },
  { id: '02', name: 'LifeSkills Lab',                      tag: 'Mastery Training'       },
  { id: '03', name: 'Expert Connect Live',                 tag: 'Mentorship'             },
  { id: '04', name: 'Global Admissions Studio',            tag: 'Higher Studies'         },
  { id: '05', name: 'Career Launchpad',                    tag: 'Job Placement'          },
  { id: '06', name: 'Innovation Studio & Educator Academy',tag: 'Alpha Projects'         },
];

// Row 1 - forward; Row 2 - reverse; Row 3 - forward (rotated set)
const ROW_1 = [PROGRAMS[0], PROGRAMS[2], PROGRAMS[4], PROGRAMS[1], PROGRAMS[3], PROGRAMS[5]];
const ROW_2 = [PROGRAMS[3], PROGRAMS[1], PROGRAMS[5], PROGRAMS[0], PROGRAMS[4], PROGRAMS[2]];
const ROW_3 = [PROGRAMS[2], PROGRAMS[4], PROGRAMS[0], PROGRAMS[5], PROGRAMS[1], PROGRAMS[3]];

// ── Program pill card used inside each Marquee row ───────────────────────────
function ProgramCard({
  name,
  tag,
  className,
}: {
  name: string;
  tag: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
      'relative flex items-center gap-3 border border-border bg-card/80 px-4 py-3  transition-all duration-300 hover:border-primary/40 hover:bg-card shrink-0 rounded-none',
        className,
      )}
    >
      {/* Name */}
      <span className="font-sans text-xs font-medium text-foreground whitespace-nowrap leading-none">
        {name}
      </span>
      {/* Tag chip */}
      <span className="ml-1 font-sans text-[9px] uppercase tracking-wider text-muted-foreground border border-border px-1.5 py-0.5 bg-background/60 rounded-none whitespace-nowrap">
        {tag}
      </span>
    </div>
  );
}

// ── Inline EduPlus wordmark used as centre node ───────────────────────────────
function EduPlusLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-heading font-bold text-foreground flex items-center leading-none select-none',
        className,
      )}
    >
      Edu<span className="text-primary font-light">+</span>
    </span>
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
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="building"
      className="relative w-full py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* ── Radial-masked marquee visualizer ── */}
        <div
          className={`relative mx-auto max-w-2xl transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Radial mask wrapper */}
          <div
            className="relative space-y-4 py-2"
            style={{
              maskImage:
                'radial-gradient(ellipse 80% 80% at 50% 50%, #000 55%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 80% at 50% 50%, #000 55%, transparent 100%)',
            }}
          >
            {/* Row 1 - forward */}
            <Marquee pauseOnHover className="[--duration:30s] [--gap:12px]">
              {ROW_1.map((p) => (
                <ProgramCard key={p.id + '-r1'} name={p.name} tag={p.tag} />
              ))}
            </Marquee>

            {/* Row 2 - reverse */}
            <Marquee pauseOnHover reverse className="[--duration:28s] [--gap:12px]">
              {ROW_2.map((p) => (
                <ProgramCard key={p.id + '-r2'} name={p.name} tag={p.tag} />
              ))}
            </Marquee>

            {/* Row 3 - forward */}
            <Marquee pauseOnHover className="[--duration:32s] [--gap:12px]">
              {ROW_3.map((p) => (
                <ProgramCard key={p.id + '-r3'} name={p.name} tag={p.tag} />
              ))}
            </Marquee>

            {/* Centre logo node */}
            <div className="absolute inset-0 m-auto flex size-fit items-center justify-center z-20">
        <div className="flex px-4 py-2 items-center justify-center rounded-none border border-border bg-card/90 shadow-xl shadow-black/10 ">
                <EduPlusLogo className="text-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Text block ── */}
        <div
          className={`mx-auto mt-14 max-w-lg text-center space-y-5 transition-all duration-1000 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="font-sans font-medium text-xs uppercase tracking-wider text-primary block">
            Future-Ready Programs
          </span>

          <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground text-balance leading-tight">
            Connect your learning journey across every milestone
          </h2>

          <p className="font-sans text-sm text-muted-foreground leading-relaxed">
            Six interconnected programs - from self-discovery and skills training to global admissions,
            career placement, and institutional innovation.
          </p>

          <Button
            asChild
            variant="outline"
            size="sm"
          className="group inline-flex items-center gap-2 font-sans font-medium text-xs tracking-wider uppercase rounded-none"
          >
            <Link to="/programs" /* ui-ignore */>
              Explore All Programs
              <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
