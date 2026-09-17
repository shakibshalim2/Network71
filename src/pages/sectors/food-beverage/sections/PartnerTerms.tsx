import type { FoodBeverageContent } from '../content/en'
import { ORANGE } from '../theme'
import FactsLedger from '@/components/sector/FactsLedger'

export default function PartnerTerms({ c }: { c: FoodBeverageContent }) {
  return <FactsLedger c={c.partnerTerms} accent={ORANGE} id="partner-terms" />
}
