import { motion, type Variants } from 'framer-motion';
import { NumberTicker } from '../components/magicui/NumberTicker';

// Each stat: numeric value for animation + display prefix/suffix for formatting
const STATS = [
  { value: 4200, prefix: '',    suffix: '+', label: 'Active Learners' },
  { value: 38,   prefix: '',    suffix: '',  label: 'Countries Reached' },
  { value: 98,   prefix: '',    suffix: '%', label: 'Placement Rate' },
  { value: 1.2,  prefix: '',    suffix: 'M+', label: 'Learning Hours', decimalPlaces: 1 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 } }
};

export default function TelemetryStats() {
  return (
    <section
      id="telemetry"
      className="relative w-full py-24 md:py-32 bg-background border-t border-border/50 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {STATS.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              variants={itemVariants}
              className="relative flex flex-col group"
            >
              {/* Animating Geometric Top Line */}
              <div className="relative w-full h-[1px] bg-border/50 mb-8">
                <motion.div 
                  variants={lineVariants}
                  className="absolute top-0 left-0 w-12 h-[2px] bg-primary origin-left"
                />
              </div>

              {/* Animated metric number */}
              <span className="text-5xl md:text-6xl font-light text-foreground leading-none tracking-tighter mb-4 transition-colors duration-500 group-hover:text-primary">
                <NumberTicker
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimalPlaces={stat.decimalPlaces ?? 0}
                  delay={0.2 + index * 0.15}
                  className="tabular-nums"
                />
              </span>

              {/* Label */}
              <span className="text-[10px] md:text-[11px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
