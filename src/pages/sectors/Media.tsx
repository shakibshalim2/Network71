import ManagedContent from "@/components/ManagedContent"
import SectorHeader from '@/components/sector/SectorHeader'
import MetricsBar from '@/components/sector/MetricsBar'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './media/content/en'
import { RED, BG_DEEP } from './media/theme'
import Hero from './media/sections/Hero'
import Overview from './media/sections/Overview'
import Desks from './media/sections/Desks'
import Television from './media/sections/Television'
import Standards from './media/sections/Standards'
import Advertising from './media/sections/Advertising'
import Gallery from './media/sections/Gallery'
import AdSpecs from './media/sections/AdSpecs'
import Audience from './media/sections/Audience'
import Production from './media/sections/Production'
import PressDesk from './media/sections/PressDesk'
import Faq from './media/sections/Faq'

const loaders = { bn: () => import('./media/content/bn') }

export default function Media() {
  const c = useLocalizedContent(en, loaders, { page: 'divisions/media' })
  return (
    <div className="sector-page min-h-full" style={{ background: BG_DEEP, color: 'var(--fg)' }}>
      <SectorHeader divisionName={c.divisionName} accentClass="text-red-400" />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <MetricsBar metrics={c.metrics} accentHex={RED} dark />
        <Overview c={c.overview} />
        <Desks c={c.desks} />
        <Television c={c.tv} />
        <Standards c={c.standards} />
        <Advertising c={c.advertising} />
        <Audience c={c.audience} />
        <AdSpecs c={c.adSpecs} />
        <Production c={c.production} />
        <Gallery c={c.gallery} />
        <PressDesk c={c.pressDesk} />
        <Faq c={c.faq} />
        <SectorContact divisionName={c.divisionName} accentHex={RED} inquiryTypes={c.inquiryTypes} />
      </ManagedContent>
      <Footer />
    </div>
  )
}
