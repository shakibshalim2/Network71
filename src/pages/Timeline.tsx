import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const entries = [
  {
    year: '2018',
    title: 'Foundation',
    desc: 'Network71 established in Dhaka, Bangladesh. Began with trading operations, laying the groundwork for a diversified global enterprise.',
    note: null,
    isLeft: true,
  },
  {
    year: '2019',
    title: 'First Manufacturing Facility',
    desc: 'Opened our first manufacturing facility, accelerating production capacity and establishing Network71 as a credible industrial operator.',
    note: null,
    isLeft: false,
  },
  {
    year: '2020',
    title: 'Multi-Sector Portfolio',
    desc: 'Added Food & Beverage and Oils & Energy divisions, building a resilient multi-sector portfolio and diversified revenue base.',
    note: null,
    isLeft: true,
  },
  {
    year: '2021',
    title: 'Five Divisions Established',
    desc: 'Expanded to five business divisions including IT & Software — beginning the technology transformation that would define our next chapter.',
    note: null,
    isLeft: false,
  },
  {
    year: '2022',
    title: 'International Scale',
    desc: 'Trade network extended across the Middle East, Europe, and Southeast Asia. Revenue trajectory accelerating toward global benchmarks.',
    note: 'Detailed data to be published',
    isLeft: true,
  },
  {
    year: '2023',
    title: 'Ezyify AI Platform Launched',
    desc: 'Launched Ezyify — an AI-powered global e-commerce and social media ecosystem. A landmark step in our technology-led growth strategy.',
    note: null,
    isLeft: false,
  },
  {
    year: '2024',
    title: 'Today',
    desc: 'Present operations spanning 25+ countries with $150M+ annual revenue across eight diversified sectors.',
    note: 'More milestones ahead',
    isLeft: true,
  },
]

export default function Timeline() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-[68px] overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="font-mono text-[9px] tracking-[0.35em] text-gold/70 uppercase font-medium">Our Story</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl text-white mb-5 tracking-[-0.02em]">Our Journey</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            From Dhaka to the World — seven years of growth, diversification, and relentless ambition.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 py-24">
        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-0">
            {entries.map((entry, i) => (
              <div key={entry.year} className="relative flex md:items-center mb-12 md:mb-0">
                {/* Mobile layout: always left */}
                <div className="md:hidden flex gap-5 w-full">
                  {/* Year badge */}
                  <div className="flex flex-col items-center gap-0">
                    <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold/20">
                      <span className="text-navy font-display font-bold text-xs leading-tight text-center">{entry.year}</span>
                    </div>
                    {i < entries.length - 1 && <div className="flex-1 w-px bg-white/10 mt-2 min-h-[40px]" />}
                  </div>
                  {/* Content */}
                  <div className="bg-navy-light border border-white/8 rounded-xl p-5 mb-6 flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{entry.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{entry.desc}</p>
                    {entry.note && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                        <span className="text-gold text-xs font-medium">{entry.note}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop layout: alternating */}
                {entry.isLeft ? (
                  <>
                    {/* Left content */}
                    <div className="hidden md:flex flex-1 justify-end pr-10 pb-12">
                      <div className="bg-navy-light border border-white/8 rounded-xl p-6 max-w-sm w-full hover:border-gold/20 transition-colors group">
                        <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-gold transition-colors">{entry.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{entry.desc}</p>
                        {entry.note && (
                          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            <span className="text-gold text-xs font-medium">{entry.note}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Year badge centred */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 pb-12">
                      <div className="w-16 h-16 rounded-full bg-gold border-4 border-navy flex items-center justify-center shadow-lg shadow-gold/25">
                        <span className="text-navy font-display font-bold text-xs leading-tight text-center">{entry.year}</span>
                      </div>
                    </div>
                    {/* Right spacer */}
                    <div className="hidden md:block flex-1 pl-10 pb-12" />
                  </>
                ) : (
                  <>
                    {/* Left spacer */}
                    <div className="hidden md:block flex-1 pr-10 pb-12" />
                    {/* Year badge centred */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 pb-12">
                      <div className="w-16 h-16 rounded-full bg-gold border-4 border-navy flex items-center justify-center shadow-lg shadow-gold/25">
                        <span className="text-navy font-display font-bold text-xs leading-tight text-center">{entry.year}</span>
                      </div>
                    </div>
                    {/* Right content */}
                    <div className="hidden md:flex flex-1 justify-start pl-10 pb-12">
                      <div className="bg-navy-light border border-white/8 rounded-xl p-6 max-w-sm w-full hover:border-gold/20 transition-colors group">
                        <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-gold transition-colors">{entry.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{entry.desc}</p>
                        {entry.note && (
                          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                            <span className="text-gold text-xs font-medium">{entry.note}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-dark border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl text-white mb-2 tracking-[-0.02em]">Learn More About Network71</h2>
            <p className="text-slate-400 text-sm max-w-lg">
              Discover the values, people, and vision driving our growth across eight sectors and 25+ countries.
            </p>
          </div>
          <Link
            to="/about"
            className="flex-shrink-0 px-8 py-3.5 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            About Network71
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
