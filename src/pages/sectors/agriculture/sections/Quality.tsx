import { useEffect, useRef, useState } from "react"
import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

const SHIELD_PATH = [
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 ",
  "3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
].join("")

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

export default function Quality({ c }: { c: AgricultureContent["quality"] }) {
  const view = useInView()
  return (
    <section className="py-24 bg-surface-1" ref={view.ref}>
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
          {/* Certifications */}
          <div className="space-y-4">
            {c.certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex gap-5 p-5 bg-surface-2 rounded-xl border border-slate-100"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `color-mix(in srgb, ${GREEN} 8%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${GREEN} 15%, transparent)`,
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    style={{ color: GREEN }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={SHIELD_PATH}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-fg text-sm mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="bg-surface-2 p-8 rounded-2xl border border-slate-100">
            <h3 className="font-display text-xl text-fg mb-6">
              {c.performanceTitle}
            </h3>
            {c.bars.map((bar) => (
              <AnimatedBar
                key={bar.label}
                label={bar.label}
                value={bar.value}
                triggered={view.inView}
              />
            ))}
            <p className="text-slate-400 text-xs mt-4">{c.footnote}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
