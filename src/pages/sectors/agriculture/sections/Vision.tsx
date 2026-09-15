import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function Vision({ c }: { c: AgricultureContent["vision"] }) {
  return (
    <section className="py-24 bg-surface-1">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — rich text */}
          <div>
            <div className="flex items-center gap-3 mb-5">
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
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">
              {c.title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5 text-sm">
              {c.paragraphs[0]}
            </p>
            <p className="text-slate-500 leading-relaxed mb-5 text-sm">
              {c.paragraphs[1]}
            </p>
            <p className="text-slate-500 leading-relaxed text-sm">
              {c.paragraphs[2]}
            </p>
          </div>

          {/* Right — numbered value ledger */}
          <ol className="svals" style={{ ["--pa" as string]: GREEN }}>
            {c.values.map((v, i) => (
              <li key={v.label} className="svals__row" style={{ ["--i" as string]: i }}>
                <span className="svals__idx font-mono">0{i + 1}</span>
                <div className="svals__body">
                  <h3 className="font-display text-lg text-fg mb-1">{v.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
                <span className="svals__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
