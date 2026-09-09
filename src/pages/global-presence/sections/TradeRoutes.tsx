import type { GlobalPresenceContent } from '../content/en'

export default function TradeRoutes({ c }: { c: GlobalPresenceContent['routes'] }) {
  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {c.lead}
          </p>
        </div>
        <div className="space-y-4">
          {c.items.map((r) => (
            <div key={r.from + r.to} className="grid grid-cols-1 sm:grid-cols-[1fr_1.3fr_1fr] items-center gap-3 bg-navy-light rounded-xl px-5 py-4 border border-white/8">
              <div className="text-white font-medium text-sm">{r.from}</div>
              <div className="flex items-center gap-2">
                <div className={`h-0.5 flex-1 bg-gradient-to-r ${r.color} rounded-full`} />
                <div className="text-slate-500 text-xs whitespace-nowrap px-2">{r.via}</div>
                <div className={`h-0.5 flex-1 bg-gradient-to-r ${r.color} rounded-full`} />
                <svg className={`w-4 h-4 bg-gradient-to-r ${r.color} rounded-full text-navy flex-shrink-0`} style={{ padding: "2px" }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="text-slate-300 font-medium text-sm sm:text-right">{r.to}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
