import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'

export default function Sustainability({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: 'var(--accent-emerald)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium text-emerald-600">
                {c.sectionCopy.sustainabilityEyebrow}
              </span>
              <div className="h-px w-8" style={{ background: 'var(--accent-emerald)' }} />
            </div>
            <h2 className="font-display text-4xl text-fg mb-3">{c.sustainability.title}</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              {c.sectionCopy.sustainabilityLead}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Oils sustainability */}
            <div className="bg-surface-2 rounded-2xl p-8 border" style={{ borderColor: `color-mix(in srgb, ${AMBER} 13%, transparent)` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in srgb, ${AMBER} 8%, transparent)` }}>
                  <svg className="w-5 h-5" style={{ color: AMBER }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-fg">{c.copy.oilsSustainability}</h3>
              </div>
              <div className="space-y-5">
                {c.sustainabilityOils.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-sm font-medium text-fg">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.pct}%</div>
                    </div>
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.pct}%`, background: AMBER }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-400">{item.target}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Energy sustainability */}
            <div className="bg-surface-2 rounded-2xl p-8 border" style={{ borderColor: `color-mix(in srgb, ${SKY} 13%, transparent)` }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in srgb, ${SKY} 8%, transparent)` }}>
                  <svg className="w-5 h-5" style={{ color: SKY }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-fg">{c.copy.fuelSustainability}</h3>
              </div>
              <div className="space-y-5">
                {c.sustainabilityEnergy.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="text-sm font-medium text-fg">{item.label}</div>
                      <div className="text-xs text-slate-500">{item.pct}%</div>
                    </div>
                    <div className="h-2 bg-sky-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${item.pct}%`, background: SKY }}
                      />
                    </div>
                    <div className="text-[11px] text-slate-400">{item.target}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
