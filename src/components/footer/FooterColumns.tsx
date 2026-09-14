import { Link } from "react-router-dom"
import { useT, type TKey } from "@/i18n"
import { COLUMNS, type FooterLink } from "./data"
import { usePublishedNavigation, type PublicNavItem } from "@/lib/publicNavigation"
import { useLanguage } from "@/context/LanguageContext"

function PublishedLink({ item }: { item: PublicNavItem }) {
  const style = {
    lineHeight: 1.45,
    color: "var(--fg-subtle)",
    textDecoration: "none",
    transition: "color 0.14s",
    display: "inline-block",
  }
  const events = {
    onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
      event.currentTarget.style.color = "var(--fg)"
    },
    onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
      event.currentTarget.style.color = "var(--fg-subtle)"
    },
  }
  return /^https?:\/\//.test(item.href) ? (
    <a className="tap-inline text-[13.5px]" href={item.href} style={style} {...events}>
      {item.title}
    </a>
  ) : (
    <Link className="tap-inline text-[13.5px]" to={item.href} style={style} {...events}>
      {item.title}
    </Link>
  )
}

function Col({ title, links }: { title: TKey; links: FooterLink[] }) {
  const { t } = useT()
  return (
    <div>
      <h4
        className="text-[11px] tracking-[0.18em] mb-4 sm:mb-5"
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "var(--brand-fg)",
        }}
      >
        {t(title)}
      </h4>
      <ul
        className="gap-3"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              to={href}
              className="tap-inline text-[13.5px]"
              style={{
                lineHeight: 1.45,
                color: "var(--fg-subtle)",
                textDecoration: "none",
                transition: "color 0.14s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--fg)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--fg-subtle)"
              }}
            >
              {t(label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function FooterColumns() {
  const { footer } = usePublishedNavigation()
  const { language } = useLanguage()
  if (footer.length)
    return (
      <div
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-5 pb-9 sm:pb-[52px]"
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <h4
          className="col-span-full text-[11px] tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700, textTransform: "uppercase", color: "var(--brand-fg)" }}
        >
          {language === "bn" ? "প্রকাশিত লিংক" : "Published links"}
        </h4>
        {footer.map((item) => <PublishedLink item={item} key={item.id} />)}
      </div>
    )
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 pb-9 sm:pb-[52px]"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      {COLUMNS.map((col) => (
        <Col key={col.title} title={col.title} links={col.links} />
      ))}
    </div>
  )
}
