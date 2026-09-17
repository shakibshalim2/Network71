import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import FaqAccordion from '@/components/sector/FaqAccordion'

export default function Faq({ c }: { c: FoodBeverageContent }) {
  return <FaqAccordion c={c.faq} accent={ORANGE} dark />
}
