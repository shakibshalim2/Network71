import type { SustainabilityContent } from '../content/en'

// Numeric stats read well huge; word/phrase stats need a smaller size.
const isPhrase = (s: string) => s.length > 6

export default function Programs({ c }: { c: SustainabilityContent['programs'] }) {
  const headlineSize = isPhrase(c.headlineStat) ? 'text-3xl sm:text-4xl' : 'text-5xl sm:text-6xl'
  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
        </div>

        <div className="text-center mb-14">
          <div className="inline-flex flex-col items-center bg-gold/10 border border-gold/20 rounded-2xl px-12 py-8">
            <span className={`${headlineSize} font-display font-bold text-gold mb-2`}>{c.headlineStat}</span>
            <span className="text-white font-medium text-lg">{c.headlineLabel}</span>
            <span className="text-slate-400 text-sm mt-1">{c.headlineSub}</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {c.items.map((p) => (
            <div key={p.color} className="bg-navy rounded-xl p-5 border border-white/8 hover:border-white/15 transition-colors">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl mb-4`}>
                {p.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-2">{p.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">{p.desc}</p>
              <div className="border-t border-white/8 pt-3">
                <div className={`${isPhrase(p.stat) ? 'text-base' : 'text-xl'} font-display font-bold bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>{p.stat}</div>
                <div className="text-slate-500 text-xs">{p.statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
