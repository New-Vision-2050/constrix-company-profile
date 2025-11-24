import { Grid } from "@mui/material";
import ServiceCard from "../service-card";
import coverImg from "public/assets/images/cover/cover-19.webp";

const GridItem = () => {
  return (
    <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
      <ServiceCard bgImg={coverImg.src} />
    </Grid>
  );
};

export default function ServicesList() {
  return (
    <Grid container spacing={4}>
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
      <GridItem />
    </Grid>
  );
}
