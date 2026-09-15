import CountUp from "@/components/motion/CountUp"

interface Props {
  label: string
  value: number
  unit?: string
  accent: string
  index?: number
  /** Optional trailing caption after the value (e.g. "target"). */
  caption?: string
  /** Override the displayed value (e.g. "<2%") while `value` still drives the fill. */
  display?: string
}

/**
 * Meter row for division pages. The fill draws when the parent section reveals
 * (CSS `.reveal-target.is-revealed`), the value ticks up, and a travelling
 * sheen crosses the bar afterwards. No JS observer needed.
 */
export default function MeterBar({ label, value, unit = "%", accent, index = 0, caption, display }: Props) {
  return (
    <div className="smeter" style={{ ["--pa" as string]: accent, ["--i" as string]: index, ["--v" as string]: `${value}%` }}>
      <div className="smeter__head">
        <span className="smeter__label">{label}</span>
        <span className="smeter__val font-display">
          <CountUp value={display ?? `${value}${unit}`} />
          {caption && <span className="smeter__cap font-mono">{caption}</span>}
        </span>
      </div>
      <div className="smeter__track">
        <span className="smeter__fill" />
        <span className="smeter__tick" aria-hidden="true" />
      </div>
    </div>
  )
}
