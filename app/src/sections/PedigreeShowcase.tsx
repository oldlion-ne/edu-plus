import { BlurFade } from '@/components/ui/blur-fade';

const CARDS = [
  {
    label: '01 Integrations',
    title: 'Strategic Integrations',
    description:
      'Direct alignment with leading educational ministries, corporate partners, and humanitarian platforms.',
  },
  {
    label: '02 Guidance',
    title: 'Real-time Guidance',
    description:
      'Synchronized feedback loops between expert mentors and learner capability pathways.',
  },
  {
    label: '03 Standards',
    title: 'Framework Ready',
    description:
      'Built on verified data structures, comprehensive academic APIs, and standardized evaluation protocols.',
  },
  {
    label: '04 Scale',
    title: 'Institution Ready',
    description:
      'Scale confidently with national educational standards and secure credentialing verification.',
  },
];

export default function PedigreeShowcase() {
  return (
    <section
      id="advisory"
      aria-label="Technical Pedigree and Advisory Network"
      className="relative w-full bg-background py-40 border-t border-border/50"
    >
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">

        {/* Section header */}
        <div className="mb-20">
          <BlurFade delay={0.15} inView>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4 block">
              Technical Pedigree
            </span>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2] max-w-2xl">
              Our founders and advisors bring experience from world-class organizations
            </h2>
          </BlurFade>
        </div>

        {/* 2x2 typographic card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {CARDS.map((card, idx) => (
            <BlurFade key={card.title} delay={0.25 + idx * 0.05} inView>
              <div
                className="group relative flex flex-col items-start p-10 bg-transparent transition-colors duration-200 hover:bg-secondary overflow-hidden h-full"
              >
                {/* Amber accent hover line */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700 ease-out" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase mb-4 block">
                  {card.label}
                </span>
                <h3 className="text-[24px] font-medium text-foreground mb-4 leading-snug">
                  {card.title}
                </h3>
                <p className="text-[16px] text-muted-foreground leading-relaxed max-w-[45ch]">
                  {card.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>

      </div>
    </section>
  );
}
