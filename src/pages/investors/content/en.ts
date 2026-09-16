const en = {
  hero: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Investor Relations',
    eyebrow: 'Investor Relations',
    title: 'Transparent Corporate Governance',
    lead: 'Committed to transparency, accountability, and sustainable long-term value creation for all stakeholders.',
    pillars: [
      { v: '10', l: 'Operating divisions' },
      { v: '4', l: 'Governance bodies' },
      { v: '15+', l: 'Countries served' },
    ],
  },
  info: {
    eyebrow: 'INVESTOR INFORMATION',
    title1: 'Start with the',
    title2: 'right information.',
    lead: 'Request current company information, financial reporting and the supporting documents relevant to your discussion.',
    mark: 'N71',
    introTitle: 'Discuss your due diligence requirements.',
    introText: 'Our team can clarify which documents are available and the appropriate process for sharing them.',
    cta: 'Request information ↗',
    steps: ['Brief', 'Availability', 'Secure sharing'],
  },
  thesis: {
    eyebrow: 'Why Invest',
    title: 'Investment Thesis',
    items: [
      {
        id: 'portfolio',
        title: 'Diversified Portfolio',
        desc: 'Ten distinct business divisions — from garments and maritime to technology, media and strategic ventures — reduce concentration risk and create multiple vectors for growth and resilience.',
      },
      {
        id: 'markets',
        title: 'Emerging Market Access',
        desc: 'Deep roots in South Asia with growing reach across the Middle East, Africa, and Southeast Asia — regions forecast for sustained economic expansion.',
      },
      {
        id: 'technology',
        title: 'Technology-Led Growth',
        desc: 'Our Ezyify platform and IT division embed technology across all operations, enabling scalable, data-driven management and new digital revenue streams.',
      },
    ],
  },
  documents: {
    eyebrow: 'Resources',
    title: 'Documents & Filings',
    availability: 'Ask about current availability',
    request: 'Request details ↗',
    items: [
      { name: 'Company overview', subject: 'Company overview request' },
      { name: 'Financial reporting', subject: 'Financial reporting request' },
      { name: 'Investment information', subject: 'Investment information request' },
    ],
  },
  governance: {
    eyebrow: 'Governance',
    title: 'Board Structure',
    p1: 'Network71 maintains a formal governance structure dedicated to accountability, transparency, and sound corporate stewardship across all divisions and geographies.',
    note: 'Board composition and governance details to be published.',
    pending: 'To be published',
    bodies: [
      'Board of Directors',
      'Audit Committee',
      'Risk Committee',
      'ESG Committee',
    ],
  },
  enquiry: {
    eyebrow: 'Contact',
    title: 'Investor Enquiry',
    lead: 'Send your questions and the documents you would like to review.',
    email: 'investors@network71.com',
    direct: 'Direct investor enquiries',
    sentTitle: 'Enquiry Received',
    sentText: 'Your investor enquiry has been saved. Reference: {ref}',
    form: {
      name: 'Full Name *',
      namePlaceholder: 'Jane Smith',
      company: 'Company *',
      companyPlaceholder: 'Acme Capital',
      email: 'Email *',
      emailPlaceholder: 'jane@example.com',
      range: 'Investment Range',
      rangeOptions: [
        { value: 'Not specified', label: 'Not specified' },
        { value: 'Under $100K', label: 'Under $100K' },
        { value: '$100K – $500K', label: '$100K – $500K' },
        { value: '$500K – $1M', label: '$500K – $1M' },
        { value: '$1M+', label: '$1M+' },
      ],
      inquiry: 'Type of Enquiry *',
      inquiryOptions: [
        { value: 'General Inquiry', label: 'General Inquiry' },
        { value: 'Investment Discussion', label: 'Investment Discussion' },
        { value: 'Partnership', label: 'Partnership' },
        { value: 'Media', label: 'Media' },
      ],
      message: 'Message *',
      messagePlaceholder: 'Tell us about your enquiry…',
      submit: 'Send Enquiry',
    },
  },
}

export type InvestorsContent = typeof en
export default en
