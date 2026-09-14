import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"

export default function Roadmap({
  c,
}: {
  c: GarmentsContent["roadmap"]
}) {
  return (
    <section className="py-24 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-px w-10"
                style={{ background: ACCENT, color: "var(--s0)" }}
              />
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
          <p className="text-slate-500 text-sm leading-relaxed lg:pt-2">
            {c.lead}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-[calc(1/6*100%)] right-[calc(1/6*100%)] h-px bg-slate-100" />
          <div
            className="hidden lg:block absolute top-8 left-[calc(1/6*100%)] w-[calc(4/6*100%)] h-px"
            style={{
              background: `linear-gradient(90deg, color-mix(in srgb, ${ACCENT} 38%, transparent), color-mix(in srgb, ${ACCENT} 38%, transparent))`,
            }}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            {c.items.map((item, i) => (
              <div key={item.year} className="relative">
                {/* Node */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-display text-xl font-bold relative z-10 flex-shrink-0"
                    style={{
                      background: ACCENT,
                      color: "var(--s0)",
                      boxShadow: `0 0 0 4px color-mix(in srgb, ${ACCENT} 13%, transparent)`,
                    }}
                  >
                    {item.year.slice(2)}
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] tracking-widest uppercase">
                      {item.year}
                    </div>
                    <h3 className="font-display text-lg text-fg">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed pl-0">
                  {item.desc}
                </p>
                {i < c.items.length - 1 && (
                  <div className="lg:hidden h-px bg-slate-100 my-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
