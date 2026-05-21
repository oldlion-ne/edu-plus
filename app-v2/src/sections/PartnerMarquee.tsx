import { useEffect, useState } from 'react';
import { Award, Briefcase, Cpu, Globe, GraduationCap } from 'lucide-react';
import Marquee from '../components/magicui/Marquee';

interface Partner {
  name: string;
  category: string;
  type: 'academic' | 'corporate' | 'community' | 'research';
}

const PARTNERS: Partner[] = [
  { name: 'Ministry of Education, Singapore', category: 'Academic Advisory', type: 'academic' },
  { name: 'Goonj', category: 'Community Partner', type: 'community' },
  { name: 'Hyundai', category: 'Corporate Pedigree', type: 'corporate' },
  { name: 'Hero Honda', category: 'Corporate Pedigree', type: 'corporate' },
  { name: 'LML', category: 'Corporate Pedigree', type: 'corporate' },
  { name: 'Excel', category: 'Corporate Pedigree', type: 'corporate' },
  { name: 'Powerica Ltd.', category: 'Corporate Pedigree', type: 'corporate' },
  { name: 'Indian Maritime University', category: 'Academic Pedigree', type: 'academic' },
  { name: 'Hungkuo Delin University of Technology', category: 'Global Academic', type: 'academic' },
  { name: 'Delhi University', category: 'Academic Pedigree', type: 'academic' },
  { name: 'HCL', category: 'Technology Pedigree', type: 'corporate' },
  { name: 'IBM', category: 'Technology Pedigree', type: 'corporate' },
  { name: 'NIIT', category: 'Education Pedigree', type: 'academic' },
  { name: 'Convergys', category: 'Corporate Pedigree', type: 'corporate' },
  { name: 'Kadi Sarva Vishwavidyalaya (KSV)', category: 'Academic Pedigree', type: 'academic' },
  { name: 'Visva-Bharati University', category: 'Academic Pedigree', type: 'academic' },
  { name: 'Green Hydrogen Research, South Korea', category: 'Research Connection', type: 'research' },
  { name: 'Early Childcare and Education Center, Dallas', category: 'Education Pedigree', type: 'academic' }
];

export default function PartnerMarquee() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getIcon = (type: Partner['type']) => {
    switch (type) {
      case 'academic':
        return <GraduationCap className="w-3.5 h-3.5 text-primary" />;
      case 'corporate':
        return <Briefcase className="w-3.5 h-3.5 text-primary" />;
      case 'community':
        return <Globe className="w-3.5 h-3.5 text-primary" />;
      case 'research':
        return <Cpu className="w-3.5 h-3.5 text-primary" />;
      default:
        return <Award className="w-3.5 h-3.5 text-primary" />;
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative w-full py-8 bg-muted border-y border-border overflow-hidden">
      {/* Title / Intro Label */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <span className="text-[10px] md:text-xs font-sans font-semibold tracking-[0.25em] uppercase text-primary">
            Technical Pedigree &amp; Advisory Network
          </span>
          <span className="text-[10px] md:text-xs font-sans font-medium text-muted-foreground">
            Our founders &amp; advisors bring experience from world-class organizations
          </span>
        </div>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full flex items-center">
        {/* Left & Right Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-muted to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-muted to-transparent z-10 pointer-events-none" />

        <Marquee pauseOnHover className="[--duration:40s] py-2">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-card border border-border transition-all duration-300 hover:border-primary/40 hover:bg-accent group mx-2 shrink-0"
            >
              {getIcon(partner.type)}
              <div className="flex flex-col leading-none">
                <span className="text-xs md:text-sm font-sans font-medium text-card-foreground group-hover:text-foreground transition-colors">
                  {partner.name}
                </span>
                <span className="text-[9px] md:text-[10px] font-sans text-muted-foreground mt-0.5">
                  {partner.category}
                </span>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
