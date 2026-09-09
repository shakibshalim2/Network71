import SectionEyebrow from '@/components/sector/SectionEyebrow'
import ArrowLink from '@/components/sector/ArrowLink'
import type { MediaContent } from '../content/en'
import { RED, BG_DEEP } from '../theme'

export default function Advertising({ c }: { c: MediaContent['advertising'] }) {
  return (
    <section className="py-24" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionEyebrow label={c.eyebrow} color={RED} center className="mb-5" />
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">{c.lead}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {c.items.map((opt) => (
            <div key={opt.title} className="p-7 rounded-2xl flex flex-col" style={{ background: 'var(--fill-1)', border: `1px solid color-mix(in srgb, ${opt.color} 15%, transparent)` }}>
              <div className="inline-block self-start px-3 py-1 rounded-full text-[10px] font-semibold mb-5" style={{ background: `color-mix(in srgb, ${opt.color} 8%, transparent)`, color: opt.color }}>
                {opt.tag}
              </div>
              <h3 className="font-display text-xl text-white mb-4">{opt.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed flex-1 mb-7">{opt.desc}</p>
              <ArrowLink to="#sector-contact" color={opt.color}>{c.cta}</ArrowLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
