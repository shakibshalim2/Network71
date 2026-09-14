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
          className="text-[11px] tracking-[0.2em]"
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
            fontSize: "clamp(30px, 6.4vw, 60px)",
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
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
          className="text-[15px] sm:text-[16px] mt-6 mb-8 sm:mt-7 sm:mb-10"
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
          <Link to="/about" className="btn btn-primary btn-stack">
            {t("footer.ctaAbout")}
            <svg fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2.2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8h10M8 3l5 5-5 5"
              />
            </svg>
          </Link>
          <Link to="/contact" className="btn btn-secondary btn-stack">
            {t("footer.ctaContact")}
          </Link>
        </div>
      </div>
    </div>
  )
}
