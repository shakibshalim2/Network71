import type { OilsEnergyContent } from '../content/en'
import { AMBER, SKY } from '../theme'

export default function SupplyChain({ c }: { c: OilsEnergyContent }) {
  return (
      <section className="py-24 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
              <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: AMBER }}>
                {c.sectionCopy.supplyEyebrow}
              </span>
              <div className="h-px w-8" style={{ background: AMBER, color: 'var(--s0)' }} />
            </div>
            <h2 className="font-display text-4xl text-fg mb-3">{c.supply.title}</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              {c.sectionCopy.supplyLead}
            </p>
          </div>

          {/* Horizontal flow visual */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-0 right-0 h-px hidden lg:block" style={{ background: 'linear-gradient(to right, #f59e0b60, #10b98160, #0ea5e960)' }} />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {c.supplyChainNodes.map((node, i) => (
                <div key={node.label} className="flex flex-col items-center text-center relative">
                  {/* Node circle */}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4 z-10 text-white font-bold text-lg font-display shadow-lg"
                    style={{ background: node.color, color: 'var(--s0)', border: '4px solid var(--s2)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="font-semibold text-fg text-sm mb-1">{node.label}</div>
                  <div className="text-slate-500 text-xs">{node.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SVG decorative network map */}
          <div className="mt-14 rounded-2xl overflow-hidden border border-slate-200 bg-surface-2 p-6">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">{c.copy.supplySchematic}</div>
            <svg viewBox="0 0 800 260" className="w-full" style={{ maxHeight: 260 }}>
              {/* Background */}
              <rect width="800" height="260" fill="#f8fafc" rx="12" />

              {/* Processing hub */}
              <circle cx="400" cy="130" r="36" fill={AMBER} opacity="0.15" />
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
              ].map((dc) => (
                <g key={dc.label}>
                  <line x1="400" y1="130" x2={dc.x} y2={dc.y} stroke={SKY} strokeWidth="1.5" strokeDasharray="5,4" opacity="0.5" />
                  <circle cx={dc.x} cy={dc.y} r="18" fill={SKY} opacity="0.15" />
                  <circle cx={dc.x} cy={dc.y} r="12" fill={SKY} />
                  <text x={dc.x} y={dc.y + 4} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">{dc.label}</text>
                </g>
              ))}

              {/* Legend */}
              <circle cx="30" cy="240" r="6" fill={AMBER} />
              <text x="42" y="244" fill="#64748b" fontSize="9">{c.copy.processingPlant}</text>
              <circle cx="140" cy="240" r="6" fill={SKY} />
              <text x="152" y="244" fill="#64748b" fontSize="9">{c.copy.distributionCentres}</text>
            </svg>
          </div>
        </div>
      </section>

  )
}
