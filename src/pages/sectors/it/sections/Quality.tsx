import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"

export default function Quality({ c }: { c: ITContent }) {
  return (
    <section className="py-24" style={{ background: BG_DEEP }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-px w-10"
                style={{ background: "var(--accent-emerald)" }}
              />
              <span
                className="font-mono text-[9px] tracking-[0.35em] uppercase"
                style={{ color: "var(--accent-emerald)" }}
              >
                {c.copy.Quality.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {c.copy.Quality.title}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              {c.copy.Quality.lead}
            </p>
            <a
              href="#sector-contact"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: "var(--accent-emerald)" }}
            >
              {c.copy.Quality.ctaPrimary}
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: "ISO 27001",
                status: "In Progress",
                desc: "Information security management standard — certification in progress.",
                color: "var(--accent-amber)",
              },
              {
                title: "OWASP Top 10 Compliance",
                status: "Active",
                desc: "Every application is assessed and hardened against the OWASP Top 10 vulnerabilities.",
                color: "var(--accent-emerald)",
              },
              {
                title: "Penetration Testing",
                status: "Active",
                desc: "Regular third-party pen testing across all customer-facing and internal platforms.",
                color: "var(--accent-emerald)",
              },
              {
                title: "Code Review Process",
                status: "Active",
                desc: "Mandatory peer review, static analysis, and security linting in every CI pipeline.",
                color: "var(--accent-emerald)",
              },
              {
                title: "SOC Compliance Roadmap",
                status: "Planned",
                desc: "SOC 2 Type II compliance roadmap aligned to Ezyify enterprise launch timeline.",
                color: ACCENT,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-5 rounded-xl"
                style={{
                  background: "var(--fill-1)",
                  border: "var(--border-subtle)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white font-semibold text-sm">
                      {item.title}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{
                        background: `color-mix(in srgb, ${item.color} 9%, transparent)`,
                        color: item.color,
                      }}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
