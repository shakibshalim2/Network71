import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'

export default function Overview({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                {c.sectionCopy.overviewEyebrow}
              </span>
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-fg mb-3">{c.copy.overviewTitle}</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              {c.sectionCopy.overviewLead}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* {c.overview.oilsTitle} card */}
            <div
              className="rounded-2xl p-8 bg-surface-2 border hover:shadow-2xl transition-all duration-300 group"
              style={{ borderColor: `color-mix(in srgb, ${AMBER} 15%, transparent)` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `color-mix(in srgb, ${AMBER} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${AMBER} 15%, transparent)` }}
                >
                  <svg className="w-7 h-7" style={{ color: AMBER }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: AMBER }}>{c.copy.divisionA}</div>
                  <h3 className="font-display text-2xl text-fg">{c.overview.oilsTitle}</h3>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {c.sectionCopy.oilsBody}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {['HACCP Certified', 'Consumer + Industrial', '1M+ L/Month', '5 Oil Varieties'].map((tag) => (
                  <div
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{ background: `color-mix(in srgb, ${AMBER} 6%, transparent)`, color: 'var(--accent-amber)' }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="border-t pt-5" style={{ borderColor: `color-mix(in srgb, ${AMBER} 9%, transparent)` }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{c.copy.valueChain}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
                  {['Sourcing', 'Refining', 'Blending', '{c.copy.packaging}', 'Distribution'].map((s, i, arr) => (
                    <span key={s} className="flex items-center gap-1.5">
                      <span>{s}</span>
                      {i < arr.length - 1 && <span className="font-bold" style={{ color: AMBER }}>›</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Energy & Fuel card */}
            <div
              className="rounded-2xl p-8 bg-surface-2 border hover:shadow-2xl transition-all duration-300 group"
              style={{ borderColor: `color-mix(in srgb, ${SKY} 15%, transparent)` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `color-mix(in srgb, ${SKY} 8%, transparent)`, border: `1px solid color-mix(in srgb, ${SKY} 15%, transparent)` }}
                >
                  <svg className="w-7 h-7" style={{ color: SKY }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1" style={{ color: SKY }}>{c.copy.divisionB}</div>
                  <h3 className="font-display text-2xl text-fg">{c.overview.energyTitle}</h3>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {c.sectionCopy.fuelBody}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {c.overview.energyTags.map((tag) => (
                  <div
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg"
                    style={{ background: `color-mix(in srgb, ${SKY} 6%, transparent)`, color: 'var(--accent-sky)' }}
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="border-t pt-5" style={{ borderColor: `color-mix(in srgb, ${SKY} 9%, transparent)` }}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{c.copy.valueChain}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
                  {['Procurement', 'Storage', 'Distribution', 'Logistics', 'Client Delivery'].map((s, i, arr) => (
                    <span key={s} className="flex items-center gap-1.5">
                      <span>{s}</span>
                      {i < arr.length - 1 && <span className="font-bold" style={{ color: SKY }}>›</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
