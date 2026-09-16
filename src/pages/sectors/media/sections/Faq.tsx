import { RED } from '../theme'
import type { MediaContent } from '../content/en'
import FaqAccordion from '@/components/sector/FaqAccordion'

export default function Faq({ c }: { c: MediaContent['faq'] }) {
  return <FaqAccordion c={c} accent={RED} dark />
}
