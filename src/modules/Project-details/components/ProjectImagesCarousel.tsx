"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Card, Typography } from "@mui/material";
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
        ...(projectData?.secondary_images?.map(img => img.url) || []),
        ...(projectData?.secondary_image ? [projectData.secondary_image] : []),
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
                            boxShadow: 3,
                            height: "100%",
                            width: "100%",
                            maxWidth: {
                                xs: "100%",
                                sm: "500px",
                                md: "650px",
                                lg: "800px",
                                xl: "1000px",
                            },
                            mx: "auto",
                        }}
                    >
                        <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 10" }}>
                            <Image src={imageUrl} alt={`Project image ${index + 1}`} fill style={{ objectFit: "cover" }} />
                        </Box>
                        <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                            <Typography variant="body2" color="text.secondary" textAlign="center">
                                {projectData?.title} - Image {index + 1}
                            </Typography>
                        </Box>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    </Box>
}