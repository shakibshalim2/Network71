import ManagedContent from "@/components/ManagedContent"
import Header from "@/components/Header"

import Footer from "@/components/Footer"

import { useLocalizedContent } from "@/i18n/useLocalizedContent"

import en from "./blog/content/en"

import { Hero } from "./blog/sections/Hero"
import PublishedArticles from "@/components/PublishedArticles"
import Subscribe from "./blog/sections/Subscribe"

const loaders = { bn: () => import("./blog/content/bn") }

export default function Blog() {
  const c = useLocalizedContent(en, loaders, { page: "blog" })

  return (
    <div className="min-h-screen bg-navy text-white">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <PublishedArticles module="posts" />
        <Subscribe c={c.subscribe} />
      </ManagedContent>
      <Footer />
    </div>
  )
}
