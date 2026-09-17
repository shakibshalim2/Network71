import ManagedContent from "@/components/ManagedContent"
import SectorHeader from '@/components/sector/SectorHeader'
import ProcessFlow from '@/components/sector/ProcessFlow'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './food-beverage/content/en'
import { ORANGE, BG_DEEP } from './food-beverage/theme'
import Hero from './food-beverage/sections/Hero'
import Overview from './food-beverage/sections/Overview'
import ProductPortfolio from './food-beverage/sections/ProductPortfolio'
import BrandModels from './food-beverage/sections/BrandModels'
import Standards from './food-beverage/sections/Standards'
import QualityLab from './food-beverage/sections/QualityLab'
import Facilities from './food-beverage/sections/Facilities'
import QualityCompliance from './food-beverage/sections/QualityCompliance'
import Sustainability from './food-beverage/sections/Sustainability'
import ExportMarkets from './food-beverage/sections/ExportMarkets'
import Opportunities from './food-beverage/sections/Opportunities'
import Roadmap from './food-beverage/sections/Roadmap'
import PartnerTerms from './food-beverage/sections/PartnerTerms'
import NpdStages from './food-beverage/sections/NpdStages'
import Formats from './food-beverage/sections/Formats'
import Faq from './food-beverage/sections/Faq'

const loaders = { bn: () => import('./food-beverage/content/bn') }

export default function FoodBeverage() {
  const c = useLocalizedContent(en, loaders, { page: 'divisions/food-beverage' })
  return <div className="sector-page min-h-full" style={{ background: BG_DEEP }}>
    <SectorHeader divisionName={c.divisionName} accentClass="text-orange-400" />
    <ManagedContent content={c} className="public-content"><Hero c={c} /><MetricsBar metrics={c.metrics} accentHex={ORANGE} dark />
      <Overview c={c} /><ProductPortfolio c={c} /><BrandModels c={c} /><PartnerTerms c={c} /><NpdStages c={c} /><Formats c={c} /><Standards c={c} /><QualityLab c={c} />
      <ProcessFlow steps={c.processSteps} accentHex={ORANGE} label={c.processLabel} /><Facilities c={c} /><QualityCompliance c={c} />
      <Sustainability c={c} /><ExportMarkets c={c} /><Opportunities c={c} /><Roadmap c={c} /><Faq c={c} />
      <SectorContact divisionName={c.divisionName} accentHex={ORANGE} inquiryTypes={c.inquiryTypes} />
    </ManagedContent><Footer />
  </div>
}
