const en = {
  hero: {
    eyebrow: 'Our Story',
    title: 'Our Journey',
    lead: 'From Dhaka to the World — seven years of growth, diversification, and relentless ambition.',
  },
  timeline: {
    entries: [
      {
        year: '2018',
        title: 'Foundation',
        desc: 'Network71 established in Dhaka, Bangladesh. Began with trading operations, laying the groundwork for a diversified global enterprise.',
        note: null as string | null,
        isLeft: true,
      },
      {
        year: '2019',
        title: 'First Manufacturing Facility',
        desc: 'Opened our first manufacturing facility, accelerating production capacity and establishing Network71 as a credible industrial operator.',
        note: null as string | null,
        isLeft: false,
      },
      {
        year: '2020',
        title: 'Multi-Sector Portfolio',
        desc: 'Added Food & Beverage and Oils & Energy divisions, building a resilient multi-sector portfolio and diversified revenue base.',
        note: null as string | null,
        isLeft: true,
      },
      {
        year: '2021',
        title: 'Five Divisions Established',
        desc: 'Expanded to five business divisions including IT & Software — beginning the technology transformation that would define our next chapter.',
        note: null as string | null,
        isLeft: false,
      },
      {
        year: '2022',
        title: 'International Scale',
        desc: 'Trade network extended across the Middle East, Europe, and Southeast Asia. Revenue trajectory accelerating toward global benchmarks.',
        note: 'Detailed data to be published' as string | null,
        isLeft: true,
      },
      {
        year: '2023',
        title: 'Ezyify AI Platform Launched',
        desc: 'Launched Ezyify — an AI-powered global e-commerce and social media ecosystem. A landmark step in our technology-led growth strategy.',
        note: null as string | null,
        isLeft: false,
      },
      {
        year: '2024',
        title: 'Today',
        desc: 'Present operations spanning 25+ countries with $150M+ annual revenue across eight diversified sectors.',
        note: 'More milestones ahead' as string | null,
        isLeft: true,
      },
    ],
  },
  cta: {
    title: 'Learn More About Network71',
    lead: 'Discover the values, people, and vision driving our growth across ten divisions and 25+ countries.',
    button: 'About Network71',
    href: '/about',
  },
}

export type TimelineContent = typeof en
export default en
