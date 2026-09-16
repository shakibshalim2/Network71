import { OCEAN } from "../theme"
import type { EShipeContent } from "../content/en"
import FaqAccordion from "@/components/sector/FaqAccordion"

export default function Faq({ c }: { c: EShipeContent["faq"] }) {
  return <FaqAccordion c={c} accent={OCEAN} dark />
}
