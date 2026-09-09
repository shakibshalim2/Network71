import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Services({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: BLUE }}>{c.copy.servicesEyebrow}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.copy.servicesTitle}</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">{c.copy.servicesLead}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {c.tradeServices.map((svc) => (
              <div
                key={svc.title}
                className="p-8 rounded-2xl border hover:shadow-lg transition-all"
                style={{ borderColor: `color-mix(in srgb, ${BLUE} 9%, transparent)` }}
              >
                <div
                  className="inline-block h-0.5 w-10 mb-5 rounded-full"
                  style={{ background: BLUE, color: 'var(--s0)' }}
                />
                <h3 className="font-display text-xl text-fg mb-3">{svc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{svc.desc}</p>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {svc.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BLUE, color: 'var(--s0)' }} />
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
