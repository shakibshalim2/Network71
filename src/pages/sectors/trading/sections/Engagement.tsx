import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'
import FactsLedger from '@/components/sector/FactsLedger'

export default function Engagement({ c }: { c: TradingContent }) {
  return <FactsLedger c={c.engagement} accent={BLUE} id="engagement" />
}
