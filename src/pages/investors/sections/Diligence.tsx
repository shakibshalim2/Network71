import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import type { InvestorsContent } from '../content/en'
import Eyebrow from './Eyebrow'
import { EASE_OUT } from '@/lib/motion'

/**
 * Due-diligence path: five stage chips on a progress spine; the selected
 * stage shows "we provide / you provide", with the data-room index alongside.
 */
export default function Diligence({ c }: { c: InvestorsContent['diligence'] }) {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const s = c.stages[active]
  return (
    <section id="diligence" className="bg-navy-dark section-y invdd" style={{ ['--n' as string]: c.stages.length, ['--a' as string]: active }}>
      <div className="container-page">
        <div className="text-center mb-12">
          <Eyebrow label={c.eyebrow} center />
          <h2 className="font-display text-white tracking-[-0.02em]" style={{ fontSize: 'clamp(26px, 6vw, 48px)' }}>
            {c.title1} <span className="text-gold">{c.title2}</span>
          </h2>
          <p className="invdd__lead">{c.lead}</p>
        </div>

        <ol className="invdd__spine">
          <i className="invdd__track" aria-hidden="true" />
          <i className="invdd__progress" aria-hidden="true" />
          {c.stages.map((st, i) => (
            <li key={st.code} className={`invdd__node${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}>
              <button type="button" onClick={() => setActive(i)} aria-pressed={i === active}>
                <span className="invdd__dot" aria-hidden="true"><i /></span>
                <span className="invdd__code font-mono">{st.code}</span>
                <span className="invdd__title">{st.title}</span>
                <span className="invdd__window font-mono">{st.window}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="invdd__grid">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={s.code}
              className="invdd__card"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <div className="invdd__card-head">
                <span className="font-display">{s.code}</span>
                <div>
                  <h3>{s.title}</h3>
                  <span className="font-mono text-gold">{s.window}</span>
                </div>
              </div>
              <div className="invdd__cols">
                <div>
                  <span className="font-mono">{c.labels.we}</span>
                  <p>{s.we}</p>
                </div>
                <div>
                  <span className="font-mono">{c.labels.you}</span>
                  <p>{s.you}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.aside
            className="invdd__index"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
          >
            <span className="font-mono invdd__index-label">{c.indexLabel}</span>
            <ol>
              {c.index.map((it, i) => (
                <motion.li key={it} variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } } }}>
                  <span className="font-mono">{String(i + 1).padStart(2, '0')}</span>{it}
                </motion.li>
              ))}
            </ol>
          </motion.aside>
        </div>
        <p className="invdd__foot font-mono">{c.footnote}</p>
      </div>
    </section>
  )
}
