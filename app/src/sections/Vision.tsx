import { useEffect, useRef, useState } from 'react';

export default function Vision() {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="investing"
      className="relative w-full py-40 md:py-52 bg-[#0B0F14]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left Column - Sticky Label */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-40">
              <span
                className={`text-xs font-sans font-medium tracking-[0.3em] uppercase text-[#7DF9FF] transition-all duration-1000 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                The Mission
              </span>
            </div>
          </div>

          {/* Right Column - Flowing Text */}
          <div className="md:col-span-8">
            <h2
              className={`font-heading text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] text-[#E6EDF3] mb-10 transition-all duration-1000 delay-200 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              To construct the definitive global engine for skill engineering, replacing legacy learning paths with low-latency, real-world execution frameworks.
            </h2>

            {/* Glowing Divider */}
            <div
              className={`h-[1px] w-full mb-10 transition-all duration-1000 delay-500 ${
                visible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
              style={{
                background: 'linear-gradient(90deg, #0B0F14 0%, #7DF9FF 20%, #E6EDF3 50%, #7DF9FF 80%, #0B0F14 100%)',
                transformOrigin: 'left',
              }}
            />

            <h2
              className={`font-heading text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] text-[#8B949E] transition-all duration-1000 delay-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              To create a fluid, continuous global talent network where human capability dynamically scales alongside emerging technological horizons.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
