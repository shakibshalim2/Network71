import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { VenturesContent } from '../content/en'
import { INDIGO, BG_ALT } from '../theme'
import ScrollWords from '@/components/motion/ScrollWords'

export default function Overview({ c }: { c: VenturesContent['overview'] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionEyebrow label={c.eyebrow} color={INDIGO} className="mb-14" />
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">{c.title}</h2>
            <ScrollWords className="text-slate-300 leading-relaxed mb-5 text-sm" text={c.p1} />
            <p className="text-slate-400 leading-relaxed text-sm">{c.p2}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {c.principles.map((p, i) => (
              <div key={p.title} className="p-5 rounded-xl sv-prin" style={{ ['--pa' as string]: INDIGO, ['--i' as string]: i, background: `color-mix(in srgb, ${INDIGO} 3%, transparent)`, border: `1px solid color-mix(in srgb, ${INDIGO} 12%, transparent)` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold" style={{ color: INDIGO }}>{p.title}</div>
                  <span className="sv-prin__diamond" aria-hidden="true"><svg viewBox="0 0 24 24"><path pathLength="1" d="M12 2l10 10-10 10L2 12z" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg></span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                <span className="sv-prin__rule" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
