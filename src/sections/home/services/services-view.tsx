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

export default function ServicesView() {
  const t = useTranslations("home");

  // Services data with translations
  const services = [
    {
      id: 1,
      title: t("services.service1.title"),
      description: t("services.service1.description"),
      image: "/assets/images/product/product-1.webp",
    },
    {
      id: 2,
      title: t("services.service2.title"),
      description: t("services.service2.description"),
      image: "/assets/images/product/product-2.webp",
    },
    {
      id: 3,
      title: t("services.service3.title"),
      description: t("services.service3.description"),
      image: "/assets/images/product/product-3.webp",
    },
  ];

  return (
    <PageSection sx={{ my: { xs: 4, md: 6 } }}>
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
            // Initialize swiper properly and start at the second card (index 1)
            swiper.update();
            // Start at the second card (index 1)
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
                    src={service.image}
                    alt={service.title}
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
                    {service.title}
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
