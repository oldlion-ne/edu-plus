"use client"

import { useRef, useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface MagnetProps {
  children: React.ReactNode
  range?: number
  strength?: number
  className?: string
}

export default function Magnet({
  children,
  range = 60,
  strength = 0.35,
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const { clientX, clientY } = e
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = clientX - centerX
      const distY = clientY - centerY
      const distance = Math.sqrt(distX * distX + distY * distY)

      if (distance < range) {
        x.set(distX * strength)
        y.set(distY * strength)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [range, strength, x, y])

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }} /* ui-ignore */
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}
