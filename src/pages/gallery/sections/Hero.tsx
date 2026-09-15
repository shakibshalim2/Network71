import PageHero from "@/components/PageHero"
import type { GalleryContent } from "../content/en"
import { useCompanySettings } from "@/lib/companySettings"

export function Hero({ c }: { c: GalleryContent["hero"] }) {
  return <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
}

export function ContributeCta({ c }: { c: GalleryContent["cta"] }) {
  const { pressEmail } = useCompanySettings()
  return (
    <section className="bg-navy-dark py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 cta-band">
        <span className="cta-band__rule" aria-hidden="true" />
        <div>
          <h2 className="font-display text-white mb-3 tracking-[-0.02em]" style={{ fontSize: "clamp(26px, 5vw, 44px)" }}>
            {c.title}
          </h2>
          <p className="text-slate-400" style={{ fontSize: "clamp(14.5px, 3.6vw, 17px)", maxWidth: "44ch" }}>
            {c.text}
          </p>
        </div>
        <a href={`mailto:${pressEmail}`} className="btn btn-primary">
          {c.button}
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" /></svg>
        </a>
      </div>
    </section>
  )
}
