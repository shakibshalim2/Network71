import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLocalizedContent } from '@/i18n/useLocalizedContent'
import en from './blog/content/en'
import { Hero, Featured } from './blog/sections/Hero'
import Posts from './blog/sections/Posts'
import Subscribe from './blog/sections/Subscribe'

const loaders = { bn: () => import('./blog/content/bn') }

export default function Blog() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <main className="public-content">
        <Hero c={c.hero} />
        <Featured c={c.featured} />
        <Posts c={c.posts} />
        <Subscribe c={c.subscribe} />
      </main>
      <Footer />
    </div>
  )
}
