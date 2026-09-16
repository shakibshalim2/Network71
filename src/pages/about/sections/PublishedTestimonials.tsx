import { useLanguage } from "@/context/LanguageContext"
import {
  textField,
  usePublicContent,
  type PublishedPage,
} from "@/lib/publicContent"

export default function PublishedTestimonials() {
  const { language } = useLanguage()
  const bn = language === "bn"
  const { data } = usePublicContent<PublishedPage>("testimonials")
  if (!data?.items.length) return null

  return (
    <section className="container-page section-y">
      <div className="text-center mb-12">
        <p className="font-mono text-[9px] tracking-[0.35em] text-gold uppercase mb-3">
          {bn ? "অনুমোদিত মতামত" : "Approved feedback"}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl text-white">
          {bn ? "অংশীদারদের অভিজ্ঞতা" : "Partner perspectives"}
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {data.items.map((item, i) => (
          <figure
            className="bg-navy-light border border-white/8 rounded-xl p-7 about-testi"
            key={item.id}
            style={{ ["--i" as string]: i, ["--pa" as string]: "var(--brand-fg)" }}
          >
            <svg className="about-testi__mark" viewBox="0 0 64 48" aria-hidden="true">
              <path pathLength="1" d="M14 4C7 9 4 16 4 26c0 10 5 16 12 16 6 0 10-4 10-9s-3-8-8-8c-2 0-3 0-4 1 1-8 6-14 13-18L14 4zm34 0c-7 5-10 12-10 22 0 10 5 16 12 16 6 0 10-4 10-9s-3-8-8-8c-2 0-3 0-4 1 1-8 6-14 13-18L48 4z" />
            </svg>
            <blockquote className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap font-display">
              “{textField(item, "quote")}”
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-white/8 about-testi__cap">
              <strong className="text-white block">
                {textField(item, "title")}
              </strong>
              <span className="text-slate-400 text-sm">
                {textField(item, "position")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
