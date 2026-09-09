import type { MediaKitIconId } from '../icons'

const PRESS_EMAIL = 'press@network71.com'

const en = {
  hero: {
    eyebrow: 'Network71',
    title: 'Press & Media',
    lead: 'Latest news, press releases, and media resources from Network71.',
  },
  mediaKit: {
    title: 'Media Kit',
    lead: 'Access current identity guidance and request approved media materials directly from our communications team.',
    viewLabel: 'View resource',
    items: [
      {
        icon: 'image' as MediaKitIconId,
        title: 'Logo Files',
        desc: 'High-resolution PNG, SVG, and EPS formats in all colour variants.',
        href: '/brand',
      },
      {
        icon: 'brush' as MediaKitIconId,
        title: 'Brand Guidelines',
        desc: 'Complete guide to our visual identity, typography, and usage rules.',
        href: '/brand',
      },
      {
        icon: 'person' as MediaKitIconId,
        title: 'Executive Photos',
        desc: 'Official headshots and photography of Network71 leadership.',
        href: '/leadership',
      },
    ],
  },
  briefings: {
    title: 'Media Briefing Areas',
    lead: 'Verified background material available for journalists and partners.',
    enquiriesLabel: 'Media Enquiries',
    requestLabel: 'Request briefing',
    requestSubject: 'Briefing request',
    email: PRESS_EMAIL,
    releases: [
      {
        date: 'Company briefing',
        tag: 'Corporate',
        tagColor: 'bg-gold/10 text-gold',
        title: 'Network71 Corporate and Business Portfolio',
        excerpt: 'Background information on the Network71 group, its operating divisions, strategic direction, and approach to connecting markets through a unified enterprise.',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=340&fit=crop&auto=format',
      },
      {
        date: 'Product briefing',
        tag: 'Technology',
        tagColor: 'bg-cyan-400/10 text-cyan-400',
        title: 'Ezyify Product and Technology Overview',
        excerpt: 'A briefing on the vision, product experience, and ecosystem behind Network71’s Ezyify social-commerce platform.',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop&auto=format',
      },
      {
        date: 'Sustainability briefing',
        tag: 'ESG',
        tagColor: 'bg-emerald-400/10 text-emerald-400',
        title: 'Responsible Growth and ESG Approach',
        excerpt: 'Background on the environmental, social, and governance principles guiding Network71’s long-term operating approach.',
        img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=340&fit=crop&auto=format',
      },
    ],
  },
  verification: {
    title: 'Information & Verification',
    badge: 'Press standard',
    cardTitle: 'Verified Information Only',
    cardBody: 'Contact the communications team for approved company facts, executive attribution, imagery, and publication-ready background material.',
  },
  contact: {
    eyebrow: 'Media Inquiries',
    title: 'Get in Touch with our Press Team',
    lead: 'For media inquiries, interview requests, or press kit access, please reach out to our communications team.',
    email: PRESS_EMAIL,
  },
}

export type PressContent = typeof en
export default en
