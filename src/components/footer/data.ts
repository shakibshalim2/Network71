import type { TKey } from '@/i18n'

export type FooterLink = { label: TKey; href: string }

export const COLUMNS: { title: TKey; links: FooterLink[] }[] = [
  {
    title: 'footer.col.network71',
    links: [
      { label: 'footer.link.projects',   href: '/projects' },
      { label: 'footer.link.about',      href: '/about' },
      { label: 'footer.link.story',      href: '/timeline' },
      { label: 'footer.link.leadership', href: '/leadership' },
      { label: 'footer.link.presence',   href: '/global-presence' },
      { label: 'footer.link.esg',        href: '/sustainability' },
      { label: 'footer.link.gallery',    href: '/gallery' },
      { label: 'footer.link.brand',      href: '/brand' },
    ],
  },
  {
    title: 'footer.col.divisions',
    links: [
      { label: 'div.ezyify.short',      href: '/ezyify' },
      { label: 'div.media.short',       href: '/divisions/media' },
      { label: 'div.ship.short',        href: '/divisions/ship-marketplace' },
      { label: 'div.garments.short',    href: '/divisions/garments' },
      { label: 'div.agriculture.short', href: '/divisions/agriculture' },
      { label: 'div.food.short',        href: '/divisions/food-beverage' },
      { label: 'div.energy.short',      href: '/divisions/oils-energy' },
      { label: 'div.it.short',          href: '/divisions/it-software' },
      { label: 'div.trading.short',     href: '/divisions/global-trading' },
      { label: 'div.ventures.short',    href: '/divisions/strategic-ventures' },
    ],
  },
  {
    title: 'footer.col.business',
    links: [
      { label: 'footer.link.investors',    href: '/investors' },
      { label: 'footer.link.governance',   href: '/governance' },
      { label: 'footer.link.partnerships', href: '/divisions/strategic-ventures' },
      { label: 'footer.link.careers',      href: '/careers' },
      { label: 'footer.link.enquiries',    href: '/contact' },
      { label: 'footer.link.supplier',     href: '/contact' },
    ],
  },
  {
    title: 'footer.col.media',
    links: [
      { label: 'footer.link.news',          href: '/press' },
      { label: 'footer.link.newspaper',     href: '/divisions/media' },
      { label: 'footer.link.tv',            href: '/divisions/media' },
      { label: 'footer.link.video',         href: '/divisions/media' },
      { label: 'footer.link.programs',      href: '/divisions/media' },
      { label: 'footer.link.mediaPartners', href: '/contact' },
    ],
  },
  {
    title: 'footer.col.global',
    links: [
      { label: 'footer.link.presence',  href: '/global-presence' },
      { label: 'footer.link.regions',   href: '/global-presence' },
      { label: 'footer.link.countries', href: '/global-presence' },
      { label: 'footer.link.contact',   href: '/contact' },
      { label: 'footer.link.legal',     href: '/legal' },
    ],
  },
]

export const LEGAL: FooterLink[] = [
  { label: 'footer.legal.privacy',       href: '/legal' },
  { label: 'footer.legal.terms',         href: '/legal' },
  { label: 'footer.legal.cookies',       href: '/legal' },
  { label: 'footer.legal.accessibility', href: '/legal' },
]
