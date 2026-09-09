import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useDialogFocus } from "@/lib/useDialogFocus"
import {
  usePublicContent,
  textField,
  safeContentUrl,
  type PublishedPage,
} from "@/lib/publicContent"
import { WorkImage } from "@/components/WorkShowcase"
import type { GalleryContent } from "../content/en"

const ALL = "All"
const COMPANY = "Company"

export default function Grid({
  c,
  lightboxLabel,
}: {
  c: GalleryContent["grid"]
  lightboxLabel: GalleryContent["lightbox"]
}) {
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
      tab: textField(item, "division") || COMPANY,
    }))
  const filterTabs = [ALL, ...new Set(galleryItems.map((item) => item.tab))]
  const [activeTab, setActiveTab] = useState(ALL)
  // Sentinel tabs are compared by stable value; only their display label is localized
  const tabLabel = (tab: string) =>
    tab === ALL ? c.allLabel : tab === COMPANY ? c.companyLabel : tab

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
    activeTab === ALL
      ? galleryItems
      : galleryItems.filter((g) => g.tab === activeTab)

  return (
    <>
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
                {tabLabel(tab)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {loading && (
          <div className="public-empty" role="status">
            {c.loading}
          </div>
        )}
        {error && (
          <div className="public-empty" role="alert">
            <p>{error}</p>
            <button className="public-button" onClick={retry}>
              {c.retry}
            </button>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((item, i) => (
            <button
              type="button"
              aria-label={`${c.viewPrefix} ${item.label}`}
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
                <p className="text-fg-subtle text-xs mt-1">{tabLabel(item.tab)}</p>
              </div>
            </button>
          ))}
        </div>

        {!loading && !error && visible.length === 0 && (
          <div className="public-empty">
            <h3>
              {activeTab === ALL ? c.emptyAll : c.emptyCategory}
            </h3>
            <p>
              {c.emptyText}
            </p>
            <Link className="public-button" to="/contact">
              {c.emptyCta}
            </Link>
          </div>
        )}
        {data && data.pages > 1 && (
          <nav className="work-pagination" aria-label={c.paginationAria}>
            <button
              disabled={page <= 1}
              onClick={() => {
                setPage(page - 1)
                setActiveTab(ALL)
              }}
            >
              {c.previous}
            </button>
            <span>
              {c.pageOf.replace("{page}", String(page)).replace("{total}", String(data.pages))}
            </span>
            <button
              disabled={page >= data.pages}
              onClick={() => {
                setPage(page + 1)
                setActiveTab(ALL)
              }}
            >
              {c.next}
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
            aria-label={lightboxLabel.close}
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
    </>
  )
}
