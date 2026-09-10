import { useLanguage } from "@/context/LanguageContext"
import {
  textField,
  usePublicContent,
  type PublishedPage,
} from "@/lib/publicContent"
import Milestones from "./Milestones"

export default function PublishedMilestones() {
  const { language } = useLanguage()
  const bn = language === "bn"
  const { data, loading, error, retry } =
    usePublicContent<PublishedPage>("timeline")

  if (loading)
    return (
      <section className="container-page section-y" role="status">
        {bn ? "মাইলফলক লোড হচ্ছে…" : "Loading milestones…"}
      </section>
    )
  if (error)
    return (
      <section className="container-page section-y" role="alert">
        <div className="public-empty">
          <p>{error}</p>
          <button className="public-button" onClick={retry}>
            {bn ? "আবার চেষ্টা করুন" : "Try again"}
          </button>
        </div>
      </section>
    )
  if (!data?.items.length)
    return (
      <section className="container-page section-y">
        <div className="public-empty">
          <h3>{bn ? "নথিভুক্ত মাইলফলক" : "Documented milestones"}</h3>
          <p>
            {bn
              ? "অনুমোদিত কোম্পানি মাইলফলক প্রকাশ হলে এখানে দেখা যাবে।"
              : "Approved company milestones will appear here when published."}
          </p>
        </div>
      </section>
    )

  return (
    <Milestones
      c={{
        entries: data.items.map((item, index) => ({
          year: textField(item, "date"),
          title: textField(item, "title"),
          desc: textField(item, "body"),
          note: null,
          isLeft: index % 2 === 0,
        })),
      }}
    />
  )
}
