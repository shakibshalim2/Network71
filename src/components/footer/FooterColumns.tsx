import { Link } from "react-router-dom"
import { useT, type TKey } from "@/i18n"
import { COLUMNS, type FooterLink } from "./data"

function Col({ title, links }: { title: TKey; links: FooterLink[] }) {
  const { t } = useT()
  return (
    <div>
      <h4
        className="text-[8px] tracking-[0.2em] sm:text-[8.5px] sm:tracking-[0.28em] mb-4 sm:mb-5"
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
        className="gap-2.5 sm:gap-[11px]"
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
              className="tap-inline text-[12px] sm:text-[12.5px]"
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
