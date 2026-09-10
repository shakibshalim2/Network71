import ManagedContent from "@/components/ManagedContent"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './about/content/en'
import Hero from './about/sections/Hero'
import Story from './about/sections/Story'
import Purpose from './about/sections/Purpose'
import Quote from './about/sections/Quote'
import Values from './about/sections/Values'
import Leadership from './about/sections/Leadership'
import Timeline from './about/sections/Timeline'
import Cta from './about/sections/Cta'

const loaders = { bn: () => import('./about/content/bn') }

export default function About() {
  const c = useLocalizedContent(en, loaders, { page: 'about' })
  return (
    <div className="min-h-full">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <Story c={c.story} />
        <Purpose c={c.purpose} />
        <Quote c={c.quote} />
        <Values c={c.values} />
        <Leadership c={c.leadership} />
        <Timeline c={c.timeline} />
        <Cta c={c.cta} />
      </ManagedContent>
      <Footer />
    </div>
  )
}
