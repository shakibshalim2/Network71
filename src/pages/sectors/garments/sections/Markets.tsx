import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"

export default function Markets({
  c,
}: {
  c: GarmentsContent["markets"]
}) {
  return (
    <section className="py-24 bg-surface-1">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">
              {c.title1}
              <br />
              {c.title2}
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
            {c.lead}
          </p>
        </div>

        <ul className="smkt mb-6" style={{ ["--pa" as string]: ACCENT }}>
          {c.markets.map((market, i) => (
            <li
              key={market.region}
              className={`smkt__tile${market.tier === "primary" ? " is-primary" : ""}`}
              style={{ ["--i" as string]: i }}
            >
              <span className="smkt__idx font-mono">0{i + 1}</span>
              <span className="smkt__flag">{market.flag}</span>
              <h3 className="smkt__region">{market.region}</h3>
              <p className="smkt__note">{market.note}</p>
              {market.tier === "primary" && <span className="smkt__tier font-mono">{c.primary}</span>}
              <span className="smkt__rule" aria-hidden="true" />
            </li>
          ))}
        </ul>

        <div className="p-5 rounded-xl bg-surface-2 border border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            {c.additionalLabel}{" "}
            <span className="text-fg font-medium">{c.dataNote}</span> —
            {c.note}
          </p>
        </div>
      </div>
    </section>
  )
}
