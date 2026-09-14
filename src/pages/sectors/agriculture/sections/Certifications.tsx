import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function Certifications({
  c,
}: {
  c: AgricultureContent["supplyChain"]
}) {
  return (
    <section className="py-24 bg-surface-2">
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

        <div className="grid lg:grid-cols-3 gap-0 items-stretch">
          {/* LEFT */}
          <div className="relative p-8 rounded-2xl lg:rounded-r-none border border-slate-100 bg-surface-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-xl"
              style={{
                background: `color-mix(in srgb, ${GREEN} 8%, transparent)`,
              }}
            >
              🌱
            </div>
            <h3 className="font-display text-xl text-fg mb-3">
              {c.farmerTitle}
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              {c.farmerPoints.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: GREEN, color: "var(--s0)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            {/* Arrow right — hidden on mobile */}
            <div
              className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center border-2 border-white"
              style={{ background: GREEN, color: "var(--s0)" }}
            >
              <svg
                className="w-4 h-4 text-fg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* CENTER */}
          <div
            className="relative p-8 border border-slate-100 lg:border-x-0 text-center"
            style={{
              background:
                "color-mix(in srgb, var(--accent-green) 6%, var(--s2))",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 text-2xl"
              style={{ background: GREEN, color: "var(--s0)" }}
            >
              🏭
            </div>
            <h3 className="font-display text-xl text-fg mb-3">{c.hubTitle}</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              {c.hubPoints.map((item) => (
                <div
                  key={item}
                  className="px-2 py-1.5 rounded-lg bg-surface-2 border border-slate-100"
                >
                  {item}
                </div>
              ))}
            </div>
            {/* Arrow right — hidden on mobile */}
            <div
              className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center border-2 border-white"
              style={{ background: GREEN, color: "var(--s0)" }}
            >
              <svg
                className="w-4 h-4 text-fg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-8 rounded-2xl lg:rounded-l-none border border-slate-100 bg-surface-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-xl"
              style={{
                background: `color-mix(in srgb, ${GREEN} 8%, transparent)`,
              }}
            >
              🌍
            </div>
            <h3 className="font-display text-xl text-fg mb-3">
              {c.buyerTitle}
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              {c.buyerPoints.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: GREEN, color: "var(--s0)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
