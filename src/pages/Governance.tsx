import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './governance/content/en'
import Hero from './governance/sections/Hero'
import Framework from './governance/sections/Framework'
import Board from './governance/sections/Board'
import Policies from './governance/sections/Policies'
import Committees from './governance/sections/Committees'
import ContactCta from './governance/sections/ContactCta'

const loaders = { bn: () => import('./governance/content/bn') }

export default function Governance() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <main className="public-content">
        <Hero c={c.hero} />
        <Framework c={c.framework} />
        <Board c={c.board} />
        <Policies c={c.policies} />
        <Committees c={c.committees} />
        <ContactCta c={c.contact} />
      </main>
      <Footer />
    </div>
  )
}
