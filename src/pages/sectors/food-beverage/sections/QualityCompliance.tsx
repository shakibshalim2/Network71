import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function QualityCompliance({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.supplyChain.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">{c.supplyChain.title}</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">{c.supplyChain.lead}</p>
          </div>

          {/* Flow conveyor */}
          <div className="sflow mb-12" style={{ ['--pa' as string]: ORANGE }}>
            <ol className="sflow__track">
              <span className="sflow__line" aria-hidden="true" />
              {['Supplier', 'Manufacturing', 'QC & Testing', 'Packing', 'Distribution'].map((stage, i, arr) => (
                <li key={stage} className={`sflow__stage${i === 0 || i === arr.length - 1 ? ' is-end' : ''}`} style={{ ['--i' as string]: i }}>
                  <span className="sflow__node" aria-hidden="true" />
                  <span className="sflow__label"><span className="font-mono" style={{ opacity: 0.6, marginRight: 8 }}>{String(i + 1).padStart(2, '0')}</span>{stage}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-7 rounded-2xl border border-white/6" style={{ background: 'var(--fill-1)' }}>
              <h3 className="font-display text-xl text-white mb-3">{c.supplyChain.sourcingTitle}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{c.supplyChain.sourcingLead}</p>
              <div className="space-y-2">
                {c.supplyChain.sourcingItems.map((item) => (
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
                {c.supplyChain.distributionItems.map((item) => (
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
