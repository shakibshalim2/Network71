import { useLanguage } from "@/context/LanguageContext"
import {
  textField,
  usePublicContent,
  type PublishedPage,
} from "@/lib/publicContent"

export default function PublishedLocations() {
  const { language } = useLanguage()
  const bn = language === "bn"
  const { data, loading, error, retry } =
    usePublicContent<PublishedPage>("locations")

  return (
    <section className="py-20 px-6 bg-navy-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase font-medium mb-3">
            {bn ? "অনুমোদিত তথ্য" : "Approved information"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            {bn ? "আমাদের অবস্থান" : "Our locations"}
          </h2>
        </div>
        {loading ? (
          <p role="status">{bn ? "লোড হচ্ছে…" : "Loading…"}</p>
        ) : error ? (
          <div className="public-empty" role="alert">
            <p>{error}</p>
            <button className="public-button" onClick={retry}>
              {bn ? "আবার চেষ্টা করুন" : "Try again"}
            </button>
          </div>
        ) : data?.items.length ? (
          <div className="grid sm:grid-cols-2 gap-5">
            {data.items.map((item) => (
              <article
                className="bg-navy rounded-xl p-6 border border-white/8"
                key={item.id}
              >
                <p className="text-xs text-gold font-semibold uppercase tracking-wider mb-2">
                  {textField(item, "presence")}
                </p>
                <h3 className="text-white font-semibold text-xl mb-1">
                  {textField(item, "title")}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {textField(item, "country")}
                </p>
                <p className="text-slate-300 whitespace-pre-wrap">
                  {textField(item, "address")}
                </p>
                {textField(item, "email") && (
                  <a
                    className="public-text-link block mt-4"
                    href={`mailto:${textField(item, "email")}`}
                  >
                    {textField(item, "email")}
                  </a>
                )}
                {textField(item, "phone") && (
                  <a
                    className="public-text-link block mt-2"
                    href={`tel:${textField(item, "phone").replace(/[^+\d]/g, "")}`}
                  >
                    {textField(item, "phone")}
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="public-empty">
            <p>
              {bn
                ? "অনুমোদিত অফিস বা পরিচালন অবস্থান প্রকাশ হলে এখানে দেখা যাবে।"
                : "Approved offices and operating locations will appear here when published."}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
