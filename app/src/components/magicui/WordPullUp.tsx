/* eslint-disable */
import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import React from "react";

interface WordPullUpProps {
  words: string;
  delayMultiple?: number;
  wrapperFramerProps?: Variants;
  framerProps?: Variants;
  className?: string;
  as?: React.ElementType;
}

export function WordPullUp({
  words,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // fast stagger for paragraphs
      },
    },
  },
  framerProps = {
    hidden: { y: 15, opacity: 0, filter: "blur(4px)" },
    show: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.4 } },
  },
  className,
  as: Component = "h2",
}: WordPullUpProps) {
  const MotionComponent = motion.create(Component as any);
  
  // Split by words and spaces so that spaces remain outside the inline-block,
  // allowing native word wrapping to function perfectly.
  const tokens = words.match(/\S+|\s+/g) || [];

  return (
    <MotionComponent
      variants={wrapperFramerProps}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("font-sans leading-relaxed tracking-tight", className)}
    >
      {tokens.map((token, i) => {
        if (token.trim() === "") {
          // Render space natively so wrapping works
          return <span key={i}>{token}</span>;
        }
        return (
          <motion.span
            key={i}
            variants={framerProps}
            style={{ display: "inline-block" }}
          >
            {token}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}
