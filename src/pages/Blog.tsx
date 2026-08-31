import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const categories = ['All', 'Industry', 'Company News', 'Technology']

const posts = [
  {
    category: 'Industry',
    title: 'The Future of Global Trade in Emerging Markets',
    excerpt: 'An in-depth look at how shifting trade patterns are reshaping opportunities across South and Southeast Asia.',
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=440&fit=crop&auto=format',
  },
  {
    category: 'Company News',
    title: 'Network71 Expands into New Regional Markets',
    excerpt: 'Our latest strategic expansion extends our footprint into three new markets, reinforcing our global growth trajectory.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=440&fit=crop&auto=format',
  },
  {
    category: 'Technology',
    title: 'How Ezyify is Transforming Enterprise Operations',
    excerpt: 'A deep dive into the platform capabilities that are streamlining workflows for businesses across 25+ countries.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=440&fit=crop&auto=format',
  },
  {
    category: 'Industry',
    title: 'Sustainability in Garments Manufacturing: 2025 Outlook',
    excerpt: 'Exploring how ethical sourcing and green manufacturing are becoming non-negotiable for global apparel supply chains.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=440&fit=crop&auto=format',
  },
  {
    category: 'Technology',
    title: 'AI-Driven Logistics: Lessons from the Field',
    excerpt: 'How machine learning and predictive analytics are revolutionising freight and supply chain management globally.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=440&fit=crop&auto=format',
  },
  {
    category: 'Company News',
    title: 'Milestones: Network71 at Eight Years of Growth',
    excerpt: 'From a Dhaka trading firm to a global multi-sector enterprise — a reflection on our journey and what lies ahead.',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=440&fit=crop&auto=format',
  },
]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [email, setEmail] = useState('')

  const filtered = selectedCategory === 'All' ? posts : posts.filter((p) => p.category === selectedCategory)

  const categoryColor: Record<string, string> = {
    Industry: 'bg-teal/20 text-teal',
    'Company News': 'bg-gold/10 text-gold',
    Technology: 'bg-blue-400/10 text-blue-400',
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-[68px] overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal/8 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">Network71</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl text-white mb-5">Insights & Updates</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            Perspectives on industry, technology, and business from the Network71 team.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-navy-light min-h-[320px] flex flex-col justify-end">
          {/* Featured post background image */}
          <img
            src="https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=1400&h=640&fit=crop&auto=format"
            alt="Network71 global operations"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-transparent" />
          <div className="relative p-8 md:p-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-wider">Featured</span>
              <span className="px-3 py-1 rounded-full bg-white/5 text-slate-400 text-xs font-medium">Coming Soon</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-3">
              Coming Soon — Our First Article
            </h2>
            <p className="text-slate-300 text-base max-w-xl leading-relaxed mb-6">
              We are preparing our first publication. Subscribe below to be notified when we go live with insights from across our global operations.
            </p>
            <button
              disabled
              className="px-6 py-3 bg-white/10 text-slate-500 text-sm rounded-lg cursor-not-allowed"
            >
              Read Article — To be published
            </button>
          </div>
        </div>
      </section>

      {/* Category filter + posts */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h2 className="font-display text-2xl text-white">All Articles</h2>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-gold text-navy'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <div key={i} className="bg-navy-light border border-white/8 rounded-xl overflow-hidden hover:border-white/20 transition-colors group flex flex-col">
              {/* Post image */}
              <div className="h-44 relative overflow-hidden bg-navy-dark">
                <img
                  src={post.img}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColor[post.category]}`}>
                    {post.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded bg-black/50 text-white/60 text-[10px] font-semibold tracking-wider uppercase backdrop-blur-sm">Coming Soon</span>
                </div>
              </div>
              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-base mb-2 leading-snug group-hover:text-gold transition-colors">{post.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-between">
                  <span className="text-slate-500 text-xs">To be published</span>
                  <button
                    disabled
                    className="text-xs text-slate-600 font-medium cursor-not-allowed flex items-center gap-1"
                  >
                    Read more
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section className="bg-navy-dark border-t border-white/8">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">Stay in the Loop</h2>
          <p className="text-slate-400 text-base mb-8 max-w-md mx-auto">
            Subscribe to receive our latest insights, company news, and industry perspectives direct to your inbox.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-navy border border-white/15 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold/50 transition-colors"
            />
            <button
              onClick={() => setEmail('')}
              className="px-6 py-3 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </div>
          <p className="text-slate-500 text-xs mt-3">No spam. Unsubscribe at any time.</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
