import { Link } from 'react-router-dom'
import { useT, DIVISION_IDS, DIVISION_HREF, DIVISION_COLOR, divKey } from '@/i18n'
import type { VenturesContent } from '../content/en'
import { INDIGO, GOLD, BG_DEEP } from '../theme'

const ECOSYSTEM = DIVISION_IDS.filter(id => id !== 'ventures')

export default function Hero({ c }: { c: VenturesContent['hero'] }) {
  const { t } = useT()
  return (
    <section className="sector-hero relative min-h-screen flex items-center overflow-hidden" style={{ background: BG_DEEP }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(165,180,252,0.14) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse at 70% 40%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, black 0%, transparent 70%)',
        }}
      />
      <div className="absolute top-0 right-0 w-[800px] h-[700px] rounded-full blur-[200px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.14) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(200,150,42,0.08) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: INDIGO }} />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: INDIGO }}>{c.eyebrow}</span>
            </div>

            <div className="mb-8 inline-flex">
              <div className="flex items-center gap-3 px-4 py-2 rounded-full" style={{ border: `1px solid color-mix(in srgb, ${INDIGO} 25%, transparent)`, background: `color-mix(in srgb, ${INDIGO} 6%, transparent)` }}>
                <span className="w-2 h-2 rounded-full" style={{ background: INDIGO, boxShadow: `0 0 10px ${INDIGO}` }} />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: INDIGO }}>{c.badge}</span>
              </div>
            </div>

            <h1 className="font-display leading-[1.05] tracking-[-0.02em] mb-6" style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.25rem)' }}>
              <span style={{ color: 'var(--fg)' }}>{c.title1}</span>
              <br />
              <span style={{ background: `linear-gradient(135deg, ${INDIGO} 0%, #C7D2FE 45%, ${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {c.title2}
              </span>
            </h1>

            <p className="text-slate-300 leading-relaxed mb-10 max-w-2xl" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>{c.lead}</p>

            <div className="flex flex-wrap gap-4">
              <a href="#sector-contact" className="px-8 py-3.5 font-semibold text-sm rounded-lg transition-all hover:opacity-90" style={{ background: INDIGO, color: 'var(--s0)' }}>{c.ctaPrimary}</a>
              <a href="#models" className="px-8 py-3.5 border text-sm font-medium text-white rounded-lg hover:bg-white/5 transition-colors" style={{ borderColor: `color-mix(in srgb, ${INDIGO} 35%, transparent)` }}>{c.ctaSecondary}</a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-2xl p-6" style={{ background: 'var(--fill-1)', border: `1px solid color-mix(in srgb, ${INDIGO} 18%, transparent)`, backdropFilter: 'blur(12px)' }}>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: INDIGO }}>{c.mapEyebrow}</span>
                <span className="font-mono text-[9px] text-slate-500">{c.mapCount.replace('{n}', String(ECOSYSTEM.length))}</span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {ECOSYSTEM.map(id => (
                  <Link key={id} to={DIVISION_HREF[id]} className="group rounded-xl p-3 transition-all duration-200 hover:-translate-y-0.5" style={{ background: 'var(--s2)', border: '1px solid var(--line)' }}>
                    <span className="block w-2 h-2 rounded-full mb-2.5" style={{ background: DIVISION_COLOR[id] }} />
                    <span className="block text-[11px] font-semibold text-white leading-snug">{t(divKey(id, 'short'))}</span>
                  </Link>
                ))}
              </div>
              <p className="mt-5 text-[11px] text-slate-500 leading-relaxed">{c.mapNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
