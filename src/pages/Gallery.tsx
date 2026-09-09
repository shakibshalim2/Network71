import { useState, useEffect, useRef } from "react"
import { useDialogFocus } from "@/lib/useDialogFocus"

import { Link } from "react-router-dom"

import Header from "@/components/Header"

import Footer from "@/components/Footer"
import {
  usePublicContent,
  textField,
  safeContentUrl,
  type PublishedPage,
} from "@/lib/publicContent"
import { WorkImage } from "@/components/WorkShowcase"

export default function Gallery() {
  const [page, setPage] = useState(1)
  const { data, loading, error, retry } = usePublicContent<PublishedPage>(
    `gallery?page=${page}`,
  )
  const galleryItems = (data?.items || [])
    .filter((item) => safeContentUrl(textField(item, "image")))
    .map((item) => ({
      src: textField(item, "image"),
      alt: textField(item, "caption") || textField(item, "title"),
      label: textField(item, "title"),
      tab: textField(item, "division") || "Company",
    }))
  const filterTabs = ["All", ...new Set(galleryItems.map((item) => item.tab))]
  const [activeTab, setActiveTab] = useState("All")

  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  )

  const dialogRef = useRef<HTMLDivElement>(null)
  useDialogFocus(Boolean(lightbox), dialogRef)
  useEffect(() => {
    if (!lightbox) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
    }
    window.addEventListener("keydown", key)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener("keydown", key)
    }
  }, [Boolean(lightbox)])
  const visible =
    activeTab === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.tab === activeTab)

  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <main className="public-content">
        {/* Hero */}
        <section className="relative pt-[68px] overflow-hidden bg-navy-dark">
          <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-[10px] font-semibold tracking-[0.3em] uppercase">
                Visual Media
              </span>
            </div>
            <h1 className="font-display text-5xl lg:text-6xl text-white mb-5">
              Gallery
            </h1>
            <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
              Images from our people, projects and company activities, approved
              for public sharing.
            </p>
          </div>
        </section>

        {/* Filter tabs */}
        <div className="bg-navy/95 backdrop-blur-md border-b border-white/8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 py-3">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-pressed={activeTab === tab}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-gold text-on-brand"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
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
          {loading && (
            <div className="public-empty" role="status">
              Loading gallery…
            </div>
          )}
          {error && (
            <div className="public-empty" role="alert">
              <p>{error}</p>
              <button className="public-button" onClick={retry}>
                Try again
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((item, i) => (
              <button
                type="button"
                aria-label={`View ${item.label}`}
                key={i}
                className="gallery-card break-inside-avoid rounded-xl overflow-hidden relative group cursor-pointer"
                onClick={() => setLightbox({ src: item.src, alt: item.alt })}
              >
                <div className="work-card-image">
                  <WorkImage src={item.src} alt={item.alt} />
                </div>
                <div className="gallery-caption">
                  <p className="text-fg font-semibold text-sm">{item.label}</p>
                  {item.alt !== item.label && (
                    <p className="text-fg-subtle text-sm mt-2">{item.alt}</p>
                  )}
                  <p className="text-fg-subtle text-xs mt-1">{item.tab}</p>
                </div>
              </button>
            ))}
          </div>

          {!loading && !error && visible.length === 0 && (
            <div className="public-empty">
              <h3>
                {activeTab === "All"
                  ? "Company photos will appear here."
                  : "No images in this category."}
              </h3>
              <p>
                For project references or approved company imagery, please
                contact our team.
              </p>
              <Link className="public-button" to="/contact">
                Contact Network71 ↗
              </Link>
            </div>
          )}
          {data && data.pages > 1 && (
            <nav className="work-pagination" aria-label="Gallery pages">
              <button
                disabled={page <= 1}
                onClick={() => {
                  setPage(page - 1)
                  setActiveTab("All")
                }}
              >
                Previous
              </button>
              <span>
                Page {page} of {data.pages}
              </span>
              <button
                disabled={page >= data.pages}
                onClick={() => {
                  setPage(page + 1)
                  setActiveTab("All")
                }}
              >
                Next
              </button>
            </nav>
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
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={lightbox.src.replace("w=400", "w=1200")}
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
              <h3 className="text-white font-semibold text-xl mb-2">
                Want to contribute to the gallery?
              </h3>
              <p className="text-slate-400 text-sm max-w-md">
                If you have photos from Network71 events, facilities, or
                operations, reach out to our media team.
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
      </main>
      <Footer />
    </div>
  )
}
