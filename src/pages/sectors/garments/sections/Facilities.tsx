import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"

export default function Facilities({
  c,
}: {
  c: GarmentsContent['facilities']
}) {
  return (
    <section className="py-24 bg-surface-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[9px] tracking-[0.35em] uppercase"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-6">
              {c.title1}
              <br />
              {c.title2}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              {c.lead}
            </p>

            {/* Facility stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {c.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-slate-100 text-center bg-surface-1"
                >
                  <div
                    className="font-display text-xl text-fg mb-1"
                    style={{ color: ACCENT }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-fg text-[11px] font-semibold mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-slate-400 text-[10px]">{stat.sub}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 italic">
              {c.note}
            </p>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-2xl overflow-hidden h-52">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop&auto=format"
                alt={c.alts[0]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-44">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=350&fit=crop&auto=format"
                alt={c.alts[1]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-44">
              <img
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=350&fit=crop&auto=format"
                alt={c.alts[2]}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
