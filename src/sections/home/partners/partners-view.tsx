"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import PageSection from "@/layouts/main/page-section";
import "swiper/css";
import { BE_WebsiteIcon } from "@/types/api/base/icon";

interface PartnersViewProps {
  data?: BE_WebsiteIcon[];
}

export default function PartnersView({ data }: PartnersViewProps) {
  const t = useTranslations("home");

  const partners = data || [];

  return (
    <PageSection sx={{ mb: 6 }}>
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
          slidesPerView={partners.length === 1 ? 1 : 2}
          centeredSlides={partners.length === 1}
          autoplay={
            partners.length > 1
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                }
              : false
          }
          breakpoints={
            partners.length === 1
              ? undefined
              : {
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
                }
          }
          loop={partners.length > 1}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
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
                    src={partner.icon}
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
  );
}
