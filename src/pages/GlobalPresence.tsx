import ManagedContent from "@/components/ManagedContent"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalizedContent } from "@/i18n/useLocalizedContent";
import en from "./global-presence/content/en";
import Hero from "./global-presence/sections/Hero";
import WorldMap from "./global-presence/sections/WorldMap";
import Counts from "./global-presence/sections/Counts";
import Regions from "./global-presence/sections/Regions";
import TradeRoutes from "./global-presence/sections/TradeRoutes";
import Divisions from "./global-presence/sections/Divisions";
import PublishedLocations from "./global-presence/sections/PublishedLocations";

const loaders = { bn: () => import("./global-presence/content/bn") };

export default function GlobalPresence() {
  const c = useLocalizedContent(en, loaders, { page: 'global-presence' });
  return (
    <div className="min-h-screen bg-navy text-slate-100">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <WorldMap c={c.map} />
        <Counts c={c.counts} />
        <Regions c={c.regions} />
        <TradeRoutes c={c.routes} />
        <Divisions c={c.divisions} />
        <PublishedLocations />
      </ManagedContent>
      <Footer />
    </div>
  );
}
