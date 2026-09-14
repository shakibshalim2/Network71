import PageHero from '@/components/PageHero'
import type { GlobalPresenceContent } from '../content/en'

export default function Hero({ c }: { c: GlobalPresenceContent['hero'] }) {
  return <PageHero align="center" eyebrow={c.badge} title={c.title} kicker={c.stats} lead={c.lead} />
}
