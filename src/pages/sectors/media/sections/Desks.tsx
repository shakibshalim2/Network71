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
          {c.items.map((cat) => (
            <div
              key={cat.title}
              className="group p-7 rounded-2xl cursor-default transition-all duration-300"
              style={{ background: 'var(--fill-1)', border: 'var(--border-subtle)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px color-mix(in srgb, ${cat.color} 13%, transparent)`
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${cat.color} 25%, transparent)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-lg font-bold"
                style={{ background: `color-mix(in srgb, ${cat.color} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${cat.color} 19%, transparent)`, color: cat.color }}
              >
                ◈
              </div>
              <h3 className="font-semibold text-white text-sm mb-3">{cat.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{cat.desc}</p>
              <div className="mt-5 h-px w-8 transition-all duration-300 group-hover:w-16" style={{ background: cat.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
