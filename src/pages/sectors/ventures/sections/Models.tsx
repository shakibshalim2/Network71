import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { VenturesContent } from '../content/en'
import { INDIGO, BG_DEEP } from '../theme'

const ICONS: Record<string, string> = {
  jv: 'M8 12h8M12 8v8M4 12a8 8 0 1016 0 8 8 0 10-16 0z',
  partnership: 'M7 12a5 5 0 1110 0 5 5 0 01-10 0zM2 12h3m14 0h3',
  entry: 'M12 2v20M2 12h20M5 5l14 14M19 5L5 19',
  growth: 'M3 17l6-6 4 4 8-8M14 7h7v7',
  corridor: 'M3 12h18M14 6l6 6-6 6',
  incubation: 'M12 3l2.4 5 5.6.8-4 3.9.9 5.6-4.9-2.6-4.9 2.6.9-5.6-4-3.9 5.6-.8L12 3z',
}

export default function Models({ c }: { c: VenturesContent['models'] }) {
  return (
    <section id="models" className="py-24" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionEyebrow label={c.eyebrow} color={INDIGO} center className="mb-5" />
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">{c.lead}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((m, i) => (
            <div
              key={m.id}
              className="group p-7 rounded-2xl cursor-default sv-model"
              style={{ ['--pa' as string]: m.color, ['--i' as string]: i, background: 'var(--fill-1)', border: 'var(--border-subtle)' }}
            >
              <span className="sv-model__ghost font-display" aria-hidden="true">0{i + 1}</span>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 sv-model__icon" style={{ background: `color-mix(in srgb, ${m.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${m.color} 20%, transparent)`, color: m.color }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d={ICONS[m.id]} pathLength="1" />
                </svg>
              </div>
              <h3 className="font-semibold text-white text-sm mb-3">{m.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{m.desc}</p>
              <span className="sv-model__rule" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
