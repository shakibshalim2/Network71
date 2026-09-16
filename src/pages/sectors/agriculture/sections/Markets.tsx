import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function Markets({ c }: { c: AgricultureContent["markets"] }) {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: GREEN }}
            >
              {c.eyebrow}
            </span>
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">
            {c.title}
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            {c.description}
          </p>
        </div>

        {/* World region tiles */}
        <ul className="smkt smkt--5" style={{ ["--pa" as string]: GREEN }}>
          {c.items.map((m, i) => (
            <li key={m.region} className="smkt__tile smkt__tile--left" style={{ ["--i" as string]: i, ["--pa" as string]: m.color }}>
              <span className="smkt__idx font-mono">0{i + 1}</span>
              <span className="smkt__flag">{m.flag}</span>
              <span className="smkt__role font-mono">{m.role}</span>
              <h3 className="font-display text-lg text-white smkt__region">{m.region}</h3>
              <p className="smkt__note">{m.detail}</p>
              <span className="smkt__rule" aria-hidden="true" />
            </li>
          ))}
        </ul>

        {/* Destination flag strip — flags wake in colour as the pointer passes */}
        <div className="sflags mt-12">
          {c.flags.map((flag, i) => (
            <span key={i} className="sflags__flag" title={c.destinationMarketLabel} style={{ ["--i" as string]: i }}>
              {flag}
            </span>
          ))}
          <span className="sflags__more font-mono">{c.moreMarkets}</span>
        </div>
      </div>
    </section>
  )
}
