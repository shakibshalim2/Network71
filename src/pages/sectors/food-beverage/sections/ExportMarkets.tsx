import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import Magnetic from '@/components/motion/Magnetic'

export default function ExportMarkets({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="py-24 bg-navy-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.exportMarketsCopy.eyebrow}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">{c.exportMarketsCopy.title1}<br />{c.exportMarketsCopy.title2}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{c.exportMarketsCopy.lead}</p>
              <Magnetic strength={10}>
                <a href="#sector-contact" className="btn btn-primary shero__cta" style={{ background: ORANGE, color: 'var(--s0)', ['--pa' as string]: ORANGE }}>
                  {c.exportMarketsCopy.cta}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </Magnetic>
            </div>
            <ol className="svals lg:col-span-3" style={{ ['--pa' as string]: ORANGE }}>
              {c.exportMarkets.map((market, i) => (
                <li key={market.region} className="svals__row svals__row--flag" style={{ ['--i' as string]: i }}>
                  <span className="svals__flag">{market.flag}</span>
                  <div className="svals__body">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-white text-[15px]">{market.region}</h3>
                      <span className="svals__chip font-mono">{market.priority}</span>
                    </div>
                    <p className="text-slate-400 text-[13px] leading-relaxed mb-1">{market.driver}</p>
                    <p className="text-slate-500 text-[11.5px] font-mono tracking-[0.02em]">{market.countries}</p>
                  </div>
                  <span className="svals__arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

  )
}
