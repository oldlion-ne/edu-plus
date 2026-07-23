import { motion } from 'framer-motion';

export default function Vision() {
  return (
    <section id="vision-mission" className="relative w-full bg-background border-b border-border/50 overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Subtle background texture/glow for premium feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-none pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover="hover"
            className="group relative bg-card border border-border/50 p-10 md:p-16 flex flex-col justify-between overflow-hidden"
          >
            {/* Hover Accent Line */}
            <motion.div 
              variants={{
                initial: { scaleX: 0 },
                hover: { scaleX: 1 }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-full h-[2px] bg-primary origin-left"
            />
            
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary block mb-6">
                01 / Our Mission
              </span>
              <p className="text-2xl md:text-3xl lg:text-[2.25rem] font-light tracking-tight leading-[1.4] text-foreground">
                To become a leading skills development platform that reimagines how people learn, grow, and work - creating measurable impact on the global workforce and the communities we serve.
              </p>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                We aim to make world-class skill development accessible, practical, and outcomes-driven for every learner, irrespective of geography or background.
              </p>
            </div>
            
            <div className="flex justify-end mt-auto">
               {/* Very minimal geometric decoration */}
               <div className="w-8 h-8 border-r border-b border-primary/30 group-hover:border-primary transition-colors duration-500" />
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            whileHover="hover"
            className="group relative bg-card border border-border/50 p-10 md:p-16 flex flex-col justify-between overflow-hidden"
          >
            {/* Hover Accent Line */}
            <motion.div 
              variants={{
                initial: { scaleX: 0 },
                hover: { scaleX: 1 }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-full h-[2px] bg-primary origin-left"
            />
            
            <div className="mb-16 md:mb-24">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary block mb-6">
                02 / Our Vision
              </span>
              <p className="text-2xl md:text-3xl lg:text-[2.25rem] font-light tracking-tight leading-[1.4] text-foreground">
                To empower individuals to acquire future-ready, in-demand skills; to close the gap between education and industry.
              </p>
              <p className="mt-8 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
                We cultivate a global community of lifelong learners who are confident, employable, and resilient in the face of change.
              </p>
            </div>

            <div className="flex justify-end mt-auto">
               {/* Very minimal geometric decoration */}
               <div className="w-8 h-8 border-r border-b border-primary/30 group-hover:border-primary transition-colors duration-500" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
