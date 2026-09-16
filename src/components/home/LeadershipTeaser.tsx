import type { PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '@/i18n'
import Magnetic from '@/components/motion/Magnetic'
import Tilt from '@/components/motion/Tilt'

const spot = (e: PointerEvent<HTMLDivElement>) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
  el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
}

const TAGS = ['home.leadership.tag1', 'home.leadership.tag2', 'home.leadership.tag3'] as const

export default function LeadershipTeaser() {
  const { t } = useT()
  return (
    <section style={{ background: 'var(--s1)', borderTop: '1px solid var(--line)' }} className="section-y">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

          <Tilt max={3} perspective={1600}>
            <div className="founder-card" onPointerMove={spot}>
              <span className="founder-card__spot" aria-hidden="true" />
              <span className="public-eyebrow">{t('home.leadership.cardEyebrow')}</span>
              <div className="founder-monogram" aria-hidden="true">
                <svg viewBox="0 0 100 100" className="founder-monogram__ring"><circle cx="50" cy="50" r="48.5" pathLength="1" /></svg>
                <span>N71</span>
              </div>
              <h3>{t('home.leadership.founder')}</h3>
              <p>{t('home.leadership.role')}</p>
              <Link to="/leadership">{t('home.leadership.cardLink')}</Link>
            </div>
          </Tilt>

          {/* Text */}
          <div>
            <p className="public-eyebrow" style={{ marginBottom: 'clamp(14px, 3vw, 22px)' }}>
              <span className="eyebrow-rule" />
              {t('home.leadership.eyebrow')}
            </p>
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
            <div className="lead__tags">
              {TAGS.map((tag, i) => (
                <span key={tag} className="lead__tag font-mono text-[11px]" style={{ ['--i' as string]: i }}>
                  <span className="lead__tag-idx">0{i + 1}</span>
                  {t(tag)}
                </span>
              ))}
            </div>

            <Magnetic strength={8}>
              <Link to="/leadership" className="btn btn-secondary btn-sm">
                {t('home.leadership.cta')}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Magnetic>
          </div>

        </div>
      </div>
    </section>
  )
}
