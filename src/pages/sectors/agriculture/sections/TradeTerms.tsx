import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import FactsLedger from "@/components/sector/FactsLedger"

export default function TradeTerms({ c }: { c: AgricultureContent["terms"] }) {
  return <FactsLedger c={c} accent={GREEN} id="trade-terms" dark />
}
