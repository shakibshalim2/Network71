import SectorHeader from "@/components/sector/SectorHeader"
import ProcessFlow from "@/components/sector/ProcessFlow"
import MetricsBar from "@/components/sector/MetricsBar"
import SectorContact from "@/components/sector/SectorContact"
import Footer from "@/components/Footer"
import { useLocalizedContent } from "@/i18n/useLocalizedContent"
import en from "./agriculture/content/en"
import { GREEN } from "./agriculture/theme"
import Hero from "./agriculture/sections/Hero"
import Vision from "./agriculture/sections/Vision"
import Crops from "./agriculture/sections/Crops"
import Technology from "./agriculture/sections/Technology"
import Certifications from "./agriculture/sections/Certifications"
import Quality from "./agriculture/sections/Quality"
import Sustainability from "./agriculture/sections/Sustainability"
import Markets from "./agriculture/sections/Markets"
import Opportunities from "./agriculture/sections/Opportunities"
import FarmerProgram from "./agriculture/sections/FarmerProgram"
import Roadmap from "./agriculture/sections/Roadmap"

const loaders = { bn: () => import("./agriculture/content/bn") }

export default function Agriculture() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div className="sector-page min-h-full bg-navy">
      <SectorHeader
        divisionName={c.divisionName}
        accentClass="text-green-400"
      />
      <main className="public-content">
        <Hero c={c.hero} />
        <MetricsBar metrics={c.metrics} accentHex={GREEN} dark />
        <Vision c={c.vision} />
        <Crops c={c.crops} />
        <Technology c={c.technology} />
        <ProcessFlow
          steps={c.processSteps}
          accentHex={GREEN}
          label={c.processLabel}
        />
        <Certifications c={c.supplyChain} />
        <Quality c={c.quality} />
        <Sustainability c={c.sustainability} />
        <Markets c={c.markets} />
        <Opportunities c={c.opportunities} />
        <FarmerProgram c={c.farmerProgram} />
        <Roadmap c={c.roadmap} />
        <SectorContact
          divisionName={c.divisionName}
          accentHex={GREEN}
          inquiryTypes={c.inquiryTypes}
        />
      </main>
      <Footer />
    </div>
  )
}
