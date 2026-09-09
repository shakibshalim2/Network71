import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './sustainability/content/en'
import Hero from './sustainability/sections/Hero'
import Metrics from './sustainability/sections/Metrics'
import Sdgs from './sustainability/sections/Sdgs'
import Commitments from './sustainability/sections/Commitments'
import Programs from './sustainability/sections/Programs'
import Report from './sustainability/sections/Report'
import Cta from './sustainability/sections/Cta'

const loaders = { bn: () => import('./sustainability/content/bn') }

export default function Sustainability() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div className="min-h-screen bg-navy text-slate-100">
      <Header />
      <main className="public-content">
        <Hero c={c.hero} />
        <Metrics c={c.metrics} />
        <Sdgs c={c.sdgs} />
        <Commitments c={c.commitments} />
        <Programs c={c.programs} />
        <Report c={c.report} />
        <Cta c={c.cta} />
      </main>
      <Footer />
    </div>
  )
}
