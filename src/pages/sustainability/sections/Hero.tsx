import PageHero from '@/components/PageHero'
import type { SustainabilityContent } from '../content/en'

export default function Hero({ c }: { c: SustainabilityContent['hero'] }) {
  return <PageHero align="center" accent="var(--accent-teal)" auroraHex="#0D9488" eyebrow={c.badge} title={c.title} lead={c.lead} />
}
