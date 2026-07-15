import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ImmersiveHeroProps {
  bgImage?: string;
  bgPosition?: string;
  category: string;
  titleNormal: string;
  titleHighlighted: string;
  description: string;
  children?: React.ReactNode;
}

export default function ImmersiveHero({
  bgImage,
  bgPosition,
  category,
  titleNormal,
  titleHighlighted,
  description,
  children
}: ImmersiveHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const ySmooth = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-background border-b border-border/50 select-none group flex flex-col justify-center pt-12 pb-16 md:pb-24"
      style={{ minHeight: '75vh' }}
    >
      {/* Parallax Background Layer (Subtle Gradient / Image) */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-transform group-hover:scale-[1.03]"
        style={{
           y: ySmooth,
           backgroundImage: bgImage ? `url(${bgImage})` : 'none',
           backgroundPosition: bgPosition || 'center',
           backgroundSize: 'cover',
           transitionDuration: '1600ms',
           transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Very subtle ambient glow */}
        <div className="absolute inset-0 bg-background/80" />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 md:px-12 flex flex-col justify-center items-center py-6 text-center">
        
        {/* Eyebrow */}
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-primary mb-5 block">
          {category}
        </span>

        {/* Headline */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] text-foreground mb-6">
          {titleNormal} <span className="text-primary">{titleHighlighted}</span>
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          {description}
        </p>

        {/* Children in-flow (e.g. CTA buttons) */}
        {children && (
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center w-full">
            {children}
          </div>
        )}
      </div>

    </div>
  );
}
