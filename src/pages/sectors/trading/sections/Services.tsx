import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Services({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.servicesEyebrow}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.copy.servicesTitle}</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">{c.copy.servicesLead}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {c.tradeServices.map((svc, i) => (
              <div
                key={svc.title}
                className="p-8 rounded-2xl border ssvc"
                style={{ ['--pa' as string]: BLUE, ['--i' as string]: i, borderColor: `color-mix(in srgb, ${BLUE} 9%, transparent)` }}
              >
                <span className="ssvc__rule mb-5" aria-hidden="true" style={{ display: 'block' }} />
                <h3 className="font-display text-xl text-fg mb-3">{svc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{svc.desc}</p>
                <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                  {svc.items.map((item, j) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-slate-500 ssvc__item" style={{ ['--j' as string]: j }}>
                      <span className="ssvc__tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path pathLength="1" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
