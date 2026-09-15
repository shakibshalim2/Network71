import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import MeterBar from "@/components/sector/MeterBar"

const SHIELD_PATH = [
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 ",
  "3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
].join("")

export default function Quality({ c }: { c: AgricultureContent["quality"] }) {
  return (
    <section className="py-24 bg-surface-1">
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
          <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-4">
            {c.title}
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            {c.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Certifications ledger */}
          <ol className="svals" style={{ ["--pa" as string]: GREEN }}>
            {c.certifications.map((cert, i) => (
              <li key={cert.name} className="svals__row" style={{ ["--i" as string]: i }}>
                <span className="svals__idx font-mono">0{i + 1}</span>
                <div className="svals__body">
                  <h3 className="font-semibold text-fg text-[15px] mb-1 flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: GREEN }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={SHIELD_PATH} />
                    </svg>
                    {cert.name}
                  </h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed">{cert.desc}</p>
                </div>
                <span className="svals__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </span>
              </li>
            ))}
          </ol>

          {/* Performance meters */}
          <div className="smeters" style={{ ["--pa" as string]: GREEN }}>
            <h3 className="font-display text-xl text-fg mb-6">{c.performanceTitle}</h3>
            {c.bars.map((bar, i) => (
              <MeterBar key={bar.label} label={bar.label} value={bar.value} accent={GREEN} index={i} />
            ))}
            <p className="text-slate-400 text-xs mt-4">{c.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
