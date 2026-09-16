import { useRef, type ReactNode, type ElementType } from "react"
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react"

type Props = {
  text: string
  /** Rendered before the words (e.g. a bold brand name). */
  lead?: ReactNode
  as?: ElementType
  className?: string
  /** Scroll offsets passed to useScroll — defaults suit a mid-page paragraph. */
  offset?: [string, string]
}

function Word({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.22, 1])
  const y = useTransform(progress, [start, end], [6, 0])
  return (
    <span className="sw__word">
      <motion.span style={{ opacity, y, display: "inline-block" }}>{word}</motion.span>
    </span>
  )
}

/**
 * Paragraph whose words brighten one after another as it scrolls through the
 * viewport (Apple / Linear "reading light"). Reduced motion renders plain text.
 */
export default function ScrollWords({ text, lead, as: Tag = "p", className, offset = ["start 85%", "end 55%"] }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as never })
  const words = text.trim().split(/\s+/)
  const M = motion.create(Tag as never) as typeof motion.p

  if (reduce) {
    return (
      <Tag className={className}>
        {lead}
        {text}
      </Tag>
    )
  }

  return (
    <M ref={ref as never} className={`sw ${className ?? ""}`}>
      {lead}
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          word={w}
          progress={scrollYProgress}
          start={i / words.length}
          end={Math.min(1, (i + 1) / words.length + 0.08)}
        />
      ))}
    </M>
  )
}
