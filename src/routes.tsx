import { lazy, Suspense } from "react"
import {
  createBrowserRouter,
  ScrollRestoration,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom"
import RouteExperience from "@/components/RouteExperience"
import ReadProgress from "@/components/motion/ReadProgress"
import SectionRail from "@/components/motion/SectionRail"
import { usePageAccent } from "@/lib/usePageAccent"
import { useT } from "@/i18n"
import { useSectionReveal } from "@/lib/useSectionReveal"
import { useKineticHeadlines } from "@/lib/useKineticHeadlines"
import { useSmoothScroll } from "@/lib/useSmoothScroll"

const Home = lazy(() => import("@/pages/Home"))
const About = lazy(() => import("@/pages/About"))
const Investors = lazy(() => import("@/pages/Investors"))
const Careers = lazy(() => import("@/pages/Careers"))
const Contact = lazy(() => import("@/pages/Contact"))
const Garments = lazy(() => import("@/pages/sectors/Garments"))
const Agriculture = lazy(() => import("@/pages/sectors/Agriculture"))
const FoodBeverage = lazy(() => import("@/pages/sectors/FoodBeverage"))
const OilsEnergy = lazy(() => import("@/pages/sectors/OilsEnergy"))
const IT = lazy(() => import("@/pages/sectors/IT"))
const Trading = lazy(() => import("@/pages/sectors/Trading"))
const Media = lazy(() => import("@/pages/sectors/Media"))
const EShipe = lazy(() => import("@/pages/sectors/EShipe"))
const StrategicVentures = lazy(
  () => import("@/pages/sectors/StrategicVentures"),
)
const EzyifyPage = lazy(() => import("@/pages/EzyifyPage"))
const Sustainability = lazy(() => import("@/pages/Sustainability"))
const GlobalPresence = lazy(() => import("@/pages/GlobalPresence"))
const Leadership = lazy(() => import("@/pages/Leadership"))
const Governance = lazy(() => import("@/pages/Governance"))
const Timeline = lazy(() => import("@/pages/Timeline"))
const Press = lazy(() => import("@/pages/Press"))
const Legal = lazy(() => import("@/pages/Legal"))
const Blog = lazy(() => import("@/pages/Blog"))
const Article = lazy(() => import("@/pages/Article"))
const Gallery = lazy(() => import("@/pages/Gallery"))
const BrandPage = lazy(() => import("@/pages/BrandPage"))
const NotFound = lazy(() => import("@/pages/NotFound"))
const ResetPassword = lazy(() => import("@/admin/ResetPassword"))
const Admin = lazy(() => import("@/admin/Admin"))
const Projects = lazy(() => import("@/pages/Projects"))

function PageLoader() {
  const { t } = useT()
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__mark" aria-hidden="true" />
      <span>{t("app.loading")}</span>
    </div>
  )
}

function Root() {
  const { t } = useT()
  const { pathname } = useLocation()
  useSectionReveal()
  useKineticHeadlines()
  usePageAccent()
  useSmoothScroll(!pathname.startsWith("/admin"))
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("app.skip")}
      </a>
      <RouteExperience />
      {!pathname.startsWith("/admin") && <ReadProgress />}
      {!pathname.startsWith("/admin") && <SectionRail />}
      <ScrollRestoration />
      <Suspense fallback={<PageLoader />}>
        <div id="main-content" tabIndex={-1} className={pathname.startsWith("/admin") ? undefined : "route-enter"} key={pathname}>
          <Outlet />
        </div>
      </Suspense>
    </>
  )
}

export const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      { path: "/admin/reset", Component: ResetPassword },
      { path: "/admin", Component: Admin },
      { path: "/admin/:section", Component: Admin },
      { path: "/", Component: Home },
      { path: "/projects", Component: Projects },
      { path: "/projects/:slug", Component: Projects },
      { path: "/about", Component: About },
      { path: "/investors", Component: Investors },
      { path: "/careers", Component: Careers },
      { path: "/contact", Component: Contact },
      { path: "/ezyify", Component: EzyifyPage },
      { path: "/sustainability", Component: Sustainability },
      { path: "/global-presence", Component: GlobalPresence },
      { path: "/leadership", Component: Leadership },
      { path: "/governance", Component: Governance },
      { path: "/timeline", Component: Timeline },
      { path: "/press", Component: Press },
      { path: "/press/:slug", Component: Article },
      { path: "/legal", Component: Legal },
      { path: "/blog", Component: Blog },
      { path: "/blog/:slug", Component: Article },
      { path: "/gallery", Component: Gallery },
      { path: "/brand", Component: BrandPage },
      { path: "/divisions/garments", Component: Garments },
      { path: "/divisions/agriculture", Component: Agriculture },
      { path: "/divisions/food-beverage", Component: FoodBeverage },
      { path: "/divisions/oils-energy", Component: OilsEnergy },
      { path: "/divisions/it-software", Component: IT },
      { path: "/divisions/global-trading", Component: Trading },
      { path: "/divisions/media", Component: Media },
      // Legacy path kept as a redirect so old links keep working.
      {
        path: "/divisions/eshipe",
        element: <Navigate to="/divisions/ship-marketplace" replace />,
      },
      { path: "/divisions/strategic-ventures", Component: StrategicVentures },
      { path: "/divisions/ship-marketplace", Component: EShipe },
      { path: "*", Component: NotFound },
    ],
  },
])
