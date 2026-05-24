"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className, ...props }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  
  // Track scroll position of this container relative to the viewport.
  // Animation starts when the container top enters 85% viewport height
  // and completes when its bottom reaches 45% viewport height.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 45%"],
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-auto py-2", className)} {...props}>
      <span
        className={
          "flex flex-wrap text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15] text-foreground/15"
        }
      >
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </span>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="xl:mx-3 relative mx-1 lg:mx-1.5">
      <span className="absolute text-foreground/15" aria-hidden="true">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-foreground"}
      >
        {children}
      </motion.span>
    </span>
  )
}
