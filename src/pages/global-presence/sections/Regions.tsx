import type { GlobalPresenceContent } from '../content/en'

export default function Regions({ c }: { c: GlobalPresenceContent['regions'] }) {
  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {c.lead}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((r) => (
            <div key={r.name} className="bg-navy-dark rounded-xl p-6 border border-white/8 hover:border-gold/20 transition-colors">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                  {r.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{r.name}</h3>
                  <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${r.tagColor}`}>
                    {r.tag}
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{r.desc}</p>
              <ul className="space-y-1.5">
                {r.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-slate-300 text-xs">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/8">
                <span className="text-slate-500 text-xs">{c.countriesNote}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
