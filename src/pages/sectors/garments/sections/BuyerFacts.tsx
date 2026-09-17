import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import FactsLedger from "@/components/sector/FactsLedger"

export default function BuyerFacts({ c }: { c: GarmentsContent["buyerFacts"] }) {
  return <FactsLedger c={c} accent={ACCENT} />
}
