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
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: ACCENT }}
            >
              {c.eyebrow}
            </span>
            <div className="h-px w-10" style={{ background: ACCENT }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-4">
            {c.title1}
            <br />
            {c.title2}
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            {c.lead}
          </p>
        </div>

        {/* Supply chain corridor — a particle travels the drawn line between nodes */}
        <ol className="schain"  style={{ ["--pa" as string]: ACCENT }}>
          <span className="schain__line" aria-hidden="true"><span className="schain__particle" /></span>
          {c.columns.map((col, i) => (
            <li key={col.title} className="schain__node" style={{ ["--i" as string]: i }}>
              <span className="schain__idx font-mono">0{i + 1}</span>
              <span className="schain__icon">{col.icon}</span>
              <h3 className="font-display text-base text-fg mb-3">{col.title}</h3>
              <ul className="schain__items">
                {col.items.map((item) => (
                  <li key={item}>
                    <span className="schain__dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* Bangladesh context */}
        <div
          className="p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-5 schain__note"
          style={{
            ["--pa" as string]: ACCENT,
            background: `color-mix(in srgb, ${ACCENT} 2%, transparent)`,
            border: `1px solid color-mix(in srgb, ${ACCENT} 8%, transparent)`,
          }}
        >
          <div className="text-4xl schain__flag">🇧🇩</div>
          <div className="flex-1">
            <h4 className="font-semibold text-fg text-sm mb-1">
              {c.bangladeshTitle}
            </h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              {c.bangladeshLead}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
