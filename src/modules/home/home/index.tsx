import HeroView from "@/modules/home/home/hero/hero-view";
import PartnersView from "@/modules/home/home/partners/partners-view";
import ServicesView from "@/modules/home/home/services/services-view";
import CompanyProfileView from "@/modules/home/home/company-profile/company-profile-view";
import AboutUsView from "@/modules/home/home/about-us/about-us-view";
import ProjectsView from "@/modules/home/home/projects/projects-view";
import DividerView from "@/modules/home/home/divider/divider-view";
import { BE_HomePageData } from "@/types/api/base/home-page";

type Props = {
    data: BE_HomePageData
}

function HomePageMainView({ data:data }: Props) {
  return (
    <div>
      <HeroView data={data?.home_page_setting} />
      {data?.company_icons && data?.company_icons.length > 0 && (
        <PartnersView data={data?.company_icons} titleKey="partners" />
      )}
      {data?.certificate_icons && data?.certificate_icons.length > 0 && (
        <PartnersView
          data={data?.certificate_icons}
          titleKey="certificates"
        />
      )}
      {data?.approval_icons && data?.approval_icons.length > 0 && (
        <PartnersView data={data?.approval_icons} titleKey="approvals" />
      )}
      <DividerView />
      {/* <ServicesView /> */}
      {data?.website_services && data?.website_services.length > 0 && (
        <ServicesView data={data?.website_services} />
      )}
      {data?.home_page_setting?.video_profile_file && (
        <CompanyProfileView
          data={data?.home_page_setting?.video_profile_file || ""}
        />
      )}
      {data?.founders && data?.founders.length > 0 && (
        <AboutUsView data={data?.founders} />
      )}
      {data?.featured_projects && data?.featured_projects.length > 0 && (
        <ProjectsView data={data?.featured_projects} />
      )}
    </div>
  );
}

export default HomePageMainView;
