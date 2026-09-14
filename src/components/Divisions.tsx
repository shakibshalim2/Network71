import { Link } from 'react-router-dom'
import { useT, DIVISION_IDS, DIVISION_COLOR, divKey, type DivisionId, type TKey } from '@/i18n'

const IMAGE_KEYS = Object.fromEntries(DIVISION_IDS.map(id => [id, `home.divisions.${id}.image`])) as Record<DivisionId, TKey>
const HREF_KEYS = Object.fromEntries(DIVISION_IDS.map(id => [id, `home.divisions.${id}.href`])) as Record<DivisionId, TKey>

const HOVER: Record<DivisionId, string> = {
  garments: 'rgba(244,63,94,0.48)',
  agriculture: 'rgba(34,197,94,0.42)',
  food: 'rgba(249,115,22,0.42)',
  energy: 'rgba(245,158,11,0.42)',
  it: 'rgba(34,211,238,0.4)',
  trading: 'rgba(59,130,246,0.42)',
  ventures: 'rgba(129,140,248,0.45)',
  media: 'rgba(239,68,68,0.42)',
  ship: 'rgba(14,165,233,0.42)',
  ezyify: 'rgba(168,85,247,0.5)',
}

// Ezyify closes the rail as the flagship card.
const ORDER: DivisionId[] = [...DIVISION_IDS.filter(id => id !== 'ezyify'), 'ezyify']

export default function Divisions() {
  const { t } = useT()
  const allItems = ORDER.map(id => ({
    id,
    title: t(divKey(id, 'name')),
    tag: t(divKey(id, 'tag')),
    desc: t(divKey(id, 'card')),
    tagColor: DIVISION_COLOR[id],
    href: t(HREF_KEYS[id]),
    img: t(IMAGE_KEYS[id]),
    overlay: id === 'ezyify'
      ? 'linear-gradient(175deg, rgba(88,28,220,0.35) 0%, rgba(5,8,26,0.92) 100%)'
      : 'var(--img-scrim-strong)',
    hoverAccent: HOVER[id],
    isEzyify: id === 'ezyify',
  }))
  return (
    <section id="divisions" style={{ background: 'var(--s0)' }} className="section-y">
      <div className="container-page">

        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-7 sm:w-10" style={{ background: 'var(--brand-edge)' }} />
            <span
              className="text-[11px] tracking-[0.2em]"
              style={{
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                color: 'var(--brand-fg)',
              }}>
              {t('divisions.eyebrow')}
            </span>
            <div className="h-px w-7 sm:w-10" style={{ background: 'var(--brand-edge)' }} />
          </div>
          <h2 className="font-display text-balance" style={{
            fontSize: 'clamp(30px, 5.6vw, 52px)',
            color: 'var(--fg-strong)', lineHeight: 1.1, letterSpacing: '-0.03em',
          }}>
            {t('divisions.title1')} <em style={{ color: 'var(--brand-fg)' }}>{t('divisions.title2')}</em>
          </h2>
        </div>

        {/*
          Layout strategy:
            < md  → edge-to-edge snap rail (cards stay large & legible on phones)
            ≥ md  → responsive grid, because 9 cards in one row collapse to ~140px
        */}
        <div className="card-rail no-scrollbar">
          {allItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className="force-dark group division-card relative overflow-hidden rounded-2xl block"
                style={{ aspectRatio: '3/4', background: 'var(--s2)' }}
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0" style={{ background: item.overlay }} />

                {/* Hover accent glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${item.hoverAccent} 0%, transparent 55%)` }}
                />

                {/* Border */}
                <div className="absolute inset-0 rounded-2xl border border-white/[0.10] group-hover:border-white/25 transition-colors duration-300 pointer-events-none" />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="inline-block px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold tracking-[0.12em] uppercase"
                    style={{ background: 'rgba(4,8,14,0.55)', color: item.tagColor, border: `1px solid color-mix(in srgb, ${item.tagColor} 40%, transparent)`, backdropFilter: 'blur(8px)' }}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="division-card__body absolute bottom-0 left-0 right-0 p-5 md:p-4 xl:p-5">
                  {item.isEzyify ? (
                    <>
                      <div
                        className="font-display text-[22px] md:text-[20px] xl:text-[23px] mb-2 leading-tight"
                        style={{
                          background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 60%, #22D3EE 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {item.title}
                      </div>
                      <p className="division-card__desc text-[13.5px] md:text-[13px] leading-[1.6] mb-3" style={{ color: 'rgba(226,232,240,0.86)' }}>{item.desc}</p>
                      <span className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.02em]"
                        style={{ color: 'var(--accent-purple)' }}>
                        {t('divisions.explorePlatform')}
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      <h3 className="font-display text-white leading-[1.15] mb-2 text-[20px] md:text-[18px] xl:text-[21px]">
                        {item.title}
                      </h3>
                      <p className="division-card__desc text-[13.5px] md:text-[13px] leading-[1.6] mb-3" style={{ color: 'rgba(226,232,240,0.86)' }}>{item.desc}</p>
                      <span className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.02em]"
                        style={{ color: item.tagColor }}>
                        {t('divisions.explore')}
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </>
                  )}
                </div>
              </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
