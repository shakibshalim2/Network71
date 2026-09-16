import { useRef, type ReactNode, type CSSProperties } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"

/**
 * Shared motion for division heroes: copy parallax-fades as the fold scrolls
 * out and an outlined division numeral drifts behind it. Pages keep their own
 * backdrop/markup; this only wraps the copy column.
 */
export function useHeroScroll(ref: React.RefObject<HTMLElement | null>) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])
  const sideOpacity = useTransform(scrollYProgress, [0, 0.4], [1, reduce ? 1 : 0])
  return { y, opacity, sideOpacity }
}

export function HeroCopy({ children, className, y, opacity }: { children: ReactNode; className?: string; y: ReturnType<typeof useHeroScroll>["y"]; opacity: ReturnType<typeof useHeroScroll>["opacity"] }) {
  return <motion.div className={className} style={{ y, opacity }}>{children}</motion.div>
}

export function HeroMark({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span className="shero__mark font-display" aria-hidden="true" style={style}>{children}</span>
}

/** Hook + refs in one place for the common case. */
export function useSectorHero() {
  const ref = useRef<HTMLElement>(null)
  const motionValues = useHeroScroll(ref)
  return { ref, ...motionValues }
}
