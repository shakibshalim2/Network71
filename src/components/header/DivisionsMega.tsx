import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import { useT, DIVISION_HREF, DIVISION_COLOR, divKey } from '@/i18n'
import { DIVISION_ICONS, MENU_DIVISIONS } from './data'
import { DivisionIcon } from './icons'

type Props = {
  megaOpen: boolean
  setMegaOpen: (v: boolean | ((prev: boolean) => boolean)) => void
  openMega: () => void
  closeMega: () => void
  megaRef: RefObject<HTMLDivElement | null>
}

/** Desktop "Divisions" trigger + mega panel. */
export default function DivisionsMega({ megaOpen, setMegaOpen, openMega, closeMega, megaRef }: Props) {
  const { t } = useT()
  return (
    <div
      ref={megaRef}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setMegaOpen(false) }}
      style={{ position: 'relative' }}
      onMouseEnter={openMega}
      onMouseLeave={closeMega}>

      <button
        aria-haspopup="true"
        aria-controls="division-menu"
        onClick={() => setMegaOpen(v => !v)}
        aria-expanded={megaOpen}
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 13, fontWeight: 500, letterSpacing: '0.01em',
          color: megaOpen ? 'var(--brand)' : 'var(--fg-muted)',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '2px 0', transition: 'color 0.15s', whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg-strong)' }}
        onMouseLeave={e => { if (!megaOpen) e.currentTarget.style.color = 'var(--fg-muted)' }}>
        {t('nav.divisions')}
        <svg
          viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
          style={{ width: 10, height: 10, opacity: 0.5, transition: 'transform 0.22s', transform: megaOpen ? 'rotate(180deg)' : 'none' }}>
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {/* Mega panel — positioned from trigger's left edge */}
      <div
        id="division-menu"
        inert={!megaOpen}
        aria-hidden={!megaOpen}
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        style={{
          position: 'absolute',
          top: 'calc(100% + 14px)',
          left: 0,
          width: 'min(620px, calc(100vw - var(--gutter) * 2))',
          maxHeight: 'calc(100dvh - var(--header-h) - 28px)',
          overflowY: 'auto',
          background: 'var(--panel-bg)',
          border: '1px solid var(--line-strong)',
          borderRadius: 16,
          boxShadow: 'var(--shadow-pop)',
          padding: 10,
          opacity: megaOpen ? 1 : 0,
          transform: `translateY(${megaOpen ? 0 : -8}px)`,
          pointerEvents: megaOpen ? 'auto' : 'none',
          transition: 'opacity 0.18s, transform 0.18s',
          zIndex: 60,
        }}>

        {/* Panel header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '4px 10px 10px',
          borderBottom: '1px solid var(--line)',
          marginBottom: 6,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'var(--brand-fg)',
          }}>{t('header.ourBusinesses')}</span>
          <Link to="/about" style={{
            fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em',
            color: 'var(--brand-fg)', textDecoration: 'none',
            transition: 'color 0.14s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--brand)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--brand-edge)' }}>
            {t('header.viewAll')}
          </Link>
        </div>

        {/* Division grid — 1 col on very narrow panels, 2 col otherwise */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 2, marginBottom: 8 }}>
          {MENU_DIVISIONS.map(id => (
            <Link key={id} to={DIVISION_HREF[id]} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px', borderRadius: 10,
              textDecoration: 'none', transition: 'background 0.12s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
              <DivisionIcon path={DIVISION_ICONS[id]} color={DIVISION_COLOR[id]} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.3 }}>
                  {t(divKey(id, 'short'))}
                </div>
                <div style={{
                  fontSize: 10.5, color: 'var(--fg-subtle)', marginTop: 1,
                  lineHeight: 1.35, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {t(divKey(id, 'desc'))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Ezyify flagship strip */}
        <Link to="/ezyify" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', borderRadius: 10,
          background: 'linear-gradient(135deg,rgba(88,28,220,0.12) 0%,rgba(168,85,247,0.07) 100%)',
          border: '1px solid rgba(124,58,237,0.22)',
          textDecoration: 'none', transition: 'background 0.15s, border-color 0.15s',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg,rgba(88,28,220,0.2) 0%,rgba(168,85,247,0.12) 100%)'
            e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg,rgba(88,28,220,0.12) 0%,rgba(168,85,247,0.07) 100%)'
            e.currentTarget.style.borderColor = 'rgba(124,58,237,0.22)'
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 34, height: 34, borderRadius: 8, flexShrink: 0,
              background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
              </svg>
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>Ezyify</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 6.5, fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(168,85,247,0.8)', padding: '2px 7px',
                  borderRadius: 4, background: 'rgba(168,85,247,0.12)',
                  border: '1px solid rgba(168,85,247,0.25)',
                }}>{t('header.flagship')}</span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(168,85,247,0.65)', lineHeight: 1.35 }}>
                {t(divKey('ezyify', 'desc'))}
              </div>
            </div>
          </div>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
            style={{ width: 13, height: 13, color: 'rgba(168,85,247,0.5)', flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
