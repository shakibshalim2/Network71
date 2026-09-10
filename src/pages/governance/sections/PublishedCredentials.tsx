import { useLanguage } from "@/context/LanguageContext"
import {
  safeContentUrl,
  textField,
  usePublicContent,
  type PublishedPage,
} from "@/lib/publicContent"

export default function PublishedCredentials() {
  const { language } = useLanguage()
  const bn = language === "bn"
  const { data } = usePublicContent<PublishedPage>("credentials")
  if (!data?.items.length) return null

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
      <h2 className="font-display text-3xl lg:text-4xl text-white mb-3">
        {bn ? "প্রকাশিত সনদ" : "Published credentials"}
      </h2>
      <p className="text-slate-400 max-w-2xl mb-10">
        {bn
          ? "ইস্যুকারী, রেফারেন্স ও যাচাইয়ের তথ্যসহ অনুমোদিত সনদ।"
          : "Approved credentials with issuer, reference and verification details."}
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.items.map((item) => {
          const url = safeContentUrl(textField(item, "url"))
          return (
            <article
              className="bg-navy-light border border-white/8 rounded-xl p-6"
              key={item.id}
            >
              <h3 className="text-white font-semibold text-lg mb-3">
                {textField(item, "title")}
              </h3>
              <p className="text-slate-300">
                {textField(item, "issuer")}
              </p>
              {textField(item, "reference") && (
                <p className="text-slate-400 text-sm mt-2">
                  {bn ? "রেফারেন্স" : "Reference"}: {textField(item, "reference")}
                </p>
              )}
              {textField(item, "expires") && (
                <p className="text-slate-400 text-sm mt-2">
                  {bn ? "মেয়াদ" : "Expires"}: {textField(item, "expires")}
                </p>
              )}
              {url && (
                <a className="public-text-link inline-block mt-4" href={url}>
                  {bn ? "যাচাই করুন" : "Verify"} ↗
                </a>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
