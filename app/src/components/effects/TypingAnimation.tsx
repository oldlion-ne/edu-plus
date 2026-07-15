"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useInView } from "motion/react"
import { cn } from "@/lib/utils"

interface TypingAnimationProps {
  words: string[]
  className?: string
  typeSpeed?: number
  deleteSpeed?: number
  delay?: number
  pauseDelay?: number
  loop?: boolean
  startOnView?: boolean
  showCursor?: boolean
  blinkCursor?: boolean
  cursorStyle?: "line" | "block" | "underscore"
}

export function TypingAnimation({
  words,
  className,
  typeSpeed = 90,
  deleteSpeed = 50,
  delay = 0,
  pauseDelay = 1800,
  loop = true,
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = "line",
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing")

  const elementRef = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(elementRef, { amount: 0.3, once: true })

  const animationSourceKey = useMemo(() => words.join("\u0000"), [words])

  useEffect(() => {
    setDisplayedText("")
    setCurrentWordIndex(0)
    setCurrentCharIndex(0)
    setPhase("typing")
  }, [animationSourceKey])

  const shouldStart = startOnView ? isInView : true

  useEffect(() => {
    if (!shouldStart || words.length === 0) return

    // Stop completely if not looping and we've finished the last word
    if (!loop && currentWordIndex === words.length - 1 && phase === "pause") {
      return
    }

    let timeout: ReturnType<typeof setTimeout> | null = null

    const isInitialStart = delay > 0 && currentWordIndex === 0 && currentCharIndex === 0 && phase === "typing"

    const timeoutDelay = isInitialStart
      ? delay
      : phase === "typing"
        ? typeSpeed
        : phase === "deleting"
          ? deleteSpeed
          : pauseDelay

    timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex] || ""
      const graphemes = Array.from(currentWord)

      switch (phase) {
        case "typing":
          if (currentCharIndex < graphemes.length) {
            setDisplayedText(graphemes.slice(0, currentCharIndex + 1).join(""))
            setCurrentCharIndex(currentCharIndex + 1)
          } else {
            setPhase("pause")
          }
          break

        case "pause":
          if (loop || currentWordIndex < words.length - 1) {
            setPhase("deleting")
          }
          break

        case "deleting":
          if (currentCharIndex > 0) {
            setDisplayedText(graphemes.slice(0, currentCharIndex - 1).join(""))
            setCurrentCharIndex(currentCharIndex - 1)
          } else {
            const nextIndex = (currentWordIndex + 1) % words.length
            setCurrentWordIndex(nextIndex)
            setPhase("typing")
          }
          break
      }
    }, timeoutDelay)

    return () => {
      if (timeout !== null) clearTimeout(timeout)
    }
  }, [
    shouldStart,
    phase,
    currentCharIndex,
    currentWordIndex,
    displayedText,
    words,
    loop,
    typeSpeed,
    deleteSpeed,
    pauseDelay,
    delay,
  ])

  const getCursorChar = () => {
    switch (cursorStyle) {
      case "block": return "▌"
      case "underscore": return "_"
      case "line":
      default: return "|"
    }
  }

  return (
    <span
      ref={elementRef}
      className={cn(className)}
    >
      {displayedText}
      {showCursor && (
        <span
          aria-hidden="true"
          className={cn(
            "ml-px inline-block align-baseline opacity-80",
            blinkCursor && "animate-blink-cursor"
          )}
        >
          {getCursorChar()}
        </span>
      )}
    </span>
  )
}
