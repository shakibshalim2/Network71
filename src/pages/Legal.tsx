import ManagedContent from "@/components/ManagedContent"
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './legal/content/en'
import { Hero, Toc, Contact } from './legal/sections/Chrome'
import { Privacy, Terms, Cookies, Compliance } from './legal/sections/Articles'

const loaders = { bn: () => import('./legal/content/bn') }

export default function Legal() {
  const c = useLocalizedContent(en, loaders, { page: 'legal' })
  const [active, setActive] = useState('privacy')

  // Scroll spy: the TOC bar follows the article currently under the header line.
  useEffect(() => {
    const ids = c.toc.items.map((s) => s.id)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.3
      let current = els[0].id
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id
      setActive(current)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [c.toc.items])

  const scrollTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />

        {/* Body with sticky sidebar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <Toc c={c.toc} active={active} onSelect={scrollTo} />

            <div className="flex-1 min-w-0 space-y-16 lart">
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
      </ManagedContent>
      <Footer />
    </div>
  )
}
