import type { MediaContent } from '../content/en'
import { RED } from '../theme'

export default function Television({ c }: { c: MediaContent['tv'] }) {
  return (
    <section id="programmes" className="py-28 relative overflow-hidden" style={{ background: 'var(--s0)' }}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.12) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-14">
          <div
            className="flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{ border: `1px solid color-mix(in srgb, ${RED} 25%, transparent)`, background: `color-mix(in srgb, ${RED} 7%, transparent)` }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: RED, boxShadow: `0 0 8px ${RED}`, animation: 'pulse-slow 2s ease-in-out infinite' }} />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase" style={{ color: RED }}>{c.badge}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {c.title1}
              <br />
              <span style={{ background: `linear-gradient(135deg, ${RED}, #F97316)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {c.title2}
              </span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">{c.p1}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{c.p2}</p>
            <div className="mt-8 p-5 rounded-xl" style={{ background: `color-mix(in srgb, ${RED} 3%, transparent)`, border: `1px solid color-mix(in srgb, ${RED} 13%, transparent)` }}>
              <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: RED }}>{c.signalTitle}</div>
              <div className="space-y-2">
                {c.signals.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">{item.label}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: item.color, background: `color-mix(in srgb, ${item.color} 8%, transparent)` }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-widest uppercase mb-5" style={{ color: 'var(--fg-muted)' }}>{c.scheduleTitle}</div>
            <div className="space-y-2">
              {c.programmes.map((prog) => (
                <div
                  key={prog.title}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 cursor-default group"
                  style={{ background: 'var(--fill-1)', border: 'var(--border-subtle)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = `color-mix(in srgb, ${prog.color} 19%, transparent)` }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
                >
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: prog.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold">{prog.title}</div>
                    <div className="text-slate-500 text-[11px]">{prog.format}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-mono text-[10px]" style={{ color: prog.color }}>{prog.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-slate-600 text-xs font-mono">{c.scheduleNote}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
