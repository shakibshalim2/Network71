import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function Roadmap({ c }: { c: AgricultureContent["roadmap"] }) {
  return (
    <section className="py-24 bg-surface-1 overflow-hidden">
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
          <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">
            {c.title}
          </h2>
        </div>

        {/* Horizontal timeline */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-6 left-0 right-0 h-px"
            style={{
              background: `color-mix(in srgb, ${GREEN} 19%, transparent)`,
            }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {c.items.map((r, i) => (
              <div key={r.year} className="relative">
                <div className="flex lg:flex-col items-start gap-4 lg:gap-0">
                  {/* Year bubble */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-display text-sm font-bold text-fg flex-shrink-0 lg:mb-6 relative z-10"
                    style={{ background: GREEN, color: "var(--s0)" }}
                  >
                    {r.year.slice(2)}
                  </div>
                  <div>
                    <div
                      className="font-bold text-fg text-sm mb-1"
                      style={{ color: GREEN }}
                    >
                      {r.year}
                    </div>
                    <h3 className="font-display text-lg text-fg mb-2 leading-tight">
                      {r.milestone}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
