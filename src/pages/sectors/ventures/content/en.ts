import { INDIGO, GOLD } from '../theme'

const en = {
  divisionName: 'Strategic Ventures',
  hero: {
    eyebrow: 'Network71 — Division 08',
    badge: 'International Business & Strategic Ventures',
    title1: 'Where New Businesses',
    title2: 'Take Shape.',
    lead: "The diversified business platform of Network71 — identifying new opportunities across industries, structuring joint ventures and strategic partnerships, and taking the group's divisions into new international markets.",
    ctaPrimary: 'Propose a Venture',
    ctaSecondary: 'How We Partner',
    mapEyebrow: 'Ecosystem access',
    mapCount: '{n} operating divisions',
    mapNote: 'Every venture can draw on manufacturing, sourcing, logistics, technology, media and maritime capability inside the group.',
  },
  metrics: [
    { value: '10', label: 'Divisions', desc: 'One connected ecosystem' },
    { value: 'JV', label: 'Structures', desc: 'Joint ventures & partnerships' },
    { value: 'Multi', label: 'Sector', desc: 'Cross-industry opportunity scope' },
    { value: 'Global', label: 'Expansion', desc: 'New markets & corridors' },
  ],
  overview: {
    eyebrow: 'Division Overview',
    title: 'A Diversified Platform for What Comes Next',
    p1: "Network71 grows in two ways: by strengthening each operating division, and by creating new businesses where an opportunity, a partner and the group's capabilities meet. The International Business & Strategic Ventures division owns the second path.",
    p2: 'It evaluates opportunities across industries, structures joint ventures and strategic partnerships, and leads international expansion — so that the whole ecosystem, not just one division, benefits from every new market we enter.',
    principles: [
      { title: 'Aligned Incentives', desc: 'We only enter structures where partners win together — shared upside, shared accountability.' },
      { title: 'Operational Depth', desc: "Every venture is backed by the group's divisions, not just capital. Manufacturing, trade, tech and media resources are on call." },
      { title: 'Governance First', desc: 'Clear boards, reporting lines and decision rights from the start. No ambiguity in ownership or control.' },
      { title: 'Long-term Horizon', desc: 'We build businesses to last. Short-term arbitrage is not our model.' },
    ],
  },
  models: {
    eyebrow: 'How We Partner',
    title: 'Six Ways to Build Together',
    lead: 'From co-owned operating companies to market-entry programmes, each structure is chosen to fit the opportunity — never the other way round.',
    items: [
      { id: 'jv', title: 'Joint Ventures', desc: 'Co-owned operating companies with aligned partners — shared capital, shared governance, and a clear operating plan from day one.', color: INDIGO },
      { id: 'partnership', title: 'Strategic Partnerships', desc: "Long-term commercial alliances — distribution, sourcing, technology or market-access agreements that extend both partners' reach.", color: GOLD },
      { id: 'entry', title: 'Market Entry', desc: 'Structured expansion of Network71 divisions into new countries: regulatory mapping, local partners, entity setup and launch support.', color: 'var(--accent-cyan)' },
      { id: 'growth', title: 'Growth Investment', desc: 'Minority or majority positions in businesses that complement the ecosystem — with operational support rather than passive capital.', color: 'var(--accent-emerald)' },
      { id: 'corridor', title: 'Trade Corridors', desc: 'Bilateral business platforms connecting Bangladesh with the Middle East, Europe, East Asia and Africa across multiple divisions.', color: 'var(--accent-sky)' },
      { id: 'incubation', title: 'Incubation & Spin-outs', desc: 'New ventures born inside the group — validated, resourced and spun out as independent businesses when they are ready.', color: 'var(--accent-purple)' },
    ],
  },
  processLabel: 'From Opportunity to Operating Business',
  process: [
    { title: 'Opportunity Screening', desc: 'Sector fit, market size, partner credibility and alignment with the wider Network71 ecosystem.' },
    { title: 'Due Diligence', desc: 'Commercial, financial, legal and reputational review before any commitment is made.' },
    { title: 'Structure & Terms', desc: 'JV, partnership or investment structure; governance, capital plan and exit provisions.' },
    { title: 'Formation', desc: 'Entity setup, regulatory approvals, banking and operating agreements.' },
    { title: 'Launch & Operate', desc: 'Management team, shared services from the group and quarterly performance reviews.' },
    { title: 'Scale', desc: 'Expansion into new products, geographies or adjacent divisions once fundamentals are proven.' },
  ],
  partners: {
    eyebrow: 'Who We Work With',
    title: 'Partners Who Want to Build, Not Just Transact',
    lead: 'We look for partners with real operating intent and a long-term view. If you have a business, a technology or a market and want a committed counterpart in Bangladesh and South Asia, this is the division to speak with.',
    cta: 'Start a Conversation',
    items: [
      { title: 'Industrial Groups', desc: 'Manufacturers and producers seeking a Bangladesh or South Asia partner with local operating capability.' },
      { title: 'Technology Companies', desc: 'Platforms and software businesses looking for distribution, localisation or a regional operating base.' },
      { title: 'Investors & Family Offices', desc: 'Capital partners who want exposure to a diversified, operator-led emerging-market portfolio.' },
      { title: 'Government & Trade Bodies', desc: 'Bilateral trade and investment programmes connecting markets through structured business platforms.' },
    ],
  },
  status: {
    title: 'Active ventures are published as they are approved',
    p: 'We do not list partners, deals or portfolio companies until both sides have agreed to public disclosure. Approved ventures and case studies appear in ',
    link: 'Our Work',
    p2: '.',
    cta: 'Investor Relations →',
  },
  inquiryTypes: ['Joint Venture Proposal', 'Strategic Partnership', 'Market Entry', 'Investment Opportunity', 'Trade Corridor / Bilateral'],
}

export type VenturesContent = typeof en
export default en
