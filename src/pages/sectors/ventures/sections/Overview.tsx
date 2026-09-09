import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { VenturesContent } from '../content/en'
import { INDIGO, BG_ALT } from '../theme'

export default function Overview({ c }: { c: VenturesContent['overview'] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionEyebrow label={c.eyebrow} color={INDIGO} className="mb-14" />
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">{c.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-5 text-sm">{c.p1}</p>
            <p className="text-slate-400 leading-relaxed text-sm">{c.p2}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {c.principles.map((p) => (
              <div key={p.title} className="p-5 rounded-xl" style={{ background: `color-mix(in srgb, ${INDIGO} 3%, transparent)`, border: `1px solid color-mix(in srgb, ${INDIGO} 12%, transparent)` }}>
                <div className="text-xs font-bold mb-3" style={{ color: INDIGO }}>◈ {p.title}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
