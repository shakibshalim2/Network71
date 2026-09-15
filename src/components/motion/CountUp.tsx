import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

interface Props {
  /** Display string; only a leading/trailing numeric run is animated (e.g. "2018", "10", "60%"). */
  value: string
  className?: string
  duration?: number
}

const NUMERIC = /^(\D*?)(\d[\d,]*)(\D*)$/

/**
 * Counts a numeric value up from zero the first time it scrolls into view.
 * Non-numeric strings ("One", "Dhaka") render unchanged, so it is safe to wrap
 * every stat cell on the site.
 */
export default function CountUp({ value, className, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const match = NUMERIC.exec(value.trim())
  const target = match ? Number(match[2].replace(/,/g, "")) : NaN
  const animatable = !reduce && Number.isFinite(target) && target > 0 && target < 1e7
  // Years roll from a nearby value instead of zero so the digits read as a date throughout.
  const from = target >= 1900 && target <= 2100 ? target - 24 : 0
  const [shown, setShown] = useState(animatable ? from : target)

  useEffect(() => {
    if (!animatable || !inView) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 4)
      setShown(Math.round(from + (target - from) * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animatable, inView, target, from, duration])

  if (!match || !animatable) {
    return <span ref={ref} className={className}>{value}</span>
  }
  const grouped = match[2].includes(",") ? shown.toLocaleString("en-US") : String(shown)
  const text = `${match[1]}${grouped}${match[3]}`
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {text}
    </span>
  )
}
