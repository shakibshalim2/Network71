import type { EShipeContent } from "../content/en"
import { BG_ALT, OCEAN } from "../theme"

export default function Services({ c }: { c: EShipeContent["services"] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <i className="h-px w-8" style={{ background: OCEAN }} />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: OCEAN }}
            >
              {c.eyebrow}
            </span>
            <i className="h-px w-8" style={{ background: OCEAN }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white mb-4">
            {c.title}
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            {c.description}
          </p>
        </header>
        <div className="grid md:grid-cols-2 gap-5">
          {c.items.map((item, i) => (
            <article
              key={item.title}
              className="p-7 rounded-2xl es-svc"
              style={{ ["--pa" as string]: item.color, ["--i" as string]: i, background: "var(--fill-1)", border: "var(--border-subtle)" }}
            >
              <span className="es-svc__ghost font-display" aria-hidden="true">0{i + 1}</span>
              <div className="es-svc__icon">{item.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              <span className="es-svc__rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
