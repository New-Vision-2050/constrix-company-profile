
import ServiceCard from "@/modules/services/service-card";
import { Grid } from "@mui/material";
import coverImg from "public/assets/images/cover/cover-19.webp";

const GridItem = () => {
    return (
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            {/* TODO::use service card until we have a design for the news card component */}
            <ServiceCard bgImg={coverImg.src} />
        </Grid>
    );
};

export default function NewsCardsList() {
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
