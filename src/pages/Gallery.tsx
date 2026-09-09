import { useState, useEffect, useRef } from 'react'
import { useDialogFocus } from '@/lib/useDialogFocus'
import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const filterTabs = ['All', 'Operations', 'Events', 'Facilities', 'Team']

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    alt: 'Garments manufacturing operations',
    label: 'Garments & Apparel',
    tab: 'Operations',
    aspectClass: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&h=500&fit=crop',
    alt: 'Agriculture and agro operations',
    label: 'Agriculture & Agro',
    tab: 'Operations',
    aspectClass: 'aspect-[4/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=400&h=300&fit=crop',
    alt: 'Food and beverage production',
    label: 'Food & Beverage',
    tab: 'Facilities',
    aspectClass: 'aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&h=400&fit=crop',
    alt: 'Office and team environment',
    label: 'Our Team',
    tab: 'Team',
    aspectClass: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=350&fit=crop',
    alt: 'Technology and IT operations',
    label: 'IT & Software',
    tab: 'Facilities',
    aspectClass: 'aspect-[8/7]',
  },
  {
    src: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=400&h=400&fit=crop',
    alt: 'Shipping and logistics hub',
    label: 'Global Trading',
    tab: 'Operations',
    aspectClass: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&auto=format',
    alt: 'Precision textile quality inspection',
    label: 'Quality Control',
    tab: 'Facilities',
    aspectClass: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=500&fit=crop&auto=format',
    alt: 'Sustainable crop harvesting operations',
    label: 'Harvest Operations',
    tab: 'Operations',
    aspectClass: 'aspect-[4/5]',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&auto=format',
    alt: 'Network71 corporate conference event',
    label: 'Corporate Forum',
    tab: 'Events',
    aspectClass: 'aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format',
    alt: 'Executive leadership meeting',
    label: 'Leadership Session',
    tab: 'Team',
    aspectClass: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=350&fit=crop&auto=format',
    alt: 'Software development and digital systems',
    label: 'Digital Innovation',
    tab: 'Facilities',
    aspectClass: 'aspect-[8/7]',
  },
  {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop&auto=format',
    alt: 'Global trade and partnership event',
    label: 'Trade Summit',
    tab: 'Events',
    aspectClass: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
    alt: 'Network71 Media newsroom broadcasting',
    label: 'Media Division',
    tab: 'Operations',
    aspectClass: 'aspect-[4/3]',
  },
  {
    src: 'https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?w=400&h=400&fit=crop',
    alt: 'eSHIPe maritime vessel at sea',
    label: 'eSHIPe Maritime',
    tab: 'Operations',
    aspectClass: 'aspect-square',
  },
  {
    src: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=350&fit=crop',
    alt: 'Broadcast journalism and press',
    label: 'Media & Press',
    tab: 'Facilities',
    aspectClass: 'aspect-[8/7]',
  },
]

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('All')
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const dialogRef = useRef<HTMLDivElement>(null)
  useDialogFocus(Boolean(lightbox), dialogRef)
  useEffect(() => {
    if (!lightbox) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', key) }
  }, [Boolean(lightbox)])
  const visible = activeTab === 'All' ? galleryItems : galleryItems.filter((g) => g.tab === activeTab)

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
            <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">Visual Media</span>
          </div>
          <h1 className="font-display text-5xl lg:text-6xl text-white mb-5">Gallery</h1>
          <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
            A visual journey through Network71 — our operations, people, and global footprint.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="sticky top-[68px] z-30 bg-navy/95 backdrop-blur-md border-b border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex gap-1 py-3 overflow-x-auto scrollbar-hide">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-gold text-on-brand'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="columns-1 min-[400px]:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {visible.map((item, i) => (
            <button
              type="button"
              aria-label={`View ${item.label}`}
              key={i}
              className="gallery-card break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer"
              onClick={() => setLightbox({ src: item.src, alt: item.alt })}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="gallery-caption">
                <p className="text-fg font-semibold text-sm">{item.label}</p>
                <p className="text-fg-subtle text-xs mt-1">{item.tab}</p>
              </div>
            </button>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">No items in this category yet.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          tabIndex={-1}
          className="gallery-dialog force-dark fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close image preview"
            type="button"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightbox.src.replace('w=400', 'w=1200')}
            alt={lightbox.alt}
            className="max-w-full max-h-[calc(100dvh-120px)] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Submit photo CTA */}
      <section className="bg-navy-dark border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-semibold text-xl mb-2">Want to contribute to the gallery?</h3>
            <p className="text-slate-400 text-sm max-w-md">
              If you have photos from Network71 events, facilities, or operations, reach out to our media team.
            </p>
          </div>
          <a
            href="mailto:press@network71.com"
            className="flex-shrink-0 px-7 py-3 border border-gold/40 text-gold text-sm font-semibold rounded-lg hover:bg-gold/10 transition-colors"
          >
            Submit Photos
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
