import { OCEAN } from "../theme"
import type { EShipeContent } from "../content/en"
import FactsLedger from "@/components/sector/FactsLedger"

export default function DealTerms({ c }: { c: EShipeContent["dealTerms"] }) {
  return <FactsLedger c={c} accent={OCEAN} id="deal-terms" dark />
}
