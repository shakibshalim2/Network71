import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import type { InvestorsContent } from '../content/en'
import Eyebrow from './Eyebrow'
import { EASE_OUT } from '@/lib/motion'

const R = 40
const CIRC = 2 * Math.PI * R

/**
 * Use-of-capital ring: five arcs draw in sequence around a total, each row
 * of the ledger beside it carries a bar. Hovering a row or arc lights both.
 */
export default function Allocation({ c }: { c: InvestorsContent['allocation'] }) {
  const [hot, setHot] = useState<number | null>(null)
  const reduce = useReducedMotion()
  let offset = 0
  const arcs = c.items.map((it) => {
    const start = offset
    offset += it.pct
    return { ...it, start }
  })

  return (
    <section id="allocation" className="bg-navy-dark section-y invalloc">
      <div className="container-page">
        <div className="invalloc__head">
          <div>
            <Eyebrow label={c.eyebrow} />
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              {c.title1}<br /><span className="text-gold">{c.title2}</span>
            </h2>
          </div>
          <p className="invalloc__lead">{c.lead}</p>
        </div>

        <motion.div
          className="invalloc__grid"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: {} }}
          onPointerLeave={() => setHot(null)}
        >
          <div className="invalloc__ring">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r={R} className="invalloc__track" />
              {arcs.map((a, i) => (
                <motion.circle
                  key={a.id}
                  cx="50" cy="50" r={R}
                  className={`invalloc__arc${hot === i ? ' is-hot' : ''}${hot !== null && hot !== i ? ' is-dim' : ''}`}
                  style={{ stroke: a.color, ['--rot' as string]: `${(a.start / 100) * 360 - 90}deg` }}
                  strokeDasharray={`${(a.pct / 100) * CIRC} ${CIRC}`}
                  variants={{ hidden: { strokeDashoffset: (a.pct / 100) * CIRC }, show: { strokeDashoffset: 0, transition: { duration: 1.1, delay: 0.2 + i * 0.18, ease: EASE_OUT } } }}
                  onPointerEnter={() => setHot(i)}
                />
              ))}
            </svg>
            <div className="invalloc__centre">
              <span className="font-display">{hot === null ? c.total : `${arcs[hot].pct} %`}</span>
              <span className="font-mono">{hot === null ? c.totalLabel : arcs[hot].label}</span>
            </div>
          </div>

          <ol className="invalloc__ledger">
            {arcs.map((a, i) => (
              <motion.li
                key={a.id}
                className={`invalloc__row${hot === i ? ' is-hot' : ''}`}
                style={{ ['--ac' as string]: a.color }}
                onPointerEnter={() => setHot(i)}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25 + i * 0.1, ease: EASE_OUT } } }}
              >
                <span className="invalloc__pct font-display">{a.pct}<small>%</small></span>
                <div className="invalloc__body">
                  <div className="invalloc__label">{a.label}</div>
                  <p>{a.desc}</p>
                  <span className="invalloc__bar" aria-hidden="true">
                    <motion.i variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, delay: 0.35 + i * 0.1, ease: EASE_OUT } } }} style={{ width: `${a.pct}%` }} />
                  </span>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
        <p className="invalloc__foot font-mono">{c.footnote}</p>
      </div>
    </section>
  )
}
