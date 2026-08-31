interface Step {
  title: string
  desc: string
}

interface ProcessFlowProps {
  steps: Step[]
  accentHex: string
  label?: string
}

export default function ProcessFlow({ steps, accentHex, label = 'Production Workflow' }: ProcessFlowProps) {
  return (
    <section className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8" style={{ background: accentHex }} />
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: accentHex }}>
            {label}
          </span>
        </div>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                {/* Step number + connector */}
                <div className="flex items-center mb-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-navy"
                    style={{ background: accentHex }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="flex-1 h-px mx-2" style={{ background: `${accentHex}40` }} />
                  )}
                </div>
                <div className="pr-4">
                  <div className="text-white font-semibold text-sm mb-1">{step.title}</div>
                  <div className="text-slate-500 text-xs leading-relaxed">{step.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-navy"
                  style={{ background: accentHex }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 my-2" style={{ background: `${accentHex}30` }} />
                )}
              </div>
              <div className="pb-6">
                <div className="text-white font-semibold text-sm mb-1">{step.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
