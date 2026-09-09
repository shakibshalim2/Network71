import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { BlogContent } from '../content/en'

const categoryColor: Record<string, string> = {
  Industry: 'bg-teal/20 text-teal',
  Enterprise: 'bg-gold/10 text-gold',
  Technology: 'bg-blue-400/10 text-blue-400',
}

export default function Posts({ c }: { c: BlogContent['posts'] }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const filtered = selectedCategory === 'All' ? c.items : c.items.filter((p) => p.category === selectedCategory)
  const labelFor = (value: string) => c.categories.find((cat) => cat.value === value)?.label ?? value

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <h2 className="font-display text-2xl text-white">{c.heading}</h2>
        <div className="flex gap-2 flex-wrap">
          {c.categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat.value
                  ? 'bg-gold text-on-brand'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
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
                  {labelFor(post.category)}
                </span>
              </div>
            </div>
            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-white font-semibold text-base mb-2 leading-snug group-hover:text-gold transition-colors">{post.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
              <div className="mt-5 pt-4 border-t border-white/8 flex items-center justify-between">
                <span className="text-slate-500 text-xs">{c.metaLabel}</span>
                <Link to="/contact" className="text-xs text-gold hover:text-gold font-medium flex items-center gap-1">
                  {c.discuss}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
