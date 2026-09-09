import { useParams } from "react-router-dom"
import { useLocalizedContent } from "@/i18n/useLocalizedContent"
import en from "./projects/content/en"
import ProjectList from "./projects/sections/ProjectList"
import ProjectDetail from "./projects/sections/ProjectDetail"

const loaders = { bn: () => import("./projects/content/bn") }

export default function Projects() {
  const { slug } = useParams()
  const c = useLocalizedContent(en, loaders)
  return slug ? (
    <ProjectDetail key={slug} slug={slug} c={c.detail} />
  ) : (
    <ProjectList c={c.list} />
  )
}
