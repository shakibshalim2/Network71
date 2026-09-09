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

const loaders = { bn: () => import('./investors/content/bn') }

export default function Investors() {
  const c = useLocalizedContent(en, loaders)
  const email = c.enquiry.email
  return (
    <div className="min-h-full">
      <Header />
      <main className="public-content">
        <Hero c={c.hero} />
        <Info c={c.info} email={email} />
        <Thesis c={c.thesis} />
        <Documents c={c.documents} email={email} />
        <Governance c={c.governance} />
        <Enquiry c={c.enquiry} />
      </main>
      <Footer />
    </div>
  )
}
