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
        {data.items.map((item) => (
          <figure
            className="bg-navy-light border border-white/8 rounded-xl p-7"
            key={item.id}
          >
            <blockquote className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap">
              “{textField(item, "quote")}”
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-white/8">
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
