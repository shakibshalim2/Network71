import { Link } from 'react-router-dom'
import { useT } from '@/i18n'
import { NEWS_STORIES, ESHIP_STATS } from './media-marketplace/data'
import CountUp from '@/components/motion/CountUp'
import Tilt from '@/components/motion/Tilt'
import Magnetic from '@/components/motion/Magnetic'

const Arrow = ({ size = 13 }: { size?: number }) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: size, height: size }}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
)

/**
 * Media feature + eSHIPe marketplace. Two editorial plates: the media plate
 * has a parallax photo and a numbered story ledger; the marketplace plate
 * tilts, its ship drifts on hover and its ledger counts up on reveal.
 */
export default function MediaAndMarketplace() {
  const { t } = useT()
  return (
    <section className="section-y mm" style={{ background: 'var(--s0)', borderTop: '1px solid var(--line)' }}>
      <div className="container-page">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 sm:gap-5 xl:gap-6">

          {/* ── MEDIA FEATURE ─────────────────────────────── */}
          <div className="mm__plate">
            <div className="grid md:grid-cols-[1.15fr_1fr] h-full">

              {/* Left: editorial hero image */}
              <div className="force-dark mm__photo min-h-[260px] sm:min-h-[340px]">
                <img decoding="async" loading="lazy"
                  src={t('mediaMarket.mediaImage')}
                  alt={t('mediaMarket.mediaAlt')}
                />
                <div className="absolute inset-0" style={{ background: 'var(--img-scrim-strong)' }} />
                <span className="mm__scan" aria-hidden="true" />

                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  <div style={{ marginBottom: 14 }}>
                    <span className="mm__live">
                      <span className="mm__live-dot" />
                      {t('mediaMarket.badge')}
                    </span>
                  </div>

                  <h3 className="font-display mm__title">
                    {t('mediaMarket.title1')}
                    <br />
                    <em style={{ color: 'var(--brand-fg)' }}>{t('mediaMarket.title2')}</em>
                  </h3>

                  <p className="max-w-[300px] sm:max-w-[260px]" style={{ color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.65, marginBottom: 18 }}>
                    {t('mediaMarket.lead')}
                  </p>

                  <Magnetic strength={6}>
                    <Link to={t('mediaMarket.mediaHref')} className="btn btn-ghost btn-sm">
                      {t('mediaMarket.exploreMedia')}
                      <Arrow />
                    </Link>
                  </Magnetic>
                </div>
              </div>

              {/* Right: numbered story ledger */}
              <div className="flex flex-col p-4 sm:p-5 border-t md:border-t-0 md:border-l border-[var(--line)]">
                <div className="mm__eyebrow">
                  <span className="mm__eyebrow-rule" style={{ background: 'var(--brand-edge)' }} />
                  <span style={{ color: 'var(--brand-fg)' }}>{t('mediaMarket.eyebrow')}</span>
                </div>

                <ol className="mm__stories">
                  {NEWS_STORIES.map((story, i) => (
                    <li key={story.id}>
                      <Link to={t(story.href)} className="mm__story">
                        <span className="mm__story-idx font-mono">0{i + 1}</span>
                        <span className="mm__story-thumb">
                          <img decoding="async" loading="lazy" src={t(story.image)} alt="" />
                        </span>
                        <span className="mm__story-body">
                          <span className="mm__story-title">{t(story.title)}</span>
                          <span className="mm__story-date font-mono">{t(story.date)}</span>
                        </span>
                        <span className="mm__story-arrow" aria-hidden="true"><Arrow size={12} /></span>
                      </Link>
                    </li>
                  ))}
                </ol>

                <Link to={t('mediaMarket.mediaHref')} className="mm__more">
                  {t('mediaMarket.mediaDivision')}
                  <Arrow size={10} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── eSHIPe MARKETPLACE ─────────────────────────── */}
          <Tilt max={3} perspective={1800} className="mm__plate mm__plate--ship flex flex-col">
            <span className="mm__ship-glow" aria-hidden="true" />
            <div className="px-5 pt-5 sm:px-6 sm:pt-[22px]" style={{ flexShrink: 0 }}>
              <div className="mm__eyebrow">
                <span className="mm__eyebrow-rule" style={{ background: 'rgba(14,165,233,0.45)' }} />
                <span style={{ color: 'var(--accent-sky)' }}>{t('mediaMarket.eshipEyebrow')}</span>
              </div>

              <h3 className="font-display" style={{ fontSize: 'clamp(24px, 2.4vw, 30px)', color: 'var(--fg-strong)', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 10 }}>
                {t('mediaMarket.eshipTitle1')}{' '}
                <em style={{ color: 'var(--accent-sky)' }}>{t('mediaMarket.eshipTitle2')}</em>
              </h3>

              <p style={{ color: 'var(--fg-muted)', fontSize: 14.5, lineHeight: 1.7, marginBottom: 18 }}>
                {t('mediaMarket.eshipLead')}
              </p>

              <Magnetic strength={8}>
                <Link to={t('mediaMarket.shipHref')} className="btn btn-primary btn-sm" style={{ marginBottom: 20 }}>
                  {t('mediaMarket.exploreMarketplace')}
                  <Arrow />
                </Link>
              </Magnetic>
            </div>

            {/* Ship image — drifts across the frame on hover like it's under way */}
            <div className="mm__ship min-h-[150px] sm:min-h-[180px]">
              <img decoding="async" loading="lazy" src={t('mediaMarket.shipImage')} alt={t('mediaMarket.shipAlt')} />
              <div style={{ position: 'absolute', inset: 0, background: 'var(--img-scrim-soft)' }} />
              <span className="mm__wave" aria-hidden="true" />
            </div>

            {/* Stats ledger */}
            <div className="grid grid-cols-3 mm__ledger">
              {ESHIP_STATS.map(({ val, label }, i) => (
                <div key={label} className="mm__cell" style={{ ['--i' as string]: i }}>
                  <div className="font-display mm__cell-val">
                    <CountUp value={t(val)} />
                  </div>
                  <div className="mm__cell-label font-mono text-[11px]">{t(label)}</div>
                </div>
              ))}
            </div>
          </Tilt>

        </div>
      </div>
    </section>
  )
}
