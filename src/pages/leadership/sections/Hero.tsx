import PageHero from '@/components/PageHero'
import type { LeadershipContent } from '../content/en'

export default function Hero({ c }: { c: LeadershipContent['hero'] }) {
  return <PageHero align="center" eyebrow={c.badge} title={c.title} lead={c.lead} />
}
