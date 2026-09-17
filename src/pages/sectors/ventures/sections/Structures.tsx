import { useState } from 'react'
import { motion } from 'motion/react'
import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { VenturesContent } from '../content/en'
import { INDIGO, BG_ALT } from '../theme'
import { EASE_OUT } from '@/lib/motion'

const colV = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

/**
 * Structure comparison matrix: six partnership models across five
 * dimensions. Desktop reads as a spreadsheet with a sticky dimension
 * column; a selected model lights its column and the matching row
 * label highlights on hover. Below lg it collapses to a tabbed card.
 */
export default function Structures({ c }: { c: VenturesContent['structures'] }) {
  const [active, setActive] = useState(0)
  const [row, setRow] = useState<number | null>(null)
  return (
    <section id="structures" className="py-24 svstruct" style={{ background: BG_ALT, ['--pa' as string]: INDIGO }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <SectionEyebrow label={c.eyebrow} color={INDIGO} className="mb-5" />
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">{c.title1}<br /><span style={{ color: INDIGO }}>{c.title2}</span></h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md lg:text-right">{c.lead}</p>
        </div>

        {/* mobile / tablet tabs */}
        <div className="svstruct__tabs lg:hidden" role="tablist">
          {c.models.map((m, i) => (
            <button key={m.code} role="tab" aria-selected={active === i} className={`svstruct__tab font-mono${active === i ? ' is-on' : ''}`} onClick={() => setActive(i)}>
              <span className="svstruct__tab-code font-display">{m.code}</span>
              <span className="svstruct__tab-name">{m.name}</span>
            </button>
          ))}
        </div>
        <div className="svstruct__card lg:hidden" role="tabpanel">
          {c.rows.map((r, ri) => (
            <div key={r} className="svstruct__card-row">
              <span className="svstruct__dim font-mono">{r}</span>
              <motion.span key={`${active}-${ri}`} className="svstruct__val" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: ri * 0.04, ease: EASE_OUT }}>
                {c.models[active].cells[ri]}
              </motion.span>
            </div>
          ))}
        </div>

        {/* desktop matrix */}
        <motion.div
          className="svstruct__grid hidden lg:grid"
          role="table"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          onPointerLeave={() => setRow(null)}
        >
          <div className="svstruct__dims" role="rowgroup">
            <span className="svstruct__dim svstruct__dim--head" role="columnheader" aria-hidden="true" />
            {c.rows.map((r, ri) => (
              <span key={r} role="rowheader" className={`svstruct__dim font-mono${row === ri ? ' is-on' : ''}`} onPointerEnter={() => setRow(ri)}>
                <i className="svstruct__dim-dot" aria-hidden="true" />{r}
              </span>
            ))}
          </div>
          {c.models.map((m, mi) => (
            <motion.div key={m.code} role="column" className={`svstruct__col${active === mi ? ' is-active' : ''}`} variants={colV} onPointerEnter={() => setActive(mi)}>
              <span className="svstruct__head" role="columnheader">
                <span className="svstruct__code font-display">{m.code}</span>
                <span className="svstruct__name">{m.name}</span>
                <i className="svstruct__head-rule" aria-hidden="true" />
              </span>
              {m.cells.map((cell, ri) => (
                <span key={ri} role="cell" className={`svstruct__cell${row === ri ? ' is-on' : ''}`} onPointerEnter={() => setRow(ri)}>{cell}</span>
              ))}
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-6 text-[11px] text-slate-500 font-mono tracking-wide">{c.footnote}</p>
      </div>
    </section>
  )
}
