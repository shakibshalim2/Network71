import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'

export default function Hero({ c }: { c: TradingContent }) {
  return (
      <section className="force-dark sector-hero relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&h=800&fit=crop&auto=format"
            alt={c.copy.heroImageAlt}
            className="w-full h-full object-cover"
          />
          {/* Dark navy overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,20,45,0.97) 0%, rgba(10,20,45,0.88) 55%, rgba(10,20,45,0.75) 100%)' }} />
          {/* Blue glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
          {/* Dashed trade route lines decorative */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1400 800" fill="none" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="600" x2="1400" y2="200" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="8 6" />
            <line x1="0" y1="400" x2="1400" y2="500" stroke="var(--accent-blue)" strokeWidth="1" strokeDasharray="6 8" />
            <line x1="200" y1="0" x2="800" y2="800" stroke="var(--accent-blue)" strokeWidth="0.5" strokeDasharray="4 10" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: BLUE }}>{c.copy.heroEyebrow}</span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl text-white leading-[1.05] tracking-[-0.02em] mb-6">{c.copy.heroTitle1}<br />
              <span style={{ color: BLUE }}>{c.copy.heroTitle2}</span>
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">{c.copy.heroLead}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#sector-contact"
                className="px-8 py-3.5 font-semibold text-sm text-white rounded-lg transition-all hover:opacity-90"
                style={{ background: BLUE, color: 'var(--s0)' }}
              >{c.copy.heroPrimaryCta}</a>
              <a
                href="#trade-categories"
                className="px-8 py-3.5 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
              >{c.copy.heroSecondaryCta}</a>
            </div>
          </div>

          {/* Floating stat badges */}
          <div className="absolute bottom-12 right-8 hidden lg:flex flex-col gap-3">
            {[
              { val: 'Sourcing', lab: 'Supplier & buyer matching' },
              { val: 'Trade', lab: 'Import / export management' },
              { val: 'Logistics', lab: 'Sea, air & land freight' },
            ].map((s) => (
              <div
                key={s.lab}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border"
                style={{ background: 'rgba(10,20,45,0.8)', borderColor: `color-mix(in srgb, ${BLUE} 19%, transparent)`, backdropFilter: 'blur(8px)' }}
              >
                <span className="font-display text-lg font-bold" style={{ color: BLUE }}>{s.val}</span>
                <span className="text-slate-300 text-xs">{s.lab}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
