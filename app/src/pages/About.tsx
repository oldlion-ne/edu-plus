import { useEffect, useState } from 'react';
import ImmersiveHero from '../components/effects/ImmersiveHero';

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mouseCoords, setMouseCoords] = useState<{ [key: number]: { x: number; y: number } }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseCoords(prev => ({
      ...prev,
      [idx]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-32 relative overflow-hidden">
      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7DF9FF]/5 rounded-none blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#7DF9FF]/3 rounded-none blur-[150px] pointer-events-none" />

      {/* Immersive Top Hero Viewport */}
      <ImmersiveHero
        bgImage="/images/AboutCollabVisual.png"
        category="Inside EduPlus Skills"
        titleNormal="Know Who"
        titleHighlighted="We Are"
        description="EduPlus Skills is an innovation-led skills and career platform that seamlessly combines education, training, and employment enablement. We operate both online and offline, ensuring access and outreach across regions—from local communities in Manipur to global education and career pathways."
        telemetryLeft="COLLAB_NEXUS // LOCAL_ROOTS"
        telemetryRight="GLOBAL_VALUE_NETWORKS // ONLINE"
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* Additional paragraph block under hero */}
        <div className={`mt-16 text-[#8B949E] text-base md:text-lg leading-relaxed font-sans transition-all duration-1000 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="max-w-4xl">
            We specialize in structured skill-building, career mapping, higher studies support, and curated placement opportunities, supported by a diverse network of experts from India, Asia, and beyond. Our programs are designed to be practical, experiential, and outcomes-focused, so that learning translates directly into confidence, clarity, and career progress.
          </p>
        </div>

        {/* What We Stand For: Premium Cyber-Brutalist Bento Grid */}
        <div className={`mt-24 transition-all duration-1000 delay-300 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-[#E6EDF3] mb-12 border-b border-[#7DF9FF]/10 pb-4">
            What We Stand For
          </h2>
          <p className="text-[#8B949E] text-base md:text-lg max-w-3xl mb-12 leading-relaxed">
            We believe that every learner deserves clarity of direction, access to opportunity, and the right skills at the right time. Our work centers on reducing confusion, demystifying career decisions, and making high-quality guidance accessible to students as early as school.
          </p>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Cell 01: Clarity of Direction (md:col-span-2) */}
            <div 
              onMouseEnter={() => setHoveredIdx(1)}
              onMouseLeave={() => setHoveredIdx(null)}
              onMouseMove={(e) => handleMouseMove(e, 1)}
              style={{
                '--mouse-x': `${mouseCoords[1]?.x || 0}px`,
                '--mouse-y': `${mouseCoords[1]?.y || 0}px`,
              } as React.CSSProperties}
              className="relative liquid-glass p-8 rounded-none transition-all duration-500 overflow-hidden flex flex-col justify-between h-[280px] border border-white/[0.08]"
            >
              {/* Border follow glow overlay */}
              {hoveredIdx === 1 && (
                <div 
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), rgba(125, 249, 255, 0.4), transparent 80%)`,
                    WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px'
                  }}
                />
              )}

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-none bg-[#7DF9FF]/10 flex items-center justify-center border border-[#7DF9FF]/20">
                    <span className="text-[#7DF9FF] font-heading font-medium text-lg">01</span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-xl text-[#E6EDF3] mt-0.5">Clarity of Direction</h3>
                  </div>
                </div>
                <p className="font-sans text-sm text-[#8B949E] leading-relaxed max-w-xl">
                  Reducing confusion, demystifying career decisions, and making high-quality guidance accessible to students as early as school. We break complex educational decisions down into personalized milestones.
                </p>
              </div>
            </div>

            {/* Cell 02: Access to Opportunity (md:col-span-1) */}
            <div 
              onMouseEnter={() => setHoveredIdx(2)}
              onMouseLeave={() => setHoveredIdx(null)}
              onMouseMove={(e) => handleMouseMove(e, 2)}
              style={{
                '--mouse-x': `${mouseCoords[2]?.x || 0}px`,
                '--mouse-y': `${mouseCoords[2]?.y || 0}px`,
              } as React.CSSProperties}
              className="relative liquid-glass p-8 rounded-none transition-all duration-500 overflow-hidden flex flex-col justify-between h-[280px] border border-white/[0.08]"
            >
              {/* Border follow glow overlay */}
              {hoveredIdx === 2 && (
                <div 
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), rgba(125, 249, 255, 0.4), transparent 80%)`,
                    WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px'
                  }}
                />
              )}

              <div>
                <div className="w-12 h-12 rounded-none bg-[#7DF9FF]/10 flex items-center justify-center mb-6 border border-[#7DF9FF]/20">
                  <span className="text-[#7DF9FF] font-heading font-medium text-lg">02</span>
                </div>
                <h3 className="font-sans font-semibold text-xl text-[#E6EDF3] mb-4">Access to Opportunity</h3>
                
                {/* Visual Progress Info */}
                <div className="space-y-3 font-sans text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#8B949E]">Psychometric Stream Selection</span>
                      <span className="text-[#7DF9FF] font-semibold">94% Success</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#8B949E]">Global Mentorship Access</span>
                      <span className="text-[#7DF9FF] font-semibold">89% Coverage</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cell 03: Right Skills at the Right Time (md:col-span-3) */}
            <div 
              onMouseEnter={() => setHoveredIdx(3)}
              onMouseLeave={() => setHoveredIdx(null)}
              onMouseMove={(e) => handleMouseMove(e, 3)}
              style={{
                '--mouse-x': `${mouseCoords[3]?.x || 0}px`,
                '--mouse-y': `${mouseCoords[3]?.y || 0}px`,
              } as React.CSSProperties}
              className="relative liquid-glass p-8 rounded-none transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[300px] border border-white/[0.08] md:col-span-3"
            >
              {/* Border follow glow overlay */}
              {hoveredIdx === 3 && (
                <div 
                  className="absolute inset-0 pointer-events-none z-20"
                  style={{
                    background: `radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), rgba(125, 249, 255, 0.4), transparent 80%)`,
                    WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    padding: '1px'
                  }}
                />
              )}

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-none bg-[#7DF9FF]/10 flex items-center justify-center border border-[#7DF9FF]/20">
                    <span className="text-[#7DF9FF] font-heading font-medium text-lg">03</span>
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-xl text-[#E6EDF3]">Right Skills at the Right Time</h3>
                    <p className="font-sans text-xs text-[#8B949E] mt-0.5">Empowering learners with critical soft skills, professional toolkits, and technical readiness designed for a fast-changing global economy.</p>
                  </div>
                </div>

                {/* Simplified focus areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/20 p-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[#7DF9FF] mb-2 font-sans">Critical Soft Skills & AI</h4>
                    <p className="text-xs text-[#8B949E] leading-relaxed">Integrated corporate preparedness programs mapped for global academic and corporate team collaboration routes across Singapore and Delhi hubs.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#7DF9FF] mb-2 font-sans">Green Hydrogen & Energy Sciences</h4>
                    <p className="text-xs text-[#8B949E] leading-relaxed">Pioneering clean energy training tracks built to channel local talent in Manipur toward emerging industrial hubs across Southeast Asia.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#7DF9FF] mb-2 font-sans">Maritime Logistics & Port Operations</h4>
                    <p className="text-xs text-[#8B949E] leading-relaxed">Curating deep supply-chain and global port management modules to link Asian logistics experts to global shipping pathways.</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#7DF9FF] mb-2 font-sans">International Law & Public Health</h4>
                    <p className="text-xs text-[#8B949E] leading-relaxed">Mentorship channels guided by specialized global advisory councils to prep academic research candidates for top global institutions.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Multi-Domain Pedigree */}
        <div className={`mt-24 p-8 md:p-12 liquid-glass border border-white/[0.08] transition-all duration-1000 delay-500 transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-3xl">
            <span className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-[#7DF9FF] block mb-3">
              Multi-Domain Expertise
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-[#E6EDF3] mb-6">
              Our Professional Pedigree
            </h2>
            <p className="font-sans text-base md:text-lg text-[#8B949E] leading-relaxed">
              Our team combines experience across education, corporate sectors, community development, research, healthcare, law, maritime, communication, and global academia. This multi-domain expertise allows us to build programs that are not only aspirational but deeply grounded in reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
