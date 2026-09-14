import { useEffect, useRef, useState } from 'react'
import type { SustainabilityContent } from '../content/en'

type Metric = SustainabilityContent['metrics']['items'][number]

function ProgressBar({ metric, animate }: { metric: Metric; animate: boolean }) {
  return (
    <div className="bg-navy-light rounded-xl p-6 border border-white/8">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-white font-semibold">{metric.label}</h3>
          <p className="text-slate-400 text-sm mt-1 leading-relaxed">{metric.desc}</p>
        </div>
        <span className={`text-3xl font-display font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent ml-4 flex-shrink-0`}>
          {metric.display}
        </span>
      </div>
      <div className="h-2.5 bg-white/8 rounded-full overflow-hidden mt-4">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-1000 ease-out`}
          style={{ width: animate ? `${metric.value}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Metrics({ c }: { c: SustainabilityContent['metrics'] }) {
  const metricsRef = useRef<HTMLDivElement>(null)
  const [metricsVisible, setMetricsVisible] = useState(false)

  useEffect(() => {
    const el = metricsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMetricsVisible(true) },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 px-6 bg-navy" ref={metricsRef}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{c.lead}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {c.items.map((m) => (
            <ProgressBar key={m.color} metric={m} animate={metricsVisible} />
          ))}
        </div>
        <p className="text-slate-500 text-xs text-center mt-6">{c.footnote}</p>
      </div>
    </section>
  )
}
