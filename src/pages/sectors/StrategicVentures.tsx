import ManagedContent from "@/components/ManagedContent"
import SectorHeader from '@/components/sector/SectorHeader'
import MetricsBar from '@/components/sector/MetricsBar'
import ProcessFlow from '@/components/sector/ProcessFlow'
import SectorContact from '@/components/sector/SectorContact'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './ventures/content/en'
import { INDIGO, BG_DEEP } from './ventures/theme'
import Hero from './ventures/sections/Hero'
import Overview from './ventures/sections/Overview'
import Models from './ventures/sections/Models'
import Partners from './ventures/sections/Partners'
import Status from './ventures/sections/Status'

const loaders = { bn: () => import('./ventures/content/bn') }

export default function StrategicVentures() {
  const c = useLocalizedContent(en, loaders, { page: 'divisions/strategic-ventures' })
  return (
    <div className="sector-page min-h-full" style={{ background: BG_DEEP, color: 'var(--fg)' }}>
      <SectorHeader divisionName={c.divisionName} accentClass="text-indigo-300" />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <MetricsBar metrics={c.metrics} accentHex={INDIGO} dark />
        <Overview c={c.overview} />
        <Models c={c.models} />
        <ProcessFlow steps={c.process} accentHex={INDIGO} label={c.processLabel} />
        <Partners c={c.partners} />
        <Status c={c.status} />
        <SectorContact divisionName={c.divisionName} accentHex={INDIGO} inquiryTypes={c.inquiryTypes} />
      </ManagedContent>
      <Footer />
    </div>
  )
}
