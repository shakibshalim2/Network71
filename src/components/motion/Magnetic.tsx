import { useRef, type PointerEvent, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"

type Props = {
  children: ReactNode
  /** How far (px) the element may drift toward the pointer. */
  strength?: number
  className?: string
}

/**
 * Pulls its child toward the pointer while hovered and springs back on leave.
 * Inert under reduced motion or on touch-only devices (no hover).
 */
export default function Magnetic({ children, strength = 14, className }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.5 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
    rawX.set(dx * strength)
    rawY.set(dy * strength)
  }
  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}
