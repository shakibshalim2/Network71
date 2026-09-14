import type { GlobalPresenceContent } from '../content/en'
import WorldMapSVG from '../map/WorldMapSVG'

export default function WorldMap({ c }: { c: GlobalPresenceContent['map'] }) {
  return (
    <section className="py-20 px-6 bg-navy">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">{c.eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3 tracking-[-0.02em]">{c.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            {c.lead}
          </p>
        </div>
        <div className="bg-navy-dark rounded-2xl p-6 sm:p-10 border border-white/8 overflow-hidden">
          <WorldMapSVG cities={c.cities} arcs={c.arcs} />
        </div>
        <p className="text-slate-500 text-xs text-center mt-4">
          {c.footnote}
        </p>
      </div>
    </section>
  )
}
