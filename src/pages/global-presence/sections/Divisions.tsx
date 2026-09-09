import { Link } from 'react-router-dom'
import type { GlobalPresenceContent } from '../content/en'

export default function Divisions({ c }: { c: GlobalPresenceContent['divisions'] }) {
  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((d) => (
            <Link
              key={d.href}
              to={d.href}
              className="bg-navy-dark rounded-xl p-5 border border-white/8 hover:border-gold/25 transition-colors group block"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                  {d.icon}
                </div>
                <h3 className="text-white font-medium group-hover:text-gold transition-colors">{d.name}</h3>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{d.focus}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
