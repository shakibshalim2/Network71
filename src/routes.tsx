import { createBrowserRouter, ScrollRestoration, Outlet } from 'react-router-dom'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Investors from '@/pages/Investors'
import Careers from '@/pages/Careers'
import Contact from '@/pages/Contact'
import Garments from '@/pages/sectors/Garments'
import Agriculture from '@/pages/sectors/Agriculture'
import FoodBeverage from '@/pages/sectors/FoodBeverage'
import OilsEnergy from '@/pages/sectors/OilsEnergy'
import IT from '@/pages/sectors/IT'
import Trading from '@/pages/sectors/Trading'
import Media from '@/pages/sectors/Media'
import EShipe from '@/pages/sectors/EShipe'
import EzyifyPage from '@/pages/EzyifyPage'
import Sustainability from '@/pages/Sustainability'
import GlobalPresence from '@/pages/GlobalPresence'
import Leadership from '@/pages/Leadership'
import Governance from '@/pages/Governance'
import Timeline from '@/pages/Timeline'
import Press from '@/pages/Press'
import Legal from '@/pages/Legal'
import Blog from '@/pages/Blog'
import Gallery from '@/pages/Gallery'
import BrandPage from '@/pages/BrandPage'
import NotFound from '@/pages/NotFound'

function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

export const router = createBrowserRouter([
  {
    Component: Root,
    children: [
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
