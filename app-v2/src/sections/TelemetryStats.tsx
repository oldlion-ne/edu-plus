import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatNode {
  value: string;
  label: string;
  desc: string;
}

const STATS: StatNode[] = [
  { value: '256+', label: 'SYSTEM_NODES', desc: 'Active real-world training paths deployed globally.' },
  { value: '08', label: 'EXPERT_NODES', desc: 'Frontier research advisors active in registry.' },
  { value: '99.9%', label: 'LINK_LATENCY', desc: 'Uptime maintained across mentorship connections.' },
  { value: '14.8K', label: 'PATH_COMMITS', desc: 'Milestones verified in talent development paths.' },
];

export default function TelemetryStats() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative w-full py-16 bg-background border-t border-border overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <Card
              key={stat.label}
              className={`relative border-border transition-all duration-500 hover:border-primary/40 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <CardContent className="p-8 relative">
                {/* Neon Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/20 hover:bg-primary transition-colors" />
                <div className="font-mono text-3xl md:text-4xl font-light text-primary mb-2">{stat.value}</div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-3">{stat.label}</div>
                <p className="font-sans text-xs text-muted-foreground/80 leading-relaxed">{stat.desc}</p>
                {/* Tech corner accent */}
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-primary/30" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
