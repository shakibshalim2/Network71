import { useRef, type PointerEvent, type ReactNode, type CSSProperties } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"

type Props = {
  children: ReactNode
  /** Max rotation in degrees. */
  max?: number
  /** Perspective distance in px. */
  perspective?: number
  className?: string
  style?: CSSProperties
}

/**
 * Pointer-driven 3D tilt with a spring return. Children receive `--tx/--ty`
 * (0–1 pointer position) for layered parallax. Inert under reduced motion/touch.
 */
export default function Tilt({ children, max = 7, perspective = 1100, className, style }: Props) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.6 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.6 })

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch") return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 2 * max)
    rx.set((0.5 - py) * 2 * max)
    el.style.setProperty("--tx", px.toFixed(3))
    el.style.setProperty("--ty", py.toFixed(3))
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
    ref.current?.style.setProperty("--tx", "0.5")
    ref.current?.style.setProperty("--ty", "0.5")
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX: rx, rotateY: ry, transformPerspective: perspective, transformStyle: "preserve-3d" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}
