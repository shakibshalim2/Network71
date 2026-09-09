import FooterCta from "./footer/FooterCta"
import FooterColumns from "./footer/FooterColumns"
import FooterBottom from "./footer/FooterBottom"

export default function Footer() {
  return (
    <footer style={{ background: "var(--s-inset)" }}>
      <FooterCta />
      <div className="container-page pt-10 sm:pt-14">
        <FooterColumns />
        <FooterBottom />
      </div>
    </footer>
  )
}
