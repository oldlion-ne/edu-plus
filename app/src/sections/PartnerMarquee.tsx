import Marquee from '../components/magicui/Marquee';

const PARTNERS = [
  'Indian Maritime University',
  'Hong Bang International University',
  'Dong A University',
  'NIELIT Imphal',
  'Manipur University',
  'RIMS Dental College',
  'CIPET Takyel',
  'Hungkuo Delin University of Technology',
  'Delhi University',
  'Visva-Bharati University',
  'Hyundai',
  'IBM',
  'HCL',
];

// Split into two rows for visual depth
const Math_half = Math.ceil(PARTNERS.length / 2);
const ROW_1 = PARTNERS.slice(0, Math_half);
const ROW_2 = PARTNERS.slice(Math_half - 1); // slight overlap intentional

function PartnerChip({ name }: { name: string }) {
  return (
    <div className="mx-3 md:mx-4 flex items-center justify-center h-16 md:h-20 px-8 md:px-12 bg-card border border-border/40 group hover:border-primary/50 transition-colors duration-500 cursor-default relative overflow-hidden">
      {/* Subtle geometric hover line */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700 ease-out" />
      
      <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground group-hover:text-foreground transition-colors duration-500 whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export default function PartnerMarquee() {
  return (
    <section className="relative w-full bg-background border-t border-b border-border/50 py-24 md:py-32 overflow-hidden flex flex-col items-center">
      
      <div className="mb-12 md:mb-16 text-center">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary block mb-4">
          Global Pedigree
        </span>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-foreground tracking-tight">
          Trusted by leading institutions & corporations
        </h2>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex flex-col gap-6 w-full">
        {/* Row 1 — scrolls left */}
        <Marquee pauseOnHover className="[--duration:40s]">
          {ROW_1.map((name) => (
            <PartnerChip key={name} name={name} />
          ))}
        </Marquee>

        {/* Row 2 — scrolls right (reverse) for depth */}
        <Marquee reverse pauseOnHover className="[--duration:45s]">
          {ROW_2.map((name, i) => (
            <PartnerChip key={`${name}-${i}`} name={name} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
