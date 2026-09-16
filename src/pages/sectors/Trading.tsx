import ManagedContent from "@/components/ManagedContent"
import SectorHeader from '@/components/sector/SectorHeader'
import ProcessFlow from '@/components/sector/ProcessFlow'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './trading/content/en'
import { BLUE, BG_DEEP } from './trading/theme'
import Hero from './trading/sections/Hero'
import Overview from './trading/sections/Overview'
import Categories from './trading/sections/Categories'
import Network from './trading/sections/Network'
import Services from './trading/sections/Services'
import Compliance from './trading/sections/Compliance'
import Infrastructure from './trading/sections/Infrastructure'
import Technology from './trading/sections/Technology'
import Finance from './trading/sections/Finance'
import Lanes from './trading/sections/Lanes'
import Risk from './trading/sections/Risk'
import Sustainability from './trading/sections/Sustainability'
import Opportunities from './trading/sections/Opportunities'
import Roadmap from './trading/sections/Roadmap'
import Incoterms from './trading/sections/Incoterms'
import LaneBoard from './trading/sections/LaneBoard'
import Engagement from './trading/sections/Engagement'
import Faq from './trading/sections/Faq'

const loaders = { bn: () => import('./trading/content/bn') }

export default function Trading() {
  const c = useLocalizedContent(en, loaders, { page: 'divisions/global-trading' })
  return <div className="sector-page min-h-full bg-navy" style={{ background: BG_DEEP }}><SectorHeader divisionName={c.divisionName} accentClass="text-blue-400" /><ManagedContent content={c} className="public-content"><Hero c={c} /><MetricsBar metrics={c.metrics} accentHex={BLUE} dark /><Overview c={c} /><Categories c={c} /><Network c={c} /><Services c={c} /><ProcessFlow steps={c.process} accentHex={BLUE} label={c.processLabel} /><Compliance c={c} /><Infrastructure c={c} /><Technology c={c} /><Finance c={c} /><Incoterms c={c} /><Lanes c={c} /><LaneBoard c={c} /><Engagement c={c} /><Risk c={c} /><Sustainability c={c} /><Opportunities c={c} /><Roadmap c={c} /><Faq c={c} /><SectorContact divisionName={c.divisionName} accentHex={BLUE} inquiryTypes={c.inquiryTypes} /></ManagedContent><Footer /></div>
}
