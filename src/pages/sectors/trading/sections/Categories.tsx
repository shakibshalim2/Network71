import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'
import { tradeIcons } from '../icons'

export default function Categories({ c }: { c: TradingContent }) {
  return (
      <section id="trade-categories" className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: BLUE }}>{c.copy.categoriesEyebrow}</span>
              <div className="h-px w-8" style={{ background: BLUE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.copy.categoriesTitle}</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">{c.copy.categoriesLead}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.tradeCategories.map((cat) => (
              <div
                key={cat.name}
                className="bg-surface-2 p-7 rounded-2xl border-l-4 hover:shadow-xl transition-all group cursor-default"
                style={{ borderColor: BLUE }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${BLUE} 7%, transparent)`, color: BLUE }}
                >
                  {tradeIcons[cat.iconId]}
                </div>
                <h3 className="font-display text-lg text-fg mb-1.5">{cat.name}</h3>
                <p className="text-xs font-medium mb-3" style={{ color: BLUE }}>{cat.volume}</p>
                <p className="text-slate-400 text-xs">Trade lanes: {cat.lanes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
