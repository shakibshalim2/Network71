import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function QualityCompliance({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ORANGE }}>{c.supplyChain.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.supplyChain.title}</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">{c.supplyChain.lead}</p>
          </div>

          {/* Flow */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {['Supplier', 'Manufacturing', 'QC & Testing', 'Packing', 'Distribution'].map((stage, i) => (
              <div key={stage} className="relative">
                <div className="p-5 rounded-xl text-center border border-white/8" style={{ background: 'var(--fill-2)' }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-xs font-bold text-fg"
                    style={{ background: ORANGE, color: 'var(--s0)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="text-white text-xs font-semibold">{stage}</div>
                </div>
                {i < 4 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2 z-10 w-4 h-4 items-center justify-center -translate-y-1/2">
                    <svg className="w-4 h-4" style={{ color: ORANGE }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl border border-white/6" style={{ background: 'var(--fill-1)' }}>
              <h3 className="font-display text-xl text-white mb-3">{c.supplyChain.sourcingTitle}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{c.supplyChain.sourcingLead}</p>
              <div className="space-y-2">
                {['Local Bangladesh raw materials (primary)', 'Imported specialty ingredients (supplementary)', 'Approved supplier audits and quality agreements', 'Dual-source strategy for critical ingredients'].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-slate-500">
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: ORANGE, color: 'var(--s0)' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-7 rounded-2xl border border-white/6" style={{ background: 'var(--fill-1)' }}>
              <h3 className="font-display text-xl text-white mb-3">{c.supplyChain.distributionTitle}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{c.supplyChain.distributionLead}</p>
              <div className="space-y-2">
                {[
                  'Bangladesh domestic retail (modern & traditional trade)',
                  'Export consolidation via Dhaka and Chittagong',
                  'Cold-chain distribution for temperature-sensitive products',
                  'Halal-export documentation and compliance',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-slate-500">
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: ORANGE, color: 'var(--s0)' }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
