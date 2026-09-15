import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import ProcessLine from "@/components/motion/ProcessLine"

export default function Roadmap({ c }: { c: AgricultureContent["roadmap"] }) {
  return (
    <section className="py-24 bg-surface-1 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: GREEN }}
            >
              {c.eyebrow}
            </span>
            <div
              className="h-px w-8"
              style={{ background: GREEN, color: "var(--s0)" }}
            />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">
            {c.title}
          </h2>
        </div>

        {/* Timeline — draws with scroll */}
        <ProcessLine steps={c.items.length} accent={GREEN} className="sroad">
          <ol className="sroad__list" style={{ ["--cols" as string]: c.items.length }}>
            {c.items.map((r, i) => (
              <li key={r.year} className="sroad__item" style={{ ["--i" as string]: i }}>
                <div className="sroad__node sroad__node--sm font-display" style={{ ["--pa" as string]: GREEN }}>
                  {r.year.slice(2)}
                </div>
                <div className="sroad__year font-mono">{r.year}</div>
                <h3 className="font-display text-lg text-fg sroad__title leading-tight">{r.milestone}</h3>
                <p className="text-slate-500 text-sm leading-relaxed sroad__desc">{r.desc}</p>
                <span className="sroad__ghost font-display" aria-hidden="true">{r.year.slice(2)}</span>
              </li>
            ))}
          </ol>
        </ProcessLine>
      </div>
    </section>
  )
}
