"use client";

import React from "react";
import { Box, Typography, Stack, useTheme, Link } from "@mui/material";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useMediaQuery } from "@mui/material";
import NavigationContainer from "@/components/SwiperNavigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import PageSection from "@/layouts/main/page-section";

export default function ProjectsView() {
  const t = useTranslations("home");
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Calculate spaceBetween (similar to useResponsiveSpaceBetween)
  const spaceBetween = 10;

  // Projects data with translations
  const projects = [
    {
      id: 1,
      title: t("projects.project1.title"),
      description: t("projects.project1.description"),
      location: t("projects.project1.location"),
      image: "/assets/images/cover/cover-1.webp",
    },
    {
      id: 2,
      title: t("projects.project2.title"),
      description: t("projects.project2.description"),
      location: t("projects.project2.location"),
      image: "/assets/images/cover/cover-6.webp",
    },
    {
      id: 3,
      title: t("projects.project3.title"),
      description: t("projects.project3.description"),
      location: t("projects.project3.location"),
      image: "/assets/images/cover/cover-8.webp",
    },
  ];

  return (
    <Box>
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          my: { xs: 4, md: 6 },
          fontWeight: 700,
        }}
      >
        {t("projectsTitle")}
      </Typography>

      {/* Swiper Carousel */}
      <Box sx={{ overflow: "hidden" }}>
        <PageSection
          sx={{
            px: 0,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100vw",
            }}
          >
            <Swiper
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                stopOnLastSlide: false,
                pauseOnMouseEnter: false,
              }}
              speed={1000}
              loop={true}
              slidesPerView={1.2}
              spaceBetween={spaceBetween}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 25,
                },
                1280: {
                  slidesPerView: 1.3,
                  spaceBetween: 30,
                },
              }}
              className="swiper_container"
              watchSlidesProgress={true}
              onInit={(swiper) => {
                swiper.update();
              }}
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <Box
                    sx={{
                      width: {
                        xs: "250px",
                        sm: "600px",
                        md: "900px",
                        lg: "1200px",
                      },
                      height: {
                        xs: "400px",
                        sm: "350px",
                        md: "400px",
                        lg: "450px",
                      },
                      aspectRatio: isTabletOrMobile ? "4 / 3" : "16 / 9",
                      backgroundImage: `url(${project.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: 1,
                      px: { xs: 2, sm: 3, md: 4, lg: 8 },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Stack
                      spacing={1.5}
                      sx={{
                        position: "absolute",
                        p: 4,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        top: 0,
                        justifyContent: "flex-end",
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.973) 100%)",
                      }}
                    >
                      <Typography
                        variant="h3"
                        fontWeight={700}
                        sx={{ color: "#fff", mb: 0.5 }}
                      >
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#fff",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          lineHeight: 1.6,
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Link
                        href="#"
                        sx={{
                          alignItems: "center",
                          gap: 0.5,
                          textDecoration: "none",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          fontWeight: 500,
                          mt: 1,
                        }}
                      >
                        {t("showMore")}
                      </Link>
                    </Stack>
                  </Box>
                </SwiperSlide>
              ))}
              <NavigationContainer />
            </Swiper>
          </Box>
        </PageSection>
      </Box>
    </Box>
  );
}
