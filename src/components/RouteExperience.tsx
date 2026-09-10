import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { usePageOverrides } from '@/lib/pageContent'

type PageMeta = {
  title: string
  description: string
}

const DEFAULT_META: PageMeta = {
  title: "Network71 | Global Enterprise",
  description:
    "Network71 is a diversified enterprise connecting technology, trade, manufacturing, media, agriculture, energy, and maritime markets.",
}

const PAGE_META: Record<string, PageMeta> = {
  "/projects": { title: "Our Work & Projects | Network71", description: "Explore Network71 project stories, our role, deliverables and outcomes." },
  "/": DEFAULT_META,
  "/about": { title: "About Network71", description: "Learn about Network71, our principles, portfolio, and long-term enterprise vision." },
  "/investors": { title: "Investor Relations | Network71", description: "Investor relations and strategic enquiry information for Network71." },
  "/careers": { title: "Careers | Network71", description: "Explore career opportunities across Network71 and its business divisions." },
  "/contact": { title: "Contact | Network71", description: "Contact Network71 for business, partnership, investor, media, or career enquiries." },
  "/ezyify": { title: "Ezyify | Network71", description: "Discover Ezyify, Network71's technology-led commerce ecosystem." },
  "/sustainability": { title: "Sustainability | Network71", description: "Explore Network71's approach to responsible, resilient, and sustainable growth." },
  "/global-presence": { title: "Global Presence | Network71", description: "Explore the markets and business regions connected by Network71." },
  "/leadership": { title: "Leadership | Network71", description: "Meet the leadership guiding Network71's strategy and governance." },
  "/governance": { title: "Governance | Network71", description: "Read about Network71's governance principles and accountability framework." },
  "/timeline": { title: "Our History | Network71", description: "Follow the development and evolution of Network71." },
  "/press": { title: "Press | Network71", description: "News and press information from Network71." },
  "/legal": { title: "Legal & Privacy | Network71", description: "Network71 legal, privacy, and website terms." },
  "/blog": { title: "Insights | Network71", description: "Perspectives and business insights from across Network71." },
  "/gallery": { title: "Gallery | Network71", description: "Explore visual stories from Network71 and its business divisions." },
  "/brand": { title: "Brand | Network71", description: "Network71 brand identity and usage guidance." },
  "/divisions/garments": { title: "Garments & Apparel | Network71", description: "Network71 garments and apparel capabilities." },
  "/divisions/agriculture": { title: "Agriculture | Network71", description: "Network71 agriculture and agro-business capabilities." },
  "/divisions/food-beverage": { title: "Food & Beverage | Network71", description: "Network71 food and beverage capabilities." },
  "/divisions/oils-energy": { title: "Oils & Energy | Network71", description: "Network71 oils and energy capabilities." },
  "/divisions/it-software": { title: "IT & Software | Network71", description: "Network71 software and digital technology capabilities." },
  "/divisions/global-trading": { title: "Global Trading | Network71", description: "Network71 global trade and market connection capabilities." },
  "/divisions/media": { title: "Media | Network71", description: "Network71 media, communications, and digital content capabilities." },
  "/divisions/ship-marketplace": { title: "Ship Marketplace (eSHIPe) | Network71", description: "Buy, sell, lease and discover ships, vessels and marine assets on Network71's maritime marketplace." },
  "/divisions/strategic-ventures": { title: "International Business & Strategic Ventures | Network71", description: "Joint ventures, strategic partnerships and new business development across Network71." },
}

function setMeta(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement("meta")
    element.name = name
    document.head.appendChild(element)
  }
  element.content = content
}

export default function RouteExperience() {
  const { pathname, search } = useLocation()
  const {sections}=usePageOverrides(PAGE_META[pathname] ? pathname==='/'?'home':pathname.slice(1) : undefined)
  const seo=sections.seo as {title?:string;description?:string}|undefined

  useEffect(() => {
    const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
    const isProject = pathname.startsWith('/projects/')
    const meta = PAGE_META[pathname] ?? (isProject ? { title: 'Project Story | Network71', description: 'Project scope, delivery and outcomes from Network71.' } : isAdmin ? { title: 'Workspace | Network71 Admin', description: 'Network71 website administration.' } : {
      title: "Page Not Found | Network71",
      description: "The requested Network71 page could not be found.",
    })

    document.title = seo?.title || meta.title
    setMeta("description", seo?.description || meta.description)
    setMeta("robots", isAdmin || new URLSearchParams(search).has('n71-preview') ? "noindex, nofollow" : PAGE_META[pathname] ? "index, follow" : "noindex, follow")
    // Keep the canonical URL in sync with the SPA route (legacy aliases redirect first).
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = `${window.location.origin}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`

    requestAnimationFrame(() => {
      document.getElementById("main-content")?.focus({ preventScroll: true })
    })
  }, [pathname, search, seo])

  return null
}
