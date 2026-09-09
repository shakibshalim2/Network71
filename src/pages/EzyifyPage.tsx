import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useLocalizedContent } from "@/i18n/useLocalizedContent"
import en from "./ezyify/content/en"
import { BG } from "./ezyify/theme"
import Hero from "./ezyify/sections/Hero"
import Audience from "./ezyify/sections/Audience"
import Features from "./ezyify/sections/Features"
import Segments from "./ezyify/sections/Segments"
import Roadmap from "./ezyify/sections/Roadmap"
import AI from "./ezyify/sections/AI"
import Revenue from "./ezyify/sections/Revenue"
import Ecosystem from "./ezyify/sections/Ecosystem"
import Partners from "./ezyify/sections/Partners"
import Waitlist from "./ezyify/sections/Waitlist"

const loaders = { bn: () => import("./ezyify/content/bn") }

export default function EzyifyPage() {
  const c = useLocalizedContent(en, loaders)
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: BG, color: "var(--fg)" }}
    >
      <Header />
      <main className="public-content">
        <Hero c={c.hero} />
        <Audience c={c.audience} />
        <Features c={c.features} />
        <AI c={c.ai} />
        <Revenue c={c.revenue} />
        <Segments c={c.segments} />
        <Ecosystem c={c.ecosystem} />
        <Partners c={c.partners} />
        <Roadmap c={c.roadmap} />
        <Waitlist c={c.waitlist} />
      </main>
      <Footer />
    </div>
  )
}
