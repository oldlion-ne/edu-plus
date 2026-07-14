const PARTNERS = [
  'Ministry of Education, Singapore',
  'Goonj',
  'Hyundai',
  'Hero Honda',
  'LML',
  'Excel',
  'Powerica Ltd.',
  'Indian Maritime University',
  'Hungkuo Delin University of Technology',
  'Delhi University',
  'HCL',
  'IBM',
  'NIIT',
  'Convergys',
  'Kadi Sarva Vishwavidyalaya',
  'Visva-Bharati University',
  'Green Hydrogen Research, South Korea',
  'Early Childcare and Education Center, Dallas',
];

export default function PartnerMarquee() {
  return (
    <section className="relative w-full bg-background border-t border-border/50 py-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-5">
          {PARTNERS.map((partner) => (
            <span
              key={partner}
              className="text-[15px] font-medium text-muted-foreground hover:text-foreground cursor-default transition-colors duration-200"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
