import { useMemo } from "react"
import { textField, usePublicContent, type PublishedItem, type PublishedPage } from "./publicContent"

export type CompanySettings = {
  generalEmail: string
  careersEmail: string
  pressEmail: string
  legalEmail: string
  investorsEmail: string
  phone: string
  operatingAddress: string
  registeredAddress: string
  businessHours: string
  website: string
  linkedin: string
  facebook: string
  youtube: string
  x: string
}

export const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
  generalEmail: "info@network71.com",
  careersEmail: "careers@network71.com",
  pressEmail: "press@network71.com",
  legalEmail: "legal@network71.com",
  investorsEmail: "investors@network71.com",
  phone: "",
  operatingAddress: "Dhaka, Bangladesh",
  registeredAddress: "",
  businessHours: "",
  website: "https://network71.com",
  linkedin: "",
  facebook: "",
  youtube: "",
  x: "",
}

function value(record: PublishedItem | undefined, key: string, fallback: string) {
  return (record && textField(record, key)) || fallback
}

export function useCompanySettings(): CompanySettings {
  const { data } = usePublicContent<PublishedPage>("settings")
  return useMemo(() => {
    const record = data?.items.find((item) => item.slug === "company-profile") ?? data?.items[0]
    return {
      generalEmail: value(record, "email", DEFAULT_COMPANY_SETTINGS.generalEmail),
      careersEmail: value(record, "careers_email", DEFAULT_COMPANY_SETTINGS.careersEmail),
      pressEmail: value(record, "press_email", DEFAULT_COMPANY_SETTINGS.pressEmail),
      legalEmail: value(record, "legal_email", DEFAULT_COMPANY_SETTINGS.legalEmail),
      investorsEmail: value(record, "investors_email", DEFAULT_COMPANY_SETTINGS.investorsEmail),
      phone: value(record, "phone", DEFAULT_COMPANY_SETTINGS.phone),
      operatingAddress: value(record, "address", DEFAULT_COMPANY_SETTINGS.operatingAddress),
      registeredAddress: value(record, "registered_address", DEFAULT_COMPANY_SETTINGS.registeredAddress),
      businessHours: value(record, "business_hours", DEFAULT_COMPANY_SETTINGS.businessHours),
      website: value(record, "website", DEFAULT_COMPANY_SETTINGS.website),
      linkedin: value(record, "linkedin", DEFAULT_COMPANY_SETTINGS.linkedin),
      facebook: value(record, "facebook", DEFAULT_COMPANY_SETTINGS.facebook),
      youtube: value(record, "youtube", DEFAULT_COMPANY_SETTINGS.youtube),
      x: value(record, "x", DEFAULT_COMPANY_SETTINGS.x),
    }
  }, [data])
}
