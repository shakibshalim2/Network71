const en = {
  hero: {
    badge: 'ESG & Sustainability',
    title: 'Building for Tomorrow',
    lead: 'Sustainable business is not a commitment we make to the future — it is how we operate today. Across every division, every country, every decision.',
  },
  metrics: {
    eyebrow: 'Our Progress',
    title: 'Measurable Impact',
    lead: 'Key environmental performance indicators tracked against our 2021 baseline year.',
    footnote: '* Data represents internal estimates. Verified third-party audit in progress for FY2025 report.',
    items: [
      {
        label: 'Carbon Reduction',
        value: 40,
        display: '40%',
        desc: 'Reduction in operational carbon emissions vs. 2021 baseline',
        color: 'from-emerald-400 to-green-500',
      },
      {
        label: 'Renewable Energy',
        value: 35,
        display: '35%',
        desc: 'Of total energy consumption from renewable sources',
        color: 'from-teal-400 to-cyan-500',
      },
      {
        label: 'Waste Reduction',
        value: 60,
        display: '60%',
        desc: 'Less solid waste sent to landfill across production facilities',
        color: 'from-amber-400 to-yellow-500',
      },
      {
        label: 'Water Conservation',
        value: 60,
        display: '60%',
        desc: 'Improvement in water use efficiency at agricultural operations',
        color: 'from-blue-400 to-indigo-500',
      },
    ],
  },
  sdgs: {
    eyebrow: 'UN SDGs',
    title: 'SDG Alignment',
    lead: 'Network71 aligns its operations and community investments with five UN Sustainable Development Goals.',
    tagPrefix: 'SDG',
    fillerEmoji: '🌱',
    filler: 'Additional SDG alignments to be published in our 2025 Sustainability Report.',
    items: [
      {
        number: '8',
        title: 'Decent Work & Economic Growth',
        desc: 'Creating quality employment across all ten divisions, with fair wages, safe conditions, and career development pathways for 5,000+ employees.',
        color: 'bg-amber-600',
      },
      {
        number: '9',
        title: 'Industry, Innovation & Infrastructure',
        desc: 'Investing in modern manufacturing infrastructure and digital platforms like Ezyify to drive industrial innovation across Bangladesh and beyond.',
        color: 'bg-orange-600',
      },
      {
        number: '12',
        title: 'Responsible Consumption & Production',
        desc: 'Reducing waste, adopting circular economy practices, and sourcing raw materials from verified responsible suppliers.',
        color: 'bg-amber-700',
      },
      {
        number: '13',
        title: 'Climate Action',
        desc: 'Committed to reducing our carbon footprint through renewable energy investment, emissions tracking, and science-based reduction targets.',
        color: 'bg-green-700',
      },
      {
        number: '17',
        title: 'Partnerships for the Goals',
        desc: 'Collaborating with NGOs, government bodies, and international organisations to amplify sustainable development outcomes in our communities.',
        color: 'bg-blue-700',
      },
    ],
  },
  commitments: {
    eyebrow: 'Commitments',
    title: 'Environmental Commitments',
    items: [
      {
        id: 'netZero',
        title: 'Net Zero by 2040',
        desc: 'We are working toward net-zero operational carbon emissions by 2040 across all Network71 divisions and subsidiaries globally.',
      },
      {
        id: 'sourcing',
        title: 'Responsible Sourcing',
        desc: 'All agricultural and manufacturing inputs are subject to environmental and social due diligence, prioritising local and certified suppliers.',
      },
      {
        id: 'reporting',
        title: 'Transparency & Reporting',
        desc: 'Annual sustainability reports aligned with GRI standards, providing stakeholders with verified data on our environmental and social performance.',
      },
    ],
  },
  programs: {
    eyebrow: 'Social Impact',
    title: 'Community Programs',
    headlineStat: '37,500+',
    headlineLabel: 'Lives Impacted',
    headlineSub: 'Through community programs across our operating regions',
    items: [
      {
        title: 'Farmer Support Program',
        desc: 'Direct financial aid, training, and market access for smallholder farmers supplying Network71 agro divisions.',
        stat: '12,000+',
        statLabel: 'Farmers Supported',
        color: 'from-green-500 to-emerald-600',
        icon: '🌾',
      },
      {
        title: 'Skills Training Initiative',
        desc: 'Vocational training programs providing job-ready skills in garment manufacturing, food processing, and logistics.',
        stat: '8,500+',
        statLabel: 'People Trained',
        color: 'from-blue-500 to-indigo-600',
        icon: '📚',
      },
      {
        title: 'Education Initiative',
        desc: 'Scholarships and school infrastructure investment in underserved communities near our operational zones.',
        stat: '3,200+',
        statLabel: 'Students Reached',
        color: 'from-purple-500 to-violet-600',
        icon: '🎓',
      },
      {
        title: 'Women in Workforce',
        desc: 'Dedicated recruitment, mentorship, and leadership pathways empowering women across all Network71 divisions.',
        stat: '13,800+',
        statLabel: 'Women Employed',
        color: 'from-pink-500 to-rose-600',
        icon: '👩‍💼',
      },
    ],
  },
  report: {
    badge: 'Coming Soon',
    title: 'Sustainability Information',
    text: 'Contact our team for the latest available reporting, measurement methodology and supporting documentation.',
    href: 'mailto:info@network71.com?subject=Sustainability%20information',
    cta: 'Request Details',
  },
  cta: {
    title: 'Sustainability Inquiries',
    text: 'For partnership opportunities, ESG data requests, or to learn more about our sustainability programmes, reach out to our team.',
    button: 'Contact Our ESG Team',
  },
}

export type SustainabilityContent = typeof en
export default en
