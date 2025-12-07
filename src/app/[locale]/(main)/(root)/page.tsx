import HeroView from "@/sections/home/hero/hero-view";
import PartnersView from "@/sections/home/partners/partners-view";
import ServicesView from "@/sections/home/services/services-view";
import CompanyProfileView from "@/sections/home/company-profile/company-profile-view";
import AboutUsView from "@/sections/home/about-us/about-us-view";
import ProjectsView from "@/sections/home/projects/projects-view";
import DividerView from "@/sections/home/divider/divider-view";
import TeamView from "@/sections/home/team/team-view";
import { LayoutSection } from "@/layouts/core";

function HomePage() {
  return (
    <LayoutSection>
      <HeroView />
      <PartnersView />
      <DividerView />
      <ServicesView />
      <CompanyProfileView />
      <AboutUsView />
      <ProjectsView />
      <TeamView />
    </LayoutSection>
  );
}

export default HomePage;
