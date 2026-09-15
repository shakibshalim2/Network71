import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { MediaContent } from '../content/en'
import { RED, BG_ALT } from '../theme'
import ScrollWords from '@/components/motion/ScrollWords'

export default function Overview({ c }: { c: MediaContent['overview'] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionEyebrow label={c.eyebrow} color={RED} className="mb-14" />
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">{c.title}</h2>
            <ScrollWords className="text-slate-300 leading-relaxed mb-5 text-sm" text={c.p1} />
            <p className="text-slate-400 leading-relaxed text-sm">{c.p2}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {c.platforms.map((p, i) => (
              <div
                key={p.name}
                className="p-5 rounded-xl mchan"
                style={{ ['--pa' as string]: p.color, ['--i' as string]: i, background: `color-mix(in srgb, ${p.color} 2%, transparent)`, border: `1px solid color-mix(in srgb, ${p.color} 9%, transparent)` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold" style={{ color: p.color }}>{p.name}</div>
                  <span className="mchan__bars" aria-hidden="true"><i /><i /><i /><i /></span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
                <span className="mchan__rule" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
