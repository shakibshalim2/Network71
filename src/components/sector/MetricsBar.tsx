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
            <div key={i} className="min-w-0 px-3 sm:px-6 py-7 sm:py-9 text-center">
              <div
                className="font-display text-[28px] sm:text-4xl lg:text-[44px] mb-2.5 break-words leading-none tracking-[-0.02em]"
                style={{ color: accentHex }}
              >
                {m.value}
              </div>
              <div className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-fg-muted mb-1.5">{m.label}</div>
              {m.desc && <div className="text-[13px] text-fg-subtle leading-relaxed">{m.desc}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
