import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './legal/content/en'
import { Hero, Toc, Contact } from './legal/sections/Chrome'
import { Privacy, Terms, Cookies, Compliance } from './legal/sections/Articles'

const loaders = { bn: () => import('./legal/content/bn') }

export default function Legal() {
  const c = useLocalizedContent(en, loaders)
  const [active, setActive] = useState('privacy')

  const scrollTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <main className="public-content">
        <Hero c={c.hero} />

        {/* Body with sticky sidebar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <Toc c={c.toc} active={active} onSelect={scrollTo} />

            <div className="flex-1 min-w-0 space-y-16">
              <Privacy c={c.privacy} />
              <div className="border-t border-white/8" />
              <Terms c={c.terms} />
              <div className="border-t border-white/8" />
              <Cookies c={c.cookies} />
              <div className="border-t border-white/8" />
              <Compliance c={c.compliance} />
              <Contact c={c.contact} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
