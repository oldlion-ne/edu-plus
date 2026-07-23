import { Link } from 'react-router';

import { BlurFade } from '../components/ui/blur-fade';

const PROGRAMS = [
  {
    name: 'MBBS Abroad (Vietnam)',
    description: 'Affordable, high-quality English-medium medical programs in Vietnam with excellent clinical exposure. We provide personalized guidance throughout your admission journey.',
  },
  {
    name: 'Overseas Placement & Dubai Jobs',
    description: 'Career mapping and international placements for rewarding global careers. Access walk-in interviews, attractive salary packages, and vocational training.',
  },
  {
    name: 'Summer Camps & Skills Development',
    description: 'Immersive regional camps in collaboration with NIELIT, CIPET, and RIMS, focusing on IoT, Robotics, Plastic Engineering, and Medical Awareness.',
  },
  {
    name: 'Vision Talk & Expert Mentorship',
    description: 'An exclusive 4-month mentorship program bridging the gap between classroom and career, featuring industry experts and academic innovators.',
  },
  {
    name: 'Domestic & Global Admissions',
    description: 'End-to-end guidance for competitive domestic preparation (JEE, NEET) and securing seats in premier global universities.',
  },
  {
    name: 'Innovation Studio & Educator Academy',
    description: 'Setting up STEM and robotics labs in schools, alongside professional pedagogical growth training for modern educators.',
  },
];

export default function ServicesMatrix() {
  return (
    <section
      id="building"
      className="relative w-full py-40 bg-background border-t border-border/50"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-20">
          <BlurFade delay={0.15} inView>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4 block">
              Programs & Offerings
            </span>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2]">
              Six interconnected programs built for outcomes
            </h2>
          </BlurFade>
        </div>

        {/* Static 3-column program grid — no borders, no backgrounds, no animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {PROGRAMS.map((program, idx) => (
            <BlurFade key={program.name} delay={0.25 + idx * 0.05} inView>
              <div
                className="group relative flex flex-col items-start p-10 bg-transparent transition-colors duration-200 hover:bg-secondary h-full overflow-hidden"
              >
                {/* Amber accent hover line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700 ease-out" />
                <h3 className="text-[20px] font-medium text-foreground mb-4 leading-snug">
                  {program.name}
                </h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 flex-1">
                  {program.description}
                </p>
                <Link
                  to="/programs" /* ui-ignore */
                  aria-label={`Explore ${program.name}`}
                  className="text-[14px] font-medium text-primary hover:underline mt-auto"
                >
                  Explore &rarr;
                </Link>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
