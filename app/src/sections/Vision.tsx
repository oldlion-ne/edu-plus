import { MagicCard } from '../components/magicui/MagicCard';
import { WordPullUp } from '../components/magicui/WordPullUp';
import { BlurFade } from '../components/magicui/BlurFade';

export default function Vision() {
  return (
    <section id="investing" className="relative w-full py-24 md:py-32 lg:py-40 bg-background border-b border-border/50 overflow-hidden">
      {/* Subtle background texture/glow for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-none pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Mission Card */}
          <BlurFade delay={0.1} inView className="h-full">
            <MagicCard 
              className="p-10 md:p-14 h-full rounded-none border border-border/50 bg-card/40 flex flex-col justify-between"
              gradientColor="oklch(var(--primary) / 0.08)"
            >
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-primary/50"></div>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary block">
                    Our Mission
                  </span>
                </div>
                
                <WordPullUp
                  as="h2"
                  className="text-2xl md:text-3xl lg:text-[2.2rem] font-light tracking-tight leading-[1.3] text-foreground font-sans text-left max-w-2xl"
                  words="To become a leading skills development platform that reimagines how people learn, grow, and work - creating measurable impact on the global workforce and the communities we serve."
                />
              </div>

              <div className="mt-16 md:mt-24 border-t border-border/30 pt-8">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md font-sans">
                  We aim to make world-class skill development accessible, practical, and outcomes-driven for every learner, irrespective of geography or background.
                </p>
              </div>
            </MagicCard>
          </BlurFade>

          {/* Vision Card */}
          <BlurFade delay={0.3} inView className="h-full">
            <MagicCard 
              className="p-10 md:p-14 h-full rounded-none border border-border/50 bg-card/40 flex flex-col justify-between"
              gradientColor="oklch(var(--primary) / 0.08)"
            >
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-primary/50"></div>
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary block">
                    Our Vision
                  </span>
                </div>
                
                <WordPullUp
                  as="h2"
                  className="text-2xl md:text-3xl lg:text-[2.2rem] font-light tracking-tight leading-[1.3] text-foreground font-sans text-left max-w-2xl"
                  words="To empower individuals to acquire future-ready, in-demand skills; to close the gap between education and industry; and to cultivate a global community of lifelong learners who are confident, employable, and resilient in the face of change."
                />
              </div>
            </MagicCard>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
