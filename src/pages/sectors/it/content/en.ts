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
