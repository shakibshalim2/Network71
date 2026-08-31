import { useState, useEffect, useRef } from 'react'

function useCountUp(target: number, duration: number, enabled: boolean): number {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!enabled) return
    let raf: number
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, enabled])
  return count
}

const metrics = [
  { value: 25,   suffix: '+', label: 'Countries',          desc: 'Active trade presence worldwide' },
  { value: 8,    suffix: '',  label: 'Business Divisions',  desc: 'Fully diversified industrial sectors' },
  { value: 5000, suffix: '+', label: 'Team Members',        desc: 'Across all divisions globally' },
  { value: 12,   suffix: 'K+', label: 'Partners & Clients',  desc: 'Global network of trusted partners' },
  { value: 6,    suffix: '',  label: 'Operating Regions',   desc: 'Strategic presence worldwide' },
  { value: 2018, suffix: '',  label: 'Est.',                 desc: 'Dhaka, Bangladesh — Global vision' },
]

function Metric({ value, suffix, label, desc, enabled }: {
  value: number; suffix: string; label: string; desc: string; enabled: boolean
}) {
  const count = useCountUp(value, 2800, enabled)
  return (
    <div className="px-6 py-10">
      <div className="font-display text-5xl lg:text-6xl text-white mb-2 leading-none" style={{ letterSpacing: '-0.025em' }}>
        {count.toLocaleString()}
        <span style={{ color: '#C8962A' }}>{suffix}</span>
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10,
        fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: 'rgba(200,150,42,0.72)', marginBottom: 6,
      }}>
        {label}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(100,116,139,0.7)' }}>{desc}</div>
    </div>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setEnabled(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section style={{ background: '#06101E', borderTop: '1px solid rgba(255,255,255,0.04)' }} className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8" style={{ background: 'rgba(200,150,42,0.45)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9,
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: 'rgba(200,150,42,0.65)',
          }}>
            Business Impact
          </span>
        </div>

        <div className="mb-12">
          <h2 className="font-display" style={{
            fontSize: 'clamp(30px, 4vw, 48px)',
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
          }}>
            Measured in Markets.
            <br />
            <em style={{ color: '#C8962A' }}>Counted in Countries.</em>
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.05)', background: '#09111F' }}
        >
          {metrics.map((m, i) => (
            <div key={m.label} style={{
              borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
            }}>
              <Metric {...m} enabled={enabled} />
            </div>
          ))}
        </div>

        <p style={{
          fontSize: 11,
          color: 'rgba(71,85,105,0.65)',
          marginTop: 16,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.05em',
        }}>
          * Figures represent verified operational data across Network71 Group divisions and regional offices.
        </p>
      </div>
    </section>
  )
}
