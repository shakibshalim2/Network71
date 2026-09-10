import ManagedContent from "@/components/ManagedContent"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './press/content/en'
import Hero from './press/sections/Hero'
import MediaKit from './press/sections/MediaKit'
import Briefings from './press/sections/Briefings'
import Verification from './press/sections/Verification'
import ContactCta from './press/sections/ContactCta'

const loaders = { bn: () => import('./press/content/bn') }

export default function Press() {
  const c = useLocalizedContent(en, loaders, { page: 'press' })
  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <MediaKit c={c.mediaKit} />
        <Briefings c={c.briefings} />
        <Verification c={c.verification} />
        <ContactCta c={c.contact} />
      </ManagedContent>
      <Footer />
    </div>
  )
}
