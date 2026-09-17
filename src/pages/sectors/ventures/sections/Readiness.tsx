import { motion } from 'motion/react'
import SectionEyebrow from '@/components/sector/SectionEyebrow'
import Magnetic from '@/components/motion/Magnetic'
import type { VenturesContent } from '../content/en'
import { INDIGO, BG_ALT } from '../theme'
import { EASE_OUT } from '@/lib/motion'

const groupV = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}
const itemV = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } },
}

/** Data-room readiness checklist; ticks draw in as each group enters view. */
export default function Readiness({ c }: { c: VenturesContent['readiness'] }) {
  return (
    <section id="readiness" className="py-24 svready" style={{ background: BG_ALT, ['--pa' as string]: INDIGO }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <SectionEyebrow label={c.eyebrow} color={INDIGO} className="mb-5" />
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-5">{c.title1}<br /><span style={{ color: INDIGO }}>{c.title2}</span></h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">{c.lead}</p>
            <Magnetic>
              <a href="#sector-contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white svready__cta" style={{ background: INDIGO }}>
                {c.cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
              </a>
            </Magnetic>
          </div>
          <motion.div
            className="grid sm:grid-cols-3 gap-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {c.groups.map((g, gi) => (
              <motion.div key={g.title} variants={groupV} className="svready__group" style={{ ['--i' as string]: gi }}>
                <span className="svready__num font-display" aria-hidden="true">0{gi + 1}</span>
                <h3 className="text-white font-semibold text-sm mb-4">{g.title}</h3>
                <motion.ul variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}>
                  {g.items.map((it) => (
                    <motion.li key={it} variants={itemV} className="svready__item">
                      <svg viewBox="0 0 16 16" className="svready__tick" aria-hidden="true"><path d="M3 8.5l3 3 7-7" pathLength="1" /></svg>
                      <span>{it}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
