import { RED, GOLD } from '../theme'
import type { MediaContent } from '../content/en'
import MeterBar from '@/components/sector/MeterBar'

/** Audience profile: segment meters, platform split ring, and region tiles. */
export default function Audience({ c }: { c: MediaContent['audience'] }) {
  const total = c.platforms.reduce((s, p) => s + p.pct, 0)
  let acc = 0
  const stops = c.platforms.map((p, i) => {
    const start = (acc / total) * 100
    acc += p.pct
    const end = (acc / total) * 100
    const col = [RED, 'var(--accent-cyan)', GOLD][i % 3]
    return `${col} ${start}% ${end}%`
  })
  return (
    <section id="audience" className="py-24 maud" style={{ background: 'var(--s0)', ['--pa' as string]: RED }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: RED }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: RED }}>{c.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">{c.title1}<br /><span style={{ color: RED }}>{c.title2}</span></h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md lg:text-right">{c.lead}</p>
        </div>

        <div className="maud__grid">
          <div className="smeters maud__meters">
            {c.segments.map((s, i) => (
              <MeterBar key={s.label} label={s.label} value={s.pct} accent={RED} index={i} />
            ))}
          </div>

          <div className="maud__ring-card">
            <div className="maud__ring" style={{ ['--ring' as string]: `conic-gradient(${stops.join(', ')})` }} aria-hidden="true">
              <span className="maud__ring-hole">
                <span className="font-display maud__ring-val">{c.platforms[0].pct}%</span>
                <span className="font-mono maud__ring-lab">{c.platforms[0].label}</span>
              </span>
            </div>
            <ul className="maud__legend">
              {c.platforms.map((p, i) => (
                <li key={p.label}>
                  <i style={{ background: [RED, 'var(--accent-cyan)', GOLD][i % 3] }} />
                  <span>{p.label}</span>
                  <b className="font-mono">{p.pct}%</b>
                </li>
              ))}
            </ul>
          </div>

          <ul className="maud__regions">
            {c.regions.map((r, i) => (
              <li key={r.name} className="maud__region" style={{ ['--i' as string]: i }}>
                <span className="maud__flag" aria-hidden="true">{r.flag}</span>
                <span className="maud__region-name">{r.name}</span>
                <span className="maud__region-share font-mono">{r.share}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-slate-500 text-xs italic mt-6">{c.footnote}</p>
      </div>
    </section>
  )
}
