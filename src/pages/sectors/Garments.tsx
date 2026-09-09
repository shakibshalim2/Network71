import SectorHeader from "@/components/sector/SectorHeader"
import ProcessFlow from "@/components/sector/ProcessFlow"
import MetricsBar from "@/components/sector/MetricsBar"
import SectorContact from "@/components/sector/SectorContact"
import Footer from "@/components/Footer"
import { useLocalizedContent } from "@/i18n/useLocalizedContent"
import en from "./garments/content/en"
import { ACCENT } from "./garments/theme"
import Hero from "./garments/sections/Hero"
import Overview from "./garments/sections/Overview"
import Products from "./garments/sections/Products"
import Manufacturing from "./garments/sections/Manufacturing"
import Technology from "./garments/sections/Technology"
import Facilities from "./garments/sections/Facilities"
import Quality from "./garments/sections/Quality"
import Sustainability from "./garments/sections/Sustainability"
import SupplyChain from "./garments/sections/SupplyChain"
import Markets from "./garments/sections/Markets"
import Opportunity from "./garments/sections/Opportunity"
import Roadmap from "./garments/sections/Roadmap"

const loaders = { bn: () => import("./garments/content/bn") }

export default function Garments() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div className="sector-page min-h-full bg-surface-0">
      <SectorHeader divisionName={c.divisionName} accentClass="text-rose-400" />
      <main className="public-content">
        <Hero c={c.hero} />
        <MetricsBar metrics={c.metrics} accentHex={ACCENT} />
        <Overview c={c.overview} />
        <Products c={c.products} />
        <Manufacturing c={c.manufacturing} />
        <ProcessFlow
          steps={c.processSteps}
          accentHex={ACCENT}
          label={c.processLabel}
        />
        <Technology c={c.technology} />
        <Facilities c={c.facilities} />
        <Quality c={c.quality} />
        <Sustainability c={c.sustainability} />
        <SupplyChain c={c.supplyChain} />
        <Markets c={c.markets} />
        <Opportunity c={c.opportunity} />
        <Roadmap c={c.roadmap} />
        <SectorContact
          divisionName={c.divisionName}
          accentHex={ACCENT}
          inquiryTypes={c.inquiryTypes}
        />
      </main>
      <Footer />
    </div>
  )
}
