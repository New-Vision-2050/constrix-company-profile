"use client";

import React, { useRef } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowLeft2, ArrowRight2, Facebook, Instagram } from "iconsax-reactjs";
import { Icon } from "@iconify/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import PageSection from "@/layouts/main/page-section";

export default function TeamView() {
  const swiperRef = useRef<SwiperType | null>(null);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Alex O'Brien",
      role: "CEO & Founder",
      image: "/assets/images/avatar/avatar-1.webp",
      socials: { facebook: "#", instagram: "#", linkedin: "#", twitter: "#" },
    },
    {
      id: 2,
      name: "Deja Brady",
      role: "Project Coordinator",
      image: "/assets/images/avatar/avatar-2.webp",
      socials: { facebook: "#", instagram: "#", linkedin: "#", twitter: "#" },
    },
    {
      id: 3,
      name: "Harrison Stein",
      role: "Team Leader",
      image: "/assets/images/avatar/avatar-3.webp",
      socials: { facebook: "#", instagram: "#", linkedin: "#", twitter: "#" },
    },
    {
      id: 4,
      name: "Reece Chung",
      role: "Software Developer",
      image: "/assets/images/avatar/avatar-4.webp",
      socials: { facebook: "#", instagram: "#", linkedin: "#", twitter: "#" },
    },
    {
      id: 5,
      name: "Lainey Davidson",
      role: "Marketing Manager",
      image: "/assets/images/avatar/avatar-5.webp",
      socials: { facebook: "#", instagram: "#", linkedin: "#", twitter: "#" },
    },
    {
      id: 6,
      name: "Marcus Chen",
      role: "UX Designer",
      image: "/assets/images/avatar/avatar-6.webp",
      socials: { facebook: "#", instagram: "#", linkedin: "#", twitter: "#" },
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)",
        overflow: "hidden",
      }}
    >
      <PageSection
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: { xs: "flex-start", lg: "center" },
        }}
      >
        {/* Left Side - Title and Description */}
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: "100%", lg: "350px", xl: "400px" },
          }}
        >
          {/* Label */}
          <Typography
            sx={{
              color: "#ff6b35",
              fontWeight: 600,
              fontSize: "0.875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              mb: 2,
            }}
          >
            TEAM
          </Typography>

          {/* Title with Gradient */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
              lineHeight: 1.2,
              mb: 3,
              background:
                "linear-gradient(90deg, #ff6b35 0%, #f7931e 30%, #e040fb 70%, #ab47bc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Meet our team
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: { xs: "0.9rem", md: "1rem" },
              lineHeight: 1.7,
              mb: 4,
              maxWidth: "320px",
            }}
          >
            Since wire-frame renderings are relatively simple and fast to
            calculate, they are often used in cases
          </Typography>

          {/* Navigation Arrows */}
          <Stack direction="row" spacing={1.5}>
            <Box
              component="button"
              onClick={() => swiperRef.current?.slidePrev()}
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.4)",
                },
              }}
            >
              <ArrowLeft2 variant="Outline" size={20} color="#fff" />
            </Box>
            <Box
              component="button"
              onClick={() => swiperRef.current?.slideNext()}
              sx={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid #ff6b35",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 107, 53, 0.2)",
                },
              }}
            >
              <ArrowRight2 variant="Outline" size={20} color="#ff6b35" />
            </Box>
          </Stack>
        </Box>

        {/* Right Side - Team Cards Carousel */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            overflow: "visible",
          }}
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={600}
            loop={true}
            slidesPerView={1.3}
            spaceBetween={20}
            breakpoints={{
              480: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              900: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 28,
              },
              1536: {
                slidesPerView: 5,
                spaceBetween: 32,
              },
            }}
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <Box
                  sx={{
                    overflow: "hidden",

                    transition: "transform 0.3s ease, box-shadow 0.3s ease",

                    "&:hover .social-overlay": {
                      opacity: 1,
                    },
                  }}
                >
                  {/* Image Container */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "3 / 4",
                      borderRadius: 2,
                      overflow: "hidden",
                      background:
                        "linear-gradient(180deg, #e8eef2 0%, #c5d0d8 100%)",
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "top center",
                      }}
                    />

                    {/* Social Icons Overlay */}
                    <Box
                      className="social-overlay"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                        py: 2,
                        background:
                          "linear-gradient(to top, rgba(26, 37, 53, 0.95) 0%, rgba(26, 37, 53, 0.8) 60%, transparent 100%)",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <IconButton
                        component="a"
                        href={member.socials.facebook}
                        size="small"
                      >
                        <Facebook size="24" color="#1877f2" variant="Bold" />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={member.socials.instagram}
                        size="small"
                      >
                        <Instagram size="24" color="#e4405f" variant="Linear" />
                      </IconButton>
                      {/* <IconButton component="a" href={member.socials.linkedin}>
                        <Facebook size="24" color="#0a66c2" variant="Linear" />
                      </IconButton>
                      <IconButton
                        component="a"
                        href={member.socials.twitter}
                        size="small"
                        sx={{
                          color: "#fff",
                          "&:hover": { color: "#000" },
                        }}
                      >
                        <Facebook icon="ri:twitter-x-fill" width={18} />
                      </IconButton> */}
                    </Box>
                  </Box>

                  {/* Info Section */}
                  <Box
                    sx={{
                      p: 2.5,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        color: "#fff",
                        mb: 0.5,
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        color: "#fff",
                      }}
                    >
                      {member.role}
                    </Typography>
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
