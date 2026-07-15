const PARTNERS = [
  'Indian Maritime University',
  'Hong Bang International University (HIU)',
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
