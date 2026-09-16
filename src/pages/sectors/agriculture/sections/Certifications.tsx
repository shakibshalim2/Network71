import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"

export default function Certifications({
  c,
}: {
  c: AgricultureContent["supplyChain"]
}) {
  return (
    <section className="py-24 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: GREEN }}
            >
              {c.eyebrow}
            </span>
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">
            {c.title}
          </h2>
        </div>

        {/* Farm → hub → buyer corridor */}
        <ol className="schain schain--triptych" style={{ ["--pa" as string]: GREEN }}>
          <span className="schain__line" aria-hidden="true"><span className="schain__particle" /></span>
          <li className="schain__node" style={{ ["--i" as string]: 0 }}>
            <span className="schain__idx font-mono">01</span>
            <span className="schain__icon">🌱</span>
            <h3 className="font-display text-xl text-fg mb-3">{c.farmerTitle}</h3>
            <ul className="schain__items">
              {c.farmerPoints.map((item) => (<li key={item}><span className="schain__dot" />{item}</li>))}
            </ul>
          </li>
          <li className="schain__node is-hub" style={{ ["--i" as string]: 1 }}>
            <span className="schain__idx font-mono">02</span>
            <span className="schain__icon schain__icon--solid">🏭</span>
            <h3 className="font-display text-xl text-fg mb-3">{c.hubTitle}</h3>
            <div className="schain__chips">
              {c.hubPoints.map((item) => (<span key={item} className="schain__chip">{item}</span>))}
            </div>
          </li>
          <li className="schain__node" style={{ ["--i" as string]: 2 }}>
            <span className="schain__idx font-mono">03</span>
            <span className="schain__icon">🌍</span>
            <h3 className="font-display text-xl text-fg mb-3">{c.buyerTitle}</h3>
            <ul className="schain__items">
              {c.buyerPoints.map((item) => (<li key={item}><span className="schain__dot" />{item}</li>))}
            </ul>
          </li>
        </ol>
      </div>
    </section>
  )
}
