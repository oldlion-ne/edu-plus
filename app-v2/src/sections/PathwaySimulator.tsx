import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface Pathway {
  name: string;
  description: string;
  path: string;
}

const DOMAINS: Pathway[] = [
  { name: 'AI Models', description: 'Deep learning pipeline & fine-tuning architectures.', path: 'INTEGRATION_ARCHITECT' },
  { name: 'Hydrogen Energy', description: 'Clean fuel cells and hydrogen storage operations.', path: 'FRONTIER_SCIENTIST' },
  { name: 'Linguistics', description: 'Advanced structural syntactic matrices and translator pipelines.', path: 'LINGUISTIC_ANALYST' },
  { name: 'Career Strategy', description: 'Global corporate mobility frameworks.', path: 'OPERATIONS_DIRECTOR' }
];

export default function PathwaySimulator() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="relative w-full py-20 bg-background border-t border-border overflow-hidden" id="simulator">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary block mb-3">Interactive Workspace</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground">Node Path Simulator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Domain selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {DOMAINS.map((domain, idx) => (
              <button
                key={domain.name}
                onClick={() => setSelected(idx)}
                className={`w-full text-left p-6 border transition-all duration-300 rounded-none bg-card ${
                  selected === idx
                    ? 'border-primary shadow-[0_0_15px_hsl(var(--primary)/0.08)]'
                    : 'border-border hover:border-foreground/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-none ${selected === idx ? 'bg-primary' : 'bg-foreground/20'}`} />
                  <span className={`font-mono text-[10px] tracking-wider uppercase ${selected === idx ? 'text-primary' : 'text-muted-foreground'}`}>
                    DOMAIN // 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-light text-foreground">{domain.name}</h3>
                <p className="font-sans text-xs text-muted-foreground mt-2 leading-relaxed">{domain.description}</p>
              </button>
            ))}
          </div>

          {/* Path visualization */}
          <Card className="lg:col-span-7 border-border p-8 rounded-none flex flex-col justify-between min-h-[350px] relative bg-card">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary/20" />
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase">NODE CHECK MATRIX // VISUALIZER</span>
              <span className="font-mono text-[8px] text-emerald-500 flex items-center gap-1 animate-pulse">
                <span className="w-1 h-1 bg-emerald-500 inline-block" /> ONLINE
              </span>
            </div>

            {/* Dynamic pathway svg */}
            <div className="relative w-full h-[180px] bg-background/50 border border-border flex items-center justify-center">
              <div className="absolute left-[10%] top-[50%] -translate-y-1/2 w-2 h-2 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
              <div className={`absolute left-[50%] -translate-x-1/2 w-2 h-2 bg-primary shadow-[0_0_8px_hsl(var(--primary))] transition-all duration-500 ${
                selected === 0 || selected === 2 ? 'top-[25%]' : 'top-[75%]'
              }`} />
              <div className="absolute right-[10%] top-[50%] -translate-y-1/2 w-2 h-2 bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Dynamic path link */}
                {selected === 0 || selected === 2 ? (
                  <>
                    <path d="M 50,90 Q 200,45 350,90" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary path-draw" />
                    <path d="M 350,90 Q 500,45 650,90" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary path-draw" />
                  </>
                ) : (
                  <>
                    <path d="M 50,90 Q 200,135 350,90" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary path-draw" />
                    <path d="M 350,90 Q 500,135 650,90" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary path-draw" />
                  </>
                )}
              </svg>
            </div>

            <div className="mt-6 border-t border-border pt-4 flex justify-between items-center">
              <span className="font-mono text-[9px] text-muted-foreground uppercase">OPTIMIZED PATHWAY</span>
              <span className="font-mono text-xs text-primary tracking-widest">// {DOMAINS[selected].path}</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
