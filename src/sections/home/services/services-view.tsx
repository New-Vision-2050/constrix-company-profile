"use client";

import React from "react";
import { Box, Typography, Card } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import PageSection from "@/layouts/main/page-section";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import { BE_WebsiteService } from "@/types/api/base/services";

export default function ServicesView({ data }: { data: BE_WebsiteService[] }) {
  const t = useTranslations("home");

  // Use API data or fallback to empty array
  const services = data || [];

  return (
    <PageSection sx={{ mb: 6 }}>
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          my: { xs: 4, md: 6 },
          fontWeight: 700,
        }}
      >
        {t("servicesTitle")}
      </Typography>

      {/* Infinite 3D Carousel */}
      <Box>
        <Swiper
          modules={[Autoplay, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 2,
            slideShadows: true,
          }}
          speed={600}
          onInit={(swiper) => {
            swiper.update();
            if (services.length > 1) {
              swiper.slideTo(1, 0);
            }
          }}
          breakpoints={{
            640: {
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 250,
                modifier: 2,
                slideShadows: true,
              },
            },
            1024: {
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 2,
                slideShadows: true,
              },
            },
          }}
        >
          {services.map((service) => (
            <SwiperSlide
              key={service.id}
              style={{
                width: "85%",
                maxWidth: "500px",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 2.5,
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.4s ease",
                }}
              >
                {/* Image Container */}
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={service.main_image}
                    alt={service.name}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  {/* Dark Gradient Overlay at bottom */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "60%",
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%)",
                    }}
                  />
                </Box>

                {/* Text Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    color: "#ffffff",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      fontSize: { xs: "1.1rem", md: "1.25rem" },
                    }}
                  >
                    {service.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.875rem", md: "0.9375rem" },
                      lineHeight: 1.6,
                      opacity: 0.95,
                    }}
                  >
                    {service.description}
                  </Typography>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </PageSection>
  );
}
