"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { useScrollContainer } from "@/lib/ScrollContext"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  eyebrow?: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, eyebrow, className }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const scrollContext = useScrollContainer()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContext?.scrollContainerRef,
    offset: ["start start", "end end"],
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex flex-col h-[100vh] max-w-5xl items-start justify-center bg-transparent px-6 md:px-12 lg:px-24 py-20"
        }
      >
        {eyebrow && (
          <span className="text-[10px] font-sans font-medium tracking-[0.3em] uppercase text-primary mb-8 md:mb-12 block">
            {eyebrow}
          </span>
        )}
        <p
          className={
            "flex flex-wrap text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-light tracking-tight leading-[1.4]"
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
        </p>
      </div>
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
    <span className="relative mx-1 lg:mx-1.5 xl:mx-2 mb-2 lg:mb-4">
      <span className="absolute text-foreground/15">{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-foreground"}
      >
        {children}
      </motion.span>
    </span>
  )
}
