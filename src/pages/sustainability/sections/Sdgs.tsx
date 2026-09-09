import type { SustainabilityContent } from '../content/en'

export default function Sdgs({ c }: { c: SustainabilityContent['sdgs'] }) {
  return (
    <section className="py-24 px-6 bg-navy-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">{c.lead}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((sdg) => (
            <div key={sdg.color} className="bg-navy rounded-xl p-6 border border-white/8 hover:border-gold/20 transition-colors group">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl ${sdg.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-[#fff] font-display font-bold text-lg">{sdg.number}</span>
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-1">{c.tagPrefix} {sdg.number}</div>
                  <h3 className="text-white font-semibold text-sm leading-snug">{sdg.title}</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{sdg.desc}</p>
            </div>
          ))}
          {/* Filler card to balance grid */}
          <div className="bg-navy rounded-xl p-6 border border-white/5 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-3">{c.fillerEmoji}</div>
              <p className="text-slate-400 text-sm">{c.filler}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
