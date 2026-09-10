const en = {
  hero: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'Careers',
    eyebrow: 'Careers',
    title: 'Build Your Career at Network71',
    lead: 'Join a team of driven professionals working across our business divisions. Shape the future of emerging markets from day one.',
    cta: 'Send Your CV',
  },
  benefits: {
    eyebrow: 'Culture',
    title: 'Why Network71?',
    items: [
      {
        id: 'compensation',
        title: 'Competitive Compensation',
        desc: 'Competitive packages with performance-linked bonuses, reviewed against the local market.',
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
        desc: 'Your work contributes to economic growth across emerging markets, with results you can see in the businesses we build.',
      },
    ],
  },
  openings: {
    eyebrow: 'Open Positions',
    title: 'Current Openings',
    loading: 'Loading vacancies…',
    retry: 'Try again',
    emptyTitle: 'No open vacancies are listed here.',
    emptyText: 'Use the general application form on this page to introduce yourself for future opportunities.',
    applyBy: 'Apply by {date}',
    apply: 'Apply',
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
        desc: 'Complete the secure application form for a listed role or a future opportunity.',
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
    apply: 'Submit a general application',
  },
  application: {
    title: 'Apply for {job}',
    generalTitle: 'General application',
    generalRole: 'Future opportunities',
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    coverLetter: 'Cover note',
    resume: 'CV / résumé',
    resumeHelp: 'PDF only, maximum 5 MB. Your file is stored privately and is available only to authenticated recruitment admins.',
    consent: 'I consent to Network71 processing my application for recruitment. Rejected or withdrawn applications are deleted after the configured retention period.',
    submit: 'Submit application',
    submitting: 'Submitting…',
    successTitle: 'Application received',
    successText: 'Keep this reference for follow-up: {reference}',
    error: 'Your application could not be submitted. Please try again.',
    close: 'Close',
  },
}

export type CareersContent = typeof en
export default en
