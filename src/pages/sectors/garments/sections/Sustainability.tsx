import { useEffect, useRef, useState } from "react"
import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"

export default function Sustainability({
  c,
}: {
  c: GarmentsContent["sustainability"]
}) {
  const sustainRef = useRef<HTMLDivElement>(null)
  const [sustainVisible, setSustainVisible] = useState(false)

  useEffect(() => {
    const el = sustainRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSustainVisible(true)
      },
      { threshold: 0.25 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[9px] tracking-[0.35em] uppercase"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">
              {c.title1}
              <br />
              {c.title2}
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              {c.p1}
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              {c.p2}
            </p>
            <a
              href="#sector-contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: ACCENT, color: "var(--s0)" }}
            >
              {c.cta}
              <svg
                className="w-4 h-4"
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

          {/* Right — progress bars */}
          <div ref={sustainRef} className="space-y-6">
            {c.targets.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm font-medium">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold" style={{ color: ACCENT }}>
                    {item.target}
                    {item.unit}{" "}
                    <span className="text-slate-500 font-normal text-xs">
                      target
                    </span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      background: `linear-gradient(90deg, ${ACCENT}, color-mix(in srgb, ${ACCENT} 80%, transparent))`,
                      width: sustainVisible ? `${item.target}%` : "0%",
                      transitionDelay: `${i * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="text-slate-500 text-xs mt-4 italic">
              {c.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
