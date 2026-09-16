import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import ProcessLine from "@/components/motion/ProcessLine"

export default function Roadmap({
  c,
}: {
  c: GarmentsContent["roadmap"]
}) {
  return (
    <section className="py-24 bg-surface-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-px w-10"
                style={{ background: ACCENT, color: "var(--s0)" }}
              />
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight">
              {c.title1}
              <br />
              {c.title2}
            </h2>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed lg:pt-2">
            {c.lead}
          </p>
        </div>

        {/* Timeline — line draws with scroll, nodes light as it passes */}
        <ProcessLine steps={c.items.length} accent={ACCENT} className="sroad">
          <ol className="sroad__list">
            {c.items.map((item, i) => (
              <li key={item.year} className="sroad__item" style={{ ["--i" as string]: i }}>
                <div className="sroad__node font-display" style={{ ["--pa" as string]: ACCENT }}>
                  {item.year.slice(2)}
                </div>
                <div className="sroad__year font-mono">{item.year}</div>
                <h3 className="font-display text-lg text-fg sroad__title">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed sroad__desc">{item.desc}</p>
                <span className="sroad__ghost font-display" aria-hidden="true">{item.year.slice(2)}</span>
              </li>
            ))}
          </ol>
        </ProcessLine>
      </div>
    </section>
  )
}
