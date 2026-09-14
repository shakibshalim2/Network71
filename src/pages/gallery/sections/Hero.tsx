import PageHero from "@/components/PageHero"
import type { GalleryContent } from "../content/en"
import { useCompanySettings } from "@/lib/companySettings"

export function Hero({ c }: { c: GalleryContent["hero"] }) {
  return <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
}

export function ContributeCta({ c }: { c: GalleryContent["cta"] }) {
  const { pressEmail } = useCompanySettings()
  return (
    <section className="bg-navy-dark border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-white font-semibold text-xl mb-2">
            {c.title}
          </h3>
          <p className="text-slate-400 text-sm max-w-md">
            {c.text}
          </p>
        </div>
        <a
          href={`mailto:${pressEmail}`}
          className="btn btn-ghost flex-shrink-0"
        >
          {c.button}
        </a>
      </div>
    </section>
  )
}
