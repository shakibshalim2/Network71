import type { RefObject } from 'react'
import { Link } from 'react-router-dom'
import type { Language } from '@/context/LanguageContext'
import { useT, DIVISION_HREF, DIVISION_COLOR, divKey } from '@/i18n'
import { ThemeSegmented } from '@/components/ThemeToggle'
import { MENU_DIVISIONS, LANG_OPTIONS } from './data'
import { MobileLink, MobileAccordion } from './primitives'

type Props = {
  pathname: string
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
  searchOpen: boolean
  mobileExpanded: string | null
  toggleAccordion: (key: string) => void
  language: Language
  setLanguage: (lang: Language) => void
  drawerRef: RefObject<HTMLDivElement | null>
}

/** Mobile backdrop + slide-in navigation drawer. */
export default function MobileDrawer({
  pathname, mobileOpen, setMobileOpen, searchOpen, mobileExpanded, toggleAccordion, language, setLanguage, drawerRef,
}: Props) {
  const { t } = useT()
  return (
    <>
      {/* ════════════════════════════════════════════
          MOBILE BACKDROP
      ════════════════════════════════════════════ */}
      <div
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 'var(--header-h)', left: 0, right: 0, bottom: 0, zIndex: 48,
          background: 'var(--scrim)', backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s',
        }}
      />

      {/* ════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════ */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        ref={drawerRef}
        tabIndex={-1}
        inert={!mobileOpen || searchOpen}
        aria-hidden={!mobileOpen || searchOpen}
        className="no-scrollbar"
        style={{
          position: 'fixed', top: 'var(--header-h)', right: 0, bottom: 0, zIndex: 49,
          width: 'min(340px, 90vw)',
          background: 'var(--s2)',
          borderLeft: '1px solid var(--line)',
          boxShadow: 'var(--shadow-pop)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1), visibility 0.28s',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          visibility: mobileOpen ? 'visible' : 'hidden',
          paddingBottom: 'calc(24px + var(--safe-b))',
        }}>

        {/* Drawer nav items */}
        <div style={{ padding: '8px 10px 0', flex: 1 }}>

          <MobileLink href="/" active={pathname === '/'}>{t('nav.home')}</MobileLink>

          {/* Divisions accordion */}
          <MobileAccordion
            label={t('nav.divisions')}
            expanded={mobileExpanded === 'divisions'}
            onToggle={() => toggleAccordion('divisions')}>
            {MENU_DIVISIONS.map(id => (
              <Link key={id} to={DIVISION_HREF[id]} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                transition: 'background 0.12s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: DIVISION_COLOR[id], flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: 'var(--fg-muted)' }}>{t(divKey(id, 'short'))}</span>
              </Link>
            ))}
            <Link to="/ezyify" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, marginTop: 6, textDecoration: 'none',
              background: 'rgba(88,28,220,0.08)', border: '1px solid rgba(124,58,237,0.2)',
              transition: 'background 0.12s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(88,28,220,0.14)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(88,28,220,0.08)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-purple)', flexShrink: 0 }} />
              <span style={{ fontSize: 13.5, color: 'var(--accent-purple)', fontWeight: 600 }}>Ezyify</span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(168,85,247,0.5)',
              }}>{t('header.flagship')}</span>
            </Link>
          </MobileAccordion>

          <MobileLink href="/about"           active={pathname === '/about'}>{t('nav.about')}</MobileLink>
          <MobileLink href="/projects" active={pathname.startsWith('/projects')}>{t('nav.ourWork')}</MobileLink>
          <MobileLink href="/global-presence" active={pathname === '/global-presence'}>{t('nav.globalPresence')}</MobileLink>
          <MobileLink href="/divisions/media" active={pathname === '/divisions/media'}>{t('nav.media')}</MobileLink>
          <MobileLink href="/investors"       active={pathname === '/investors'}>{t('nav.investorRelations')}</MobileLink>
          <MobileLink href="/careers"         active={pathname === '/careers'}>{t('nav.careers')}</MobileLink>
          <MobileLink href="/contact"         active={pathname === '/contact'}>{t('nav.contact')}</MobileLink>

          {/* More pages accordion */}
          <MobileAccordion
            label={t('nav.more')}
            expanded={mobileExpanded === 'more'}
            onToggle={() => toggleAccordion('more')}>
            {[
              { label: t('nav.leadership'),      href: '/leadership' },
              { label: t('nav.history'),     href: '/timeline' },
              { label: t('nav.sustainability'),  href: '/sustainability' },
              { label: t('nav.governance'),      href: '/governance' },
              { label: t('nav.press'),  href: '/press' },
              { label: t('nav.blog'), href: '/blog' },
              { label: t('nav.gallery'),         href: '/gallery' },
              { label: t('nav.brand'),  href: '/brand' },
              { label: t('nav.legal'),           href: '/legal' },
            ].map(item => (
              <Link key={item.href} to={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, textDecoration: 'none',
                transition: 'background 0.12s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-edge)', flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, color: 'var(--fg-muted)' }}>{item.label}</span>
              </Link>
            ))}
          </MobileAccordion>

          {/* Appearance — Light / Dark / Auto */}
          <div style={{
            margin: '14px 0 0',
            padding: '14px 12px 0',
            borderTop: '1px solid var(--line)',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 10,
            }}>{t('header.appearance')}</p>
            <ThemeSegmented />
          </div>

          {/* Language switcher */}
          <div style={{
            margin: '14px 0 0',
            padding: '14px 12px 0',
            borderTop: '1px solid var(--line)',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.3em',
              textTransform: 'uppercase', color: 'var(--fg-faint)', marginBottom: 10,
            }}>{t('header.language')}</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {LANG_OPTIONS.map(l => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  style={{
                    flex: 1, padding: '9px 0', borderRadius: 8, border: 'none',
                    fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
                    background: language === l.code ? 'var(--brand)' : 'var(--line)',
                    color: language === l.code ? 'var(--s0)' : 'var(--fg-muted)',
                    transition: 'all 0.15s',
                  }}>
                  {l.short}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile CTA */}
          <div style={{ paddingTop: 14 }}>
            <Link
              to="/contact"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px 0', borderRadius: 10,
                background: 'var(--brand)', color: 'var(--fg-onbrand)',
                fontSize: 13.5, fontWeight: 700, textDecoration: 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-bright)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--brand)' }}>
              {t('header.connect')}
              <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.5"
                style={{ width: 12, height: 12 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
