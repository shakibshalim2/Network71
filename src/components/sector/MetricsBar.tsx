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
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8">
          {metrics.map((m, i) => (
            <div key={i} className="px-6 py-8 text-center">
              <div
                className="font-display text-3xl lg:text-4xl mb-1"
                style={{ color: accentHex }}
              >
                {m.value}
              </div>
              <div className="font-mono text-[10px] font-semibold tracking-[0.22em] uppercase text-slate-400 mb-0.5">{m.label}</div>
              {m.desc && <div className="font-mono text-[9px] text-slate-600 tracking-[0.12em]">{m.desc}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
