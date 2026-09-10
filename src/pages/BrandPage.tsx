import ManagedContent from "@/components/ManagedContent"
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './brand/content/en'
import Hero from './brand/sections/Hero'
import { Primary, Transparent, DarkUsage, Monochrome } from './brand/sections/LogoVariants'
import { IconMark, Favicon } from './brand/sections/IconMark'
import { Palette, Usage, FooterMark } from './brand/sections/Guidelines'

const loaders = { bn: () => import('./brand/content/bn') }

export default function BrandPage() {
  const c = useLocalizedContent(en, loaders, { page: 'brand' })
  return (
    <div style={{ background: 'var(--s0)', minHeight: '100vh' }}>
      <Header />

      <ManagedContent content={c} className="public-content brand-page pt-28 pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Hero c={c.hero} />
          <Primary c={c.primary} />
          <Transparent c={c.transparent} />
          <DarkUsage c={c.dark} />
          <Monochrome c={c.mono} />
          <IconMark c={c.icon} />
          <Favicon c={c.favicon} />
          <Palette c={c.palette} />
          <Usage c={c.usage} />
          <FooterMark c={c.footer} />
        </div>
      </ManagedContent>

      <Footer />
    </div>
  )
}
