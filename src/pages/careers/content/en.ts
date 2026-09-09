const en = {
  hero: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Careers',
    eyebrow: 'Careers',
    title: 'Build Your Career at Network71',
    lead: 'Join a team of driven professionals working across our business divisions. Shape the future of emerging markets from day one.',
    cta: 'Send Your CV',
    ctaHref: 'mailto:careers@network71.com',
  },
  benefits: {
    eyebrow: 'Culture',
    title: 'Why Network71?',
    items: [
      {
        id: 'compensation',
        title: 'Competitive Compensation',
        desc: 'Market-leading packages with performance bonuses and equity opportunities.',
      },
      {
        id: 'global',
        title: 'Global Exposure',
        desc: 'Collaborate across business divisions and contribute to practical projects.',
      },
      {
        id: 'learning',
        title: 'Learning & Development',
        desc: 'Structured training programmes, mentorship, and sponsored professional certifications.',
      },
      {
        id: 'innovation',
        title: 'Innovation Culture',
        desc: 'A flat hierarchy that encourages bold ideas, rapid experimentation, and entrepreneurial thinking.',
      },
      {
        id: 'collaboration',
        title: 'Collaborative Environment',
        desc: 'Diverse, respectful teams where every voice counts and cross-functional work is the norm.',
      },
      {
        id: 'impact',
        title: 'Meaningful Impact',
        desc: 'Your work contributes to economic growth across emerging markets, creating tangible change at scale.',
      },
    ],
  },
  openings: {
    eyebrow: 'Open Positions',
    title: 'Current Openings',
    loading: 'Loading vacancies…',
    retry: 'Try again',
    emptyTitle: 'No open vacancies are listed here.',
    emptyText: 'Send your CV to careers@network71.com to introduce yourself for future opportunities.',
    applyBy: 'Apply by {date}',
    apply: 'Apply',
    applySubject: 'Application: ',
    paginationLabel: 'Vacancy pages',
    previous: 'Previous',
    pageOf: 'Page {page} of {total}',
    next: 'Next',
  },
  process: {
    eyebrow: 'Process',
    title: 'How We Hire',
    steps: [
      {
        step: '01',
        title: 'Apply',
        desc: 'Send your CV to careers@network71.com or hit Apply on any listing.',
      },
      {
        step: '02',
        title: 'Review',
        desc: 'Our team reviews applications against the requirements of each role.',
      },
      {
        step: '03',
        title: 'Interview',
        desc: 'Up to two interview rounds — one with HR, one with the hiring manager.',
      },
      {
        step: '04',
        title: 'Offer',
        desc: 'Successful candidates receive a formal offer and onboarding plan.',
      },
    ],
  },
  cta: {
    title: "Don't see a fit?",
    text: "Send us your CV anyway. We're always looking for exceptional talent.",
    href: 'mailto:careers@network71.com?subject=Speculative CV Submission',
    email: 'careers@network71.com',
  },
}

export type CareersContent = typeof en
export default en
