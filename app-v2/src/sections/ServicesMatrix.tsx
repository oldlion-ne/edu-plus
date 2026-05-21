import { useEffect, useRef, useState } from 'react';
import { Spotlight, SpotLightItem } from '../components/effects/Spotlight';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';

interface ServiceNode {
  title: string;
  description: string;
  icon: string;
}

const SERVICES: ServiceNode[] = [
  {
    title: 'Career Path Exploration Engine',
    description: 'Psychometrics and predictive career matrixing.',
    icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    title: 'Lifeskills Mastery Framework',
    description: 'Cognitive optimization and synthetic leadership modules.',
    icon: 'M12 3L1 9l11 6 9-4.5V17m0 0v-6.5L12 16l-9-4.5',
  },
  {
    title: 'Subject Matter Mentorship Nodes',
    description: 'Live telemetry lines connecting to frontier researchers.',
    icon: 'M12 2a7 7 0 0 0-7 7c0 3.5 2.5 6.5 7 11 4.5-4.5 7-7.5 7-11a7 7 0 0 0-7-7z',
  },
  {
    title: 'Advanced Academic Advisory',
    description: 'Strategic architecture for domestic (JEE, NEET) and global mobility.',
    icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  },
  {
    title: 'Global Talent Placement Matrix',
    description: 'Neural-network simulation interviews and job pipeline match-ups.',
    icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  },
  {
    title: 'Alpha Projects & Pedagogical Integration',
    description: 'Decentralized hardware hacking and legacy faculty system upgrades.',
    icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  },
];

function ServiceCard({ service, index }: { service: ServiceNode; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      className="group relative transition-all duration-300 cursor-pointer overflow-hidden"
      style={{ transitionDelay: `${index * 50}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardHeader className="pb-2">
        {/* Icon */}
        <div className="mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke={hovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-colors duration-300"
          >
            <path d={service.icon} />
          </svg>
        </div>
        <CardTitle
          className={`font-heading text-xl md:text-2xl font-normal transition-colors duration-300 ${
            hovered ? 'text-primary' : 'text-foreground'
          }`}
        >
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="font-sans text-sm leading-relaxed">
          {service.description}
        </CardDescription>
      </CardContent>

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 left-0 h-[1px] transition-all duration-500"
        style={{
          width: hovered ? '100%' : '0%',
          background: 'linear-gradient(90deg, hsl(var(--primary)), transparent)',
        }}
      />
    </Card>
  );
}

export default function ServicesMatrix() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="building"
      className="relative w-full py-40 md:py-52 bg-background"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-20">
          <span
            className={`text-xs font-sans font-medium tracking-[0.3em] uppercase text-primary mb-6 block transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Services Matrix
          </span>
          <h2
            className={`font-heading text-4xl md:text-5xl lg:text-6xl font-light text-foreground max-w-2xl transition-all duration-1000 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Six execution nodes
          </h2>
        </div>

        {/* Services Grid */}
        <Spotlight
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 transition-all duration-1000 delay-400 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {SERVICES.map((service, index) => (
            <SpotLightItem key={service.title}>
              <ServiceCard service={service} index={index} />
            </SpotLightItem>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
