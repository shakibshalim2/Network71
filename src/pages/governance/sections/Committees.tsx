import type { GovernanceContent } from '../content/en'

export default function Committees({ c }: { c: GovernanceContent['committees'] }) {
  return (
    <section className="bg-navy-dark border-y border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">{c.title}</h2>
          <p className="text-slate-400 max-w-2xl">
            {c.lead}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {c.items.map((item) => (
            <div key={item.name} className="border border-white/8 rounded-xl p-8 bg-navy/60 hover:border-gold/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.desc}</p>
              <div className="pt-4 border-t border-white/8">
                <span className="text-xs text-slate-500 font-medium">{c.mandateLabel}</span>
                <p className="text-slate-400 text-sm mt-1">{c.mandateBody}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
