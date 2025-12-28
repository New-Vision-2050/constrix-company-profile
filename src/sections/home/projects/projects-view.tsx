"use client";

import React from "react";
import { Box, Typography, Stack, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useMediaQuery } from "@mui/material";
import NavigationContainer from "@/components/SwiperNavigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import PageSection from "@/layouts/main/page-section";
import { BE_FeaturedProject } from "@/types/api/base/project";
import Link from "next/link";
interface ProjectsViewProps {
  data?: BE_FeaturedProject[];
}

export default function ProjectsView({ data }: ProjectsViewProps) {
  const t = useTranslations("home");
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Responsive card width based on window size
  const [cardMaxWidth, setCardMaxWidth] = React.useState("100%");

  React.useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      if (w < 640) {
        setCardMaxWidth("350px");
      } else if (w < 900) {
        setCardMaxWidth("500px");
      } else if (w < 1200) {
        setCardMaxWidth("600px");
      } else if (w < 1440) {
        setCardMaxWidth("800px");
      } else if (w < 1600) {
        setCardMaxWidth("1000px");
      } else if (w < 1800) {
        setCardMaxWidth("1100px");
      } else {
        setCardMaxWidth("1250px");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const spaceBetween = 10;

  const projects = data || [];

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
              loop={projects.length > 1}
              slidesPerView={1.2}
              spaceBetween={spaceBetween}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 1.1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 1.3,
                  spaceBetween: 25,
                },
                1280: {
                  slidesPerView: 1.2,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 1.2,
                  spaceBetween: 30,
                },
                1600: {
                  slidesPerView: 1.25,
                  spaceBetween: 30,
                },
                1920: {
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
                      width: cardMaxWidth,
                      height: {
                        xs: "400px",
                        sm: "350px",
                        md: "400px",
                        lg: "450px",
                      },
                      aspectRatio: isTabletOrMobile ? "4 / 3" : "16 / 9",
                      backgroundImage: `url(${project.main_image})`,
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
                        {project.name}
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
                      <Box
                        component={Link}
                        href={`/projects/${project.id}`}
                        sx={{
                          color: "primary.main",
                          alignItems: "center",
                          gap: 0.5,
                          textDecoration: "none",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                          fontWeight: 500,
                          mt: 1,
                        }}
                      >
                        {t("showMore")}
                      </Box>
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
