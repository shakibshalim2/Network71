interface Metric {
  value: string
  label: string
  desc?: string
}

interface MetricsBarProps {
  metrics: Metric[]
  accentHex: string
  dark?: boolean
}

export default function MetricsBar({ metrics, accentHex, dark = false }: MetricsBarProps) {
  return (
    <div className={dark ? 'bg-navy-dark' : 'bg-navy-light'}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="sector-metrics grid grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={i} className="min-w-0 px-2 sm:px-6 py-6 sm:py-8 text-center">
              <div
                className="font-display text-2xl sm:text-3xl lg:text-4xl mb-2 break-words"
                style={{ color: accentHex }}
              >
                {m.value}
              </div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-fg-muted mb-1">{m.label}</div>
              {m.desc && <div className="text-xs text-fg-subtle leading-relaxed">{m.desc}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
