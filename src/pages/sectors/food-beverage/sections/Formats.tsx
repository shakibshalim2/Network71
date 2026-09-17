import type { PointerEvent } from 'react'
import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

const spot = (e: PointerEvent<HTMLUListElement>) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/** Packaging formats as a spotlight-lit tile wall. */
export default function Formats({ c }: { c: FoodBeverageContent }) {
  return (
    <section id="formats" className="py-24 bg-navy sfmt" style={{ ['--pa' as string]: ORANGE }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: ORANGE }} />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.formats.eyebrow}</span>
            <div className="h-px w-8" style={{ background: ORANGE }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.formats.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">{c.formats.lead}</p>
        </div>
        <ul className="sfmt__wall" onPointerMove={spot}>
          {c.formats.items.map((f, i) => (
            <li key={f.name} className="sfmt__tile" style={{ ['--i' as string]: i }}>
              <span className="sfmt__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="sfmt__icon" aria-hidden="true">{f.icon}</span>
              <h3 className="sfmt__name">{f.name}</h3>
              <span className="sfmt__sizes font-mono">{f.sizes}</span>
              <p className="sfmt__for">{f.for}</p>
            </li>
          ))}
        </ul>
        <p className="text-slate-500 text-xs italic mt-6 text-center">{c.formats.note}</p>
      </div>
    </section>
  )
}
