import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { MediaContent } from '../content/en'
import { RED, BG_DEEP } from '../theme'

export default function Desks({ c }: { c: MediaContent['desks'] }) {
  return (
    <section className="py-24" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionEyebrow label={c.eyebrow} color={RED} center className="mb-5" />
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">{c.lead}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((cat, i) => (
            <div
              key={cat.title}
              className="group p-7 rounded-2xl cursor-default mdesk"
              style={{ ['--pa' as string]: cat.color, ['--i' as string]: i, background: 'var(--fill-1)', border: 'var(--border-subtle)' }}
            >
              <span className="mdesk__ghost font-display" aria-hidden="true">0{i + 1}</span>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-lg font-bold mdesk__icon" style={{ background: `color-mix(in srgb, ${cat.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${cat.color} 19%, transparent)`, color: cat.color }}>
                ◈
              </div>
              <h3 className="font-semibold text-white text-sm mb-3">{cat.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{cat.desc}</p>
              <span className="mdesk__rule" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
