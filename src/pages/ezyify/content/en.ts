const stats = [
  { value: "10M+", label: "Target Users", sub: "Global addressable audience" },
  {
    value: "$500M",
    label: "Market Potential",
    sub: "Projected market opportunity",
  },
  { value: "50+", label: "AI Models", sub: "Powering the platform" },
  { value: "99.9%", label: "Uptime SLA", sub: "Enterprise-grade reliability" },
]

const features = [
  {
    title: "AI Virtual Try-On",
    desc: "AR and image-based technology lets shoppers try products before buying — dramatically reducing return rates and boosting purchase confidence.",
    gradient: "from-purple-500 to-violet-600",
    sym: "✦",
  },
  {
    title: "Smart Personalized Feed",
    desc: "Machine learning curates a unique shopping experience for every user based on real-time behavioral signals and preferences.",
    gradient: "from-pink-500 to-rose-600",
    sym: "⬡",
  },
  {
    title: "Video Commerce",
    desc: "Shop directly from shoppable short-form video and live streams — making commerce a natural extension of content consumption.",
    gradient: "from-cyan-500 to-sky-600",
    sym: "▶",
  },
  {
    title: "Creator Marketplace",
    desc: "Creators earn commissions, build their brand, and sell digital and physical products through a dedicated storefront ecosystem.",
    gradient: "from-amber-500 to-orange-600",
    sym: "◈",
  },
  {
    title: "AI Chat Commerce",
    desc: "Conversational AI guides customers through discovery, selection, and checkout — turning engagement into revenue.",
    gradient: "from-emerald-500 to-teal-600",
    sym: "◎",
  },
  {
    title: "Cross-Border Commerce",
    desc: "Multi-currency, multi-language infrastructure enabling frictionless international buying and selling at scale.",
    gradient: "from-indigo-500 to-purple-600",
    sym: "◇",
  },
]

const segments = [
  {
    title: "Sellers",
    icon: "🏪",
    headline: "Launch your store in minutes",
    points: [
      "AI-assisted product listing and catalogue management",
      "Smart pricing recommendations powered by market data",
      "Integrated logistics, payments, and tax compliance",
      "Real-time analytics dashboard for sales and inventory",
    ],
    cta: "Start Selling",
    gradient: "from-purple-600 to-indigo-600",
  },
  {
    title: "Creators",
    icon: "🎬",
    headline: "Build your brand. Monetise your reach.",
    points: [
      "Commission earning on every product you promote",
      "Dedicated creator storefront and digital product sales",
      "Brand collaboration tools and campaign management",
      "Audience analytics and content performance tracking",
    ],
    cta: "Join as Creator",
    gradient: "from-pink-600 to-rose-600",
  },
  {
    title: "Customers",
    icon: "🛍️",
    headline: "Discover. Try. Buy — smarter.",
    points: [
      "AI-curated product feeds tailored to your taste",
      "Try before you buy with AR virtual try-on",
      "Shop from videos, live streams, and creator posts",
      "Intelligent chatbot for discovery and support",
    ],
    cta: "Explore Products",
    gradient: "from-cyan-600 to-sky-600",
  },
  {
    title: "Network71 Divisions",
    icon: "🏢",
    headline: "The built-in supplier network",
    points: [
      "Direct access to N71&apos;s 6 business divisions",
      "Factory-to-consumer pricing advantage",
      "Verified, audited products",
      "Integrated logistics via N71 trading arm",
    ],
    cta: "Learn More",
    gradient: "from-violet-600 to-purple-700",
  },
]

const phases = [
  {
    phase: "Phase 1",
    name: "Core App",
    status: "completed",
    desc: "Platform foundation, seller onboarding, payment infrastructure",
  },
  {
    phase: "Phase 2",
    name: "AI Try-On",
    status: "in-progress",
    desc: "AR virtual try-on rollout across fashion and lifestyle categories",
  },
  {
    phase: "Phase 3",
    name: "Creator Marketplace",
    status: "upcoming",
    desc: "Full creator economy — storefronts, commissions, brand deals",
  },
  {
    phase: "Phase 4",
    name: "Cross-Border & Payments",
    status: "upcoming",
    desc: "Multi-currency expansion, cross-border trade, and global logistics",
  },
]

