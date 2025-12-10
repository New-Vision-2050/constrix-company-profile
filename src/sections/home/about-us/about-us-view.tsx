"use client";

import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import PageSection from "@/layouts/main/page-section";
import { BE_Founder } from "@/types/api/base/home-page";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

interface AboutUsViewProps {
  data?: BE_Founder[];
}

export default function AboutUsView({ data }: AboutUsViewProps) {
  const t = useTranslations("home");
  const founders = data || [];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundImage: "url('/assets/images/cover/cover-1.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <PageSection
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            fontWeight: 600,
            color: "#fff",
            fontSize: { xs: "1.75rem", md: "2.5rem" },
          }}
        >
          {t("aboutUsTitle")}
        </Typography>

        {/* Swiper Carousel */}
        <Box>
          <Swiper
            modules={[Autoplay, EffectCoverflow]}
            effect="coverflow"
            centeredSlides={founders.length === 1 || founders.length > 1}
            slidesPerView={founders.length === 1 ? 1 : 1.2}
            speed={600}
            loop={founders.length > 1}
            autoplay={
              founders.length > 1
                ? {
                    delay: 4000,
                    disableOnInteraction: false,
                  }
                : false
            }
            onInit={(swiper) => {
              swiper.update();
              if (founders.length > 1) {
                swiper.slideTo(1, 0);
              }
            }}
            breakpoints={
              founders.length === 1
                ? undefined
                : {
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
                  }
            }
          >
            {founders.map((founder, index) => (
              <SwiperSlide
                key={`founder-${founder.id}-${index}`}
                style={{
                  width: founders.length === 1 ? "100%" : "100%",
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2.5,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Opacity Logo Watermark */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "60%",
                      height: "60%",
                      opacity: 0.2,
                    }}
                  >
                    <img
                      src="/assets/logos/base/image.png"
                      alt="Constrix Logo"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>

                  {/* Content Container */}
                  <Stack
                    spacing={{ xs: 3, md: 4 }}
                    sx={{
                      flexDirection: { xs: "column", md: "row" },
                      justifyContent: { xs: "center", md: "flex-start" },
                      alignItems: { xs: "center", md: "flex-start" },
                      minHeight: "300px",
                    }}
                  >
                    {/* Profile Section - Right Side */}
                    <Box>
                      {/* Profile Image */}
                      <Box
                        sx={{
                          position: "relative",
                          minWidth: "300px",
                          minHeight: "300px",
                          m: 3,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={founder.personal_photo}
                          alt={founder.name}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Text Content - Left Side */}
                    <Box
                      sx={{
                        pr: 10,
                        pl: 3,
                        py: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          fontSize: { xs: "1.1rem", md: "1.3rem" },
                          color: "primary.main",
                        }}
                      >
                        {founder.name}
                      </Typography>

                      {/* Job Title */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.9rem", md: "1.2rem" },
                          fontWeight: 600,
                          mb: 2,
                          color: "secondary.main",
                        }}
                      >
                        {founder.job_title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "0.95rem", md: "1.1rem" },
                          lineHeight: 1.8,
                        }}
                      >
                        {founder.description}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </PageSection>
    </Box>
  );
}
