import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'

export default function Hero({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="oil-hero force-dark sector-hero relative flex flex-col overflow-hidden">
        {/* Two half backgrounds */}
        <div className="absolute inset-0 flex">
          {/* Left — {c.overview.oilsTitle} (amber) */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=700&h=800&fit=crop&auto=format"
              alt={c.hero.edibleImageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, rgba(120,53,15,0.82) 0%, rgba(245,158,11,0.45) 60%, transparent 100%)' }}
            />
          </div>
          {/* Right — Energy & Fuel (sky blue / dark) */}
          <div className="flex-1 relative overflow-hidden">
            <div className="energy-blueprint" aria-hidden="true"><svg viewBox="0 0 400 700" fill="none"><path d="M35 650V360h100v290M150 650V270h65v380M240 650V410h125v240M163 270V95h39v175M48 360V210h28v150M90 360V250h26v110M30 590h345M30 550h345M135 450h105M75 210h75v110h90M0 680h400" stroke="currentColor" strokeWidth="2"/><path d="M0 120h400M0 220h400M0 320h400M0 420h400M0 520h400M50 0v700M150 0v700M250 0v700M350 0v700" stroke="currentColor" strokeWidth=".5" opacity=".3"/></svg></div>
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to left, rgba(3,27,78,0.88) 0%, rgba(14,165,233,0.35) 60%, transparent 100%)' }}
            />
          </div>
        </div>

        {/* Left label — {c.overview.oilsTitle} */}
        <div className="oil-side absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-10 max-w-[220px]">
          <div
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase mb-3 px-3 py-1 rounded-full"
            style={{ background: `color-mix(in srgb, ${AMBER} 13%, transparent)`, color: AMBER, border: `1px solid color-mix(in srgb, ${AMBER} 27%, transparent)` }}
          >
            {c.copy.divisionA}
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-white leading-snug mb-2">
            {c.hero.edibleTitle.split('\n')[0]}<br />
            <span style={{ color: AMBER }}>{c.hero.edibleTitle.split('\n')[1]}</span>
          </h2>
          <p className="text-amber-100/70 text-xs leading-relaxed">
            {c.hero.edibleLead}
          </p>
        </div>

        {/* Right label — Energy & Fuel */}
        <div className="oil-side absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-10 max-w-[220px] text-right">
          <div
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase mb-3 px-3 py-1 rounded-full"
            style={{ background: `color-mix(in srgb, ${SKY} 13%, transparent)`, color: SKY, border: `1px solid color-mix(in srgb, ${SKY} 27%, transparent)` }}
          >
            {c.copy.divisionB}
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-white leading-snug mb-2">
            {c.hero.energyTitle}<br />
            <span style={{ color: SKY }}>{c.hero.fuelTitle}</span>
          </h2>
          <p className="text-sky-100/70 text-xs leading-relaxed">
            {c.hero.energyLead}
          </p>
        </div>

        {/* Center badge */}
        <div className="oil-intro absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div
            className="flex flex-col items-center text-center px-8 py-7 rounded-2xl"
            style={{
              background: 'rgba(10,20,50,0.82)',
              border: 'var(--border-strong)',
              backdropFilter: 'blur(18px)',
            }}
          >
            {/* N71 badge */}
            <div className="w-14 h-14 bg-gold rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <span className="text-on-brand font-bold text-base font-display tracking-tight">{c.hero.brand}</span>
            </div>
            <div
              className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2"
              style={{ color: AMBER }}
            >
              {c.hero.division}
            </div>
            <h1 className="font-display text-2xl lg:text-3xl text-white leading-tight tracking-[-0.02em] mb-3">
              {c.hero.title}
            </h1>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `color-mix(in srgb, ${AMBER} 13%, transparent)`, color: AMBER, border: `1px solid color-mix(in srgb, ${AMBER} 25%, transparent)` }}
              >
                {c.overview.oilsTitle}
              </span>
              <span className="text-white/30 text-xs">·</span>
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `color-mix(in srgb, ${SKY} 13%, transparent)`, color: SKY, border: `1px solid color-mix(in srgb, ${SKY} 25%, transparent)` }}
              >
                {c.overview.energyTitle}
              </span>
            </div>
            <a
              href="#sector-contact"
              className="pointer-events-auto px-6 py-2.5 text-fg text-xs font-bold rounded-lg transition-all hover:opacity-90"
              style={{ background: AMBER, color: 'var(--s0)' }}
            >
              {c.hero.cta}
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-50">
          <div className="w-px h-8 bg-white/40" />
          <span className="text-white text-[9px] tracking-widest uppercase">{c.hero.scroll}</span>
        </div>
      </section>

  )
}
