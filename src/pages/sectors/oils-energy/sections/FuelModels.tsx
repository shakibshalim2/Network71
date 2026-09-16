import { motion } from 'motion/react'
import type { OilsEnergyContent } from '../content/en'
import { SKY } from '../theme'
import Magnetic from '@/components/motion/Magnetic'
import { EASE_OUT } from '@/lib/motion'

const card = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
}

/** Three fuel contract models as plan cards; the term contract is the featured plan. */
export default function FuelModels({ c }: { c: OilsEnergyContent }) {
  const f = c.fuelModels
  return (
    <section id="fuel-models" className="py-24 bg-navy-dark sfuel" style={{ ['--pa' as string]: SKY }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: SKY }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: SKY }}>{f.eyebrow}</span>
            <div className="h-px w-8" style={{ background: SKY }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">{f.title1}<br /><span style={{ color: SKY }}>{f.title2}</span></h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">{f.lead}</p>
        </div>

        <motion.div
          className="sfuel__grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {f.items.map((m, i) => (
            <motion.article key={m.code} className={`sfuel__plan${m.featured ? ' is-featured' : ''}`} variants={card} style={{ ['--i' as string]: i }}>
              <span className="sfuel__glow" aria-hidden="true" />
              <div className="sfuel__head">
                <span className="sfuel__code font-mono">{m.code}</span>
                <span className="sfuel__sla font-mono">
                  <span className="sfuel__sla-dot" />
                  {m.sla}
                </span>
              </div>
              <h3 className="font-display text-2xl text-white leading-tight mb-2">{m.title}</h3>
              <p className="sfuel__who">{m.who}</p>
              <ul className="sfuel__points">
                {m.points.map((p, j) => (
                  <li key={p} style={{ ['--j' as string]: j }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path pathLength="1" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Magnetic strength={8}>
                <a href="#sector-contact" className={`btn btn-sm ${m.featured ? 'btn-primary' : 'btn-secondary'} sfuel__cta`} style={m.featured ? { background: SKY, color: 'var(--s0)' } : undefined}>
                  {f.cta}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </Magnetic>
            </motion.article>
          ))}
        </motion.div>
        <p className="text-slate-500 text-xs italic mt-8 text-center">{f.footnote}</p>
      </div>
    </section>
  )
}
