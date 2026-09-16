import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'

export default function SupplyChain({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: AMBER }}>
                {c.sectionCopy.supplyEyebrow}
              </span>
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-fg mb-3">{c.supply.title}</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              {c.sectionCopy.supplyLead}
            </p>
          </div>

          {/* Horizontal flow — line draws, nodes pop in sequence */}
          <div className="snodes" style={{ ['--pa' as string]: AMBER }}>
            <span className="snodes__line hidden lg:block" aria-hidden="true" />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {c.supplyChainNodes.map((node, i) => (
                <div key={node.label} className="snodes__item flex flex-col items-center text-center relative" style={{ ['--i' as string]: i, ['--nc' as string]: node.color }}>
                  <div className="snodes__disc font-display">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-semibold text-fg text-sm mb-1">{node.label}</div>
                  <div className="text-slate-500 text-xs">{node.sub}</div>
                </div>
              ))}
            </div>
          </div>
          {/* SVG decorative network map */}
          <div className="mt-14 rounded-2xl overflow-hidden border border-[var(--line)] bg-surface-2 p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-4">{c.copy.supplySchematic}</div>
            <svg viewBox="0 0 800 260" className="w-full snet" style={{ maxHeight: 260 }}>
              {/* Processing hub — pulses */}
              <circle className="snet__pulse" cx="400" cy="130" r="36" fill={AMBER} opacity="0.15" />
              <circle cx="400" cy="130" r="22" fill={AMBER} />
              <text x="400" y="134" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{c.copy.plant}</text>

              {/* Distribution centres — arranged in a ring */}
              {[
                { x: 140, y: 60, label: 'DC 1' },
                { x: 280, y: 40, label: 'DC 2' },
                { x: 520, y: 40, label: 'DC 3' },
                { x: 660, y: 60, label: 'DC 4' },
                { x: 700, y: 180, label: 'DC 5' },
                { x: 560, y: 210, label: 'DC 6' },
                { x: 240, y: 210, label: 'DC 7' },
                { x: 100, y: 180, label: 'DC 8' },
              ].map((dc, i) => (
                <g key={dc.label} className="snet__spoke" style={{ ['--i' as string]: i }}>
                  <line className="snet__line" pathLength="1" x1="400" y1="130" x2={dc.x} y2={dc.y} stroke={SKY} strokeWidth="1.5" opacity="0.5" />
                  <circle className="snet__packet" r="3.5" fill={AMBER}>
                    <animateMotion dur="3.2s" begin={`${1.6 + i * 0.4}s`} repeatCount="indefinite" path={`M400,130 L${dc.x},${dc.y}`} />
                  </circle>
                  <circle className="snet__halo" cx={dc.x} cy={dc.y} r="18" fill={SKY} opacity="0.15" />
                  <circle className="snet__dc" cx={dc.x} cy={dc.y} r="12" fill={SKY} />
                  <text x={dc.x} y={dc.y + 4} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">{dc.label}</text>
                </g>
              ))}

              {/* Legend */}
              <circle cx="30" cy="240" r="6" fill={AMBER} />
              <text x="42" y="244" fill="var(--fg-subtle)" fontSize="9">{c.copy.processingPlant}</text>
              <circle cx="140" cy="240" r="6" fill={SKY} />
              <text x="152" y="244" fill="var(--fg-subtle)" fontSize="9">{c.copy.distributionCentres}</text>
            </svg>
          </div>
        </div>
      </section>

  )
}
