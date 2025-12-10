"use client";

import HeroView from "@/sections/home/hero/hero-view";
import PartnersView from "@/sections/home/partners/partners-view";
import ServicesView from "@/sections/home/services/services-view";
import CompanyProfileView from "@/sections/home/company-profile/company-profile-view";
import AboutUsView from "@/sections/home/about-us/about-us-view";
import ProjectsView from "@/sections/home/projects/projects-view";
import DividerView from "@/sections/home/divider/divider-view";
import { LayoutSection } from "@/layouts/core";
import { useQuery } from "@tanstack/react-query";
import { HomePageApi } from "@/services/api/home-page";
import { Box, CircularProgress } from "@mui/material";

function HomePage() {
  const { data: homePageData, isLoading } = useQuery({
    queryKey: ["home-page-data"],
    queryFn: () => HomePageApi.getData(),
  });

  const payload = homePageData?.data.payload;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <LayoutSection>
      <HeroView data={payload?.home_page_setting} />
      <PartnersView data={payload?.company_icons} />
      <PartnersView data={payload?.certificate_icons} />
      <PartnersView data={payload?.approval_icons} />
      <DividerView />
      <ServicesView />
      <CompanyProfileView
        data={payload?.home_page_setting?.video_profile_file || ""}
      />
      <AboutUsView data={payload?.founders} />
      <ProjectsView data={payload?.featured_projects} />
    </LayoutSection>
  );
}

export default HomePage;
