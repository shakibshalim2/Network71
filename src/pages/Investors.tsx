import ManagedContent from "@/components/ManagedContent"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './investors/content/en'
import Hero from './investors/sections/Hero'
import Info from './investors/sections/Info'
import Thesis from './investors/sections/Thesis'
import Documents from './investors/sections/Documents'
import Governance from './investors/sections/Governance'
import Enquiry from './investors/sections/Enquiry'
import Vehicles from './investors/sections/Vehicles'
import Allocation from './investors/sections/Allocation'
import Reporting from './investors/sections/Reporting'
import Diligence from './investors/sections/Diligence'
import FactsLedger from '@/components/sector/FactsLedger'
import FaqAccordion from '@/components/sector/FaqAccordion'
import { useCompanySettings } from '@/lib/companySettings'

const loaders = { bn: () => import('./investors/content/bn') }

export default function Investors() {
  const c = useLocalizedContent(en, loaders, { page: 'investors' })
  const email = useCompanySettings().investorsEmail
  return (
    <div className="min-h-full">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <FactsLedger c={c.facts} accent="var(--brand)" id="proposition" dark href="#investor-enquiry" />
        <Info c={c.info} email={email} />
        <Thesis c={c.thesis} />
        <Vehicles c={c.vehicles} />
        <Allocation c={c.allocation} />
        <Reporting c={c.reporting} />
        <Diligence c={c.diligence} />
        <Documents c={c.documents} email={email} />
        <Governance c={c.governance} />
        <FaqAccordion c={c.faq} accent="var(--brand)" dark href="#investor-enquiry" />
        <Enquiry c={c.enquiry} email={email} />
      </ManagedContent>
      <Footer />
    </div>
  )
}
