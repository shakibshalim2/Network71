import { Link } from 'react-router-dom'
import { useT, type TKey } from '@/i18n'
import { safeContentUrl, textField, usePublicContent, type PublishedPage } from '@/lib/publicContent'

type Brand = { name: string; sub: TKey | string; color: string; href: string; font: string; raw?: boolean }

const BRANDS: Brand[] = [
  { name: 'EZYIFY',         sub: 'partners.sub.ezyify',   color: 'var(--accent-purple)', href: '/ezyify',    font: "'Playfair Display', serif" },
  { name: 'N71 MEDIA',      sub: 'partners.sub.media',    color: 'var(--accent-cyan)', href: '/divisions/media', font: 'var(--font-sans)' },
  { name: 'eSHIPe',         sub: 'partners.sub.eshipe',   color: 'var(--accent-blue)', href: '/divisions/ship-marketplace', font: 'var(--font-sans)' },
  { name: 'N71 GARMENTS',   sub: 'partners.sub.garments', color: 'var(--accent-pink)', href: '/divisions/garments', font: 'var(--font-sans)' },
  { name: 'N71 AGRO',       sub: 'partners.sub.agro',     color: 'var(--accent-green)', href: '/divisions/agriculture', font: 'var(--font-sans)' },
  { name: 'N71 FOODS',      sub: 'partners.sub.foods',    color: 'var(--accent-orange)', href: '/divisions/food-beverage', font: 'var(--font-sans)' },
  { name: 'N71 ENERGY',     sub: 'partners.sub.energy',   color: 'var(--accent-amber)', href: '/divisions/oils-energy', font: 'var(--font-sans)' },
  { name: 'N71 TECH',       sub: 'partners.sub.tech',     color: 'var(--accent-teal)', href: '/divisions/it-software', font: 'var(--font-sans)' },
  { name: 'N71 TRADING',    sub: 'partners.sub.trading',  color: 'var(--brand-fg)', href: '/divisions/global-trading', font: 'var(--font-sans)' },
]

function Mark({ brand, idx }: { brand: Brand; idx: number }) {
  const { t } = useT()
  const inner = (
    <>
      <span className="bwall__idx">{String(idx + 1).padStart(2, '0')}</span>
      <span
        className={`bwall__name${brand.name === 'EZYIFY' ? ' is-flagship' : ''}`}
        style={{ fontFamily: brand.font, textTransform: brand.name === 'eSHIPe' ? 'none' : 'uppercase' }}
      >
        {brand.name}
      </span>
      <span className="bwall__sub">{brand.raw ? brand.sub : t(brand.sub as TKey)}</span>
    </>
  )
  const style = { ['--bw-accent' as string]: brand.color }
  const external = /^https?:/i.test(brand.href)
  return external
    ? <a className="bwall__mark" href={brand.href} style={style} target="_blank" rel="noreferrer">{inner}</a>
    : brand.href
      ? <Link className="bwall__mark" to={brand.href} style={style}>{inner}</Link>
      : <span className="bwall__mark" style={style}>{inner}</span>
}

function Row({ items, reverse }: { items: Brand[]; reverse?: boolean }) {
  // Four copies so the track is always wider than any viewport; the keyframe
  // moves exactly one half, so two identical halves = seamless loop.
  const loop = [...items, ...items]
  return (
    <div className={`bwall__row${reverse ? ' is-reverse' : ''}`}>
      <div className="bwall__track" style={{ ['--n' as string]: items.length }}>
        {[...loop, ...loop].map((b, i) => <Mark key={`${b.name}-${i}`} brand={b} idx={i % items.length} />)}
      </div>
    </div>
  )
}

/**
 * Two-row brand wall. Rows counter-scroll, pause on hover, and each mark
 * takes its brand accent on hover. Published brands from the CMS replace the
 * built-in list when present.
 */
export default function TrustedPartners() {
  const { t } = useT()
  const { data } = usePublicContent<PublishedPage>('brands')
  const published = data?.items ?? []
  const list: Brand[] = published.length
    ? published.map((b) => ({
        name: textField(b, 'title'),
        sub: textField(b, 'stage'),
        raw: true,
        color: 'var(--brand-fg)',
        href: safeContentUrl(textField(b, 'url')) || '',
        font: 'var(--font-sans)',
      }))
    : BRANDS
  const half = Math.ceil(list.length / 2)
  const rowA = list.slice(0, half)
  const rowB = list.length > 1 ? list.slice(half) : list

  return (
    <section className="bwall section-y" aria-label={t('partners.title')}>
      <div className="container-page">
        <div className="bwall__head">
          <p className="public-eyebrow" style={{ marginBottom: 0 }}>
            <span className="eyebrow-rule" />
            {t('partners.eyebrow')}
            <span className="dix__count">{list.length}</span>
          </p>
          <h2 className="font-display bwall__title">{t('partners.title')}</h2>
        </div>
      </div>
      <div className="bwall__rows">
        <Row items={rowA} />
        <Row items={rowB} reverse />
      </div>
    </section>
  )
}
