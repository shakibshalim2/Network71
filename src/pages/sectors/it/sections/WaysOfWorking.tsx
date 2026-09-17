import type { ITContent } from "../content/en"
import { ACCENT } from "../theme"

/** Six delivery practices as a hairline grid; each cell lights on hover and the index draws in on reveal. */
export default function WaysOfWorking({ c }: { c: ITContent }) {
  const w = c.waysOfWorking
  return (
    <section id="ways-of-working" className="py-24 swow" style={{ background: "var(--s0)", ["--pa" as string]: ACCENT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: ACCENT }} />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ACCENT }}>{w.eyebrow}</span>
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-white mb-12">{w.title}</h2>
        <ol className="swow__grid">
          {w.items.map((it, i) => (
            <li key={it.title} className="swow__cell" style={{ ["--i" as string]: i }}>
              <span className="swow__idx font-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="swow__icon" aria-hidden="true">{it.icon}</span>
              <h3 className="swow__title">{it.title}</h3>
              <p className="swow__desc">{it.desc}</p>
              <span className="swow__rule" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
