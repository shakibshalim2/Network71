import PageHero from '@/components/PageHero'
import type { GovernanceContent } from '../content/en'

export default function Hero({ c }: { c: GovernanceContent['hero'] }) {
  return <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
}
