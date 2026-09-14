import type { LeadershipContent } from "../content/en";

export default function Board({ c }: { c: LeadershipContent["board"] }) {
  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {c.lead}
          </p>
        </div>

        <div className="bg-navy-dark rounded-2xl p-10 border border-white/8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <div className="inline-block px-4 py-1.5 bg-amber-500/15 text-amber-400 border border-amber-500/25 mb-5 font-mono text-[9px] tracking-wide uppercase rounded-full">
            {c.badge}
          </div>
          <h3 className="text-white font-semibold text-xl mb-3">{c.cardTitle}</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            {c.cardBody}
          </p>
        </div>
      </div>
    </section>
  );
}
