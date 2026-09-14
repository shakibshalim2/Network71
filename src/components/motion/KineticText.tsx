import { motion, useReducedMotion } from "motion/react"
import type { CSSProperties } from "react"

interface Props {
  text: string
  /** Delay before the first word starts, seconds. */
  delay?: number
  className?: string
  style?: CSSProperties
  as?: "span" | "em"
}

/** Splits a line into words that rise out of a clipped line — the classic editorial reveal. */
export default function KineticText({
  text,
  delay = 0,
  className = "",
  style,
  as = "span",
}: Props) {
  const reduce = useReducedMotion()
  const words = text.split(/\s+/).filter(Boolean)
  const Tag = as
  return (
    <span className={`hero-kinetic__line ${className}`} style={style}>
      <Tag>
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              paddingBottom: "0.1em",
              marginBottom: "-0.1em",
            }}
          >
            <motion.span
              className="hero-kinetic__word"
              initial={reduce ? false : { y: "110%", rotate: 4, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </Tag>
    </span>
  )
}
