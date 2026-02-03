"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCreative } from "swiper/modules";
import PageSection from "@/layouts/main/page-section";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { BE_WebsiteIcon } from "@/types/api/base/icon";
import Image from "next/image";

interface PartnersView2Props {
  data?: Pick<BE_WebsiteIcon, "icon" | "id" | "name">[];
  titleKey?: "partners" | "certificates" | "approvals";
}

export default function PartnersView2({
  data,
  titleKey = "partners",
}: PartnersView2Props) {
  const t = useTranslations("home");
  const theme = useTheme();
  const partners = data || [];

  return (
    <PageSection sx={{ py: { xs: 6, md: 10 } }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: { xs: 4, md: 6 },
          fontWeight: 700,
        }}
      >
        {t(titleKey)}
      </Typography>

      <Box sx={{ pb: 6, overflow: "hidden" }}>
        <Swiper
          modules={[Autoplay, Pagination, EffectCreative]}
          effect="creative"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          spaceBetween={30}
          creativeEffect={{
            prev: {
              shadow: false,
              translate: ["-120%", 0, -500],
              rotate: [0, 0, -15],
              opacity: 0.3,
              scale: 0.8,
            },
            next: {
              shadow: false,
              translate: ["120%", 0, -500],
              rotate: [0, 0, 15],
              opacity: 0.3,
              scale: 0.8,
            },
            limitProgress: 5,
            progressMultiplier: 1,
            perspective: true,
            shadowPerProgress: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 35,
            },
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={
            partners.length > 1
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          loop={partners.length > 1}
          style={{
            paddingBottom: "50px",
          }}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <Box
                sx={{
                  width: "100%",
                  height: "180px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: theme.palette.background.paper,
                  borderRadius: 3,
                  boxShadow: theme.shadows[4],
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[8],
                    background: theme.palette.mode === "light" 
                      ? theme.palette.grey[50] 
                      : theme.palette.grey[900],
                  },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "calc(100% - 48px)",
                    height: "calc(100% - 48px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={partner.icon}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                    style={{
                      objectFit: "contain",
                      filter: "grayscale(100%) contrast(1.2)",
                      transition: "filter 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = "grayscale(0%) contrast(1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "grayscale(100%) contrast(1.2)";
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
