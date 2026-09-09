import { lazy, Suspense } from "react"
import { createBrowserRouter, ScrollRestoration, Outlet } from "react-router-dom"
import RouteExperience from "@/components/RouteExperience"

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
const EzyifyPage = lazy(() => import("@/pages/EzyifyPage"))
const Sustainability = lazy(() => import("@/pages/Sustainability"))
const GlobalPresence = lazy(() => import("@/pages/GlobalPresence"))
const Leadership = lazy(() => import("@/pages/Leadership"))
const Governance = lazy(() => import("@/pages/Governance"))
const Timeline = lazy(() => import("@/pages/Timeline"))
const Press = lazy(() => import("@/pages/Press"))
const Legal = lazy(() => import("@/pages/Legal"))
const Blog = lazy(() => import("@/pages/Blog"))
const Gallery = lazy(() => import("@/pages/Gallery"))
const BrandPage = lazy(() => import("@/pages/BrandPage"))
const NotFound = lazy(() => import("@/pages/NotFound"))
const Admin = lazy(() => import("@/admin/Admin"))

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__mark" aria-hidden="true" />
      <span>Loading Network71</span>
    </div>
  )
}

function Root() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to page content</a>
      <RouteExperience />
      <ScrollRestoration />
      <Suspense fallback={<PageLoader />}>
        <div id="main-content" tabIndex={-1}>
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
      { path: '/admin', Component: Admin },
      { path: '/admin/:section', Component: Admin },
      { path: '/', Component: Home },
      { path: '/about', Component: About },
      { path: '/investors', Component: Investors },
      { path: '/careers', Component: Careers },
      { path: '/contact', Component: Contact },
      { path: '/ezyify', Component: EzyifyPage },
      { path: '/sustainability', Component: Sustainability },
      { path: '/global-presence', Component: GlobalPresence },
      { path: '/leadership', Component: Leadership },
      { path: '/governance', Component: Governance },
      { path: '/timeline', Component: Timeline },
      { path: '/press', Component: Press },
      { path: '/legal', Component: Legal },
      { path: '/blog', Component: Blog },
      { path: '/gallery', Component: Gallery },
      { path: '/brand', Component: BrandPage },
      { path: '/divisions/garments', Component: Garments },
      { path: '/divisions/agriculture', Component: Agriculture },
      { path: '/divisions/food-beverage', Component: FoodBeverage },
      { path: '/divisions/oils-energy', Component: OilsEnergy },
      { path: '/divisions/it-software', Component: IT },
      { path: '/divisions/global-trading', Component: Trading },
      { path: '/divisions/media', Component: Media },
      { path: '/divisions/eshipe', Component: EShipe },
      { path: '*', Component: NotFound },
    ],
  },
])
