import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import ProcessLine from "@/components/motion/ProcessLine"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Roadmap({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-10" style={{ background: ACCENT }} />
          <span
            className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
            style={{ color: ACCENT }}
          >
            {c.copy.Roadmap.eyebrow}
          </span>
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-white mb-4 leading-tight">
          {c.copy.Roadmap.title}
        </h2>
        <p className="text-slate-400 text-sm mb-14 max-w-xl leading-relaxed">
          {c.copy.Roadmap.lead}
        </p>
        <ProcessLine steps={c.roadmapItems.length} accent={ACCENT} className="sroadv sroadv--it">
          <ol className="sroadv__list">
            {c.roadmapItems.map((item, i) => (
              <li key={item.year} className="sroadv__item" style={{ ["--i" as string]: i, ["--pa" as string]: i < 2 ? ACCENT : PURPLE }}>
                <div className="sroadv__year font-display">{item.year}</div>
                <div className="sroadv__card">
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </ProcessLine>
      </div>
    </section>
  )
}
