import type { HotspotData } from '@/components/Globe3D'
import { useT } from '@/i18n'

interface Props {
  hotspot: HotspotData
  onClose: () => void
}

/** Location info panel — appears above clicked markers.
 *  Intelligent connection to CTAs: shows division + scroll-to action. */
export default function HotspotCard({ hotspot, onClose }: Props) {
  const { t } = useT()
  return (
    <div
      style={{
        position: 'fixed',
        /* Clamp so the panel never renders past either screen edge on mobile */
        left: `clamp(130px, ${hotspot.screenX}px, calc(100vw - 130px))`,
        top:  `max(${hotspot.screenY}px, calc(var(--header-h) + 190px))`,
        transform: 'translate(-50%, calc(-100% - 20px))',
        zIndex: 60,
        pointerEvents: 'auto',
        animation: 'popIn 0.22s cubic-bezier(0.22,1,0.36,1) both',
      }}
    >
      {/* Connector stem */}
      <div style={{
        position: 'absolute', bottom: -11, left: '50%', transform: 'translateX(-50%)',
        width: 1, height: 11,
        background: 'linear-gradient(to bottom, var(--brand-edge), transparent)',
      }} />
      {/* Panel */}
      <div style={{
        background: 'var(--panel-bg)',
        border: '1px solid var(--brand-edge)',
        borderRadius: 12,
        padding: '14px 18px 15px',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        boxShadow: 'var(--shadow-pop)',
        width: 'min(252px, calc(100vw - var(--gutter) * 2))',
        textAlign: 'center',
      }}>

        {/* Role badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 9 }}>
          <span style={{
            width: 5, height: 5, borderRadius: '50%', background: 'var(--brand)',
            flexShrink: 0, boxShadow: '0 0 9px var(--brand)',
            animation: 'pulse-slow 2.2s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 8,
            letterSpacing: '0.30em', color: 'var(--brand-fg)',
            textTransform: 'uppercase',
          }}>
            {hotspot.role}
          </span>
        </div>

        {/* City name */}
        <div className="font-display" style={{
          fontSize: 21, color: 'var(--fg-strong)',
          lineHeight: 1.12, letterSpacing: '-0.022em', marginBottom: 3,
        }}>
          {hotspot.name}
        </div>

        {/* Country */}
        <div style={{
          fontSize: 11.5, color: 'var(--fg-muted)', letterSpacing: '0.02em', marginBottom: 11,
        }}>
          {hotspot.country}
        </div>

        {/* Division indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'var(--brand-wash)',
          border: '1px solid var(--brand-edge)',
          borderRadius: 6, padding: '6px 10px', marginBottom: 11,
          justifyContent: 'center',
        }}>
          <svg viewBox="0 0 16 16" fill="none" style={{ width: 10, height: 10, flexShrink: 0 }}>
            <circle cx="8" cy="8" r="2.5" fill="var(--brand)" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="var(--brand)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3.5 3.5l1.5 1.5M11 11l1.5 1.5M3.5 12.5l1.5-1.5M11 5l1.5-1.5" stroke="var(--brand)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          </svg>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 8.5,
            color: 'var(--brand-fg)', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            {hotspot.division}
          </span>
        </div>

        {/* CTA — scrolls to the relevant section */}
        <button
          onClick={() => {
            const el = document.getElementById(hotspot.sectionLink)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            width: '100%', padding: '8px 12px',
            background: 'var(--brand)', color: 'var(--fg-onbrand)',
            border: 'none', borderRadius: 7, cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: 11.5, fontWeight: 700,
            letterSpacing: '0.03em', textTransform: 'uppercase',
            boxShadow: '0 2px 14px var(--brand-edge)',
            transition: 'background 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-bright)'; e.currentTarget.style.boxShadow = '0 2px 22px var(--brand-edge)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand)'; e.currentTarget.style.boxShadow = '0 2px 14px var(--brand-edge)' }}
        >
          {t('hero.exploreDivision')}
          <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>

        {/* Dismiss hint */}
        <button
          onClick={() => onClose()}
          aria-label="Close location panel"
          style={{
            position: 'absolute', top: 8, right: 10,
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--fg-subtle)', fontSize: 16, lineHeight: 1,
            padding: 2, transition: 'color 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg-muted)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-subtle)' }}
        >
          ×
        </button>

      </div>
    </div>
  )
}
