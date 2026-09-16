import type { ITContent } from "../content/en"
import { ACCENT } from "../theme"
import FactsLedger from "@/components/sector/FactsLedger"

export default function EngagementFacts({ c }: { c: ITContent }) {
  return <FactsLedger c={c.engagementFacts} accent={ACCENT} id="engagement" dark />
}
