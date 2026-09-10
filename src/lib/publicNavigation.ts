import {
  safeContentUrl,
  textField,
  usePublicContent,
  type PublishedPage,
} from "./publicContent"

export type PublicNavItem = { id: number; title: string; href: string }

export function usePublishedNavigation() {
  const { data } = usePublicContent<PublishedPage>("navigation")
  const items = (data?.items ?? []).flatMap((item) => {
    const href = safeContentUrl(textField(item, "url"))
    return href
      ? [{ id: item.id, title: textField(item, "title"), href, placement: textField(item, "placement") }]
      : []
  })
  return {
    header: items.filter((item) => item.placement === "Header"),
    footer: items.filter((item) => item.placement === "Footer"),
  }
}
