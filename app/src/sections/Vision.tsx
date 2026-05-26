import { useEffect, useRef, useState } from 'react';
import { TextReveal } from '@/components/ui/text-reveal';
import { CharacterReveal } from '@/components/ui/character-reveal';

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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="investing"
      className="relative w-full py-40 md:py-52 bg-background"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">

          {/* Left column: sticky dual-label */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-40 space-y-8">

              {/* Mission label */}
              <div
                className={`transition-all duration-1000 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-primary block mb-2">
                  Our Mission
                </span>
                <div className="h-px w-8 bg-primary/40" />
              </div>

              {/* Vision label - staggered in */}
              <div
                className={`transition-all duration-1000 delay-300 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="text-xs font-mono font-medium tracking-[0.3em] uppercase text-muted-foreground block mb-2">
                  Our Vision
                </span>
                <div className="h-px w-8 bg-border" />
              </div>

              {/* Decorative node tag */}
              <div
                className={`pt-4 transition-all duration-1000 delay-500 ${
                  visible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.3em] text-primary/50 border border-border px-2.5 py-1">
                  <span className="w-1 h-1 bg-primary/50 inline-block rounded-none" />
                  PURPOSE_NODE // ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Right column: Mission + Vision text reveals */}
          <div className="md:col-span-8 space-y-20">

            {/* Mission - TextReveal */}
            <TextReveal>
              To become a leading skills development platform that reimagines how people learn, grow, and work - creating measurable impact on the global workforce and the communities we serve. We aim to make world-class skill development accessible, practical, and outcomes-driven for every learner, irrespective of geography or background.
            </TextReveal>

            {/* Vision - Character scroll reveal */}
            <div className="border-l-2 border-primary/20 pl-8">
              <CharacterReveal>
                To empower individuals to acquire future-ready, in-demand skills; to close the gap between education and industry; and to cultivate a global community of lifelong learners who are confident, employable, and resilient in the face of change.
              </CharacterReveal>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
