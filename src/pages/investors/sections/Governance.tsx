import type { InvestorsContent } from '../content/en'
import Eyebrow from './Eyebrow'

export default function Governance({ c }: { c: InvestorsContent['governance'] }) {
  return (
    <section className="bg-navy py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow label={c.eyebrow} />
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-6 tracking-[-0.02em]">{c.title}</h2>
            <p className="text-slate-400 leading-relaxed mb-6">{c.p1}</p>
            <p className="text-slate-500 text-sm italic">{c.note}</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {c.bodies.map((body) => (
              <div key={body} className="bg-navy-light border border-white/8 rounded-xl p-6 hover:border-gold/20 transition-colors">
                <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                </div>
                <h3 className="text-white text-sm font-semibold mb-1">{body}</h3>
                <p className="text-slate-500 text-xs">{c.pending}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
