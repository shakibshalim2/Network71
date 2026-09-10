import ManagedContent from "@/components/ManagedContent"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useLocalizedContent } from "@/i18n/useLocalizedContent"
import en from "./careers/content/en"
import Hero from "./careers/sections/Hero"
import Benefits from "./careers/sections/Benefits"
import Openings from "./careers/sections/Openings"
import Process from "./careers/sections/Process"
import Cta from "./careers/sections/Cta"

const loaders = { bn: () => import("./careers/content/bn") }

export default function Careers() {
  const c = useLocalizedContent(en, loaders, { page: 'careers' })
  return (
    <div className="min-h-full">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <Benefits c={c.benefits} />
        <Openings c={c.openings} />
        <Process c={c.process} />
        <Cta c={c.cta} />
      </ManagedContent>
      <Footer />
    </div>
  )
}
