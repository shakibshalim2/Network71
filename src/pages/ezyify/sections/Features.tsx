import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"

export default function Features({ c }: { c: EzyifyContent["features"] }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: BG }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-pink-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-4xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{c.lead}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl p-7 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 duration-300"
              style={{ backgroundColor: SURFACE }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: "rgba(124,58,237,0.04)" }}
              />
              <div
                className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-xl text-white mb-5`}
              >
                {f.sym}
              </div>
              <h3 className="relative text-white font-semibold text-base mb-2">
                {f.title}
              </h3>
              <p className="relative text-slate-400 text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
