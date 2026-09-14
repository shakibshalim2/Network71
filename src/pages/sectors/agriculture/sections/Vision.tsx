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

          {/* Right — values */}
          <div className="space-y-4">
            {c.values.map((v) => (
              <div
                key={v.label}
                className="flex gap-5 items-start p-5 bg-surface-2 rounded-xl border border-slate-100 hover:border-green-200 transition-colors"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: GREEN, color: "var(--s0)" }}
                />
                <div>
                  <h3 className="font-display text-lg text-fg mb-1">
                    {v.label}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
