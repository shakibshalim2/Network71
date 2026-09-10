import ManagedContent from "@/components/ManagedContent"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useLocalizedContent } from "@/i18n/useLocalizedContent"
import en from "./contact/content/en"
import Hero from "./contact/sections/Hero"
import Methods from "./contact/sections/Methods"
import FormSection from "./contact/sections/FormSection"

const loaders = { bn: () => import("./contact/content/bn") }

export default function Contact() {
  const c = useLocalizedContent(en, loaders, { page: 'contact' })
  return (
    <div className="min-h-full">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <Methods c={c.methods} />
        <FormSection form={c.form} sidebar={c.sidebar} />
      </ManagedContent>
      <Footer />
    </div>
  )
}
