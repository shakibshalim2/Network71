import type { EShipeContent } from "../content/en"
import { BG_DEEP, OCEAN } from "../theme"

export default function WhyEShipe({ c }: { c: EShipeContent["why"] }) {
  return (
    <section className="py-24" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-16">
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
            style={{ color: OCEAN }}
          >
            {c.eyebrow}
          </span>
          <h2 className="font-display text-4xl lg:text-5xl text-white mt-5 mb-4">
            {c.title}
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
            {c.description}
          </p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((item, i) => (
            <article
              key={item.title}
              className="p-6 rounded-xl es-why"
              style={{ ["--pa" as string]: item.color, ["--i" as string]: i, background: "var(--fill-1)", border: "var(--border-subtle)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="es-why__icon">{item.icon}</span>
                <span className="es-cat__idx font-mono">0{i + 1}</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              <span className="es-svc__rule" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
