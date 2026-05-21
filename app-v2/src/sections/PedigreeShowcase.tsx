import { useEffect, useRef, useState } from 'react';
import { Spotlight, SpotLightItem } from '../components/effects/Spotlight';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface ExpertNode {
  nodeId: string;
  name: string;
  domain: string;
  role: string;
  category: string;
}

const EXPERT_REGISTRY: ExpertNode[] = [
  {
    nodeId: '01',
    name: 'Dr. Soram Bobby Singh',
    domain: 'Green Hydrogen',
    role: 'Principal Scientist leading clean-energy & hydrogen storage architectures.',
    category: 'Research Node',
  },
  {
    nodeId: '02',
    name: 'Ms. Geetarani Takhellambam',
    domain: 'Legal Operations',
    role: 'GM and Head of Legal at Powerica Ltd, specializing in energy governance & compliance.',
    category: 'Corporate Node',
  },
  {
    nodeId: '03',
    name: 'Smt. Purnimashi Moirangthem',
    domain: 'Cognitive Development',
    role: 'Assistant Director leading early childhood cognitive learning and research methodologies.',
    category: 'Cognitive Node',
  },
  {
    nodeId: '04',
    name: 'Dr. Ngangbam Shantikumar Meetei',
    domain: 'Advanced Linguistics',
    role: 'Professor of Advanced Linguistics specializing in structural syntactic frameworks.',
    category: 'Academic Node',
  },
  {
    nodeId: '05',
    name: 'Khumukcham Roshaan Singh',
    domain: 'Career Strategy',
    role: 'Executive Career Strategist designing pathways for global leadership pipelines.',
    category: 'Strategy Node',
  },
  {
    nodeId: '06',
    name: 'Shri Romen Ningthoujam',
    domain: 'Social Operations',
    role: 'Operational Lead at Goonj, driving large-scale humanitarian logistics and systems.',
    category: 'Logistics Node',
  },
  {
    nodeId: '07',
    name: 'Smt. Nutan Nongthongbam',
    domain: 'Public Health',
    role: 'International Public Health Speaker advocating global community healthcare protocols.',
    category: 'Medical Node',
  },
  {
    nodeId: '08',
    name: 'Shri Rojit Keisham',
    domain: 'Maritime Logistics',
    role: 'Professor of Maritime Operations specializing in blue-ocean transport networks.',
    category: 'Transport Node',
  },
];

export default function PedigreeShowcase() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="advisory"
      className="relative w-full min-h-screen bg-background overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative z-10 pt-32 md:pt-40 pb-8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <span
            className={`text-xs font-sans font-medium tracking-[0.3em] uppercase text-primary mb-6 block transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Expert Registry
          </span>
          <h2
            className={`font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground max-w-3xl transition-all duration-1000 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Technical Pedigree
          </h2>
          <p
            className={`font-sans text-sm text-muted-foreground max-w-lg mt-6 leading-relaxed transition-all duration-1000 delay-400 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Our advisory network spans scientists, strategists, linguists, and operational
            leads across critical domains of human capability development.
          </p>
        </div>
      </div>

      {/* 8-Node Bento Grid Display */}
      <div
        className={`max-w-[1440px] mx-auto px-6 md:px-12 pb-24 transition-all duration-1000 delay-500 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <Spotlight className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERT_REGISTRY.map((expert) => (
            <SpotLightItem key={expert.nodeId}>
              <Card className="group relative flex flex-col justify-between min-h-[220px] h-full transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
                {/* Neon top accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent transition-colors duration-300 group-hover:bg-primary" />

                <CardContent className="flex flex-col justify-between h-full pt-6">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase">
                        NODE // {expert.nodeId}
                      </span>
                      <span className="font-mono text-[8px] text-green-500 flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-500 rounded-full inline-block animate-pulse" />
                        SECURE
                      </span>
                    </div>

                    <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-3">
                      // {expert.domain}
                    </div>
                    <h3 className="font-heading text-lg font-light text-foreground leading-snug mb-2">
                      {expert.name}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      {expert.role}
                    </p>
                  </div>

                  <div className="border-t border-border mt-6 pt-4 flex justify-between items-center">
                    <Badge variant="secondary" className="text-[8px] font-mono uppercase tracking-wider">
                      {expert.category}
                    </Badge>
                    <span className="font-mono text-[8px] text-primary tracking-wider group-hover:underline cursor-pointer">
                      [ PROFILE ]
                    </span>
                  </div>
                </CardContent>
              </Card>
            </SpotLightItem>
          ))}
        </Spotlight>
      </div>

      {/* Bottom Divider */}
      <div
        className={`h-[1px] max-w-[1440px] mx-auto px-6 md:px-12 transition-all duration-1000 delay-700 ${
          visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--border)) 50%, transparent 100%)',
          transformOrigin: 'center',
        }}
      />
    </section>
  );
}
