import { useEffect, useRef, useState } from "react"
import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

function AnimatedBar({
  label,
  value,
  triggered,
}: {
  label: string
  value: number
  triggered: boolean
}) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-bold" style={{ color: GREEN }}>
          {value}%
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: triggered ? `${value}%` : "0%",
            background: GREEN,
            transitionDelay: "200ms",
          }}
        />
      </div>
    </div>
  )
}
function useInView(threshold = 0.25) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

export default function Sustainability({
  c,
}: {
  c: AgricultureContent["sustainability"]
}) {
  const view = useInView()
  return (
    <section className="py-24 bg-surface-2" ref={view.ref}>
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
                className="font-mono text-[9px] tracking-[0.35em] uppercase"
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
                {c.community}
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
            <div className="space-y-5">
              {c.pillars.map((p) => (
                <div key={p.title} className="flex gap-4 items-start">
                  <div
                    className="w-1 h-16 rounded-full flex-shrink-0"
                    style={{ background: GREEN, color: "var(--s0)" }}
                  />
                  <div>
                    <h3 className="font-semibold text-fg text-sm mb-1">
                      {p.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — progress bars */}
          <div>
            <h3 className="font-display text-xl text-fg mb-6">
              {c.progressTitle}
            </h3>
            {c.bars.map((bar) => (
              <AnimatedBar
                key={bar.label}
                label={bar.label}
                value={bar.value}
                triggered={view.inView}
              />
            ))}
            <p className="text-slate-400 text-xs mt-2 mb-8">{c.footnote}</p>

            {/* UN SDG callout */}
            <div className="p-5 rounded-xl border border-slate-100 bg-surface-1">
              <div className="text-xs font-semibold text-slate-500 mb-3 tracking-wide uppercase">
                {c.sdgLabel}
              </div>
              <div className="flex flex-wrap gap-2">
                {c.sdgs.map((sdg) => (
                  <span
                    key={sdg}
                    className="px-2.5 py-1 text-[10px] font-semibold rounded-full"
                    style={{
                      background: `color-mix(in srgb, ${GREEN} 8%, transparent)`,
                      color: "var(--accent-green)",
                    }}
                  >
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
