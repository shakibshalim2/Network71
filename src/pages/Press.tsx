import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const pressReleases = [
  {
    date: 'August 2026',
    tag: 'Corporate',
    tagColor: 'bg-gold/10 text-gold',
    title: 'Network71 Expands Global Trading Operations to 25+ Countries',
    excerpt: 'Network71 announces a significant milestone in its international expansion, with active trade operations now spanning 25+ countries across South Asia, the Middle East, Europe, Southeast Asia, and Africa.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=340&fit=crop&auto=format',
  },
  {
    date: 'July 2026',
    tag: 'Technology',
    tagColor: 'bg-cyan-400/10 text-cyan-400',
    title: 'Ezyify AI Commerce Platform Reaches New Scale Milestone',
    excerpt: 'The Network71 flagship technology product Ezyify, an AI-powered social commerce and digital ecosystem, reports accelerating adoption across emerging market segments globally.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop&auto=format',
  },
  {
    date: 'June 2026',
    tag: 'ESG',
    tagColor: 'bg-emerald-400/10 text-emerald-400',
    title: 'Network71 Commits to Net Zero Emissions Target by 2040',
    excerpt: 'As part of its long-term sustainability roadmap, Network71 formalises its commitment to achieving net-zero operational carbon emissions across all eight business divisions by 2040.',
    img: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=340&fit=crop&auto=format',
  },
]

const mediaKitItems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    title: 'Logo Files',
    desc: 'High-resolution PNG, SVG, and EPS formats in all colour variants.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Brand Guidelines',
    desc: 'Complete guide to our visual identity, typography, and usage rules.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'Executive Photos',
    desc: 'Official headshots and photography of Network71 leadership.',
  },
]


export default function Press() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-[68px] overflow-hidden bg-navy-dark">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-teal/8 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">Network71</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl text-white mb-5">Press & Media</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            Latest news, press releases, and media resources from Network71.
          </p>
        </div>
      </section>

      {/* Media Kit */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">Media Kit</h2>
          <p className="text-slate-400 max-w-2xl">
            Download our official brand assets for media and press use. All resources will be available upon official release.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {mediaKitItems.map((item) => (
            <div key={item.title} className="bg-navy-light border border-white/8 rounded-xl p-6 hover:border-gold/20 transition-colors group">
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold mb-5 group-hover:bg-gold/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{item.desc}</p>
              <div className="flex items-center gap-3">
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-500 text-sm rounded-lg cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download
                </button>
                <span className="text-xs text-gold/70 font-medium">Coming Soon</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Press Releases */}
      <section className="bg-navy-dark border-y border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl text-white mb-2">Press Releases</h2>
              <p className="text-slate-400 text-sm">Official announcements and news from Network71.</p>
            </div>
            <a
              href="mailto:press@network71.com"
              className="flex-shrink-0 px-5 py-2.5 border border-gold/25 text-gold text-sm font-medium rounded-lg hover:bg-gold/8 transition-colors"
            >
              Media Enquiries
            </a>
          </div>

          <div className="space-y-8">
            {pressReleases.map((pr) => (
              <div key={pr.title} className="group bg-navy rounded-2xl border border-white/8 hover:border-gold/20 transition-colors overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-64 flex-shrink-0 overflow-hidden bg-navy-dark">
                  <img
                    src={pr.img}
                    alt={pr.title}
                    className="w-full h-48 md:h-full object-cover opacity-70 group-hover:opacity-85 transition-opacity"
                  />
                </div>
                <div className="flex-1 p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${pr.tagColor}`}>{pr.tag}</span>
                      <span className="text-slate-500 text-xs">{pr.date}</span>
                    </div>
                    <h3 className="font-display text-xl text-white mb-3 leading-snug group-hover:text-gold/90 transition-colors">{pr.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{pr.excerpt}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-gold text-sm font-medium">
                    <span>Read more</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-navy border border-white/8">
              <span className="text-slate-500 text-sm">Additional press releases in preparation</span>
              <span className="px-2.5 py-0.5 rounded-full bg-gold/10 text-gold text-xs font-semibold">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <h2 className="font-display text-3xl lg:text-4xl text-white mb-12">Awards & Recognition</h2>
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/15 rounded-2xl bg-navy-light/40">
          <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
            <svg className="w-9 h-9 text-gold opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold tracking-wider uppercase mb-4">To be published</span>
          <p className="text-white font-display text-2xl mb-2">Awards & Recognition</p>
          <p className="text-slate-400 text-sm max-w-sm text-center">
            Our awards and industry recognitions will be listed here upon confirmation.
          </p>
        </div>
      </section>

      {/* Media Inquiry CTA */}
      <section className="bg-navy-dark border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-navy border border-white/8 rounded-2xl">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <span className="text-gold text-xs font-semibold tracking-widest uppercase">Media Inquiries</span>
              </div>
              <h3 className="text-white font-semibold text-xl mb-2">Get in Touch with our Press Team</h3>
              <p className="text-slate-400 text-sm max-w-lg">
                For media inquiries, interview requests, or press kit access, please reach out to our communications team.
              </p>
            </div>
            <a
              href="mailto:press@network71.com"
              className="flex-shrink-0 px-8 py-3.5 bg-gold text-navy text-sm font-semibold rounded-lg hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
            >
              press@network71.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
