"use client";

import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import ServiceLabel from "./ServiceLabel";
import { BE_WebsiteServicePreviousWork } from "@/types/api/base/services";

interface PreviousWork {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface PreviousWorkSliderProps {
  works: BE_WebsiteServicePreviousWork[]
}

/**
 * Previous Work Slider Component
 * Displays carousel of previous work with image and description
 * Supports RTL/LTR and light/dark themes
 */
export default function PreviousWorkSlider({ works }: PreviousWorkSliderProps) {
  return (
    <Box sx={{ width: "100%", py: 2 }}>
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
          if (works.length > 1) swiper.slideTo(1, 0);
        }}
        breakpoints={{
          640: { coverflowEffect: { depth: 250, modifier: 2 } },
          1024: { coverflowEffect: { depth: 200, modifier: 2 } },
        }}
      >
        {works.map((work) => (
          <SwiperSlide key={work.id} style={{ width: "80%" }}>
            <Card
              sx={{
                borderRadius: 2.5,
                boxShadow: 3,
                height: "100%",
                width: "100%",
                maxWidth: { xs: "100%", sm: "500px", md: "650px", lg: "800px", xl: "1000px" },
                mx: "auto",
              }}
            >
              <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 10" }}>
                <Image src={work.image} alt={work.description} fill style={{ objectFit: "cover" }} />
              </Box>
              <Box sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
                <ServiceLabel label={work.description} />
                <Typography variant="body1">
                  {work.description}
                </Typography>
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
