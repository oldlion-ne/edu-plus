import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function FadeIn({ children, delay = 0, className, direction = "up" }: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up": return { y: 20 };
      case "down": return { y: -20 };
      case "left": return { x: 20 };
      case "right": return { x: -20 };
      default: return { y: 20 };
    }
  };

  const initial = shouldReduceMotion 
    ? { opacity: 0 } 
    : { opacity: 0, ...getInitialPosition() };

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.2, delay }
          : { type: "spring", duration: 0.5, bounce: 0, delay }
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
