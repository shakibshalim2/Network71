import {
  metrics,
  showcaseProjects,
  servicePillars,
  ezyifyFeatures,
  aiModels,
  techBadges,
  processSteps,
} from "./en/data"
import {
  internalDivisions,
  deliveryModels,
  roadmapItems,
  overviewPillars,
  qualityItems,
  ezyifyStats,
  reachStats,
  opportunities,
} from "./en/operations"

const en = {
  divisionName: "IT & Software",
  copy: {
    Hero: {
      eyebrow: "Network71 \u2014 Division 06",
      title: "Software",
      lead:
        "Engineering the digital backbone of a global enterprise — and building tomorrow's platforms. From " +
        "internal ERP to AI-powered consumer products, Network71's technology division delivers software " +
        "built to scale with the business.",
      ctaPrimary: "Start a Project",
      ctaSecondary: "Explore Ezyify",
      detailPrimary: "$ n71 deploy --division=it --env=production",
      detailSecondary: "\u2713 product systems connected",
      detailTertiary: "\u2713 delivery pipeline ready",
      footnote: "\u2713 quality checks passed",
      status: "\u25ae awaiting instructions_",
    },
    Overview: {
      eyebrow: "Division Overview",
      title: "The Technology Division That Powers Every Business Unit",
      lead:
        "Network71's IT & Software division operates on two parallel tracks. Internally, it builds and " +
        "maintains the enterprise technology infrastructure that supports all ten N71 business divisions — from " +
        "garment production tracking to cross-border trade management. Externally, it develops commercial " +
        "software products, most notably Ezyify, our AI-powered social commerce ecosystem currently in build.",
      ctaPrimary:
        "The division brings together full-stack development, product design, mobile, cloud infrastructure, " +
        "data, and security capabilities inside a single delivery practice. Every engagement is structured " +
        "around clear business outcomes, maintainable systems, and a reliable path from discovery to " +
        "production.",
    },
    Services: {
      eyebrow: "Service Pillars",
      title: "Six Technology Disciplines",
      lead: "From enterprise back-office systems to consumer-facing AI products \u2014 our practice spans the full digital stack.",
    },
    Ezyify: {
      websiteUrl: "https://ezyify.com",
      eyebrow: "Flagship Innovation Product",
      title: "Ezyify",
      lead: "N71's flagship AI-powered social commerce ecosystem",
      ctaPrimary:
        "Built in-house by Network71's IT division, Ezyify brings social media, AI commerce, and " +
        "creator monetisation together on a single platform. Every feature — from AR try-on to " +
        "conversational checkout — is engineered by our team and is currently in build ahead of launch.",
      ctaSecondary: "Explore Ezyify",
      detailPrimary: "ezyify.com",
    },
    Technology: {
      eyebrow: "Technology Ecosystem",
      title: "Technology Capabilities",
      lead: "Core technologies our engineers build with across every engagement.",
    },
    Projects: {
      eyebrow: "Selected Work",
      title: "Products We Have",
      lead: "Designed to Work.",
      ctaPrimary:
        "A selection of Network71-owned platforms and digital experiences. Each project demonstrates how we " +
        "turn a complex sector into a clear, responsive product journey.",
      ctaSecondary: "Build a Project Like These",
      detailPrimary: "Web \u00b7 Mobile \u00b7 Marketplace \u00b7 Enterprise",
      detailSecondary:
        "Have a product idea or an existing system that needs improvement?",
      detailTertiary:
        "Share the goal, current challenge, and expected launch window. We will help define the next practical step.",
      footnote: "Discuss Your Project",
    },
    Clients: {
      eyebrow: "Internal Enterprise Backbone",
      title: "IT Powers Every N71 Division",
      lead:
        "The IT division is the connective tissue of Network71 — running the enterprise systems that keep all ten " +
        "business divisions connected, with Ezyify as the shared commerce layer.",
      ctaPrimary: "Ezyify Platform",
      ctaSecondary: "N71 Digital Operations Hub",
    },
    Delivery: {
      eyebrow: "How We Engage",
      title: "Delivery Models",
      lead: "We structure every engagement around your project type and timeline. Choose the model that fits your needs.",
      ctaPrimary: "Timeline",
      ctaSecondary: "Team Size",
    },
    Quality: {
      eyebrow: "Quality & Security",
      title: "Built with Security and Quality in Mind",
      lead:
        "Security and quality are not afterthoughts — they are architectural principles. Every system we " +
        "deliver is reviewed, tested, and hardened before it reaches production. Our compliance roadmap " +
        "aligns with internationally recognised frameworks.",
      ctaPrimary: "Request a Security Briefing",
    },
    GlobalReach: {
      eyebrow: "Global Reach",
      title: "Remote Delivery. Global Impact.",
      lead:
        "Our engineering headquarters is in Dhaka, Bangladesh — giving us access to a deep talent " +
        "pool, competitive cost structures, and a time zone that enables productive overlap with Europe, the " +
        "Middle East, and Asia.",
      ctaPrimary:
        "We deliver projects remotely using proven async workflows, with optional embedded " +
        "team arrangements for clients requiring on-site presence. Through the wider Network71 network, we " +
        "have supported projects for clients across South Asia, the Middle East and beyond.",
    },
    Opportunities: {
      eyebrow: "Opportunities",
      title: "Work With Us",
      lead: "Three distinct engagement pathways \u2014 each opening a different door into the N71 technology ecosystem.",
    },
    Roadmap: {
      eyebrow: "Strategic Roadmap",
      title: "Growth Roadmap",
      lead: "The trajectory of Network71's technology division over the next four years.",
    },
    AILab: {
      areas: [
        { title: "Commerce AI", desc: "Behavioural recommendation, personalisation, and conversion optimisation." },
        { title: "Computer Vision", desc: "Image recognition and 3D modelling for virtual product try-on." },
        { title: "NLP & Chat AI", desc: "Conversational assistants for commerce, support, and content creation." },
        { title: "Predictive Systems", desc: "Demand forecasting, pricing intelligence, and inventory prediction." },
      ],
      eyebrow: "AI Research & Development",
      title:
        "Network71's AI Lab is the engine behind Ezyify's intelligence and the research arm of our software " +
        "practice. Our engineers are building production-oriented AI systems for commerce. From computer " +
        "vision models that enable AR try-on to demand-forecasting systems that help reduce supply-chain " +
        "waste, every model we work on has a concrete business application.",
      lead: "Active Model Types",
      ctaPrimary: '"} model.train(dataset=commerce_signals)',
      ctaSecondary: "epoch 1/50 \u2014 loss: 0.3412 \u2014 acc: 0.8870",
      detailPrimary: "epoch 50/50 \u2014 loss: 0.0182 \u2014 acc: 0.9940",
      detailSecondary: '"} model.deploy(env="ezyify-prod")',
      detailTertiary: "\u2713 deployed \u2014 latency 18ms p99",
    },
    ProjectPreview: {
      productInterface: "Product interface",
    },
  },
  metrics,
  showcaseProjects,
  servicePillars,
  ezyifyFeatures,
  aiModels,
  techBadges,
  processSteps,
  internalDivisions,
  deliveryModels,
  roadmapItems,
  overviewPillars,
  qualityItems,
  ezyifyStats,
  reachStats,
  opportunities,
  engagementFacts: {
    eyebrow: "Working With Us",
    title1: "The Numbers a CTO",
    title2: "Asks For First",
    lead: "The commercial and delivery frame for a software engagement — confirmed in the statement of work after discovery.",
    facts: [
      { value: "2–3", unit: " weeks", label: "Discovery sprint", sub: "Problem framing, architecture, backlog and a fixed estimate" },
      { value: "10–16", unit: " weeks", label: "MVP to production", sub: "Fixed-scope build against signed acceptance criteria" },
      { value: "2", unit: " weeks", label: "Team ramp-up", sub: "Dedicated pod staffed and onboarded to your tooling" },
      { value: "100", unit: "%", label: "Code ownership", sub: "Your repo, your cloud, your IP — from the first commit" },
      { value: "99.9", unit: "%", label: "Uptime SLA", sub: "On platforms we operate under managed services" },
      { value: "4–6", unit: " h", label: "Time-zone overlap", sub: "Dhaka working day overlaps Europe, GCC and East Asia" },
    ],
    note: "Indicative planning values; every engagement is confirmed in a statement of work after the discovery sprint.",
    cta: "Book a discovery call",
  },
  supportTiers: {
    eyebrow: "Support & SLA",
    title1: "After Launch,",
    title2: "Someone Is On Call",
    lead: "Three managed-service tiers for platforms we build or take over. Every tier includes monitoring, patching and a monthly health report.",
    labels: { response: "P1 response", uptime: "Uptime target", coverage: "Coverage", includes: "Includes" },
    tiers: [
      { code: "CARE", title: "Care", response: "8 h", uptime: "99.5 %", coverage: "Business hours (Dhaka)", includes: ["Security patching", "Dependency updates", "Uptime monitoring", "Monthly health report"], who: "Internal tools, marketing sites, low-traffic portals" },
      { code: "PRO", title: "Pro", response: "2 h", uptime: "99.9 %", coverage: "16 × 5 + weekend on-call", includes: ["Everything in Care", "Incident response & RCA", "Performance tuning", "Quarterly roadmap review"], who: "Customer-facing products, commerce, SaaS", featured: true },
      { code: "ENT", title: "Enterprise", response: "30 min", uptime: "99.95 %", coverage: "24 × 7 follow-the-sun", includes: ["Everything in Pro", "Dedicated SRE", "DR drills & backups tested", "Custom SLA & security reporting"], who: "Mission-critical platforms, regulated data" },
    ],
    footnote: "P1 = production down or data at risk. Response times are commitments; resolution targets are defined per system in the SLA schedule.",
    cta: "Request a support proposal",
  },
  waysOfWorking: {
    eyebrow: "Ways of Working",
    title: "How Every Sprint Runs",
    items: [
      { icon: "◷", title: "Weekly demo", desc: "Working software shown every Friday; nothing stays hidden in a branch." },
      { icon: "⎇", title: "Trunk-based, reviewed", desc: "Every change is peer-reviewed and merged through CI with automated tests." },
      { icon: "▣", title: "Observability first", desc: "Logs, metrics and traces wired before feature work, so incidents are diagnosable." },
      { icon: "◈", title: "Design system", desc: "Tokens and components shared across web and mobile — consistent UI, faster delivery." },
      { icon: "⊕", title: "Security in the pipeline", desc: "Dependency scanning, secrets detection and OWASP checks on every build." },
      { icon: "✎", title: "Documented hand-over", desc: "Runbooks, architecture decision records and onboarding docs ship with the code." },
    ],
  },
  faq: {
    eyebrow: "Client FAQ",
    title1: "Before You Sign",
    title2: "a Statement of Work",
    lead: "Straight answers on pricing, ownership, process, security and what happens after launch.",
    items: [
      { q: "How do you price a project?", a: "Fixed price when scope can be locked (after a discovery sprint), a monthly pod rate for dedicated teams, and a tiered retainer for managed services. No hourly billing surprises — change requests are estimated and approved before work starts." },
      { q: "Who owns the code and the IP?", a: "You do, from the first commit. Work is done in your repositories and your cloud accounts wherever possible; where we host during build, everything is transferred at hand-over with runbooks and architecture decision records." },
      { q: "What does a discovery sprint produce?", a: "A problem statement, target architecture, prioritised backlog with acceptance criteria, a delivery plan and a fixed estimate. If you take the build elsewhere, the artefacts are yours." },
      { q: "Which stacks do you work in?", a: "TypeScript / React / Next.js, Node and Python on the backend, PostgreSQL and MongoDB, Flutter for mobile, TensorFlow / PyTorch for ML, and AWS or GCP with Docker and Kubernetes. We stay on mainstream stacks so your team can hire for them." },
      { q: "How do you handle security and data protection?", a: "OWASP Top 10 assessment on every application, dependency and secrets scanning in CI, encrypted data at rest and in transit, role-based access, and audit logging. ISO 27001 alignment is in progress; a security briefing is available on request." },
      { q: "What if we already have an in-house team?", a: "A dedicated pod integrates into your tooling, stand-ups and code review. We can also take over a failing or legacy codebase: audit first, then a fix-or-rebuild recommendation with a clear quote." },
      { q: "What happens after launch?", a: "Choose a support tier — Care, Pro or Enterprise — for monitoring, patching, incident response and a monthly health report. Or we hand over fully documented and step back." },
    ],
    cta: "Ask something else",
  },
  processLabel: "Our Delivery Process",
  inquiryTypes: [
    "Custom Development",
    "Enterprise Software",
    "Ezyify Partnership",
    "AI/ML Projects",
    "Investment Inquiry",
  ],
}

export type ITContent = typeof en
export default en
