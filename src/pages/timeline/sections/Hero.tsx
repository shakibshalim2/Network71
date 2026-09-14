import PageHero from '@/components/PageHero'
import type { TimelineContent } from '../content/en'

export default function Hero({ c }: { c: TimelineContent['hero'] }) {
  return <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
}
