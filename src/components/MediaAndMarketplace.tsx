import { Link } from 'react-router-dom'
import { useT } from '@/i18n'
import { NEWS_STORIES, ESHIP_STATS } from './media-marketplace/data'

export default function MediaAndMarketplace() {
  const { t } = useT()
  return (
    <section
      style={{ background: 'var(--s0)', borderTop: '1px solid var(--line)' }}
      className="section-y"
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-4 sm:gap-5 xl:gap-6">

          {/* ── MEDIA FEATURE ─────────────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'var(--s2)', border: '1px solid var(--line)' }}
          >
            <div className="grid md:grid-cols-[1.15fr_1fr] h-full">

              {/* Left: editorial hero image */}
              <div className="force-dark relative overflow-hidden min-h-[260px] sm:min-h-[340px]">
                <img decoding="async" loading="lazy"
                  src={t('mediaMarket.mediaImage')}
                  alt={t('mediaMarket.mediaAlt')}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ transition: 'transform 0.7s ease', transform: 'scale(1.02)' }}
                  onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.06)' }}
                  onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.02)' }}
                />
                <div className="absolute inset-0" style={{
                  background: 'var(--img-scrim-strong)',
                }} />

                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  {/* Live badge */}
                  <div style={{ marginBottom: 14 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '5px 11px', borderRadius: 20,
                      background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.30)',
                      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
                      textTransform: 'uppercase', color: 'var(--accent-red)',
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%', background: 'var(--accent-red)',
                        animation: 'pulse-slow 1.8s ease-in-out infinite', flexShrink: 0,
                      }} />
                      {t('mediaMarket.badge')}
                    </span>
                  </div>

                  <h3 className="font-display" style={{
                    fontSize: 'clamp(26px, 2.8vw, 34px)',
                    color: 'var(--fg-strong)', lineHeight: 1.1,
                    letterSpacing: '-0.02em', marginBottom: 8,
                  }}>
                    {t('mediaMarket.title1')}
                    <br />
                    <em style={{ color: 'var(--brand-fg)' }}>{t('mediaMarket.title2')}</em>
                  </h3>

                  <p
                    className="max-w-[300px] sm:max-w-[260px]"
                    style={{ color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.65, marginBottom: 18 }}>
                    {t('mediaMarket.lead')}
                  </p>

                  <Link
                    to={t('mediaMarket.mediaHref')}
                    className="btn btn-ghost btn-sm"
                    style={{ width: 'fit-content' }}
                  >
                    {t('mediaMarket.exploreMedia')}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/*
                Right: news story list.
                Divider must be a top border when stacked (< md) and a left
                border once the two panes sit side by side (≥ md).
              */}
              <div className="flex flex-col p-4 sm:p-5 border-t md:border-t-0 md:border-l border-[var(--line)]">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ height: 1, width: 18, background: 'var(--brand-edge)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--brand-fg)', textTransform: 'uppercase' }}>
                    {t('mediaMarket.eyebrow')}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                  {NEWS_STORIES.map((story) => (
                    <Link
                      key={story.id}
                      to={t(story.href)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '12px 10px', borderRadius: 10,
                        transition: 'background 0.15s', textDecoration: 'none',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--line)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                    >
                      <img decoding="async" loading="lazy"
                        src={t(story.image)}
                        alt={t(story.title)}
                        style={{ width: 68, height: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg-strong)', lineHeight: 1.4, marginBottom: 4 }}>
                          {t(story.title)}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-subtle)', letterSpacing: '0.04em' }}>
                          {t(story.date)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to={t('mediaMarket.mediaHref')}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    marginTop: 16, fontSize: 13, fontWeight: 600, minHeight: 44,
                    color: 'var(--brand-fg)', textDecoration: 'none',
                    letterSpacing: '0.01em', transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.75' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  {t('mediaMarket.mediaDivision')}
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" style={{ width: 10, height: 10 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* ── eSHIPe MARKETPLACE ─────────────────────────── */}
          <div
            className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: 'var(--s2)', border: '1px solid var(--line)' }}
          >
            <div className="px-5 pt-5 sm:px-6 sm:pt-[22px]" style={{ flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <div style={{ height: 1, width: 18, background: 'rgba(14,165,233,0.45)', flexShrink: 0 }} />
                <span
                  className="text-[11px] tracking-[0.18em]"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-sky)', textTransform: 'uppercase' }}>
                  {t('mediaMarket.eshipEyebrow')}
                </span>
              </div>

              <h3 className="font-display" style={{
                fontSize: 'clamp(24px, 2.4vw, 30px)',
                color: 'var(--fg-strong)', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 10,
              }}>
                {t('mediaMarket.eshipTitle1')}{' '}
                <em style={{ color: 'var(--accent-sky)' }}>{t('mediaMarket.eshipTitle2')}</em>
              </h3>

              <p style={{ color: 'var(--fg-muted)', fontSize: 14.5, lineHeight: 1.7, marginBottom: 18 }}>
                {t('mediaMarket.eshipLead')}
              </p>

              <Link
                to={t('mediaMarket.shipHref')}
                className="btn btn-primary btn-sm"
                style={{ marginBottom: 20 }}
              >
                {t('mediaMarket.exploreMarketplace')}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Ship image */}
            <div className="min-h-[150px] sm:min-h-[180px]" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <img decoding="async" loading="lazy"
                src={t('mediaMarket.shipImage')}
                alt={t('mediaMarket.shipAlt')}
                className="w-full h-full object-cover"
                style={{ transition: 'transform 0.7s ease' }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'var(--img-scrim-soft)' }} />
            </div>

            {/* Stats strip */}
            <div
              className="grid grid-cols-3"
              style={{ borderTop: '1px solid var(--line)', flexShrink: 0 }}
            >
              {ESHIP_STATS.map(({ val, label }, i) => (
                <div
                  key={label}
                  className="px-2 py-4 sm:px-3 sm:py-5 text-center"
                  style={{
                    borderRight: i < 2 ? '1px solid var(--line)' : 'none',
                  }}
                >
                  <div className="font-display text-[20px] sm:text-[24px]" style={{ color: 'var(--accent-sky)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {t(val)}
                  </div>
                  <div
                    className="text-[11px] tracking-[0.1em]"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)', textTransform: 'uppercase', marginTop: 6 }}>
                    {t(label)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
