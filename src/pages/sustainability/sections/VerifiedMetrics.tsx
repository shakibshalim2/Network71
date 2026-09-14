import { useLanguage } from "@/context/LanguageContext"
import {
  textField,
  usePublicContent,
  type PublishedPage,
} from "@/lib/publicContent"
import type { SustainabilityContent } from "../content/en"
import Metrics from "./Metrics"

export default function VerifiedMetrics({
  fallback,
}: {
  fallback: SustainabilityContent["metrics"]
}) {
  const { language } = useLanguage()
  const bn = language === "bn"
  const { data } = usePublicContent<PublishedPage>("metrics")
  if (!data?.items.length) return <Metrics c={fallback} />

  return (
    <section className="py-24 px-6 bg-navy">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">
            {bn ? "প্রমাণিত তথ্য" : "Verified information"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {bn ? "প্রকাশিত সূচক" : "Published metrics"}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {data.items.map((item) => (
            <article
              className="bg-navy-light rounded-xl p-6 border border-white/8"
              key={item.id}
            >
              <p className="text-3xl font-display font-bold text-gold mb-2">
                {textField(item, "value")}
              </p>
              <h3 className="text-white font-semibold text-lg">
                {textField(item, "title")}
              </h3>
              <p className="text-slate-400 text-sm mt-3 whitespace-pre-wrap">
                {textField(item, "source")}
              </p>
              <p className="text-slate-500 text-xs mt-4">
                {bn ? "তথ্যের তারিখ" : "As of"}: {textField(item, "date")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
