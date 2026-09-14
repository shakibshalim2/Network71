import Header from '@/components/Header'
import Hero from '@/components/Hero'
import StatementBand from '@/components/home/StatementBand'
import DivisionsIndex from '@/components/home/DivisionsIndex'
import Ezyify from '@/components/Ezyify'
import MediaAndMarketplace from '@/components/MediaAndMarketplace'
import TrustedPartners from '@/components/TrustedPartners'
import ConnectPortal from '@/components/home/ConnectPortal'
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
  const components:Record<string,ReactNode>={hero:<Hero />,work:<WorkShowcase />,divisions:<DivisionsIndex />,process:<WorkingTogether />,about:<StatementBand />,ezyify:<Ezyify />,brands:<TrustedPartners />,marketplace:<MediaAndMarketplace />,leadership:<LeadershipTeaser />,sustainability:<SustainabilityTeaser />,contact:<ConnectPortal />}
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