const aiModels = [
  {
    title: "Computer Vision",
    use: "AR Virtual Try-On",
    desc: "Deep learning models trained on millions of product images to enable real-time augmented reality fitting and overlay.",
    gradient: "from-purple-500 to-violet-600",
    icon: "👁",
  },
  {
    title: "NLP & Chatbots",
    use: "Chat Commerce",
    desc: "Large language models powering conversational shopping assistants that understand intent, recommend products, and process orders.",
    gradient: "from-pink-500 to-rose-600",
    icon: "💬",
  },
  {
    title: "Recommendation Systems",
    use: "Personalised Feed",
    desc: "Collaborative filtering and neural network rankers that learn each user&apos;s unique taste from behavioural signals in real time.",
    gradient: "from-cyan-500 to-sky-600",
    icon: "🎯",
  },
  {
    title: "Predictive Analytics",
    use: "Demand & Pricing",
    desc: "Time-series forecasting and dynamic pricing engines that help sellers optimise stock levels and maximise margin.",
    gradient: "from-emerald-500 to-teal-600",
    icon: "📈",
  },
]

const techBadges = [
  "React Native",
  "Python",
  "TensorFlow",
  "AWS",
  "PostgreSQL",
  "Redis",
  "Kubernetes",
  "WebGL",
]

const revenueStreams = [
  {
    title: "Marketplace Commission",
    icon: "💸",
    desc: "A percentage fee applied to every completed transaction on the platform. Scales directly with GMV as the seller base grows.",
    tag: "% TBP",
    gradient: "from-purple-500 to-indigo-600",
    donutColor: "var(--accent-purple)",
    share: 40,
  },
  {
    title: "SaaS Subscriptions",
    icon: "📊",
    desc: "Premium seller plans unlocking advanced analytics, brand tools, priority placement, and dedicated account management.",
    tag: "Monthly / Annual",
    gradient: "from-pink-500 to-rose-600",
    donutColor: "var(--accent-pink)",
    share: 30,
  },
  {
    title: "Creator Monetisation",
    icon: "🎬",
    desc: "Revenue share on creator-driven sales, brand deal facilitation fees, and digital product marketplace cuts.",
    tag: "Commission Split",
    gradient: "from-cyan-500 to-sky-600",
    donutColor: "#06B6D4",
    share: 20,
  },
  {
    title: "Data Intelligence",
    icon: "🔮",
    desc: "Enterprise-grade market insight reports and anonymised consumer trend data sold to brands and manufacturers.",
    tag: "Coming Soon",
    gradient: "from-amber-500 to-orange-600",
    donutColor: "var(--accent-amber)",
    share: 10,
  },
]

const n71Spokes = [
  { label: "Garments", icon: "👗", desc: "Sell fashion on Ezyify", angle: 0 },
  {
    label: "Agriculture",
    icon: "🌾",
    desc: "Fresh produce marketplace",
    angle: 60,
  },
  {
    label: "Food & Bev",
    icon: "🍽️",
    desc: "Food delivery + grocery",
    angle: 120,
  },
  {
    label: "Oils & Energy",
    icon: "⚡",
    desc: "B2B commodity trade",
    angle: 180,
  },
  { label: "IT & Software", icon: "💻", desc: "Platform builders", angle: 240 },
  {
    label: "Global Trading",
    icon: "🚢",
    desc: "Cross-border logistics",
    angle: 300,
  },
]

const partnerCards = [
  {
    icon: "🏪",
    audience: "Sellers & Brands",
    headline: "List your products on Ezyify",
    desc: "Get early access to millions of AI-matched shoppers. List your catalogue and benefit from our smart pricing and logistics tools from day one.",
    cta: "Join Seller Waitlist",
    href: null,
    gradient: "from-purple-500 to-indigo-600",
    borderHover: "rgba(168,85,247,0.3)",
  },
  {
    icon: "📈",
    audience: "Investors",
    headline: "Join the Ezyify growth story",
    desc: "Ezyify is Network71&apos;s flagship innovation platform targeting a $500M+ social commerce opportunity across South Asia, the Middle East, and beyond.",
    cta: "View Investor Deck",
    href: "/investors",
    gradient: "from-pink-500 to-rose-600",
    borderHover: "rgba(236,72,153,0.3)",
  },
  {
    icon: "🤝",
    audience: "Technology Partners",
    headline: "Integrate with our AI commerce platform",
    desc: "Build on top of the Ezyify API ecosystem. Payment gateways, logistics providers, and SaaS tools — let&apos;s build the future of commerce together.",
    cta: "Get in Touch",
    href: "/contact",
    gradient: "from-cyan-500 to-sky-600",
    borderHover: "rgba(6,182,212,0.3)",
  },
]

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
