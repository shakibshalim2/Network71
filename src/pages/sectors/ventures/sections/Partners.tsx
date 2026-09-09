import SectionEyebrow from '@/components/sector/SectionEyebrow'
import type { VenturesContent } from '../content/en'
import { INDIGO, BG_ALT } from '../theme'

export default function Partners({ c }: { c: VenturesContent['partners'] }) {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: BG_ALT }}>
      <div className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full blur-[180px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)' }} />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
          <div>
            <SectionEyebrow label={c.eyebrow} color={INDIGO} className="mb-6" />
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">{c.title}</h2>
            <p className="text-slate-400 leading-relaxed text-sm mb-8">{c.lead}</p>
            <a href="#sector-contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:opacity-90" style={{ background: INDIGO, color: 'var(--s0)' }}>
              {c.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.items.map((p, i) => (
              <div key={p.title} className="p-6 rounded-2xl" style={{ background: 'var(--fill-1)', border: '1px solid var(--line)' }}>
                <div className="font-mono text-[10px] mb-4" style={{ color: INDIGO }}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-semibold text-white text-sm mb-2">{p.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
