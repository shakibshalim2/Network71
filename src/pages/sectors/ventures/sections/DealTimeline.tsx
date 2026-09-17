import { useState } from 'react'
import { motion } from 'motion/react'
import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { VenturesContent } from '../content/en'
import { INDIGO, GOLD, BG_DEEP } from '../theme'
import { EASE_OUT } from '@/lib/motion'

const stageV = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
}

/**
 * Deal timeline: a drawn spine with six stage nodes; the selected stage
 * expands into a three-column "we do / you provide / you receive" card so
 * partners see what each window costs them and what comes back.
 */
export default function DealTimeline({ c }: { c: VenturesContent['timeline'] }) {
  const [active, setActive] = useState(0)
  const s = c.stages[active]
  return (
    <section id="deal-timeline" className="py-24 svtl" style={{ background: BG_DEEP, ['--pa' as string]: INDIGO, ['--pg' as string]: GOLD }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <SectionEyebrow label={c.eyebrow} color={INDIGO} center className="mb-5" />
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">{c.title1} <span style={{ color: INDIGO }}>{c.title2}</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed mt-4">{c.lead}</p>
        </div>

        <motion.ol
          className="svtl__spine"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          style={{ ['--n' as string]: c.stages.length, ['--a' as string]: active }}
        >
          <i className="svtl__track" aria-hidden="true" />
          <i className="svtl__progress" aria-hidden="true" />
          {c.stages.map((st, i) => (
            <motion.li key={st.code} variants={stageV} className={`svtl__node${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}>
              <button type="button" className="svtl__btn" onClick={() => setActive(i)} aria-pressed={i === active}>
                <span className="svtl__dot" aria-hidden="true"><i /></span>
                <span className="svtl__code font-mono">{st.code}</span>
                <span className="svtl__title">{st.title}</span>
                <span className="svtl__window font-mono">{st.window}</span>
              </button>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          key={active}
          className="svtl__card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <div className="svtl__card-head">
            <span className="svtl__card-code font-display">{s.code}</span>
            <div>
              <h3 className="text-white font-semibold text-lg">{s.title}</h3>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: INDIGO }}>{s.window}</span>
            </div>
          </div>
          <div className="svtl__cols">
            {(['we', 'you', 'out'] as const).map((k, i) => (
              <motion.div key={k} className={`svtl__col svtl__col--${k}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 + i * 0.07, ease: EASE_OUT }}>
                <span className="svtl__col-label font-mono">{c.labels[k]}</span>
                <p>{s[k]}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="mt-6 text-[11px] text-slate-500 font-mono tracking-wide text-center">{c.footnote}</p>
      </div>
    </section>
  )
}
