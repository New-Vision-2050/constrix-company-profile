"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import PageSection from "@/layouts/main/page-section";

// Import Swiper styles
import "swiper/css";

// Partner data with logo paths
const partners = [
  { name: "MakeLess", logo: "/assets/logos/base/image.png" },
  { name: "coworks", logo: "/assets/logos/base/image.png" },
  { name: "greener", logo: "/assets/logos/base/image.png" },
  { name: "SAAS TODAY", logo: "/assets/logos/base/image.png" },
  { name: "Dorfus", logo: "/assets/logos/base/image.png" },
  { name: "askimat", logo: "/assets/logos/base/image.png" },
];

export default function PartnersView() {
  const t = useTranslations("home");

  return (
    <Box mb={6}>
      <PageSection>
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            my: 4,
            fontWeight: 700,
          }}
        >
          {t("partners")}
        </Typography>

        {/* Swiper Carousel */}
        <Box>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={40}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 60,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 70,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 80,
              },
            }}
            loop={true}
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    px: 2,
                    py: 2,
                  }}
                >
                  {/* Partner Logo */}
                  <Box
                    sx={{
                      position: "relative",
                      width: { xs: "100%", md: "80%" },
                      maxWidth: { xs: 120, md: 150 },
                      aspectRatio: "2 / 1",
                    }}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </PageSection>
    </Box>
  );
}
