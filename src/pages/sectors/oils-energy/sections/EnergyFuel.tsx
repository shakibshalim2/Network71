import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'
import { icons } from '../icons'

export default function EnergyFuel({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: SKY, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: SKY }}>
                {c.overview.energyTitle} — Distribution Capabilities
              </span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl text-white mb-3">
                  8 Centres.<br />
                  <span style={{ color: SKY }}>{c.copy.fuelTagline}</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                  {c.sectionCopy.fuelLead}
                </p>
              </div>
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-xl flex-shrink-0"
                style={{ background: `color-mix(in srgb, ${SKY} 7%, transparent)`, border: `1px solid color-mix(in srgb, ${SKY} 19%, transparent)` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: SKY, color: 'var(--s0)' }} />
                <span className="text-xs font-semibold" style={{ color: SKY }}>{c.copy.fuelSafety}</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {c.fuelCapabilities.map((cap) => (
              <div
                key={cap.title}
                className="rounded-2xl p-7"
                style={{ background: 'var(--fill-2)', border: `1px solid color-mix(in srgb, ${SKY} 13%, transparent)` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `color-mix(in srgb, ${SKY} 8%, transparent)`, color: SKY }}
                >
                  {icons[cap.iconId]}
                </div>
                <h3 className="font-display text-xl text-white mb-3">{cap.title}</h3>
                <ul className="space-y-2 mb-6">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-xs text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: SKY, color: 'var(--s0)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: `color-mix(in srgb, ${SKY} 9%, transparent)` }}
                >
                  <div>
                    <div className="font-display text-2xl" style={{ color: SKY }}>{cap.stat}</div>
                    <div className="text-slate-500 text-[11px]">{cap.statLabel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  )
}
