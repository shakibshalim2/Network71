import { stats, features, segments, phases } from './en/data-a'
import {
  aiModels,
  techBadges,
  revenueStreams,
  n71Spokes,
  partnerCards,
} from './en/data-b'

const en = {
  hero: {
    stats,
    eyebrow: "Network71 · Product & platform vision",
    title: "Ezyify",
    subtitle: "AI-Powered Global",
    subtitle2: "E-commerce Social Media Ecosystem",
    lead: "Connecting sellers, creators, and customers through AI virtual try-on, video commerce, and intelligent personalization — on one unified platform.",
    visit: "Visit Ezyify.com",
    invest: "Invest in Ezyify",
  },
  audience: {
    items: segments,
    eyebrow: "Who It’s For",
    title: "Built for Four Ecosystems",
    lead: "Ezyify unifies sellers, creators, customers, and the entire Network71 supplier network on one intelligent platform — creating value at every connection point.",
  },
  features: {
    items: features,
    eyebrow: "Platform Features",
    title: "The Commerce Engine",
    lead: "Six interlocking features that transform how people discover, try, and buy — powered by AI at every layer.",
  },
  segments: {
    eyebrow: "The Opportunity",
    title: "Market Opportunity",
    lead: "Social commerce is the fastest-growing retail channel globally. Ezyify positions Network71 at the intersection of AI, social media, and e-commerce.",
    marketLead:
      "The global social commerce market is projected to reach trillions in the coming decade. " +
      "Ezyify targets a high-growth slice across emerging and diaspora markets where mobile-first commerce is exploding.",
    regions: "4 Regions",
    timelineLead:
      "Progressive rollout beginning with core markets in South Asia, expanding through the Middle East and Southeast Asia, with Western diaspora markets targeted in 2026.",
    tam: "Total Addressable Market",
    markets: "Target Markets",
    timeline: "Launch Timeline",
    regionList: ["South Asia", "Middle East", "Southeast Asia", "Western Markets (Diaspora)"],
    quote:
      "Social commerce is the fastest-growing retail channel globally. Ezyify positions Network71 at the intersection of AI, " +
      "social media, and e-commerce — capturing a market that existing platforms are only beginning to address.",
    vision: "Network71 Strategic Vision",
  },
  roadmap: {
    phases,
    eyebrow: "Roadmap",
    title: "Launch Phases",
    lead: "Ezyify is rolling out in deliberate phases — each one expanding capability and market reach.",
  },
  ai: {
    models: aiModels,
    badges: techBadges,
    eyebrow: "Under the Hood",
    title: "Technology Architecture",
    lead: "Built by Network71's 200+ engineer team in Dhaka — Ezyify runs on a proprietary AI stack purpose-built for social commerce at scale.",
    modelCount: "50+",
    modelTitle: "Proprietary AI Models",
    modelLead:
      "Purpose-trained on commerce, fashion, and consumer behaviour data across South Asia and the Middle East",
    usedFor: "Used for:",
    stack: "Infrastructure Stack",
  },
  revenue: {
    items: revenueStreams,
    eyebrow: "Monetisation",
    title: "Business Model",
    lead: "Four diversified revenue streams designed to grow with the platform and align incentives across sellers, creators, and brands.",
    streams: "Streams",
    note: "Indicative revenue mix — subject to change",
  },
  ecosystem: {
    spokes: n71Spokes,
    eyebrow: "Ecosystem Integration",
    title: "The N71 Ecosystem Hub",
    lead: "Ezyify is not just a standalone platform — it is the digital marketplace layer connecting all Network71 business divisions to end consumers and businesses globally.",
    hub: "Marketplace Hub",
    diagramLabel: "N71 ecosystem hub diagram",
  },
  partners: {
    items: partnerCards,
    eyebrow: "Get Involved",
    title: "Partnership Opportunities",
    lead: "Whether you are a seller ready to scale, an investor seeking high-growth exposure, or a technology company looking to integrate — there is a place for you in the Ezyify ecosystem.",
  },
  waitlist: {
    eyebrow: "Coming Soon",
    title: "Be First to Experience Ezyify",
    lead: "Join the waitlist and shape the future of social commerce.",
    success: "Your email draft is ready — send it to request early access.",
    emailLabel: "Email address for Ezyify early access",
    placeholder: "your@email.com",
    join: "Join Waitlist",
    visit: "Visit Ezyify.com",
    investorInfo: "Investor Information",
    partner: "Partner with Us",
    deck: "Ezyify Investor Deck",
    programs: "Partner Programs",
    subject: "Ezyify early-access request",
  },
}

export type EzyifyContent = typeof en
export default en
