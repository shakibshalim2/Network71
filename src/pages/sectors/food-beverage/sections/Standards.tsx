import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function Standards({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.standardsCopy.eyebrow}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">{c.standardsCopy.title1}<br />{c.standardsCopy.title2}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{c.standardsCopy.lead}</p>
              <ol className="svals" style={{ ['--pa' as string]: ORANGE }}>
                {c.standards.map((s, i) => (
                  <li key={s.title} className="svals__row svals__row--badge" style={{ ['--i' as string]: i }}>
                    <span className="svals__badge font-mono">{s.badge}</span>
                    <div className="svals__body">
                      <h3 className="font-semibold text-white text-sm mb-1">{s.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                    <span className="svals__arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            {/* Quality Lab */}
            <div className="flex flex-col justify-center">
              <div className="p-8 rounded-2xl border border-white/6" style={{ background: 'var(--fill-1)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in srgb, ${ORANGE} 13%, transparent)` }}>
                    <svg className="w-5 h-5" style={{ color: ORANGE }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.7-1.27 2.4l-7.5-1.87a2.75 2.75 0 00-1.34 0L4.87 18.7c-1.3.3-2.27-1.4-1.27-2.4l1.402-1.402M5 14.5l-.75-.75" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl text-white">{c.standardsCopy.labTitle}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.standardsCopy.labLead}</p>
                <div className="space-y-3">
                  {c.standardsCopy.labItems.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: ORANGE, color: 'var(--s0)' }} />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/6 text-xs text-slate-600">{c.standardsCopy.labNote}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
