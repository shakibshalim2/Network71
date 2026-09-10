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
import { usePageOverrides } from '@/lib/pageContent'
import { homeLayout } from '@/lib/homeLayout'
import type { ReactNode } from 'react'

export default function Home() {
  const {sections}=usePageOverrides('home')
  const supplied=Array.isArray(sections.layout)?sections.layout:homeLayout
  const components:Record<string,ReactNode>={hero:<Hero />,work:<WorkShowcase />,divisions:<Divisions />,process:<WorkingTogether />,about:<About />,ezyify:<Ezyify />,brands:<TrustedPartners />,marketplace:<MediaAndMarketplace />,leadership:<LeadershipTeaser />,sustainability:<SustainabilityTeaser />,contact:<GlobalCTA />}
  const layout=homeLayout.map(original=>({...original,...supplied.find(row=>row.key===original.key)})).filter(row=>row.visible).sort((a,b)=>a.order-b.order)
  return (
    <div className="min-h-full">
      <Header />
      <main className="public-content">
        {layout.map(row=><div key={row.key} style={{display:'contents'}}>{components[row.key]}</div>)}
      </main>
      <Footer />
    </div>
  )
}
