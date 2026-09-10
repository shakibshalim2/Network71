import { Link } from "react-router-dom"
import { useT } from "@/i18n"

export default function FooterCta() {
  const { t } = useT()
  return (
    <div
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(600px, 100%)",
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(200,150,42,0.055) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container-page py-14 sm:py-[72px] lg:pt-20 lg:pb-[72px]"
        style={{ textAlign: "center", position: "relative" }}
      >
        <p
          className="text-[8px] tracking-[0.24em] sm:text-[9px] sm:tracking-[0.36em]"
          style={{
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            color: "var(--brand-fg)",
            marginBottom: 20,
          }}
        >
          {t("footer.eyebrow")}
        </p>

        <h2
          className="font-display"
          style={{
            fontSize: "clamp(25px, 6.4vw, 56px)",
            lineHeight: 1.14,
            letterSpacing: "-0.025em",
            color: "var(--fg-strong)",
            marginBottom: 0,
          }}
        >
          {t("about.title1")}
          <br />
          <span style={{ color: "var(--brand-fg)" }}>{t("about.title2")}</span>
          <br />
          <span style={{ color: "var(--fg-subtle)" }}>{t("about.title3")}</span>
        </h2>

        <p
          className="text-[14px] sm:text-[15px] mt-5 mb-7 sm:mt-6 sm:mb-9"
          style={{
            color: "var(--fg-subtle)",
            lineHeight: 1.7,
            maxWidth: 480,
            marginInline: "auto",
          }}
        >
          {t("footer.lead")}
        </p>

        {/* CTA buttons — stack full width on narrow phones */}
        <div className="flex flex-col min-[400px]:flex-row min-[400px]:flex-wrap items-stretch min-[400px]:items-center justify-center gap-3">
          <Link
            to="/about"
            className="justify-center"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              borderRadius: 9,
              background: "var(--brand)",
              color: "var(--fg-onbrand)",
              fontSize: 13.5,
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.17s, box-shadow 0.17s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--brand-bright)"
              e.currentTarget.style.boxShadow = "0 0 28px var(--brand-edge)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--brand)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            {t("footer.ctaAbout")}
            <svg
              fill="none"
              viewBox="0 0 16 16"
              stroke="currentColor"
              strokeWidth="2.2"
              style={{ width: 12, height: 12 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8h10M8 3l5 5-5 5"
              />
            </svg>
          </Link>
          <Link
            to="/contact"
            className="justify-center"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 28px",
              borderRadius: 9,
              border: "1px solid var(--line-strong)",
              color: "var(--fg-muted)",
              fontSize: 13.5,
              fontWeight: 600,
              textDecoration: "none",
              background: "transparent",
              transition: "all 0.17s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)"
              e.currentTarget.style.color = "var(--fg-strong)"
              e.currentTarget.style.background = "var(--line)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--line-strong)"
              e.currentTarget.style.color = "var(--fg-muted)"
              e.currentTarget.style.background = "transparent"
            }}
          >
            {t("footer.ctaContact")}
          </Link>
        </div>
      </div>
    </div>
  )
}
