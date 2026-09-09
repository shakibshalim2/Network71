import type { MediaContent } from '../content/en'
import { RED, BG_DEEP } from '../theme'

export default function Hero({ c }: { c: MediaContent['hero'] }) {
  return (
    <section className="sector-hero relative min-h-screen flex items-center overflow-hidden" style={{ background: BG_DEEP }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(239,68,68,0.012) 3px, rgba(239,68,68,0.012) 4px)', opacity: 0.8 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(239,68,68,0.08) 1px, transparent 1px)', backgroundSize: '36px 36px', opacity: 0.5 }}
      />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] rounded-full blur-[200px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,150,42,0.07) 0%, transparent 70%)' }} />

      <div className="media-intro-strip">{c.strip} <span>{c.stripSub}</span></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-40">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-12" style={{ background: RED }} />
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: RED }}>{c.eyebrow}</span>
          </div>

          <h1 className="font-display leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
            <span style={{ color: 'var(--fg)' }}>{c.title1}</span>
            <br />
            <span style={{ background: `linear-gradient(135deg, ${RED} 0%, #F97316 60%, ${RED} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {c.title2}
            </span>
          </h1>

          <p className="text-slate-300 leading-relaxed mb-12 max-w-2xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>{c.lead}</p>

          <div className="flex flex-wrap gap-4 mb-20">
            <a href="#sector-contact" className="px-8 py-3.5 font-semibold text-sm rounded-lg transition-all hover:opacity-90" style={{ background: RED, color: 'var(--s0)' }}>
              {c.ctaPrimary}
            </a>
            <a href="#programmes" className="px-8 py-3.5 border text-sm font-medium text-white rounded-lg hover:bg-white/5 transition-colors" style={{ borderColor: `color-mix(in srgb, ${RED} 31%, transparent)` }}>
              {c.ctaSecondary}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-8 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: RED, boxShadow: `0 0 10px ${RED}, 0 0 20px color-mix(in srgb, ${RED} 38%, transparent)`, animation: 'pulse-slow 2s ease-in-out infinite' }} />
              <span className="font-mono text-[10px] text-white tracking-[0.2em] uppercase font-semibold">{c.live}</span>
            </div>
            <div className="h-5 w-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
            {c.stats.map((m) => (
              <div key={m.l}>
                <div className="font-display text-3xl mb-0.5" style={{ color: RED }}>{m.v}</div>
                <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-8 lg:right-16 hidden lg:block opacity-25" style={{ fontFamily: 'monospace', fontSize: '11px', color: RED, lineHeight: 1.8 }}>
        <div>{c.terminal.command}</div>
        {c.terminal.checks.map((line) => (
          <div key={line} style={{ color: 'var(--accent-green)' }}>&#10003; {line}</div>
        ))}
        <div className="animate-pulse">&#9646; {c.terminal.status}</div>
      </div>
    </section>
  )
}
