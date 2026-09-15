import { useRef, type ReactNode } from "react"
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react"

interface Props {
  children: ReactNode
  /** Number of steps, used to place the travelling node on each step's origin. */
  steps: number
  accent?: string
  className?: string
}

/**
 * Process line that draws with scroll. Horizontal across the top of the step
 * row on wide screens, vertical spine down the left on phones. A single node
 * travels along the line, and each step lights up as the node passes it.
 */
export default function ProcessLine({ children, steps, accent = "var(--brand)", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.7 })
  const pct = useTransform(progress, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`)
  const lit = useTransform(progress, (v) => Math.round(Math.min(1, Math.max(0, v)) * (steps - 1)))
  return (
    <motion.div
      ref={ref}
      className={`pline ${className}`}
      style={{
        ["--pline-accent" as string]: accent,
        ["--pline-steps" as string]: steps,
        ["--pline-p" as string]: reduce ? "100%" : pct,
        ["--pline-lit" as string]: reduce ? steps - 1 : lit,
      }}
    >
      <span className="pline__base" aria-hidden="true" />
      <span className="pline__fill" aria-hidden="true" />
      <span className="pline__node" aria-hidden="true" />
      {children}
    </motion.div>
  )
}
