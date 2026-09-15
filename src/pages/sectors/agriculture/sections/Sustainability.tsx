import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import MeterBar from "@/components/sector/MeterBar"
import CountUp from "@/components/motion/CountUp"

export default function Sustainability({
  c,
}: {
  c: AgricultureContent["sustainability"]
}) {
  return (
    <section className="py-24 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — story */}
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

            {/* Impact callout */}
            <div
              className="flex flex-col sm:flex-row items-start gap-5 p-5 rounded-2xl mb-8"
              style={{
                background: `color-mix(in srgb, ${GREEN} 6%, transparent)`,
                border: `1px solid color-mix(in srgb, ${GREEN} 15%, transparent)`,
              }}
            >
              <div
                className="font-display text-4xl text-fg"
                style={{ color: GREEN }}
              >
                <CountUp value={c.community} />
              </div>
              <div>
                <div className="text-fg font-semibold text-sm">
                  {c.responsibleSourcing}
                </div>
                <div className="text-slate-500 text-xs">
                  {c.responsibleDescription}
                </div>
              </div>
            </div>

            {/* Three pillars */}
            <ol className="svals" style={{ ["--pa" as string]: GREEN }}>
              {c.pillars.map((p, i) => (
                <li key={p.title} className="svals__row" style={{ ["--i" as string]: i }}>
                  <span className="svals__idx font-mono">0{i + 1}</span>
                  <div className="svals__body">
                    <h3 className="font-semibold text-fg text-[15px] mb-1">{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                  <span className="svals__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Right — progress bars */}
          <div>
            <h3 className="font-display text-xl text-fg mb-6">
              {c.progressTitle}
            </h3>
            {c.bars.map((bar, i) => (
              <MeterBar key={bar.label} label={bar.label} value={bar.value} accent={GREEN} index={i} />
            ))}
            <p className="text-slate-400 text-xs mt-2 mb-8">{c.footnote}</p>

            {/* UN SDG callout */}
            <div className="p-5 rounded-xl border border-slate-100 bg-surface-1">
              <div className="text-xs font-semibold text-slate-500 mb-3 tracking-wide uppercase">
                {c.sdgLabel}
              </div>
              <div className="flex flex-wrap gap-2">
                {c.sdgs.map((sdg) => (
                  <span key={sdg} className="schain__chip font-mono text-[11px]" style={{ ["--pa" as string]: GREEN, color: GREEN }}>
                    {sdg}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
