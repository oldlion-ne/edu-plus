import { useEffect, useRef, useState, Suspense } from 'react';
import HolographicTextRing from '../components/effects/HolographicTextRing';

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
      className="relative w-full min-h-screen bg-[#0B0F14] overflow-hidden"
    >
      {/* Section Header */}
      <div className="relative z-10 pt-32 md:pt-40 pb-8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <span
            className={`text-xs font-sans font-medium tracking-[0.3em] uppercase text-[#7DF9FF] mb-6 block transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Expert Registry
          </span>
          <h2
            className={`font-heading text-4xl md:text-5xl lg:text-6xl font-light text-[#E6EDF3] max-w-3xl transition-all duration-1000 delay-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Technical Pedigree
          </h2>
          <p
            className={`font-sans text-sm text-[#8B949E] max-w-lg mt-6 leading-relaxed transition-all duration-1000 delay-400 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Our advisory network spans scientists, strategists, linguists, and operational
            leads across critical domains of human capability development.
          </p>
        </div>
      </div>

      {/* 3D Holographic Ring */}
      <div
        className={`relative w-full h-[70vh] md:h-[80vh] transition-all duration-1500 delay-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-[#8B949E] font-sans text-sm tracking-wider animate-pulse">
                INITIALIZING HOLOGRAPHIC DISPLAY...
              </div>
            </div>
          }
        >
          <HolographicTextRing />
        </Suspense>

        {/* Vignette Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(11,15,20,0.6) 70%, rgba(11,15,20,0.95) 100%)',
          }}
        />
      </div>

      {/* Bottom Divider */}
      <div
        className={`h-[1px] max-w-[1440px] mx-auto px-6 md:px-12 transition-all duration-1000 delay-700 ${
          visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}
        style={{
          background: 'linear-gradient(90deg, #0B0F14 0%, rgba(125,249,255,0.3) 50%, #0B0F14 100%)',
          transformOrigin: 'center',
        }}
      />
    </section>
  );
}
