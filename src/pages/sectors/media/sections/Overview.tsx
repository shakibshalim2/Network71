import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { MediaContent } from '../content/en'
import { RED, BG_ALT } from '../theme'

export default function Overview({ c }: { c: MediaContent['overview'] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionEyebrow label={c.eyebrow} color={RED} className="mb-14" />
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">{c.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-5 text-sm">{c.p1}</p>
            <p className="text-slate-400 leading-relaxed text-sm">{c.p2}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {c.platforms.map((p) => (
              <div
                key={p.name}
                className="p-5 rounded-xl"
                style={{ background: `color-mix(in srgb, ${p.color} 2%, transparent)`, border: `1px solid color-mix(in srgb, ${p.color} 9%, transparent)` }}
              >
                <div className="text-xs font-bold mb-3" style={{ color: p.color }}>◻ {p.name}</div>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
