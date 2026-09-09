import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLocalizedContent } from "@/i18n/useLocalizedContent";
import en from "./leadership/content/en";
import Hero from "./leadership/sections/Hero";
import CeoCard from "./leadership/sections/CeoCard";
import SeniorLeaders from "./leadership/sections/SeniorLeaders";
import Board from "./leadership/sections/Board";
import Advisors from "./leadership/sections/Advisors";
import JoinCta from "./leadership/sections/JoinCta";

const loaders = { bn: () => import("./leadership/content/bn") };

export default function Leadership() {
  const c = useLocalizedContent(en, loaders);
  return (
    <div className="min-h-screen bg-navy text-slate-100">
      <Header />
      <main className="public-content">
        <Hero c={c.hero} />
        <CeoCard c={c.ceo} />
        <SeniorLeaders c={c.senior} />
        <Board c={c.board} />
        <Advisors c={c.advisors} />
        <JoinCta c={c.cta} />
      </main>
      <Footer />
    </div>
  );
}
