import type { OilsEnergyContent } from '../content/en'
import { AMBER } from '../theme'
import FaqAccordion from '@/components/sector/FaqAccordion'

export default function Faq({ c }: { c: OilsEnergyContent }) {
  return <FaqAccordion c={c.faq} accent={AMBER} />
}
