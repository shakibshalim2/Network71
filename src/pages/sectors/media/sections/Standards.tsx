import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { MediaContent } from '../content/en'
import { BG_ALT } from '../theme'

const GREEN = 'var(--accent-green)'

export default function Standards({ c }: { c: MediaContent['standards'] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionEyebrow label={c.eyebrow} color={GREEN} className="mb-6" />
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">{c.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{c.lead}</p>
          </div>
          <div className="space-y-4">
            {c.items.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl" style={{ background: 'rgba(74,222,128,0.04)', border: '1px solid rgba(74,222,128,0.12)' }}>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: GREEN }} />
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
