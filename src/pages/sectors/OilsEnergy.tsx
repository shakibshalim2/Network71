import ManagedContent from "@/components/ManagedContent"
import SectorHeader from '@/components/sector/SectorHeader'
import ProcessFlow from '@/components/sector/ProcessFlow'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './oils-energy/content/en'
import { AMBER } from './oils-energy/theme'
import Hero from './oils-energy/sections/Hero'
import Overview from './oils-energy/sections/Overview'
import EdibleOils from './oils-energy/sections/EdibleOils'
import EnergyFuel from './oils-energy/sections/EnergyFuel'
import SupplyChain from './oils-energy/sections/SupplyChain'
import Compliance from './oils-energy/sections/Compliance'
import Technology from './oils-energy/sections/Technology'
import Sustainability from './oils-energy/sections/Sustainability'
import Markets from './oils-energy/sections/Markets'
import Opportunities from './oils-energy/sections/Opportunities'
import Roadmap from './oils-energy/sections/Roadmap'

const loaders = { bn: () => import('./oils-energy/content/bn') }

export default function OilsEnergy() {
  const c = useLocalizedContent(en, loaders, { page: 'divisions/oils-energy' })
  return <div className="sector-page min-h-full bg-navy"><SectorHeader divisionName={c.divisionName} accentClass={c.accentClass} /><ManagedContent content={c} className="public-content">
    <Hero c={c} /><MetricsBar metrics={c.metrics} accentHex={AMBER} /><Overview c={c} /><EdibleOils c={c} /><EnergyFuel c={c} /><ProcessFlow steps={c.oilProcessSteps} accentHex={AMBER} label={c.copy.oilProcessLabel} /><SupplyChain c={c} /><Compliance c={c} /><Technology c={c} /><Sustainability c={c} /><Markets c={c} /><Opportunities c={c} /><Roadmap c={c} /><SectorContact divisionName={c.divisionName} accentHex={AMBER} inquiryTypes={c.inquiryTypes} />
  </ManagedContent><Footer /></div>
}
