import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"

export default function SupplyChain({
  c,
}: {
  c: GarmentsContent["supplyChain"]
}) {
  return (
    <section className="py-24 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: ACCENT }} />
            <span
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: ACCENT }}
            >
              {c.eyebrow}
            </span>
            <div className="h-px w-10" style={{ background: ACCENT }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-4">
            Integrated {c.eyebrow}
            <br />
            {c.title2}
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Based in Bangladesh — the world&apos;s second-largest garment
            exporter — Network71 operates a vertically integrated supply chain
            connecting global raw material suppliers to international buyers
            across 15+ countries.
          </p>
        </div>

        {/* Supply chain flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch mb-12">
          {[
            {
              icon: "🌾",
              title: "Raw Material Suppliers",
              items: [
                "Certified fabric mills",
                "Trim & accessory suppliers",
                "Sustainable fibre sources",
              ],
            },
            null,
            {
              icon: "🏭",
              title: "N71 Factories",
              items: [
                "Pattern & cutting",
                "Sewing & assembly",
                "Washing & finishing",
              ],
            },
            null,
            {
              icon: "✈️",
              title: "Export & Logistics",
              items: [
                "QC lab clearance",
                "Customs documentation",
                "Freight to buyer",
              ],
            },
          ].map((col, i) => {
            if (col === null) {
              return (
                <div key={i} className="flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-slate-300 hidden md:block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )
            }
            return (
              <div
                key={col.title}
                className="p-6 rounded-2xl border border-slate-100 bg-surface-2 hover:border-rose-100 hover:shadow-lg transition-all text-center"
              >
                <div className="text-3xl mb-4">{col.icon}</div>
                <h3 className="font-display text-base text-fg mb-3">
                  {col.title}
                </h3>
                <ul className="space-y-1.5">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="text-xs text-slate-500 flex items-center gap-2 justify-center"
                    >
                      <div
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: ACCENT }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Bangladesh context */}
        <div
          className="p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-5"
          style={{
            background: `color-mix(in srgb, ${ACCENT} 2%, transparent)`,
            border: `1px solid color-mix(in srgb, ${ACCENT} 8%, transparent)`,
          }}
        >
          <div className="text-4xl">🇧🇩</div>
          <div className="flex-1">
            <h4 className="font-semibold text-fg text-sm mb-1">
              {c.bangladeshTitle}
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Bangladesh is the world&apos;s second-largest apparel exporter,
              providing Network71 with access to one of the deepest pools of
              skilled garment workers, established textile infrastructure, and
              competitive production economics.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
