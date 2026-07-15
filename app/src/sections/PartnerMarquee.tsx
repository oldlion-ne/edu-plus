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
const ROW_1 = PARTNERS.slice(0, 7);
const ROW_2 = PARTNERS.slice(6); // slight overlap intentional

function PartnerChip({ name }: { name: string }) {
  return (
    <span className="mx-6 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-default whitespace-nowrap tracking-wide">
      {name}
    </span>
  );
}

export default function PartnerMarquee() {
  return (
    <section className="relative w-full bg-background border-t border-border/50 py-14 overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

      <div className="flex flex-col gap-4">
        {/* Row 1 — scrolls left */}
        <Marquee pauseOnHover className="[--duration:35s]">
          {ROW_1.map((name) => (
            <PartnerChip key={name} name={name} />
          ))}
        </Marquee>

        {/* Row 2 — scrolls right (reverse) for depth */}
        <Marquee reverse pauseOnHover className="[--duration:28s]">
          {ROW_2.map((name) => (
            <PartnerChip key={name} name={name} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
