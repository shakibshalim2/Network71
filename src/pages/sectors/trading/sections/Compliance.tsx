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
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: BLUE }}>{c.copy.complianceEyebrow}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">{c.copy.complianceTitle}</h2>
              <p className="text-slate-400 leading-relaxed mb-6">{c.copy.complianceLead}</p>
              <p className="text-slate-400 leading-relaxed">{c.copy.complianceDetail}</p>
            </div>
            {/* Compliance badge grid */}
            <div>
              <ol className="sseal" style={{ ['--pa' as string]: BLUE }}>
                {c.complianceDocs.map((doc, i) => (
                  <li key={doc} className="sseal__item" style={{ ['--i' as string]: i }}>
                    <span className="sseal__mark" aria-hidden="true">
                      <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" pathLength="1" /></svg>
                      <svg className="sseal__tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path pathLength="1" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </span>
                    <span className="sseal__label">{doc}</span>
                    <span className="sseal__idx font-mono">{String(i + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

  )
}
