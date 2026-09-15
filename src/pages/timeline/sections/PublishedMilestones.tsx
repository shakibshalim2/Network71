import { useLanguage } from "@/context/LanguageContext"
import {
  textField,
  usePublicContent,
  type PublishedPage,
} from "@/lib/publicContent"
import Milestones from "./Milestones"
import ContentState from "@/components/ContentState"

export default function PublishedMilestones() {
  const { language } = useLanguage()
  const bn = language === "bn"
  const { data, loading, error, retry } =
    usePublicContent<PublishedPage>("timeline")

  const eyebrow = bn ? "আমাদের যাত্রা" : "Our journey"
  if (loading)
    return (
      <section className="container-page section-y">
        <ContentState kind="loading" eyebrow={eyebrow} title={bn ? "মাইলফলক লোড হচ্ছে…" : "Loading milestones…"} />
      </section>
    )
  if (error)
    return (
      <section className="container-page section-y">
        <ContentState kind="error" eyebrow={eyebrow} title={bn ? "এই মুহূর্তে লোড করা যাচ্ছে না" : "We couldn't load the timeline right now"} text={error} actionLabel={bn ? "আবার চেষ্টা করুন" : "Try again"} onAction={retry} />
      </section>
    )
  if (!data?.items.length)
    return (
      <section className="container-page section-y">
        <ContentState kind="empty" eyebrow={eyebrow} title={bn ? "নথিভুক্ত মাইলফলক" : "Documented milestones"} text={bn ? "অনুমোদিত কোম্পানি মাইলফলক প্রকাশ হলে এখানে দেখা যাবে।" : "Approved company milestones will appear here when published."} />
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
