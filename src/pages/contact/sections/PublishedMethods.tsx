import { useCompanySettings } from "@/lib/companySettings"
import type { ContactContent } from "../content/en"
import Methods from "./Methods"

export default function PublishedMethods({
  fallback,
}: {
  fallback: ContactContent["methods"]
}) {
  const settings = useCompanySettings()
  return (
    <Methods
      c={{
        email: {
          ...fallback.email,
          value: settings.generalEmail,
          note: settings.phone || settings.businessHours || fallback.email.note,
        },
        location: {
          ...fallback.location,
          value: settings.operatingAddress,
          note: settings.registeredAddress || fallback.location.note,
        },
        social: {
          ...fallback.social,
          value: settings.website,
          note: fallback.social.note,
        },
      }}
    />
  )
}
