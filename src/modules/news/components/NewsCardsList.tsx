"use client";

import ServiceCard from "@/modules/services/service-card";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import coverImg from "public/assets/images/cover/cover-19.webp";

const GridItem = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/news/1`);
    };

    return (
        <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
            {/* TODO::use service card until we have a design for the news card component */}
            <ServiceCard bgImg={coverImg.src} onClick={handleClick} />
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
