import { Link } from 'react-router-dom'
import { useT } from '@/i18n'
import Magnetic from '@/components/motion/Magnetic'

// Copy resolves via `home.esg.<id>.*`.
export const ESG_PILLARS = [
  { id: 'e', letter: 'E', color: 'var(--accent-teal)', image: 'home.esg.e.image' },
  { id: 's', letter: 'S', color: 'var(--accent-cyan)', image: 'home.esg.s.image' },
  { id: 'g', letter: 'G', color: 'var(--brand-fg)', image: 'home.esg.g.image' },
] as const

/**
 * ESG teaser: three pillar cards, each with a photo that uncovers on reveal,
 * a monogram badge, a stat that lights, and a pointer-tracked accent glow.
 */
export default function SustainabilityTeaser() {
  const { t } = useT()
  return (
    <section className="section-y esg" style={{ background: 'var(--s1)', borderTop: '1px solid var(--line)' }}>
      <div className="container-page">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 lg:gap-10 mb-9 sm:mb-14">
          <div>
            <p className="public-eyebrow esg__eyebrow">
              <span className="eyebrow-rule" style={{ background: 'rgba(13,148,136,0.55)' }} />
              {t('home.esg.eyebrow')}
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(27px, 6vw, 48px)', color: 'var(--fg-strong)', lineHeight: 1.12, letterSpacing: '-0.025em' }}>
              {t('home.esg.title1')}
              <br />
              <em style={{ color: 'var(--accent-teal)' }}>{t('home.esg.title2')}</em>
            </h2>
          </div>
          <div style={{ maxWidth: 400 }}>
            <p className="text-[14px] sm:text-[15px]" style={{ color: 'var(--fg-muted)', lineHeight: 1.75, marginBottom: 20 }}>
              {t('home.esg.lead')}
            </p>
            <Magnetic strength={8}>
              <Link to={t('home.esg.href')} className="btn btn-secondary btn-sm esg__cta">
                {t('home.esg.cta')}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {ESG_PILLARS.map(({ id, letter, color, image }, i) => (
            <Link
              key={id}
              to={t('home.esg.href')}
              className="esg__card"
              style={{ ['--esg' as string]: color, ['--i' as string]: i }}
            >
              <span className="esg__glow" aria-hidden="true" />
              <div className="esg__media h-[150px] sm:h-[170px]">
                <img decoding="async" loading="lazy" src={t(image)} alt={t(`home.esg.${id}.imgAlt`)} />
                <span className="esg__tint" aria-hidden="true" />
                <span className="esg__badge font-display">{letter}</span>
                <span className="esg__stat">
                  <span className="esg__stat-val font-display">{t(`home.esg.${id}.stat`)}</span>
                  <span className="esg__stat-label font-mono">{t(`home.esg.${id}.statLabel`)}</span>
                </span>
              </div>
              <div className="esg__body">
                <span className="esg__label">{t(`home.esg.${id}.label`)}</span>
                <span className="esg__desc">{t(`home.esg.${id}.desc`)}</span>
                <span className="esg__link">
                  {t('home.esg.cta')}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
                </span>
              </div>
              <span className="esg__rule" aria-hidden="true" />
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
