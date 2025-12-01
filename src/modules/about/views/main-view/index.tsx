import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import { Grid, Typography } from "@mui/material";
import KeySuccessCard from "../../components/key-success-card";

function AboutMainView() {
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
      </LayoutStack>
    </MainPageContent>
  );
}

export default AboutMainView;
