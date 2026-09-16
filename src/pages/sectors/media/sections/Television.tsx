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
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full mtv__status" style={{ ['--pa' as string]: item.color, color: item.color, background: `color-mix(in srgb, ${item.color} 8%, transparent)` }}>
                      <i className="mtv__status-dot" aria-hidden="true" />{item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-widest uppercase mb-5" style={{ color: 'var(--fg-muted)' }}>{c.scheduleTitle}</div>
            <ol className="mepg">
              <span className="mepg__now" aria-hidden="true" />
              {c.programmes.map((prog, i) => (
                <li
                  key={prog.title}
                  className="mepg__row"
                  style={{ ['--pa' as string]: prog.color, ['--i' as string]: i }}
                >
                  <span className="mepg__time font-mono">{prog.time}</span>
                  <span className="mepg__dot" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold mepg__title">{prog.title}</div>
                    <div className="text-slate-500 text-[11px]">{prog.format}</div>
                  </div>
                  <span className="mepg__idx font-mono">{String(i + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 text-slate-600 text-xs font-mono">{c.scheduleNote}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
