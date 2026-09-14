import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function Crops({ c }: { c: AgricultureContent["crops"] }) {
  return (
    <section id="crop-portfolio" className="py-24 bg-surface-2">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((c) => (
            <div
              key={c.name}
              className="group p-7 rounded-2xl border border-slate-100 hover:border-green-300 bg-surface-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: `color-mix(in srgb, ${GREEN} 7%, transparent)`,
                  }}
                >
                  {c.emoji}
                </div>
                <div
                  className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: GREEN, color: "var(--s0)" }}
                />
              </div>
              <h3 className="font-display text-xl text-fg mb-2 leading-tight">
                {c.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
