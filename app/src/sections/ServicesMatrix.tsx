import { Link } from 'react-router';

const PROGRAMS = [
  {
    name: 'FuturePath Navigator',
    description: 'Decodes strengths, psychometrics, and DMIT assessments to guide subject, stream, and career selection.',
  },
  {
    name: 'LifeSkills Lab',
    description: 'Trains soft skills, communication, emotional resilience, and financial literacy for real-world readiness.',
  },
  {
    name: 'Expert Connect Live',
    description: 'Connects learners directly to industry experts, academics, and global researchers for guided mentorship.',
  },
  {
    name: 'Global Admissions Studio',
    description: 'End-to-end guidance for competitive domestic prep and international university admissions.',
  },
  {
    name: 'Career Launchpad',
    description: 'Resume building, LinkedIn optimisation, mock interviews, and direct placement support.',
  },
  {
    name: 'Innovation Studio & Educator Academy',
    description: 'Sets up STEM and robotics labs in schools while providing professional pedagogical growth training.',
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
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-4 block">
            Programs &amp; Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2]">
            Six interconnected programs built for outcomes
          </h2>
        </div>

        {/* Static 3-column program grid — no borders, no backgrounds, no animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
          {PROGRAMS.map((program) => (
            <div
              key={program.name}
              className="group flex flex-col items-start p-10 bg-transparent transition-colors duration-200 hover:bg-secondary"
            >
              <h3 className="text-[20px] font-medium text-foreground mb-4 leading-snug">
                {program.name}
              </h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 flex-1">
                {program.description}
              </p>
              <Link
                to="/programs" /* ui-ignore */
                className="text-[14px] font-medium text-primary hover:underline mt-auto"
              >
                Explore &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
