const en = {
  hero: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'About',
    eyebrow: 'Our Story',
    title: 'About Network71',
    lead: "Building tomorrow's global enterprise, today.",
  },
  story: {
    eyebrow: 'Our Origins',
    title: 'From Dhaka to the World',
    p1: 'Network71 was founded in 2018 in Dhaka, Bangladesh. What began as a trading company with a clear vision has grown into a diversified enterprise — spanning ten business divisions and international markets.',
    p2: 'Our journey is rooted in a belief that emerging markets hold extraordinary potential. By combining local expertise with global networks, we build bridges between communities, businesses, and opportunity — from South Asia to the world.',
    p3: 'Today, Network71 operates ten business divisions — from garments and agriculture to technology, media and maritime — united by a shared commitment to excellence, sustainability, and long-term value creation for every stakeholder we serve.',
    imageSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=700&fit=crop&auto=format',
    imageAlt: 'Network71 global headquarters',
    divisions: [
      'Garments & Apparel',
      'Agriculture & Agro',
      'Food & Beverage',
      'Oils & Energy',
      'IT & Software',
      'Global Trading',
      'Strategic Ventures',
      'Media',
      'eSHIPe Maritime',
      'Ezyify',
    ],
    activeLabel: 'Active Divisions',
    activeValue: '10 Divisions',
    activeSub: 'Headquartered in Dhaka, trading across three focus regions',
  },
  purpose: {
    eyebrow: 'Purpose',
    title: 'Vision & Mission',
    vision: {
      label: 'Vision',
      title: 'A Trusted Multinational',
      text: 'To become a trusted multinational enterprise contributing to economic transformation across emerging markets.',
    },
    mission: {
      label: 'Mission',
      title: 'Sustainable Value',
      text: 'To create sustainable value through diversified industry leadership, innovation, and global connectivity.',
    },
  },
  quote: {
    text: 'We are building more than a company — we are building a bridge between emerging markets and global opportunity.',
    initial: 'T',
    name: 'Tanjijur Rahman Topon',
    role: 'Founder & CEO, Network71',
  },
  values: {
    eyebrow: 'Principles',
    title: 'Core Values',
    items: [
      { id: 'integrity', title: 'Integrity', desc: 'Honest dealings in every market we serve.', color: '#C8962A' },
      { id: 'innovation', title: 'Innovation', desc: 'Technology and fresh thinking at our core.', color: 'var(--accent-cyan)' },
      { id: 'collaboration', title: 'Collaboration', desc: 'Partners, teams, and communities unified.', color: 'var(--accent-teal)' },
      { id: 'excellence', title: 'Excellence', desc: 'Consistent, high standards across all divisions.', color: '#C8962A' },
      { id: 'sustainability', title: 'Sustainability', desc: 'Building responsibly for future generations.', color: 'var(--accent-teal)' },
    ],
  },
  leadership: {
    eyebrow: 'Team',
    title: 'Leadership',
    viewAll: 'View Full Team →',
    people: [
      { name: 'Tanjijur Rahman Topon', title: 'Founder & CEO' },
      { name: 'To Be Announced', title: 'Executive Director' },
      { name: 'To Be Announced', title: 'Chief Operating Officer' },
    ],
  },
  timeline: {
    eyebrow: 'History',
    title: 'Our Journey',
    entries: [
      {
        year: '2018',
        title: 'Founded',
        detail: 'Network71 established in Dhaka, Bangladesh. Began with trading operations, laying the groundwork for a diversified global enterprise.',
        side: 'left',
      },
      {
        year: '2019',
        title: 'First Manufacturing Facility',
        detail: 'Opened our first manufacturing facility, accelerating production capacity and establishing Network71 as a credible industrial operator.',
        side: 'right',
      },
      {
        year: '2020',
        title: 'Multi-Sector Portfolio',
        detail: 'Added Food & Beverage and Oils & Energy divisions, building a resilient multi-sector portfolio and diversified revenue base.',
        side: 'left',
      },
      {
        year: '2021',
        title: 'Five Divisions Established',
        detail: 'Expanded to five business divisions including IT & Software — beginning the technology transformation that would define our next chapter.',
        side: 'right',
      },
      {
        year: '2022',
        title: 'International Scale',
        detail: 'Trade network extended across the Middle East, Europe, and Southeast Asia, with new export and sourcing relationships.',
        side: 'left',
      },
      {
        year: '2023',
        title: 'Ezyify AI Platform Launched',
        detail: 'Launched Ezyify — an AI-powered global e-commerce and social media ecosystem. A landmark step in our technology-led growth strategy.',
        side: 'right',
      },
      {
        year: '2024',
        title: 'Today',
        detail: 'Ten business divisions — including Media, Ship Marketplace and Strategic Ventures — operating from Dhaka with trade partners across South Asia, the Middle East and Southeast Asia.',
        side: 'left',
      },
    ],
  },
  cta: {
    title: 'Join Our Global Team',
    text: "Be part of the team that's shaping the future of emerging markets.",
    primary: 'Explore Careers',
    secondary: 'Get in Touch',
  },
}

export type AboutContent = typeof en
export default en
