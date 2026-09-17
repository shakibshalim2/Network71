import type { OilsEnergyContent } from '../content/en'
import { AMBER } from '../theme'
import FactsLedger from '@/components/sector/FactsLedger'

export default function OilTerms({ c }: { c: OilsEnergyContent }) {
  return <FactsLedger c={c.oilTerms} accent={AMBER} id="oil-terms" dark />
}
