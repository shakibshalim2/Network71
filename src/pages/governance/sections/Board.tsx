import type { GovernanceContent } from '../content/en'

export default function Board({ c }: { c: GovernanceContent['board'] }) {
  return (
    <section className="bg-navy-dark border-y border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <h2 className="font-display text-3xl lg:text-4xl text-white mb-12">{c.title}</h2>
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/15 rounded-2xl bg-navy/40">
          <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
            <svg className="w-9 h-9 text-gold opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-4">{c.badge}</span>
          <p className="text-white font-display text-2xl mb-2">{c.cardTitle}</p>
          <p className="text-slate-400 text-sm max-w-sm text-center">
            {c.cardBody}
          </p>
        </div>
      </div>
    </section>
  )
}
