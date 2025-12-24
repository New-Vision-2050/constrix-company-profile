import { Grid, GridProps } from "@mui/material";
import ServiceCard from "../service-card";
import { BE_ServiceDepartment } from "@/types/api/base/services";

const GridItem = (props: GridProps) => {
  return <Grid {...props} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} />;
};

type Props = {
  sectionData: BE_ServiceDepartment;
};
export default function ServicesList({ sectionData }: Props) {
  return (
    <Grid container spacing={4}>
      {sectionData.website_services.map((service) => (
        <GridItem key={service.id}>
          <ServiceCard service={service} />
        </GridItem>
      ))}
    </Grid>
  );
}
