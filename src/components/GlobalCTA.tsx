import { Link } from 'react-router-dom'
import { useT } from '@/i18n'
import { useCompanySettings } from '@/lib/companySettings'

const InvestIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)
const TeamIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
)
const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
)

const CARDS = [
  { key: 'c1', Icon: InvestIcon, hrefKey: 'home.cta.c1.href', accent: 'var(--brand)' },
  { key: 'c2', Icon: TeamIcon, hrefKey: 'home.cta.c2.href', accent: 'var(--accent-cyan)' },
  { key: 'c3', Icon: GlobeIcon, hrefKey: 'home.cta.c3.href', accent: 'var(--accent-teal)' },
] as const

export default function GlobalCTA() {
  const { t } = useT()
  const { generalEmail } = useCompanySettings()
  return (
    <section
      className="section-y force-dark"
      style={{ background: 'var(--s1)', position: 'relative', overflow: 'hidden' }}>
      {/* Cinematic background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={t('home.cta.image')}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'var(--cta-img-dim)', transform: 'scale(1.02)' }}
        />
        {/* Scrim keeps the headline legible over the photo in both themes */}
        <div style={{ position: 'absolute', inset: 0, background: 'var(--cta-scrim)' }} />
        {/* Subtle gold vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, var(--brand-wash) 0%, transparent 70%)' }} />
      </div>
      <div className="relative container-page" style={{ zIndex: 1 }}>

        {/* Header */}
        <div className="text-center mb-9 sm:mb-14">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
            <div className="h-px w-6 sm:w-10" style={{ background: 'var(--brand-edge)' }} />
            <span className="font-mono text-[11px] tracking-[0.2em] font-semibold uppercase" style={{ color: 'var(--brand-fg)' }}>
              {t('cta.eyebrow')}
            </span>
            <div className="h-px w-6 sm:w-10" style={{ background: 'var(--brand-edge)' }} />
          </div>
          <h2
            className="font-display tracking-[-0.02em] mb-3 sm:mb-4"
            style={{ fontSize: 'clamp(30px, 6vw, 52px)', lineHeight: 1.1, color: 'var(--fg-strong)' }}>
            {t('cta.title')}
          </h2>
          <p className="max-w-lg mx-auto text-[15px] sm:text-[16px] leading-[1.75]" style={{ color: 'var(--fg-muted)' }}>
            {t('cta.lead')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {CARDS.map(({ key, Icon, hrefKey, accent }) => (
            <Link
              key={key}
              to={t(hrefKey)}
              className="group card-lift block p-6 sm:p-7 lg:p-8 rounded-2xl"
              style={{ background: 'var(--glass)', border: '1px solid var(--line-strong)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', ['--card-accent' as string]: accent }}
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-6 transition-colors duration-300"
                style={{ background: `color-mix(in srgb, ${accent} 8%, transparent)`, color: accent }}>
                <Icon />
              </div>
              <h3 className="font-display text-xl sm:text-2xl mb-2.5 sm:mb-3" style={{ color: 'var(--fg-strong)' }}>{t(`cta.${key}.title`)}</h3>
              <p className="text-[14px] sm:text-[15px] leading-[1.7] mb-5 sm:mb-6" style={{ color: 'var(--fg-muted)' }}>{t(`cta.${key}.desc`)}</p>
              <span className="flex items-center gap-2 text-[14px] font-semibold transition-all duration-200 group-hover:gap-3"
                style={{ color: accent }}>
                {t(`cta.${key}.cta`)}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>

        {/* Contact line */}
        <div className="mt-9 pt-8 sm:mt-12 sm:pt-10 text-center" style={{ borderTop: '1px solid var(--line)' }}>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--fg-subtle)' }}>{t('cta.direct')}</p>
          <a href={`mailto:${generalEmail}`}
            className="font-semibold text-base sm:text-lg wrap-anywhere transition-colors duration-150" style={{ color: 'var(--brand-fg)' }}>
            {generalEmail}
          </a>
        </div>
      </div>
    </section>
  )
}
