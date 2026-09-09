const en = {
  hero: {
    eyebrow: 'Network71',
    title: 'Insights & Updates',
    lead: 'Perspectives on industry, technology, and business from the Network71 team.',
  },
  featured: {
    imageSrc: 'https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=1400&h=640&fit=crop&auto=format',
    imageAlt: 'Illustrative city and infrastructure photograph',
    badge: 'Featured',
    tag: 'Editorial programme',
    title: 'Ideas Across Industries, Technology, and Enterprise',
    text: 'Our intelligence desk is organised around the questions that matter to operators: building resilient supply chains, designing useful technology, and growing responsibly across sectors.',
    cta: 'Suggest a Topic',
  },
  posts: {
    heading: 'Editorial Themes',
    categories: [
      { value: 'All', label: 'All' },
      { value: 'Industry', label: 'Industry' },
      { value: 'Enterprise', label: 'Enterprise' },
      { value: 'Technology', label: 'Technology' },
    ],
    metaLabel: 'Research theme',
    discuss: 'Discuss this topic',
    items: [
      {
        category: 'Industry',
        title: 'The Future of Global Trade in Emerging Markets',
        excerpt: 'An in-depth look at how shifting trade patterns are reshaping opportunities across South and Southeast Asia.',
        img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=440&fit=crop&auto=format',
      },
      {
        category: 'Enterprise',
        title: 'Designing a Resilient Multi-Sector Enterprise',
        excerpt: 'How shared systems, governance, and focused operating models can connect different business divisions without losing sector expertise.',
        img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=440&fit=crop&auto=format',
      },
      {
        category: 'Technology',
        title: 'Building Better Social-Commerce Product Journeys',
        excerpt: 'A practical look at combining discovery, creators, video, merchant tools, and conversational experiences in one commerce product.',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=440&fit=crop&auto=format',
      },
      {
        category: 'Industry',
        title: 'Responsible Growth in Garment Manufacturing',
        excerpt: 'Exploring how ethical sourcing and green manufacturing are becoming non-negotiable for global apparel supply chains.',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=440&fit=crop&auto=format',
      },
      {
        category: 'Technology',
        title: 'Where AI Can Improve Logistics Workflows',
        excerpt: 'A grounded view of where forecasting, document intelligence, and operational visibility can improve supply-chain decisions.',
        img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=440&fit=crop&auto=format',
      },
      {
        category: 'Enterprise',
        title: 'Connecting Business Divisions Through Technology',
        excerpt: 'A framework for creating shared digital capabilities across commerce, manufacturing, media, agriculture, and maritime operations.',
        img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=440&fit=crop&auto=format',
      },
    ],
  },
  subscribe: {
    title: 'Stay in the Loop',
    text: 'Subscribe to receive our latest insights, company news, and industry perspectives direct to your inbox.',
    inputAria: 'Email address for Network71 insights',
    placeholder: 'Enter your email address',
    button: 'Subscribe',
    note: 'Submitting opens a prepared request in your email app.',
    mailSubject: 'Network71 insights subscription request',
    mailFieldLabel: 'Email',
  },
}

export type BlogContent = typeof en
export default en
