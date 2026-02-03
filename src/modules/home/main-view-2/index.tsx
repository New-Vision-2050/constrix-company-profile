import HeroView2 from "@/modules/home/main-view-2/hero/hero-view-2";
import PartnersCombinedView from "@/modules/home/main-view-2/partners/partners-combined-view";
import ServicesView2 from "@/modules/home/main-view-2/services/services-view-2";
import CompanyProfileView2 from "@/modules/home/main-view-2/company-profile/company-profile-view-2";
import AboutUsView2 from "@/modules/home/main-view-2/about-us/about-us-view-2";
import ProjectsView2 from "@/modules/home/main-view-2/projects/projects-view-2";
import { BE_HomePageData } from "@/types/api/base/home-page";

type Props = {
    data: BE_HomePageData
}

function HomePageView2({ data }: Props) {
  return (
    <div>
      <HeroView2 data={data?.home_page_setting} />
      {data?.website_services && data?.website_services.length > 0 && (
        <ServicesView2 data={data?.website_services} />
      )}
      {data?.featured_projects && data?.featured_projects.length > 0 && (
        <ProjectsView2 data={data?.featured_projects} />
      )}
      {data?.founders && data?.founders.length > 0 && (
        <AboutUsView2 data={data?.founders} />
      )}
      {data?.home_page_setting?.video_profile_file && (
        <CompanyProfileView2
          data={data?.home_page_setting?.video_profile_file || ""}
        />
      )}
      <PartnersCombinedView
        partners={data?.company_icons}
        certificates={data?.certificate_icons}
        approvals={data?.approval_icons}
      />
    </div>
  );
}

export default HomePageView2;
