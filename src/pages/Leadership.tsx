import ManagedContent from "@/components/ManagedContent"
import Header from "@/components/Header";
import PublishedTeam from "@/components/PublishedTeam";
import Footer from "@/components/Footer";
import { useLocalizedContent } from "@/i18n/useLocalizedContent";
import en from "./leadership/content/en";
import Hero from "./leadership/sections/Hero";
import CeoCard from "./leadership/sections/CeoCard";
import Board from "./leadership/sections/Board";
import JoinCta from "./leadership/sections/JoinCta";

const loaders = { bn: () => import("./leadership/content/bn") };

export default function Leadership() {
  const c = useLocalizedContent(en, loaders, { page: 'leadership' });
  return (
    <div className="min-h-screen bg-navy text-slate-100">
      <Header />
      <ManagedContent content={c} className="public-content">
        <Hero c={c.hero} />
        <CeoCard c={c.ceo} />
        <PublishedTeam />
        <Board c={c.board} />
        <JoinCta c={c.cta} />
      </ManagedContent>
      <Footer />
    </div>
  );
}
