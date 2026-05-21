import { useEffect, useState } from 'react';

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
    <section className="relative w-full py-16 bg-[#0B0F14] border-t border-[#7DF9FF]/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`relative bg-[#0E131A] border border-[#7DF9FF]/10 p-8 rounded-none transition-all duration-500 hover:border-[#7DF9FF]/40 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Neon Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#7DF9FF]/20 hover:bg-[#7DF9FF]" />
              <div className="font-mono text-3xl md:text-4xl font-light text-[#7DF9FF] mb-2">{stat.value}</div>
              <div className="font-mono text-[10px] text-[#8B949E] tracking-widest uppercase mb-3">{stat.label}</div>
              <p className="font-sans text-xs text-[#8B949E]/80 leading-relaxed">{stat.desc}</p>
              {/* Tech corner accent */}
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-[#7DF9FF]/30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
