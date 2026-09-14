import PageHero from '@/components/PageHero'
import type { PressContent } from '../content/en'

export default function Hero({ c }: { c: PressContent['hero'] }) {
  return <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
}
