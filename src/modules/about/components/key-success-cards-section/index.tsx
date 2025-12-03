import { Grid } from "@mui/material";
import PageSection from "@/layouts/main/page-section";
import KeySuccessCard from "../key-success-card";

/**
 * Goal Section - Displays the company goal/motto card
 * Used in the About page to showcase company vision
 */
function KeySuccessCardsSection() {
  return (
    <PageSection>
      <Grid container spacing={4} my={4}>
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
  );
}

export default KeySuccessCardsSection;

