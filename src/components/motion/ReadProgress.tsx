import { motion, useScroll, useSpring, useReducedMotion } from "motion/react"

/** Two-pixel brand hairline at the very top that tracks page scroll. */
export default function ReadProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  if (reduce) return null
  return <motion.div className="read-progress" style={{ scaleX }} aria-hidden="true" />
}
