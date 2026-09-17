import { useState } from 'react'
import { motion } from 'motion/react'
import type { OilsEnergyContent } from '../content/en'
import { AMBER } from '../theme'
import { EASE_OUT } from '@/lib/motion'

const rowV = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}

/**
 * CoA matrix: five oils × the parameters buyers test. Hovering a row or a
 * column lights the crosshair so a single value can be read against both
 * axes; the first column stays pinned when the table scrolls on phones.
 */
export default function OilSpecs({ c }: { c: OilsEnergyContent }) {
  const s = c.oilSpecs
  const [col, setCol] = useState<number | null>(null)
  const params: Array<[keyof typeof s.labels, string]> = [
    ['ffa', s.labels.ffa], ['pv', s.labels.pv], ['moisture', s.labels.moisture], ['iv', s.labels.iv], ['colour', s.labels.colour], ['shelf', s.labels.shelf], ['hs', s.labels.hs],
  ]
  return (
    <section id="oil-specs" className="py-24 bg-surface-1 sospec" style={{ ['--pa' as string]: AMBER }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: AMBER }}>{s.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">{s.title1}<br /><span style={{ color: AMBER }}>{s.title2}</span></h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md lg:text-right">{s.lead}</p>
        </div>

        <div className="sospec__scroll">
          <motion.table
            className="sospec__table"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
            onPointerLeave={() => setCol(null)}
          >
            <thead>
              <tr>
                <th scope="col" className="sospec__oil sospec__oil--head">
                  <span className="font-mono">{s.items.length} · SKU</span>
                </th>
                {params.map(([k, label], i) => (
                  <th key={k} scope="col" className={`sospec__param font-mono${col === i ? ' is-on' : ''}`} onPointerEnter={() => setCol(i)}>
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.items.map((it, r) => (
                <motion.tr key={it.name} className="sospec__row" variants={rowV}>
                  <th scope="row" className="sospec__oil">
                    <span className="sospec__idx font-mono">{String(r + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="sospec__name">{it.name}</span>
                      <span className="sospec__grade">{it.grade}</span>
                    </span>
                  </th>
                  {params.map(([k], i) => (
                    <td key={k} className={`sospec__cell${col === i ? ' is-on' : ''}`} onPointerEnter={() => setCol(i)}>
                      {it[k as keyof typeof it]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
        <p className="text-slate-500 text-xs italic mt-6">{s.footnote}</p>
      </div>
    </section>
  )
}
