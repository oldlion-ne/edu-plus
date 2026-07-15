import { motion, useInView, useReducedMotion } from "motion/react";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export function ScrollReveal({ 
  children, 
  className, 
  delay = 0, 
  direction = "up",
  once = true 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up": return { y: 30 };
      case "down": return { y: -30 };
      case "left": return { x: 30 };
      case "right": return { x: -30 };
      default: return { y: 30 };
    }
  };

  const initial = shouldReduceMotion 
    ? { opacity: 0 } 
    : { opacity: 0, ...getInitialPosition() };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={
        shouldReduceMotion
          ? { duration: 0.2, delay }
          : { type: "spring", duration: 0.6, bounce: 0, delay }
      }
      className={cn("rounded-none", className)}
    >
      {children}
    </motion.div>
  );
}
