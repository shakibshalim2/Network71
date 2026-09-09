import { BG, SURFACE } from "../theme"
import type { EzyifyContent } from "../content/en"

export default function Revenue({ c }: { c: EzyifyContent["ecosystem"] }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: SURFACE }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-xs font-semibold tracking-widest uppercase mb-4">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-4xl text-white mb-4">{c.title}</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">{c.lead}</p>
        </div>

        {/* Hub-and-spoke diagram */}
        <div className="relative flex items-center justify-center mb-14">
          <div className="relative w-full max-w-2xl aspect-square max-h-[520px]">
            {/* SVG diagram */}
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full"
              aria-label="N71 ecosystem hub diagram"
            >
              {/* Spoke lines */}
              {c.spokes.map((spoke) => {
                const rad = (spoke.angle * Math.PI) / 180
                const cx = 250 + Math.cos(rad) * 168
                const cy = 250 + Math.sin(rad) * 168
                return (
                  <line
                    key={spoke.label}
                    x1="250"
                    y1="250"
                    x2={cx}
                    y2={cy}
                    stroke="rgba(168,85,247,0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                )
              })}
              {/* Centre glow */}
              <circle
                cx="250"
                cy="250"
                r="68"
                fill="url(#centreGrad)"
                opacity="0.18"
              />
              <circle
                cx="250"
                cy="250"
                r="52"
                fill="url(#centreGrad)"
                opacity="0.35"
              />
              {/* Spoke node circles */}
              {c.spokes.map((spoke) => {
                const rad = (spoke.angle * Math.PI) / 180
                const cx = 250 + Math.cos(rad) * 168
                const cy = 250 + Math.sin(rad) * 168
                return (
                  <circle
                    key={spoke.label + "-circle"}
                    cx={cx}
                    cy={cy}
                    r="36"
                    fill="var(--s1)"
                    stroke="rgba(168,85,247,0.3)"
                    strokeWidth="1"
                  />
                )
              })}
              <defs>
                <radialGradient id="centreGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent-purple)" />
                  <stop
                    offset="100%"
                    stopColor="var(--accent-pink)"
                    stopOpacity="0"
                  />
                </radialGradient>
              </defs>
            </svg>

            {/* Centre label — absolutely positioned */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center">
                <span
                  className="font-display font-bold text-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #A855F7, #EC4899, #06B6D4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ezyify
                </span>
                <span className="text-slate-500 text-[10px] mt-0.5">
                  {c.hub}
                </span>
              </div>
            </div>

            {/* Spoke labels — positioned via absolute + transform */}
            {c.spokes.map((spoke) => {
              const rad = (spoke.angle * Math.PI) / 180
              const pct_x = 50 + Math.cos(rad) * 33.6
              const pct_y = 50 + Math.sin(rad) * 33.6
              return (
                <div
                  key={spoke.label + "-label"}
                  className="absolute flex flex-col items-center pointer-events-none"
                  style={{
                    left: `${pct_x}%`,
                    top: `${pct_y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <span className="text-xl leading-none">{spoke.icon}</span>
                  <span className="text-white text-[9px] font-semibold mt-1 whitespace-nowrap">
                    {spoke.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Division cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.spokes.map((spoke) => (
            <div
              key={spoke.label}
              className="flex items-center gap-4 rounded-xl p-5 border border-white/5 hover:border-white/10 transition-colors"
              style={{ backgroundColor: BG }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.2))",
                  border: "1px solid rgba(168,85,247,0.2)",
                }}
              >
                {spoke.icon}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  {spoke.label}
                </p>
                <p className="text-slate-500 text-xs">{spoke.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
