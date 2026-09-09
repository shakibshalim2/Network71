import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const pillars = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Board Oversight',
    desc: 'Our board provides strategic direction and ensures accountability across all business units, upholding the highest standards of corporate leadership.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Risk Management',
    desc: 'We identify, assess, and mitigate operational, financial, and reputational risks through a robust enterprise risk management framework.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Compliance',
    desc: 'Strict adherence to local and international regulations, industry standards, and internal codes ensures we operate with integrity across every market.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Transparency',
    desc: 'We are committed to open reporting, clear communication with stakeholders, and honest disclosure of material information affecting our business.',
  },
]

const policies = [
  { title: 'Code of Conduct', desc: 'Standards of professional behaviour for all employees and representatives.' },
  { title: 'Anti-Corruption Policy', desc: 'Zero tolerance for bribery and corrupt practices across all operations.' },
  { title: 'Data Privacy Policy', desc: 'How we collect, use, and protect personal and business data.' },
  { title: 'Whistleblower Policy', desc: 'Safe and confidential channel for reporting unethical conduct.' },
  { title: 'Environmental Policy', desc: 'Our commitments to reducing environmental impact across operations.' },
]

const committees = [
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
]

export default function Governance() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <main className="public-content">

      {/* Hero */}
      <section className="relative pt-[68px] overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">Network71</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl text-white mb-5">Corporate Governance</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            Transparency, accountability, and ethical leadership — the principles that guide every decision we make.
          </p>
        </div>
      </section>

      {/* Governance Framework */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">Governance Framework</h2>
          <p className="text-slate-400 max-w-2xl">
            Our governance model is built on four core pillars that ensure responsible and sustainable business conduct.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="bg-navy-light border border-white/8 rounded-xl p-6 hover:border-gold/30 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold/20 transition-colors">
                {p.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Board of Directors */}
      <section className="bg-navy-dark border-y border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-12">Board of Directors</h2>
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/15 rounded-2xl bg-navy/40">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
              <svg className="w-9 h-9 text-gold opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-4">Oversight model</span>
            <p className="text-white font-display text-2xl mb-2">Governance at Group Level</p>
            <p className="text-slate-400 text-sm max-w-sm text-center">
              The board&apos;s mandate covers strategy, financial stewardship, risk, ethics, executive accountability, and the long-term interests of the enterprise and its stakeholders.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Documents */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">Policy Documents</h2>
          <p className="text-slate-400 max-w-2xl">
            Our policies reflect our commitment to ethical and lawful operations at every level of the organisation.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {policies.map((policy) => (
            <div key={policy.title} className="bg-navy-light border border-white/8 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{policy.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{policy.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <a href={`mailto:governance@network71.com?subject=${encodeURIComponent(`Policy request: ${policy.title}`)}`} className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-300 hover:text-gold text-sm rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Request policy
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Committees */}
      <section className="bg-navy-dark border-y border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">Board Committees</h2>
            <p className="text-slate-400 max-w-2xl">
              Specialist committees support the board in its oversight responsibilities across key governance areas.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {committees.map((c) => (
              <div key={c.name} className="border border-white/8 rounded-xl p-8 bg-navy/60 hover:border-gold/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{c.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">{c.desc}</p>
                <div className="pt-4 border-t border-white/8">
                  <span className="text-xs text-slate-500 font-medium">Committee mandate:</span>
                  <p className="text-slate-400 text-sm mt-1">Independent review, documented recommendations, and escalation to board oversight.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-navy-light border border-white/8 rounded-2xl">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Governance Enquiries</h3>
            <p className="text-slate-400 text-sm">For questions related to corporate governance, contact our compliance team.</p>
          </div>
          <a
            href="mailto:governance@network71.com"
            className="flex-shrink-0 px-6 py-3 bg-gold text-on-brand text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors"
          >
            governance@network71.com
          </a>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
