import { useRef, type ReactNode } from "react"
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react"

interface Props {
  children: ReactNode
  /** Horizontal position of the spine (CSS length). */
  left?: string
  accent?: string
  className?: string
}

/**
 * Vertical timeline spine that draws itself with scroll progress. Wrap a
 * relatively positioned list; the fill line grows from the top as the reader
 * moves through the entries.
 */
export default function ScrollSpine({ children, left = "50%", accent = "var(--brand)", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6 })
  return (
    <div ref={ref} className={`spine ${className}`} style={{ ["--spine-x" as string]: left, ["--spine-accent" as string]: accent }}>
      <span className="spine__base" aria-hidden="true" />
      <motion.span className="spine__fill" style={{ scaleY: reduce ? 1 : progress }} aria-hidden="true" />
      {children}
    </div>
  )
}
