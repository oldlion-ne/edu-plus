"use client"

import { useRef, type FC } from "react"
import { motion, MotionValue, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { useScrollContainer } from "@/lib/ScrollContext"

export interface CharacterRevealProps {
  children: string
  className?: string
  textClassName?: string
  id?: string
}

export const CharacterReveal: FC<CharacterRevealProps> = ({
  children,
  className,
  textClassName = "text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-foreground/15",
  id,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const scrollContext = useScrollContainer()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 50%"],
    container: scrollContext?.scrollContainerRef || undefined,
  })

  const words = children.split(" ")
  
  // Pre-calculate indices to be pure in render
  let totalChars = 0
  const wordsWithCharIndices = words.map((word) => {
    const chars = word.split("").map((char) => {
      const idx = totalChars
      totalChars++
      return { char, idx }
    })
    return { word, chars }
  })

  return (
    <div ref={sectionRef} id={id} className={cn("relative z-0 h-auto py-2", className)}>
      <p className={cn("flex flex-wrap", textClassName)}>
        {wordsWithCharIndices.map((wordData, wordIdx) => {
          return (
            <span key={wordIdx} className="inline-block mr-[0.25em] whitespace-nowrap">
              {wordData.chars.map((charData) => {
                const start = charData.idx / totalChars
                const end = start + 1 / totalChars
                return (
                  <Character key={charData.idx} progress={scrollYProgress} range={[start, end]}>
                    {charData.char}
                  </Character>
                )
              })}
            </span>
          )
        })}
      </p>
    </div>
  )
}

interface CharacterProps {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}

const Character: FC<CharacterProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <span className="relative">
      <span className="absolute text-foreground/15" aria-hidden="true">
        {children}
      </span>
      <motion.span style={{ opacity }} className="text-foreground">
        {children}
      </motion.span>
    </span>
  )
}
