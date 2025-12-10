import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import { Grid } from "@mui/material";
import KeySuccessCard from "../../components/key-success-card";
import FeaturedCategories from "../../components/featured-categories";
import { useTranslations } from "next-intl";

function AboutMainView() {
  const t = useTranslations("about");

  return (
    <MainPageContent title="About">
      <LayoutStack>
        <PageSection>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <KeySuccessCard />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <KeySuccessCard />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <KeySuccessCard />
            </Grid>
          </Grid>
        </PageSection>

        <PageSection>
          <FeaturedCategories />
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}

export default AboutMainView;
