import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import HeroView from "@/sections/home/hero/hero-view";
import PartnersView from "@/sections/home/partners/partners-view";

function HomePage() {
  return (
    <>
      <HeroView />
      <PartnersView />
    </>
  );
}

export default HomePage;
