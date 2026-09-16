import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

interface Props {
  lines: { text: string; color?: string }[]
  /** ms per character */
  speed?: number
  /** ms pause between lines */
  linePause?: number
  startDelay?: number
  className?: string
}

/**
 * Types lines one after another with a blinking block cursor. Under reduced
 * motion everything renders immediately.
 */
export default function Typewriter({ lines, speed = 22, linePause = 380, startDelay = 900, className }: Props) {
  const reduce = useReducedMotion()
  const [li, setLi] = useState(reduce ? lines.length : 0)
  const [ci, setCi] = useState(0)

  useEffect(() => {
    if (reduce || li >= lines.length) return
    const line = lines[li].text
    let t: number
    if (ci < line.length) {
      t = window.setTimeout(() => setCi((c) => c + 1), li === 0 && ci === 0 ? startDelay : speed)
    } else {
      t = window.setTimeout(() => { setLi((l) => l + 1); setCi(0) }, linePause)
    }
    return () => window.clearTimeout(t)
  }, [reduce, li, ci, lines, speed, linePause, startDelay])

  const done = li >= lines.length
  return (
    <div className={className} aria-live="polite">
      {lines.map((l, i) => {
        if (i > li) return <div key={i} className="tw__line tw__line--pending">&nbsp;</div>
        const text = i < li ? l.text : l.text.slice(0, ci)
        return (
          <div key={i} className="tw__line" style={{ color: l.color }}>
            {text}
            {i === li && !done && <span className="tw__cursor" aria-hidden="true" />}
          </div>
        )
      })}
      {done && <span className="tw__cursor tw__cursor--idle" aria-hidden="true" />}
    </div>
  )
}
