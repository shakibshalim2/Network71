import {
  textField,
  usePublicContent,
  type PublishedPage,
} from "@/lib/publicContent"
import type { ContactContent } from "../content/en"
import Methods from "./Methods"

export default function PublishedMethods({
  fallback,
}: {
  fallback: ContactContent["methods"]
}) {
  const { data } = usePublicContent<PublishedPage>("settings")
  const record = data?.items[0]
  if (!record) return <Methods c={fallback} />

  const note = textField(record, "summary")
  return (
    <Methods
      c={{
        email: {
          ...fallback.email,
          value: textField(record, "email") || fallback.email.value,
          note: textField(record, "phone") || note || fallback.email.note,
        },
        location: {
          ...fallback.location,
          value: textField(record, "address") || fallback.location.value,
          note: textField(record, "title") || fallback.location.note,
        },
        social: {
          ...fallback.social,
          value: textField(record, "url") || fallback.social.value,
          note: note || fallback.social.note,
        },
      }}
    />
  )
}
