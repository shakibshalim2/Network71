import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Compliance({ c }: { c: TradingContent }) {
  return (
      <section className="py-24 bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${BLUE} 0, ${BLUE} 1px, transparent 1px, transparent 80px)`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
                <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: BLUE }}>{c.copy.complianceEyebrow}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">{c.copy.complianceTitle}</h2>
              <p className="text-slate-400 leading-relaxed mb-6">{c.copy.complianceLead}</p>
              <p className="text-slate-400 leading-relaxed">{c.copy.complianceDetail}</p>
            </div>
            {/* Compliance badge grid */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                {c.complianceDocs.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                    style={{ borderColor: `color-mix(in srgb, ${BLUE} 15%, transparent)`, background: `color-mix(in srgb, ${BLUE} 3%, transparent)` }}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: BLUE }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-slate-300 text-xs font-medium">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

  )
}
