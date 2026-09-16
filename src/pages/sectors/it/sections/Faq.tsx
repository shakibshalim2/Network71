import type { ITContent } from "../content/en"
import { ACCENT } from "../theme"
import FaqAccordion from "@/components/sector/FaqAccordion"

export default function Faq({ c }: { c: ITContent }) {
  return <FaqAccordion c={c.faq} accent={ACCENT} dark />
}
