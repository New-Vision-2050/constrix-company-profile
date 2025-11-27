import HeroView from "@/sections/home/hero/hero-view";
import PartnersView from "@/sections/home/partners/partners-view";
import ServicesView from "@/sections/home/services/services-view";
import CompanyProfileView from "@/sections/home/company-profile/company-profile-view";
import AboutUsView from "@/sections/home/about-us/about-us-view";
import ProjectsView from "@/sections/home/projects/projects-view";

function HomePage() {
  return (
    <>
      <HeroView />
      <PartnersView />
      <ServicesView />
      <CompanyProfileView />
      <AboutUsView />
      <ProjectsView />
    </>
  );
}

export default HomePage;
