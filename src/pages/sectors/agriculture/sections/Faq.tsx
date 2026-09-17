import { GREEN } from "../theme"
import type { AgricultureContent } from "../content/en"
import FaqAccordion from "@/components/sector/FaqAccordion"

export default function Faq({ c }: { c: AgricultureContent["faq"] }) {
  return <FaqAccordion c={c} accent={GREEN} />
}
