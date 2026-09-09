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

const loaders = { bn: () => import('./media/content/bn') }

export default function Media() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div className="sector-page min-h-full" style={{ background: BG_DEEP, color: 'var(--fg)' }}>
      <SectorHeader divisionName={c.divisionName} accentClass="text-red-400" />
      <main className="public-content">
        <Hero c={c.hero} />
        <MetricsBar metrics={c.metrics} accentHex={RED} dark />
        <Overview c={c.overview} />
        <Desks c={c.desks} />
        <Television c={c.tv} />
        <Standards c={c.standards} />
        <Advertising c={c.advertising} />
        <Gallery c={c.gallery} />
        <SectorContact divisionName={c.divisionName} accentHex={RED} inquiryTypes={c.inquiryTypes} />
      </main>
      <Footer />
    </div>
  )
}
