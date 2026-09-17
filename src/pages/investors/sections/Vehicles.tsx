import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import type { InvestorsContent } from '../content/en'
import Eyebrow from './Eyebrow'
import { EASE_OUT } from '@/lib/motion'

const GOLD = 'var(--brand)'

/**
 * Three investment routes as a segmented chooser: the active route expands
 * into a five-row term card, the other two sit as compact tiles beside it.
 */
export default function Vehicles({ c }: { c: InvestorsContent['vehicles'] }) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const v = c.items[active]
  return (
    <section id="vehicles" className="bg-navy section-y invveh" style={{ ['--pa' as string]: GOLD }}>
      <div className="container-page">
        <div className="invveh__head">
          <div>
            <Eyebrow label={c.eyebrow} />
            <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
              {c.title1}<br /><span className="text-gold">{c.title2}</span>
            </h2>
          </div>
          <p className="invveh__lead">{c.lead}</p>
        </div>

        <div className="invveh__tiles" role="tablist">
          {c.items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`invveh__tile${i === active ? ' is-on' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="invveh__code font-display">{it.code}</span>
              <span className="invveh__name">{it.name}</span>
              <span className="invveh__desc">{it.desc}</span>
              <i className="invveh__tile-rule" aria-hidden="true" />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.dl
            key={v.id}
            className="invveh__terms"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            {c.rowsLabel.map((r, i) => (
              <motion.div
                key={r}
                className="invveh__row"
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.05 + i * 0.05, ease: EASE_OUT }}
              >
                <dt className="font-mono">{r}</dt>
                <dd>{v.cells[i]}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </AnimatePresence>
        <p className="invveh__foot font-mono">{c.footnote}</p>
      </div>
    </section>
  )
}
