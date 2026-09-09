import SectionEyebrow from '@/components/sector/SectionEyebrow'
import ArrowLink from '@/components/sector/ArrowLink'
import type { MediaContent } from '../content/en'
import { RED, BG_ALT } from '../theme'

export default function Gallery({ c }: { c: MediaContent['gallery'] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <SectionEyebrow label={c.eyebrow} color={RED} className="mb-3" />
            <h2 className="font-display text-4xl text-white">{c.title}</h2>
          </div>
          <ArrowLink to="/gallery" color={RED} className="font-medium">{c.cta}</ArrowLink>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.items.map((item) => (
            <div key={item.img} className="group relative rounded-xl overflow-hidden aspect-[3/2]">
              <img src={item.img} alt={item.label} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(175deg, transparent 40%, rgba(3,6,8,0.88) 100%)' }} />
              <div className="absolute inset-0 rounded-xl border border-white/[0.06] group-hover:border-white/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-mono text-[10px] tracking-wider uppercase" style={{ color: 'rgba(239,68,68,0.75)' }}>{c.brand}</div>
                <div className="text-white text-sm font-semibold">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-slate-600 text-xs font-mono">{c.note}</p>
      </div>
    </section>
  )
}
