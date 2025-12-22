"use client";

import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import { Grid, useTheme } from "@mui/material";
import KeySuccessCard from "../../components/key-success-card";
import FeaturedCategories from "../../components/featured-categories";
import FilesSlider from "../../components/files-slider";
import { useTranslations } from "next-intl";
import { AboutPagePayload } from "@/types/api/base/about-page";
import { Eye, MessageSquare, Diagram } from "iconsax-reactjs";
import DescriptionSection from "../../components/description-section";
import PartnersView from "@/sections/home/partners/partners-view";

function AboutMainView({ data }: { data: AboutPagePayload }) {
  const t = useTranslations("about");
  const { palette } = useTheme();
  return (
    <MainPageContent title={t("title")} description={data.description}>
      <LayoutStack spacing={8}>
        <DescriptionSection data={data} />
        <PageSection>
          {data?.company_icons && data?.company_icons.length > 0 && (
            <PartnersView
              data={data?.company_icons?.map((i) => ({
                ...i,
                icon: i.icon_url,
              }))}
              titleKey="partners"
            />
          )}
        </PageSection>
        <PageSection>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <KeySuccessCard
                title={t("vision")}
                description={data.vision}
                icon={<Eye size={32} color={palette.primary.main} />}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <KeySuccessCard
                title={t("target")}
                description={data.target}
                icon={<Diagram size={32} color={palette.primary.main} />}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <KeySuccessCard
                title={t("slogan")}
                description={data.slogan}
                icon={<MessageSquare size={32} color={palette.primary.main} />}
              />
            </Grid>
          </Grid>
        </PageSection>

        <PageSection>
          {data.project_types && (
            <FeaturedCategories projects={data.project_types} />
          )}
        </PageSection>

        <PageSection>
          <FilesSlider files={data.attachments} />
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}

export default AboutMainView;
