"use client";

import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import PageSection from "@/layouts/main/page-section";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

export default function AboutUsView() {
  const t = useTranslations("home");

  // Team members data with translations
  const teamMembers = [
    {
      id: 1,
      name: t("team.member1.name"),
      title: t("team.member1.title"),
      description: t("team.member1.description"),
      image: "/assets/images/avatar/avatar-1.webp", // You can add actual team member images
    },
    {
      id: 2,
      name: t("team.member2.name"),
      title: t("team.member2.title"),
      description: t("team.member2.description"),
      image: "/assets/images/avatar/avatar-2.webp",
    },
    {
      id: 3,
      name: t("team.member3.name"),
      title: t("team.member3.title"),
      description: t("team.member3.description"),
      image: "/assets/images/avatar/avatar-3.webp",
    },
  ];

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
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            watchSlidesProgress={true}
            allowTouchMove={true}
            slideToClickedSlide={true}
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
              if (teamMembers.length > 1) {
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
            {teamMembers.map((member, index) => {
              const displayMember = member;

              return (
                <SwiperSlide
                  key={`member-${displayMember.id}-${index}`}
                  style={{
                    width: "65%",
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
                      <Image
                        src="/assets/logos/base/image.png"
                        alt="Constrix Logo"
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </Box>

                    {/* Content Container */}
                    <Stack
                      spacing={{ xs: 3, md: 4 }}
                      sx={{
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: { xs: "center", md: "space-between" },
                        alignItems: { xs: "center", md: "flex-start" },
                      }}
                    >
                      {/* Profile Section - Right Side */}
                      <Box>
                        {/* Profile Image */}
                        <Box
                          sx={{
                            position: "relative",
                            width: { xs: 150, md: 180 },
                            height: { xs: 150, md: 180 },
                          }}
                        >
                          <Image
                            src={displayMember.image}
                            alt={displayMember.name}
                            fill
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Text Content - Left Side */}

                      <Box sx={{ p: 4 }}>
                        <Box
                          sx={{
                            textAlign: { xs: "center", md: "left" },
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 0.5,
                              fontSize: { xs: "1.1rem", md: "1.3rem" },
                            }}
                          >
                            {displayMember.name}
                          </Typography>

                          {/* Title */}
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: { xs: "0.9rem", md: "1rem" },
                              fontWeight: 500,
                              mb: 2,
                            }}
                          >
                            {displayMember.title}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: { xs: "0.95rem", md: "1.1rem" },
                            lineHeight: 1.8,
                          }}
                        >
                          {displayMember.description}
                        </Typography>
                      </Box>
                    </Stack>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </PageSection>
    </Box>
  );
}
