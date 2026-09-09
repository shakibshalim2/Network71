import type { PillarIconId } from '../icons'

const GOV_EMAIL = 'governance@network71.com'

const en = {
  hero: {
    eyebrow: 'Network71',
    title: 'Corporate Governance',
    lead: 'Transparency, accountability, and ethical leadership — the principles that guide every decision we make.',
  },
  framework: {
    title: 'Governance Framework',
    lead: 'Our governance model is built on four core pillars that ensure responsible and sustainable business conduct.',
    pillars: [
      {
        icon: 'shield' as PillarIconId,
        title: 'Board Oversight',
        desc: 'Our board provides strategic direction and ensures accountability across all business units, upholding the highest standards of corporate leadership.',
      },
      {
        icon: 'bolt' as PillarIconId,
        title: 'Risk Management',
        desc: 'We identify, assess, and mitigate operational, financial, and reputational risks through a robust enterprise risk management framework.',
      },
      {
        icon: 'book' as PillarIconId,
        title: 'Compliance',
        desc: 'Strict adherence to local and international regulations, industry standards, and internal codes ensures we operate with integrity across every market.',
      },
      {
        icon: 'eye' as PillarIconId,
        title: 'Transparency',
        desc: 'We are committed to open reporting, clear communication with stakeholders, and honest disclosure of material information affecting our business.',
      },
    ],
  },
  board: {
    title: 'Board of Directors',
    badge: 'Oversight model',
    cardTitle: 'Governance at Group Level',
    cardBody: "The board's mandate covers strategy, financial stewardship, risk, ethics, executive accountability, and the long-term interests of the enterprise and its stakeholders.",
  },
  policies: {
    title: 'Policy Documents',
    lead: 'Our policies reflect our commitment to ethical and lawful operations at every level of the organisation.',
    requestLabel: 'Request policy',
    requestSubject: 'Policy request',
    email: GOV_EMAIL,
    items: [
      { title: 'Code of Conduct', desc: 'Standards of professional behaviour for all employees and representatives.' },
      { title: 'Anti-Corruption Policy', desc: 'Zero tolerance for bribery and corrupt practices across all operations.' },
      { title: 'Data Privacy Policy', desc: 'How we collect, use, and protect personal and business data.' },
      { title: 'Whistleblower Policy', desc: 'Safe and confidential channel for reporting unethical conduct.' },
      { title: 'Environmental Policy', desc: 'Our commitments to reducing environmental impact across operations.' },
    ],
  },
  committees: {
    title: 'Board Committees',
    lead: 'Specialist committees support the board in its oversight responsibilities across key governance areas.',
    mandateLabel: 'Committee mandate:',
    mandateBody: 'Independent review, documented recommendations, and escalation to board oversight.',
    items: [
      {
        name: 'Audit Committee',
        desc: 'Oversees financial reporting integrity, internal controls, and external audit relationships.',
      },
      {
        name: 'Remuneration Committee',
        desc: 'Determines executive compensation and ensures alignment with long-term performance.',
      },
      {
        name: 'Governance Committee',
        desc: 'Reviews governance frameworks, board composition, and succession planning.',
      },
    ],
  },
  contact: {
    title: 'Governance Enquiries',
    lead: 'For questions related to corporate governance, contact our compliance team.',
    email: GOV_EMAIL,
  },
}

export type GovernanceContent = typeof en
export default en
