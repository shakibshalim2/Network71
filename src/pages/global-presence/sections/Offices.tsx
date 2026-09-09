import type { GlobalPresenceContent } from '../content/en'

export default function Offices({ c }: { c: GlobalPresenceContent['offices'] }) {
  return (
    <section className="py-20 px-6 bg-navy-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="bg-navy rounded-xl p-6 border border-gold/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gold/15 border border-gold/25 flex items-center justify-center">
                <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-gold font-semibold uppercase tracking-wider">{c.hqLabel}</div>
                <div className="text-white font-semibold">{c.hqCity}</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              {c.hqDesc}
            </p>
          </div>
          <div className="bg-navy rounded-xl p-6 border border-white/8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{c.regionalLabel}</div>
                <div className="text-white font-semibold">{c.regionalValue}</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              {c.regionalDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
