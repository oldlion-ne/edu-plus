import { motion } from 'framer-motion';
import { MagnifiedBento } from '@/components/ui/MagnifiedBento';
import { Globe, Target, Users, TrendingUp } from 'lucide-react';

export default function Vision() {
  return (
    <section id="vision-mission" className="relative w-full border-b border-border/50 overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Subtle background texture/glow for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-none pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header Section */}
        <h2 className="text-muted-foreground max-w-4xl text-balance text-4xl font-light tracking-tight lg:text-[3.5rem] leading-[1.1] mb-12 md:mb-16">
          <span className="text-foreground">Shaping the future of education.</span> <br />
          Accessible skills for the global workforce.
        </h2>

        {/* Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Mission Card (1/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-card border border-border/50 p-8 md:p-12 flex flex-col overflow-hidden rounded-none"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary block mb-6">
              01 / Our Mission
            </span>
            <p className="text-xl md:text-2xl font-light tracking-tight leading-[1.4] text-foreground mb-6">
              We exist to build the premier skills development ecosystem, reimagining how humanity learns and grows.
            </p>
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              By making world-class education practical and accessible, we drive measurable global impact.
            </p>
          </motion.div>

          {/* Vision Card (2/3 width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="group relative bg-card border border-border/50 rounded-none lg:col-span-2 flex flex-col justify-between overflow-hidden"
          >
            <div className="p-8 md:p-12 z-10 relative">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary block mb-6">
                02 / Our Vision
              </span>
              <p className="text-xl md:text-2xl font-light tracking-tight leading-[1.4] text-foreground mb-4 max-w-2xl">
                We envision a world where every individual is empowered with future-ready, in-demand capabilities.
              </p>
              <p className="text-base text-muted-foreground font-light leading-relaxed max-w-2xl">
                By bridging the gap between industry and education, we forge a resilient, confident workforce.
              </p>
            </div>

            {/* Embedded Bento Centerpiece */}
            <div className="relative mt-auto w-full pt-4 flex justify-center pb-6 md:pb-10">
              <MagnifiedBento />
            </div>
          </motion.div>

        </div>

        {/* Core Values Footer Grid */}
        <div className="mt-16 md:mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-border/50 pt-16">
          <p className="text-muted-foreground text-balance font-light text-sm">
            <span className="text-foreground font-medium block mb-2">
              <Globe className="inline size-4 -translate-y-0.5 mr-2 text-primary" /> Accessibility
            </span>
            World-class learning for everyone, irrespective of geography.
          </p>

          <p className="text-muted-foreground text-balance font-light text-sm">
            <span className="text-foreground font-medium block mb-2">
              <Target className="inline size-4 -translate-y-0.5 mr-2 text-primary" /> Practicality
            </span>
            Outcomes-driven curriculum aligned with industry demands.
          </p>

          <p className="text-muted-foreground text-balance font-light text-sm">
            <span className="text-foreground font-medium block mb-2">
              <Users className="inline size-4 -translate-y-0.5 mr-2 text-primary" /> Community
            </span>
            A global network of lifelong learners and mentors.
          </p>

          <p className="text-muted-foreground text-balance font-light text-sm">
            <span className="text-foreground font-medium block mb-2">
              <TrendingUp className="inline size-4 -translate-y-0.5 mr-2 text-primary" /> Resilience
            </span>
            Future-proof skills that empower confidence in a changing world.
          </p>
        </div>

      </div>
    </section>
  );
}
