import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"

export default function Audience({ c }: { c: EzyifyContent["audience"] }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-4xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{c.lead}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.items.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors"
              style={{ backgroundColor: BG }}
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center text-2xl mb-6`}
              >
                {s.icon}
              </div>
              <h3 className="font-display text-2xl text-white mb-1">
                {s.title}
              </h3>
              <p className="text-slate-400 text-sm mb-5">{s.headline}</p>
              <ul className="space-y-3 mb-8">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 flex-shrink-0 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span dangerouslySetInnerHTML={{ __html: p }} />
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${s.gradient} hover:opacity-90 transition-opacity`}
              >
                {s.cta} — Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
