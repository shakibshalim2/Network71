import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Divisions from '@/components/Divisions'
import Ezyify from '@/components/Ezyify'
import MediaAndMarketplace from '@/components/MediaAndMarketplace'
import TrustedPartners from '@/components/TrustedPartners'
import GlobalCTA from '@/components/GlobalCTA'
import Footer from '@/components/Footer'
import WorkShowcase, { WorkingTogether } from '@/components/WorkShowcase'
import LeadershipTeaser from '@/components/home/LeadershipTeaser'
import SustainabilityTeaser from '@/components/home/SustainabilityTeaser'

export default function Home() {
  return (
    <div className="min-h-full">
      <Header />
      <main className="public-content">
        <Hero />
        <WorkShowcase />
        <Divisions />
        <WorkingTogether />
        <About />
        <Ezyify />
        <TrustedPartners />
        <MediaAndMarketplace />
        <LeadershipTeaser />
        <SustainabilityTeaser />
        <GlobalCTA />
      </main>
      <Footer />
    </div>
  )
}
