import type { EShipeContent } from "../content/en"
import { BG_DEEP, OCEAN } from "../theme"

export default function Categories({ c }: { c: EShipeContent["categories"] }) {
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
          <p className="text-slate-400 text-sm">{c.description}</p>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {c.items.map((item) => (
            <article
              key={item.name}
              className="p-5 rounded-xl transition-transform hover:-translate-y-1 focus-within:ring-2 focus-within:ring-sky-400"
              style={{
                background: "var(--fill-1)",
                border: "var(--border-subtle)",
              }}
            >
              <div className="text-xl mb-4" style={{ color: item.color }}>
                ⬡
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">
                {item.name}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {item.desc}
              </p>
              <a href="#listings"
                className="text-[10px] font-mono uppercase"
                style={{ color: item.color }}
              >
                {c.available}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
