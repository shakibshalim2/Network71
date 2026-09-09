import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"

export default function Opportunity({
  c,
}: {
  c: GarmentsContent["opportunity"]
}) {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: ACCENT }} />
            <span
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: ACCENT }}
            >
              {c.eyebrow}
            </span>
            <div className="h-px w-10" style={{ background: ACCENT }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-4">
            {c.title1}
            <br />
            {c.title2}
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            {c.lead}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {c.buyers.map((buyer) => (
            <div
              key={buyer.title}
              className="p-8 rounded-2xl group hover:-translate-y-1 transition-all"
              style={{
                background: "var(--fill-2)",
                border: "var(--border-subtle)",
              }}
            >
              <div className="text-3xl mb-5">{buyer.icon}</div>
              <div
                className="text-[10px] font-semibold tracking-widest uppercase mb-2"
                style={{ color: ACCENT }}
              >
                {buyer.subtitle}
              </div>
              <h3 className="font-display text-2xl text-white mb-4">
                {buyer.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {buyer.desc}
              </p>
              <ul className="space-y-2 mb-8">
                {buyer.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 text-xs text-slate-300"
                  >
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: ACCENT }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href="#sector-contact"
                className="flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
                style={{ color: ACCENT }}
              >
                {buyer.cta}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
