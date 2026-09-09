import SectorHeader from "@/components/sector/SectorHeader"
import ProcessFlow from "@/components/sector/ProcessFlow"
import MetricsBar from "@/components/sector/MetricsBar"
import SectorContact from "@/components/sector/SectorContact"
import Footer from "@/components/Footer"
import { useLocalizedContent } from "@/i18n/useLocalizedContent"
import en from "./it/content/en"
import { ACCENT, BG_DEEP } from "./it/theme"
import Hero from "./it/sections/Hero"
import Overview from "./it/sections/Overview"
import Services from "./it/sections/Services"
import Ezyify from "./it/sections/Ezyify"
import AILab from "./it/sections/AILab"
import Technology from "./it/sections/Technology"
import Projects from "./it/sections/Projects"
import Clients from "./it/sections/Clients"
import Delivery from "./it/sections/Delivery"
import Quality from "./it/sections/Quality"
import GlobalReach from "./it/sections/GlobalReach"
import Opportunities from "./it/sections/Opportunities"
import Roadmap from "./it/sections/Roadmap"

const loaders = { bn: () => import("./it/content/bn") }

export default function IT() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div
      className="sector-page min-h-full"
      style={{ background: BG_DEEP, color: "var(--fg)" }}
    >
      <SectorHeader divisionName={c.divisionName} accentClass="text-cyan-400" />
      <main className="public-content">
        <Hero c={c} />{" "}
        <MetricsBar metrics={c.metrics} accentHex={ACCENT} dark />{" "}
        <Overview c={c} /> <Services c={c} />
        <Ezyify c={c} /> <AILab c={c} /> <Technology c={c} /> <Projects c={c} />
        <ProcessFlow
          steps={c.processSteps}
          accentHex={ACCENT}
          label={c.processLabel}
        />{" "}
        <Clients c={c} />
        <Delivery c={c} /> <Quality c={c} /> <GlobalReach c={c} />{" "}
        <Opportunities c={c} /> <Roadmap c={c} />
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
