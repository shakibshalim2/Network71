import { Link } from "react-router-dom"
import type { ITContent } from "../content/en"
import { ACCENT, PURPLE, BG_DEEP, BG_ALT } from "../theme"
import ProjectPreview from "./ProjectPreview"

export default function Projects({ c }: { c: ITContent }) {
  return (
    <section
      id="selected-work"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: BG_ALT }}
    >
      <div
        className="absolute -top-48 left-1/2 -translate-x-1/2 w-[760px] h-[420px] rounded-full blur-[160px] pointer-events-none"
        style={{ background: "rgba(34,211,238,.055)" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_.75fr] gap-8 items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: ACCENT }} />
              <span
                className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: ACCENT }}
              >
                {c.copy.Projects.eyebrow}
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-6xl text-white leading-[1.08] mb-5">
              {c.copy.Projects.title}
              <br />
              {c.copy.Projects.lead}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {c.copy.Projects.ctaPrimary}
            </p>
          </div>
          <div className="lg:text-right">
            <a
              href="#sector-contact"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{
                background: ACCENT,
                color: "var(--s0)",
                boxShadow: "0 12px 35px rgba(34,211,238,.16)",
              }}
            >
              {c.copy.Projects.ctaSecondary}
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
                  d="M5 12h14m-6-6 6 6-6 6"
                />
              </svg>
            </a>
            <p className="text-slate-600 text-xs mt-3">
              {c.copy.Projects.detailPrimary}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {c.showcaseProjects.map((project, index) => (
            <article
              key={project.title}
              className="group rounded-2xl overflow-hidden it-proj"
              style={{
                background: "var(--fill-1)",
                border: "var(--border-subtle)",
              }}
            >
              <ProjectPreview project={project} c={c} />
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.25em]"
                    style={{ color: project.color }}
                  >
                    {project.eyebrow}
                  </span>
                  <span className="font-mono text-[9px] text-slate-600">
                    0{index + 1}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl text-white mb-1">
                      {project.title}
                    </h3>
                    <p
                      className="text-xs font-medium"
                      style={{ color: project.color }}
                    >
                      {project.category}
                    </p>
                  </div>
                  <Link
                    to={project.href}
                    aria-label={`View ${project.title} project`}
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1"
                    style={{
                      border: `1px solid color-mix(in srgb, ${project.color} 25%, transparent)`,
                      color: project.color,
                    }}
                  >
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
                        d="M5 12h14m-6-6 6 6-6 6"
                      />
                    </svg>
                  </Link>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="px-3 py-1.5 rounded-full text-[10px] text-slate-400"
                      style={{
                        background: "var(--fill-2)",
                        border: "var(--border-subtle)",
                      }}
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="mt-8 p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          style={{
            background: `linear-gradient(120deg, color-mix(in srgb, ${ACCENT} 5%, transparent), color-mix(in srgb, ${PURPLE} 5%, transparent))`,
            border: "1px solid rgba(34,211,238,.14)",
          }}
        >
          <div>
            <div className="text-white font-semibold mb-1">
              {c.copy.Projects.detailSecondary}
            </div>
            <p className="text-slate-400 text-sm">
              {c.copy.Projects.detailTertiary}
            </p>
          </div>
          <a
            href="#sector-contact"
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-semibold whitespace-nowrap"
            style={{
              color: ACCENT,
              border: `1px solid color-mix(in srgb, ${ACCENT} 27%, transparent)`,
            }}
          >
            {c.copy.Projects.footnote}
          </a>
        </div>
      </div>
    </section>
  )
}
