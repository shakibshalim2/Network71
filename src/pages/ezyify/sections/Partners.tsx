import { Link } from "react-router-dom"
import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"

export default function Partners({ c }: { c: EzyifyContent["partners"] }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: BG }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-4xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{c.lead}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {c.items.map((card) => (
            <div
              key={card.audience}
              className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 duration-300 flex flex-col"
              style={{ backgroundColor: SURFACE }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-2xl mb-6`}
              >
                {card.icon}
              </div>
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{
                  background: `linear-gradient(135deg, #A855F7, #EC4899)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {card.audience}
              </p>
              <h3 className="font-display text-white text-xl font-semibold mb-3">
                {card.headline}
              </h3>
              <p
                className="text-slate-400 text-sm leading-relaxed flex-1 mb-8"
                dangerouslySetInnerHTML={{ __html: card.desc }}
              />
              {card.href ? (
                <Link
                  to={card.href}
                  className={`w-full py-3 rounded-xl text-sm font-semibold text-white text-center bg-gradient-to-r ${card.gradient} hover:opacity-90 transition-opacity`}
                >
                  {card.cta}
                </Link>
              ) : (
                <button
                  className={`w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${card.gradient} hover:opacity-90 transition-opacity`}
                >
                  {card.cta} — Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
