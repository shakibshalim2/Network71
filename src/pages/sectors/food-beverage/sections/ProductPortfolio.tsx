import { useState } from 'react'
import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function ProductPortfolio({ c }: { c: FoodBeverageContent }) {
  const [activeCategory, setActiveCategory] = useState('processed')
  const activeProduct = c.productCategories.find((item) => item.id === activeCategory)!
  return (
      <section id="product-portfolio" className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: ORANGE }}>{c.products.eyebrow}</span>
              <div className="h-px w-8" style={{ background: ORANGE, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg mb-4">{c.products.title}</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">{c.products.lead}</p>
          </div>

          {/* Tab bar */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {c.productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                style={
                  activeCategory === cat.id
                    ? { background: ORANGE, color: 'var(--s0)' }
                    : { background: 'var(--s2)', color: 'var(--fg-muted)', border: '1px solid #e2e8f0' }
                }
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active category panel */}
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-surface-2 rounded-2xl p-8 border border-slate-100">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{activeProduct.icon}</span>
                <h3 className="font-display text-2xl text-fg">{activeProduct.label}</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{activeProduct.desc}</p>
              <div className="space-y-3">
                {activeProduct.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 py-3 border-b border-slate-100">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{ background: `color-mix(in srgb, ${ORANGE} 8%, transparent)` }}
                    >
                      <svg className="w-3.5 h-3.5" style={{ color: ORANGE }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category grid overview */}
            <div className="grid grid-cols-2 gap-4">
              {c.productCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="p-5 rounded-xl text-left transition-all border"
                  style={
                    activeCategory === cat.id
                      ? { background: `color-mix(in srgb, ${ORANGE} 6%, transparent)`, borderColor: ORANGE }
                      : { background: 'var(--s2)', borderColor: '#f1f5f9' }
                  }
                >
                  <div className="text-2xl mb-2">{cat.icon}</div>
                  <div className="font-semibold text-sm text-fg mb-1">{cat.label}</div>
                  <div className="text-[11px] text-slate-400">{cat.items.length} product lines</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

  )
}
