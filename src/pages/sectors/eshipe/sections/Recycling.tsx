import type { EShipeContent } from "../content/en"
import { BG_ALT, OCEAN } from "../theme"

export default function Recycling({ c }: { c: EShipeContent["recycling"] }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-16">
          <span
            className="font-mono text-[9px] tracking-[0.35em] uppercase"
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
        <div className="grid md:grid-cols-2 gap-5">
          {c.items.map((item) => (
            <article
              key={item.title}
              className="p-6 rounded-xl"
              style={{
                background: "var(--fill-1)",
                border: "var(--border-subtle)",
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-[10px] font-mono mt-0.5">
                    {item.body}
                  </p>
                </div>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{
                    background: `color-mix(in srgb, ${item.statusColor} 8%, transparent)`,
                    color: item.statusColor,
                  }}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
