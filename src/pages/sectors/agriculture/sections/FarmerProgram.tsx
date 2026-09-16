import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import Magnetic from "@/components/motion/Magnetic"

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
            <Magnetic strength={10}>
              <a
                href="#sector-contact"
                className="btn btn-primary shero__cta"
                style={{ background: GREEN, color: "var(--s0)", ["--pa" as string]: GREEN }}
              >
                {c.cta}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </Magnetic>
          </div>

          {/* Right — benefit cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {c.benefits.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-xl border border-slate-100 bg-surface-1 hover:border-green-200 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: `color-mix(in srgb, ${GREEN} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${GREEN} 16%, transparent)` }}>{b.icon}</div>
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
