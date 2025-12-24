import HeroView from "@/sections/home/hero/hero-view";
import PartnersView from "@/sections/home/partners/partners-view";
import ServicesView from "@/sections/home/services/services-view";
import CompanyProfileView from "@/sections/home/company-profile/company-profile-view";
import AboutUsView from "@/sections/home/about-us/about-us-view";
import ProjectsView from "@/sections/home/projects/projects-view";
import DividerView from "@/sections/home/divider/divider-view";
import { LayoutSection } from "@/layouts/core";
import { HomePageApi } from "@/services/api/home-page";

async function HomePage() {
  const homePageData = await HomePageApi.getData();
  const payload = homePageData.data.payload;

  return (
    <LayoutSection>
      <HeroView data={payload?.home_page_setting} />
      {payload?.company_icons && payload?.company_icons.length > 0 && (
        <PartnersView data={payload?.company_icons} titleKey="partners" />
      )}
      {payload?.certificate_icons && payload?.certificate_icons.length > 0 && (
        <PartnersView
          data={payload?.certificate_icons}
          titleKey="certificates"
        />
      )}
      {payload?.approval_icons && payload?.approval_icons.length > 0 && (
        <PartnersView data={payload?.approval_icons} titleKey="approvals" />
      )}
      <DividerView />
      {/* <ServicesView /> */}
      {payload?.website_services && payload?.website_services.length > 0 && (
        <ServicesView data={payload?.website_services} />
      )}
      {payload?.home_page_setting?.video_profile_file && (
        <CompanyProfileView
          data={payload?.home_page_setting?.video_profile_file || ""}
        />
      )}
      {payload?.founders && payload?.founders.length > 0 && (
        <AboutUsView data={payload?.founders} />
      )}
      {payload?.featured_projects && payload?.featured_projects.length > 0 && (
        <ProjectsView data={payload?.featured_projects} />
      )}
    </LayoutSection>
  );
}

export default HomePage;
