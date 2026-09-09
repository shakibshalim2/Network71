import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './timeline/content/en'
import Hero from './timeline/sections/Hero'
import Milestones from './timeline/sections/Milestones'
import AboutCta from './timeline/sections/AboutCta'

const loaders = { bn: () => import('./timeline/content/bn') }

export default function Timeline() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <main className="public-content">
        <Hero c={c.hero} />
        <Milestones c={c.timeline} />
        <AboutCta c={c.cta} />
      </main>
      <Footer />
    </div>
  )
}
