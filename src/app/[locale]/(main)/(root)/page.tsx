import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import HeroView from "@/sections/home/hero/hero-view";
import PartnersView from "@/sections/home/partners/partners-view";
import ServicesView from "@/sections/home/services/services-view";
import CompanyProfileView from "@/sections/home/company-profile/company-profile-view";
import AboutUsView from "@/sections/home/about-us/about-us-view";

function HomePage() {
  return (
    <>
      <HeroView />
      <PartnersView />
      <ServicesView />
      <CompanyProfileView />
      <AboutUsView />
    </>
  );
}

export default HomePage;
