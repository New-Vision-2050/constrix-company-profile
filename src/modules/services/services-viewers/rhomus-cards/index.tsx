import { Grid } from "@mui/material";
import DetailedCard from "./components/detailed-card";
import SmallCard from "./components/small-card";

function RhomusCards() {
  return (
    <Grid container spacing={4} alignItems="center" justifyContent="center">
      <Grid size={{ xs: 12, md: 3, lg: 2 }}>
        <SmallCard />
      </Grid>
      <Grid
        size={{ xs: 12, md: 8, lg: 6 }}
        container
        spacing={4}
        alignItems="center"
      >
        <Grid container spacing={4} alignItems="end" sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <SmallCard ratio={1} />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <DetailedCard />
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="start" sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, md: 9 }}>
            <DetailedCard />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <SmallCard ratio={1} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 3, lg: 2 }}>
        <SmallCard />
      </Grid>
    </Grid>
  );
}

export default RhomusCards;
