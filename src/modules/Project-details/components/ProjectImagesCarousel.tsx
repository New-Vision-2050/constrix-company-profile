"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Card } from "@mui/material";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { BE_FeaturedProject } from "@/types/api/base/project";

// import swiper style
import "swiper/css";
import "swiper/css/effect-coverflow";

type PropsT = {
    projectData: BE_FeaturedProject
}

export default function ProjectImagesCarousel({ projectData }: PropsT) {
    const ProjectImages = useMemo(() => [
        projectData?.main_image,
        ...projectData?.secondary_images
    ].filter(imageUrl => typeof imageUrl === 'string' && imageUrl.trim() !== ''), [projectData])

    return <Box sx={{ width: "100%", py: 2 }}>
        <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 300, modifier: 2, slideShadows: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={600}
            onInit={(swiper) => {
                swiper.update();
                if (ProjectImages.length > 1) swiper.slideTo(1, 0);
            }}
            breakpoints={{
                640: { coverflowEffect: { depth: 250, modifier: 2 } },
                1024: { coverflowEffect: { depth: 200, modifier: 2 } },
            }}
        >
            {ProjectImages.map((imageUrl, index) => (
                <SwiperSlide key={`${imageUrl}-${index}`} style={{ width: "80%" }}>
                    <Card
                        sx={{
                            borderRadius: 2.5,
                        }}
                    >
                        <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 10" }}>
                            <Image src={imageUrl} alt={imageUrl} fill style={{ objectFit: "cover" }} />
                        </Box>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    </Box>