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
    <div className="px-4 py-7 sm:px-6 sm:py-10">
      <div
        className="font-display mb-2 leading-none"
        style={{ fontSize: 'clamp(30px, 7.5vw, 60px)', letterSpacing: '-0.025em', color: 'var(--fg-strong)' }}>
        {count.toLocaleString()}
        <span style={{ color: 'var(--brand-fg)' }}>{suffix}</span>
      </div>
      <div
        className="text-[8.5px] tracking-[0.16em] sm:text-[10px] sm:tracking-[0.25em]"
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600, textTransform: 'uppercase',
          color: 'var(--brand-fg)', marginBottom: 6,
        }}>
        {label}
      </div>
      <div className="text-[11px] sm:text-[12px]" style={{ color: 'var(--fg-subtle)', lineHeight: 1.5 }}>{desc}</div>
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
    <section style={{ background: 'var(--s1)', borderTop: '1px solid var(--line)' }} className="section-y">
      <div className="container-page">

        <div className="flex items-center gap-3 mb-7 sm:mb-12">
          <div className="h-px w-8 shrink-0" style={{ background: 'var(--brand-edge)' }} />
          <span
            className="text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em]"
            style={{
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              color: 'var(--brand-fg)',
            }}>
            Business Impact
          </span>
        </div>

        <div className="mb-8 sm:mb-12">
          <h2 className="font-display" style={{
            fontSize: 'clamp(27px, 6vw, 48px)',
            color: 'var(--fg-strong)',
            lineHeight: 1.12,
            letterSpacing: '-0.025em',
          }}>
            Measured in Markets.
            <br />
            <em style={{ color: 'var(--brand-fg)' }}>Counted in Countries.</em>
          </h2>
        </div>

        {/*
          Dividers are drawn with a 1px gap + background showing through, so a
          single rule works for every column count instead of index maths that
          only ever matched the 3-column desktop grid.
        */}
        <div
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--line)', background: 'var(--line)' }}
        >
          {metrics.map((m) => (
            <div key={m.label} style={{ background: 'var(--s2)' }}>
              <Metric {...m} enabled={enabled} />
            </div>
          ))}
        </div>

        <p className="text-[10px] sm:text-[11px] leading-relaxed" style={{
          color: 'var(--fg-faint)',
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
