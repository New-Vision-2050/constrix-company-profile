import { Grid } from "@mui/material";
import DetailedCard from "./components/detailed-card";
import SmallCard from "./components/small-card";
import { BE_ServicePageItem } from "@/types/api/base/services";
import { ensureArrayLength } from "@/utils/ensure-array-length";

type Props = {
  services: BE_ServicePageItem[];
};

function RhombusCards({ services }: Props) {
  if (!services.length) return null;

  const ensured = ensureArrayLength(services, 6);

  return (
    <Grid container spacing={4} alignItems="center" justifyContent="center">
      <Grid size={{ xs: 12, md: 3, lg: 2 }}>
        <SmallCard service={ensured[0].data} />
      </Grid>
      <Grid size={{ xs: 12, lg: 8 }} container spacing={4} alignItems="center">
        <Grid container spacing={4} alignItems="end" sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <SmallCard service={ensured[1].data} ratio={1} />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <DetailedCard service={ensured[2].data} />
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="start" sx={{ width: "100%" }}>
          <Grid size={{ xs: 12, md: 9 }}>
            <DetailedCard service={ensured[3].data} />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <SmallCard service={ensured[4].data} ratio={1} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 3, lg: 2 }}>
        <SmallCard service={ensured[5].data} />
      </Grid>
    </Grid>
  );
}

export default RhombusCards;
