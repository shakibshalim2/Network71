import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'

export default function Hero({ c }: { c: FoodBeverageContent }) {
  return (
      <section className="force-dark sector-hero relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img decoding="async"
            src={c.hero.image}
            alt={c.hero.imgAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,16,40,0.92) 0%, rgba(10,16,40,0.78) 50%, rgba(30,15,5,0.72) 100%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: ORANGE, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: ORANGE }}>{c.hero.eyebrow}</span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl text-white leading-[0.95] tracking-[-0.02em] mb-8">{c.hero.title1}<br />
              <span style={{ color: ORANGE }}>{c.hero.title2}</span>
            </h1>
            <p className="text-slate-300 text-xl leading-relaxed mb-10 max-w-xl">{c.hero.lead}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#sector-contact"
                className="px-8 py-4 font-semibold text-sm text-white rounded-lg transition-all hover:opacity-90 active:scale-95"
                style={{ background: ORANGE, color: 'var(--s0)' }}
              >{c.hero.ctaPrimary}</a>
              <a
                href="#product-portfolio"
                className="px-8 py-4 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
              >{c.hero.ctaSecondary}</a>
            </div>
          </div>
        </div>
        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12" style={{ background: ORANGE, color: 'var(--s0)' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: ORANGE, color: 'var(--s0)' }} />
        </div>
      </section>

  )
}
