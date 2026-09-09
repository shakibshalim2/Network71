import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Overview({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_ALT }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-14">
          <div className="h-px w-10" style={{ background: ACCENT }} />
          <span
            className="font-mono text-[9px] tracking-[0.35em] uppercase"
            style={{ color: ACCENT }}
          >
            {c.copy.Overview.eyebrow}
          </span>
        </div>
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* left */}
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {c.copy.Overview.title}
            </h2>
            <p className="text-slate-300 leading-relaxed mb-5 text-sm">
              {c.copy.Overview.lead}
            </p>
            <p className="text-slate-400 leading-relaxed text-sm">
              {c.copy.Overview.ctaPrimary}
            </p>
          </div>
          {/* right: capability pillars */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                title: "Enterprise Software",
                desc: "ERP, HRM, CRM, inventory, and workflow automation at group level.",
                icon: "◻",
              },
              {
                title: "AI & Machine Learning",
                desc: "Recommendation systems, NLP, computer vision, and predictive analytics.",
                icon: "◻",
              },
              {
                title: "Cloud & Infrastructure",
                desc: "Multi-cloud architecture, DevOps, containerisation, and SRE practices.",
                icon: "◻",
              },
              {
                title: "Cybersecurity",
                desc: "Threat modelling, pen testing, OWASP compliance, and data protection.",
                icon: "◻",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="p-5 rounded-xl"
                style={{
                  background: "rgba(34,211,238,0.04)",
                  border: "1px solid rgba(34,211,238,0.12)",
                }}
              >
                <div
                  className="text-xs font-bold mb-3"
                  style={{ color: ACCENT }}
                >
                  {p.icon} {p.title}
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
