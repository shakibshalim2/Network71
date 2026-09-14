import { Link } from "react-router-dom"
import Logo from "@/components/brand/Logo"
import { useT } from "@/i18n"
import { LEGAL } from "./data"
import { useCompanySettings } from "@/lib/companySettings"

export default function FooterBottom() {
  const { t } = useT()
  const { generalEmail } = useCompanySettings()
  return (
    <div
      className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:justify-between gap-4 lg:gap-x-7 pt-5 sm:pt-[22px]"
      style={{ paddingBottom: "calc(28px + var(--safe-b))" }}
    >
      {/* Logo + copyright */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/"
          aria-label="Network71 Home"
          style={{
            display: "inline-flex",
            opacity: 0.55,
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.85"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.55"
          }}
        >
          <Logo variant="auto" height={19} />
        </Link>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--fg-faint)",
          }}
        >
          © {new Date().getFullYear()} Network71 Group. {t("footer.rights")}
        </span>
      </div>

      {/* Legal links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
        {LEGAL.map(({ label, href }) => (
          <Link
            key={label}
            to={href}
            className="tap-inline"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--fg-faint)",
              textDecoration: "none",
              transition: "color 0.14s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--fg-subtle)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--fg-faint)"
            }}
          >
            {t(label)}
          </Link>
        ))}
      </div>

      <a
        href={`mailto:${generalEmail}`}
        className="wrap-anywhere tap-inline"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--fg-subtle)",
          textDecoration: "none",
        }}
      >
        {generalEmail}
      </a>
    </div>
  )
}
