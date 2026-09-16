import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'motion/react'
import { RED } from '../theme'
import type { MediaContent } from '../content/en'
import Magnetic from '@/components/motion/Magnetic'
import { EASE_OUT, springSoft } from '@/lib/motion'

/**
 * Ad-format spec board. A group filter pill slides across digital / video /
 * broadcast / branded; rows re-flow with layout animation and each row keeps
 * its group colour as a left rule.
 */
export default function AdSpecs({ c }: { c: MediaContent['adSpecs'] }) {
  const [group, setGroup] = useState<string>('all')
  const rows = group === 'all' ? c.items : c.items.filter((i) => i.group === group)
  const colour = (g: string) => c.groups.find((x) => x.key === g)?.color ?? RED

  return (
    <section id="ad-specs" className="py-24 mspec" style={{ background: 'var(--s1)', ['--pa' as string]: RED }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10" style={{ background: RED }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: RED }}>{c.eyebrow}</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">{c.title1}<br /><span style={{ color: RED }}>{c.title2}</span></h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-md lg:text-right">{c.lead}</p>
        </div>

        <LayoutGroup id="mspec">
          <div className="mspec__filter" role="tablist">
            {[{ key: 'all', label: 'All', color: RED }, ...c.groups].map((g) => {
              const on = group === g.key
              return (
                <button key={g.key} type="button" role="tab" aria-selected={on} className={`mspec__tab${on ? ' is-on' : ''}`} onClick={() => setGroup(g.key)} style={{ ['--g' as string]: g.color }}>
                  {on && <motion.span layoutId="mspec-pill" className="mspec__pill" transition={springSoft} />}
                  <span className="mspec__dot" />
                  <span>{g.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mspec__board" role="table">
            <div className="mspec__head font-mono" role="row">
              <span role="columnheader">Format</span>
              <span role="columnheader">{c.labels.size}</span>
              <span role="columnheader">{c.labels.file}</span>
              <span role="columnheader">{c.labels.lead}</span>
              <span role="columnheader">{c.labels.where}</span>
            </div>
            <AnimatePresence initial={false} mode="popLayout">
              {rows.map((r) => (
                <motion.div
                  key={r.name}
                  layout
                  role="row"
                  className="mspec__row"
                  style={{ ['--g' as string]: colour(r.group) }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: EASE_OUT }}
                >
                  <span className="mspec__name" role="cell">
                    <span className="mspec__group font-mono">{c.groups.find((g) => g.key === r.group)?.label}</span>
                    {r.name}
                  </span>
                  <span role="cell" data-label={c.labels.size} className="mspec__val font-mono">{r.size}</span>
                  <span role="cell" data-label={c.labels.file} className="mspec__val">{r.file}</span>
                  <span role="cell" data-label={c.labels.lead} className="mspec__val mspec__lead">{r.lead}</span>
                  <span role="cell" data-label={c.labels.where} className="mspec__val mspec__where">{r.where}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>

        <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
          <p className="text-slate-500 text-xs italic">{c.footnote}</p>
          <Magnetic strength={8}>
            <a href="#sector-contact" className="btn btn-primary btn-sm" style={{ background: RED, color: '#fff' }}>
              {c.cta}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" /></svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
