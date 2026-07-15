const CARDS = [
  {
    label: '01 — Integrations',
    title: 'Strategic Integrations',
    description:
      'Direct alignment with leading educational ministries, corporate partners, and humanitarian platforms.',
  },
  {
    label: '02 — Guidance',
    title: 'Real-time Guidance',
    description:
      'Synchronized feedback loops between expert mentors and learner capability pathways.',
  },
  {
    label: '03 — Standards',
    title: 'Framework Ready',
    description:
      'Built on verified data structures, comprehensive academic APIs, and standardized evaluation protocols.',
  },
  {
    label: '04 — Scale',
    title: 'Institution Ready',
    description:
      'Scale confidently with national educational standards and secure credentialing verification.',
  },
];

export default function PedigreeShowcase() {
  return (
    <section
      id="advisory"
      className="relative w-full bg-background py-40 border-t border-border/50"
    >
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">

        {/* Section header */}
        <div className="mb-20">
          <span className="text-[13px] font-medium tracking-wide uppercase text-muted-foreground mb-4 block">
            Technical Pedigree &amp; Advisory Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight leading-[1.2] max-w-2xl">
            Our founders &amp; advisors bring experience from world-class organizations
          </h2>
        </div>

        {/* 2�-2 typographic card grid — no diagrams, no borders, no shadows, no glows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group flex flex-col items-start p-10 bg-transparent transition-colors duration-200 hover:bg-secondary"
            >
              <span className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide mb-4 block">
                {card.label}
              </span>
              <h3 className="text-[24px] font-medium text-foreground mb-4 leading-snug">
                {card.title}
              </h3>
              <p className="text-[16px] text-muted-foreground leading-relaxed max-w-[45ch]">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
