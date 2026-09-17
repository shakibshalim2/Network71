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
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {c.items.map((item, i) => (
            <article
              key={item.name}
              className="p-5 rounded-xl focus-within:ring-2 focus-within:ring-sky-400 es-cat"
              style={{ ["--pa" as string]: item.color, ["--i" as string]: i, background: "var(--fill-1)", border: "var(--border-subtle)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="es-cat__hex" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path pathLength="1" d="M12 2l8.5 5v10L12 22l-8.5-5V7z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                </span>
                <span className="es-cat__idx font-mono">0{i + 1}</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{item.name}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{item.desc}</p>
              <a href="#listings" className="es-cat__link font-mono">
                {c.available}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
