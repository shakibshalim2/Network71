import { ACCENT } from "../theme"
import type { GarmentsContent } from "../content/en"
import FaqAccordion from "@/components/sector/FaqAccordion"

export default function Faq({ c }: { c: GarmentsContent["faq"] }) {
  return <FaqAccordion c={c} accent={ACCENT} />
}
