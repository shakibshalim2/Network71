import ManagedContent from "@/components/ManagedContent"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useLocalizedContent } from "@/i18n/useLocalizedContent"
import en from "./gallery/content/en"
import { Hero, ContributeCta } from "./gallery/sections/Hero"
import Grid from "./gallery/sections/Grid"

const loaders = { bn: () => import("./gallery/content/bn") }

export default function Gallery() {
  const c = useLocalizedContent(en, loaders, { page: 'gallery' })
  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <Grid c={c.grid} lightboxLabel={c.lightbox} />
        <ContributeCta c={c.cta} />
      </ManagedContent>
      <Footer />
    </div>
  )
}
