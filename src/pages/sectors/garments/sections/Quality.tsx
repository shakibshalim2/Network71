import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"

export default function Quality({
  c,
}: {
  c: GarmentsContent["quality"]
}) {
  return (
    <section className="py-24 bg-surface-1">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: ACCENT }} />
            <span
              className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: ACCENT }}
            >
              {c.eyebrow}
            </span>
            <div className="h-px w-10" style={{ background: ACCENT }} />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-fg leading-tight mb-4">
            {c.title}
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            {c.lead}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
          {c.certifications.map((cert) => (
            <div
              key={cert.code}
              className="p-7 rounded-2xl bg-surface-2 border border-slate-100 hover:shadow-lg hover:border-rose-100 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="px-3 py-1 rounded-lg text-xs font-bold tracking-wider"
                  style={{
                    background:
                      cert.status === "active"
                        ? `color-mix(in srgb, ${ACCENT} 7%, transparent)`
                        : "rgba(251,191,36,0.12)",
                    color:
                      cert.status === "active" ? ACCENT : "var(--accent-amber)",
                  }}
                >
                  {cert.code}
                </div>
                {cert.status === "active" ? (
                  <svg
                    className="w-4 h-4"
                    style={{ color: ACCENT }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-amber-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <h3 className="font-semibold text-fg text-sm mb-2">
                {cert.name}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {cert.desc}
              </p>
              {cert.status === "progress" && (
                <div className="mt-3 text-[10px] text-amber-600 font-medium">
                  {c.progressLabel}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Audit compliance bar */}
        <div className="p-8 rounded-2xl bg-surface-2 border border-slate-100">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-display text-xl text-fg mb-2">
                {c.auditTitle}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {c.auditLead}
              </p>
            </div>
            {c.auditItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ background: ACCENT }}
                />
                <div>
                  <div className="text-fg font-semibold text-sm mb-1">
                    {item.label}
                  </div>
                  <div className="text-slate-400 text-xs">{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
