import type { GovernanceContent } from '../content/en'
import { pillarIcons } from '../icons'

export default function Framework({ c }: { c: GovernanceContent['framework'] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">{c.title}</h2>
        <p className="text-slate-400 max-w-2xl">
          {c.lead}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {c.pillars.map((p) => (
          <div key={p.icon} className="bg-navy-light border border-white/8 rounded-xl p-6 hover:border-gold/30 transition-colors group">
            <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold/20 transition-colors">
              {pillarIcons[p.icon]}
            </div>
            <h3 className="text-white font-semibold text-lg mb-3">{p.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
