import type { ITContent } from "../content/en"

export default function ProjectPreview({
  project,
  c,
}: {
  project: ITContent["showcaseProjects"][number]
  c: ITContent
}) {
  const rows =
    project.preview === "media"
      ? [82, 58, 72]
      : project.preview === "maritime"
        ? [68, 86, 54]
        : [76, 62, 88]

  return (
    <div
      className="relative h-64 sm:h-72 overflow-hidden"
      style={{
        background: `radial-gradient(circle at 85% 0%, color-mix(in srgb, ${project.color} 19%, transparent), transparent 48%), #050d18`,
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute left-6 right-6 top-8 rounded-xl overflow-hidden shadow-2xl"
        style={{
          border: "var(--border-strong)",
          background: "rgba(3,8,18,.94)",
          transform: "perspective(900px) rotateX(2deg) rotateY(-3deg)",
        }}
      >
        <div
          className="h-8 flex items-center gap-1.5 px-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,.07)" }}
        >
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: dot === 0 ? project.color : "rgba(148,163,184,.28)",
              }}
            />
          ))}
          <div
            className="ml-3 h-3 flex-1 max-w-40 rounded-full"
            style={{ background: "rgba(148,163,184,.08)" }}
          />
        </div>
        <div className="grid grid-cols-[64px_1fr] min-h-44">
          <div
            className="p-3 space-y-3"
            style={{ borderRight: "1px solid rgba(255,255,255,.06)" }}
          >
            <div
              className="w-7 h-7 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.color2})`,
              }}
            />
            {[70, 52, 62, 45].map((width) => (
              <div
                key={width}
                className="h-1 rounded-full"
                style={{
                  width: `${width}%`,
                  background: "rgba(148,163,184,.16)",
                }}
              />
            ))}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div
                  className="h-2 w-20 rounded-full mb-2"
                  style={{ background: project.color }}
                />
                <div
                  className="h-1.5 w-28 rounded-full"
                  style={{ background: "rgba(148,163,184,.18)" }}
                />
              </div>
              <div
                className="w-14 h-5 rounded-md"
                style={{
                  background: `color-mix(in srgb, ${project.color} 15%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${project.color} 27%, transparent)`,
                }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {rows.map((height, index) => (
                <div
                  key={height}
                  className="rounded-lg p-2"
                  style={{
                    height,
                    background:
                      index === 0
                        ? `color-mix(in srgb, ${project.color} 9%, transparent)`
                        : "rgba(255,255,255,.035)",
                    border: "var(--border-subtle)",
                  }}
                >
                  <div
                    className="h-1.5 w-2/3 rounded-full mb-2"
                    style={{
                      background:
                        index === 0 ? project.color : "rgba(148,163,184,.18)",
                    }}
                  />
                  <div
                    className="h-1 w-full rounded-full mb-1"
                    style={{ background: "rgba(148,163,184,.10)" }}
                  />
                  <div
                    className="h-1 w-3/4 rounded-full"
                    style={{ background: "rgba(148,163,184,.08)" }}
                  />
                </div>
              ))}
            </div>
            <div
              className="h-7 rounded-lg flex items-center px-2 gap-2"
              style={{
                background: "var(--fill-1)",
                border: "var(--border-subtle)",
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: `color-mix(in srgb, ${project.color} 38%, transparent)`,
                }}
              />
              <div
                className="h-1 w-1/2 rounded-full"
                style={{ background: "rgba(148,163,184,.14)" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-4 right-5 px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[0.18em] font-semibold backdrop-blur-md"
        style={{
          color: project.color,
          background: "rgba(3,8,18,.78)",
          border: `1px solid color-mix(in srgb, ${project.color} 21%, transparent)`,
        }}
      >
        {c.copy.ProjectPreview.productInterface}
      </div>
    </div>
  )
}
