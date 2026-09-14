import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function FarmerProgram({
  c,
}: {
  c: AgricultureContent["farmerProgram"]
}) {
  return (
    <section className="py-24 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — content */}
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
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-5">
              {c.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              {c.description}
            </p>
            <a
              href="#sector-contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-bold text-sm text-fg rounded-lg transition-all hover:opacity-90"
              style={{ background: GREEN, color: "var(--s0)" }}
            >
              {c.cta}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Right — benefit cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {c.benefits.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-xl border border-slate-100 bg-surface-1 hover:border-green-200 transition-colors"
              >
                <div className="text-2xl mb-3">{b.icon}</div>
                <h3 className="font-semibold text-fg text-sm mb-2">
                  {b.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
