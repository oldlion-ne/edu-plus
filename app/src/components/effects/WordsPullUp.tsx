import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  highlightLastWord?: boolean;
  once?: boolean;
  delayOffset?: number;
}

export default function WordsPullUp({
  text,
  className,
  showAsterisk = false,
  highlightLastWord = false,
  once = true,
  delayOffset = 0,
}: WordsPullUpProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, margin: "-50px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delayOffset,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.16, 1, 0.3, 1] as const,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] justify-center items-center", className)}
    >
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={cn("inline-block relative", isLastWord && highlightLastWord && "text-primary")}
          >
            {word}
            {isLastWord && showAsterisk && (
              <sup className="absolute -top-[0.2em] -right-[0.5em] text-[0.4em] select-none text-primary">
                *
              </sup>
            )}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
