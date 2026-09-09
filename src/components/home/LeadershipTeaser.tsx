import { Link } from 'react-router-dom'
import { useT } from '@/i18n'

const TAGS = ['home.leadership.tag1', 'home.leadership.tag2', 'home.leadership.tag3'] as const

export default function LeadershipTeaser() {
  const { t } = useT()
  return (
    <section style={{ background: 'var(--s1)', borderTop: '1px solid var(--line)' }} className="section-y">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

          <div className="founder-card"><span className="public-eyebrow">{t('home.leadership.cardEyebrow')}</span><div className="founder-monogram" aria-hidden="true">N71</div><h3>{t('home.leadership.founder')}</h3><p>{t('home.leadership.role')}</p><Link to="/leadership">{t('home.leadership.cardLink')}</Link></div>

          {/* Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(14px, 3vw, 22px)' }}>
              <div style={{ height: 1, width: 32, background: 'var(--brand-edge)', flexShrink: 0 }} />
              <span
                className="text-[8px] tracking-[0.22em] sm:text-[9px] sm:tracking-[0.35em]"
                style={{ fontFamily: 'var(--font-mono)', textTransform: 'uppercase', color: 'var(--brand-fg)' }}>
                {t('home.leadership.eyebrow')}
              </span>
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(25px, 5.6vw, 44px)', color: 'var(--fg-strong)', lineHeight: 1.14, letterSpacing: '-0.025em', marginBottom: 16 }}>
              {t('home.leadership.title1')}
              <br />
              <em style={{ color: 'var(--brand-fg)' }}>{t('home.leadership.title2')}</em>
            </h2>
            <p className="text-[14px] sm:text-[15px]" style={{ color: 'var(--fg-muted)', lineHeight: 1.75, maxWidth: 440, marginBottom: 12 }}>
              {t('home.leadership.lead')}
            </p>
            <p className="text-[13px] sm:text-[13.5px]" style={{ color: 'var(--fg-subtle)', lineHeight: 1.70, maxWidth: 440, marginBottom: 24 }}>
              {t('home.leadership.sub')}
            </p>

            {/* Attribute badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-[9.5px] px-2.5 py-1 sm:text-[11px] sm:px-3 sm:py-[5px]"
                  style={{
                    display: 'inline-block',
                    borderRadius: 20, fontWeight: 500,
                    background: 'var(--brand-wash)', border: '1px solid var(--brand-edge)',
                    color: 'var(--brand-fg)', fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                  {t(tag)}
                </span>
              ))}
            </div>

            <Link
              to="/leadership"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 26px', fontSize: 13, fontWeight: 600, borderRadius: 8,
                border: '1px solid var(--brand-edge)', color: 'var(--brand-fg)',
                textDecoration: 'none', transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand-wash)'; e.currentTarget.style.borderColor = 'var(--brand-edge)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--brand-edge)' }}
            >
              {t('home.leadership.cta')}
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
