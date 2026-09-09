import SectorHeader from "@/components/sector/SectorHeader"
import MetricsBar from "@/components/sector/MetricsBar"
import ProcessFlow from "@/components/sector/ProcessFlow"
import SectorContact from "@/components/sector/SectorContact"
import Footer from "@/components/Footer"
import { useLocalizedContent } from "@/i18n/useLocalizedContent"
import en from "./eshipe/content/en"
import { BG_DEEP, OCEAN } from "./eshipe/theme"
import Hero from "./eshipe/sections/Hero"
import Services from "./eshipe/sections/Services"
import Categories from "./eshipe/sections/Categories"
import VesselListings from "./eshipe/sections/VesselListings"
import Recycling from "./eshipe/sections/Recycling"
import WhyEShipe from "./eshipe/sections/WhyEShipe"
import GlobalReach from "./eshipe/sections/GlobalReach"

const loaders = { bn: () => import("./eshipe/content/bn") }

export default function EShipe() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div
      className="sector-page min-h-full"
      style={{ background: BG_DEEP, color: "var(--fg)" }}
    >
      <SectorHeader divisionName={c.divisionName} accentClass="text-sky-400" />
      <main className="public-content">
        <Hero c={c.hero} />
        <MetricsBar metrics={c.metrics} accentHex={OCEAN} dark />
        <Services c={c.services} />
        <Categories c={c.categories} />
        <VesselListings c={c.listings} />
        <ProcessFlow
          steps={c.process}
          accentHex={OCEAN}
          label={c.processLabel}
        />
        <Recycling c={c.recycling} />
        <WhyEShipe c={c.why} />
        <GlobalReach c={c.reach} />
        <SectorContact
          divisionName={c.divisionName}
          accentHex={OCEAN}
          inquiryTypes={c.inquiryTypes}
        />
      </main>
      <Footer />
    </div>
  )
}
