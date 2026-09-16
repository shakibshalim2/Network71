import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import MeterBar from "@/components/sector/MeterBar"
import Magnetic from "@/components/motion/Magnetic"

export default function Sustainability({
  c,
}: {
  c: GarmentsContent["sustainability"]
}) {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                {c.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">
              {c.title1}
              <br />
              {c.title2}
            </h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              {c.p1}
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              {c.p2}
            </p>
            <Magnetic strength={8}>
              <a href="#sector-contact" className="btn btn-primary shero__cta" style={{ background: ACCENT, color: "var(--s0)", ["--pa" as string]: ACCENT }}>
                {c.cta}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>
          </div>

          {/* Right — target meters */}
          <div className="smeters" style={{ ["--pa" as string]: ACCENT }}>
            {c.targets.map((item, i) => (
              <MeterBar key={item.label} label={item.label} value={item.target} unit={item.unit} accent={ACCENT} index={i} caption={c.targetLabel} />
            ))}
            <p className="text-slate-500 text-xs mt-6 italic">{c.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
