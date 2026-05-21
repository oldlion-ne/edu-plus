import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ScrollTextMarqueeProps {
  text: string;
  baseSpeed?: number;
  className?: string;
}

export default function ScrollTextMarquee({ text, baseSpeed = -150, className }: ScrollTextMarqueeProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, baseSpeed]);

  return (
    <div 
      ref={targetRef} 
      className="w-full overflow-hidden whitespace-nowrap flex select-none pointer-events-none opacity-[0.03]"
      data-testid="scroll-marquee-container"
    >
      <motion.div 
        style={{ x }} 
        className={cn("flex whitespace-nowrap gap-16 font-heading text-8xl md:text-9xl uppercase font-extrabold tracking-widest", className)}
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
}
