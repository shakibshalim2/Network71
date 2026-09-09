import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function Opportunities({
  c,
}: {
  c: AgricultureContent["opportunities"]
}) {
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
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
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
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            {c.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {c.items.map((o) => (
            <div
              key={o.title}
              className="group relative flex flex-col p-8 rounded-2xl bg-surface-2 border border-slate-100 hover:border-green-300 hover:shadow-xl transition-all duration-300"
            >
              <div
                className="absolute top-0 left-8 w-16 h-0.5 rounded-full"
                style={{ background: GREEN, color: "var(--s0)" }}
              />
              <h3 className="font-display text-xl text-fg mt-4 mb-3 leading-tight">
                {o.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                {o.desc}
              </p>
              <a
                href="#sector-contact"
                className="flex items-center gap-2 text-sm font-bold transition-all"
                style={{ color: GREEN }}
              >
                {o.cta}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
