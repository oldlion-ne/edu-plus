import { useState } from 'react';

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
    <section className="relative w-full py-20 bg-[#0B0F14] border-t border-[#7DF9FF]/10 overflow-hidden" id="simulator">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-12">
          <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-[#7DF9FF] block mb-3">Interactive Workspace</span>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[#E6EDF3]">Node Path Simulator</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Domain selectors */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {DOMAINS.map((domain, idx) => (
              <button
                key={domain.name}
                onClick={() => setSelected(idx)}
                className={`w-full text-left p-6 border transition-all duration-300 rounded-none bg-[#0E131A] ${
                  selected === idx
                    ? 'border-[#7DF9FF] shadow-[0_0_15px_rgba(125,249,255,0.08)]'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-none ${selected === idx ? 'bg-[#7DF9FF]' : 'bg-white/20'}`} />
                  <span className={`font-mono text-[10px] tracking-wider uppercase ${selected === idx ? 'text-[#7DF9FF]' : 'text-[#8B949E]'}`}>
                    DOMAIN // 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-light text-[#E6EDF3]">{domain.name}</h3>
                <p className="font-sans text-xs text-[#8B949E] mt-2 leading-relaxed">{domain.description}</p>
              </button>
            ))}
          </div>

          {/* Path visualization */}
          <div className="lg:col-span-7 bg-[#0E131A] border border-[#7DF9FF]/10 p-8 rounded-none flex flex-col justify-between min-h-[350px] relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#7DF9FF]/20" />
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-[9px] text-[#8B949E] tracking-wider uppercase">NODE CHECK MATRIX // VISUALIZER</span>
              <span className="font-mono text-[8px] text-[#34c759] flex items-center gap-1 animate-pulse">
                <span className="w-1 h-1 bg-[#34c759] inline-block" /> ONLINE
              </span>
            </div>

            {/* Dynamic pathway svg */}
            <div className="relative w-full h-[180px] bg-[#0b0f14]/50 border border-white/5 flex items-center justify-center">
              <div className="absolute left-[10%] top-[50%] -translate-y-1/2 w-2 h-2 bg-[#7DF9FF] shadow-[0_0_8px_#7DF9FF]" />
              <div className={`absolute left-[50%] -translate-x-1/2 w-2 h-2 bg-[#7DF9FF] shadow-[0_0_8px_#7DF9FF] transition-all duration-500 ${
                selected === 0 || selected === 2 ? 'top-[25%]' : 'top-[75%]'
              }`} />
              <div className="absolute right-[10%] top-[50%] -translate-y-1/2 w-2 h-2 bg-[#7DF9FF] shadow-[0_0_8px_#7DF9FF]" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Dynamic path link */}
                {selected === 0 || selected === 2 ? (
                  <>
                    <path d="M 50,90 Q 200,45 350,90" fill="none" stroke="#7DF9FF" strokeWidth="1.5" className="path-draw" />
                    <path d="M 350,90 Q 500,45 650,90" fill="none" stroke="#7DF9FF" strokeWidth="1.5" className="path-draw" />
                  </>
                ) : (
                  <>
                    <path d="M 50,90 Q 200,135 350,90" fill="none" stroke="#7DF9FF" strokeWidth="1.5" className="path-draw" />
                    <path d="M 350,90 Q 500,135 650,90" fill="none" stroke="#7DF9FF" strokeWidth="1.5" className="path-draw" />
                  </>
                )}
              </svg>
            </div>

            <div className="mt-6 border-t border-white/5 pt-4 flex justify-between items-center">
              <span className="font-mono text-[9px] text-[#8B949E] uppercase">OPTIMIZED PATHWAY</span>
              <span className="font-mono text-xs text-[#7DF9FF] tracking-widest">// {DOMAINS[selected].path}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
