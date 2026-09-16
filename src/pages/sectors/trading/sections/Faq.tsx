import { BLUE } from '../theme'
import type { TradingContent } from '../content/en'
import FaqAccordion from '@/components/sector/FaqAccordion'

export default function Faq({ c }: { c: TradingContent }) {
  return <FaqAccordion c={c.faq} accent={BLUE} dark />
}
