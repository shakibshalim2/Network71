import PageHero from '@/components/PageHero'
import type { InvestorsContent } from '../content/en'

export default function Hero({ c }: { c: InvestorsContent['hero'] }) {
  return (
    <PageHero
      breadcrumb={{ home: c.breadcrumbHome, current: c.breadcrumbCurrent }}
      eyebrow={c.eyebrow}
      title={c.title}
      lead={c.lead}
    />
  )
}
