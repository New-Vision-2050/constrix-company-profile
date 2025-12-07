"use client";

import React from "react";
import { Box, Typography, Card, Button, alpha } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import PageSection from "@/layouts/main/page-section";
import DownloadIcon from "@mui/icons-material/Download";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function SwiperView() {
  // PDFs data
  const pdfs = [
    {
      id: 1,
      title: "دليل التطوير",
      size: "50 MB",
      type: "PDF",
      downloadText: "تحميل الملف",
      downloadUrl: "/assets/pdfs/development-guide.pdf",
    },
    {
      id: 2,
      title: "دليل التطوير",
      size: "51 MB",
      type: "PDF",
      downloadText: "تحميل الملف",
      downloadUrl: "/assets/pdfs/development-guide.pdf",
    },
    {
      id: 3,
      title: "دليل التطوير",
      size: "52 MB",
      type: "PDF",
      downloadText: "تحميل الملف",
      downloadUrl: "/assets/pdfs/development-guide.pdf",
    },
    {
      id: 4,
      title: "دليل التطوير",
      size: "53 MB",
      type: "PDF",
      downloadText: "تحميل الملف",
      downloadUrl: "/assets/pdfs/development-guide.pdf",
    },
  ];

  return (
    <PageSection
      sx={{
        mb: 6,
        py: { xs: 4, md: 6 },
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          my: { xs: 4, md: 6 },
          fontWeight: 700,
        }}
      >
        المستندات والتقارير
      </Typography>

      {/* PDF Carousel */}
      <Box
        sx={{
          position: "relative",
          "& .swiper-slide": {
            transition: "all 0.5s ease",
            transform: "scale(0.85)",
            opacity: 0.6,
          },
          "& .swiper-slide-active": {
            transform: "scale(1)",
            opacity: 1,
            zIndex: 10,
          },
        }}
      >
        <Swiper
          modules={[Autoplay, Navigation]}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={24}
          initialSlide={3}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          speed={600}
          loop={pdfs.length > 3}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
        >
          {pdfs.map((pdf) => (
            <SwiperSlide key={pdf.id}>
              <Card
                sx={{
                  height: "220px",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: (t) =>
                    `0 8px 24px ${alpha(t.palette.secondary.main, 0.25)}`,
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: (t) =>
                    `linear-gradient(135deg, ${t.palette.secondary.dark} 0%, ${t.palette.secondary.main} 100%)`,
                  p: 3.5,
                  transition: "all 0.4s ease",
                }}
              >
                {/* Left Content - Text */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 2,
                    color: "common.white",
                    maxWidth: "60%",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      mb: 1.5,
                      fontSize: { xs: "1.3rem", md: "1.5rem" },
                    }}
                  >
                    {pdf.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.95rem",
                      mb: 0.5,
                      opacity: 0.9,
                    }}
                  >
                    حجم الملف: {pdf.size}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "0.95rem",
                      mb: 2,
                      opacity: 0.9,
                    }}
                  >
                    نوع الملف: {pdf.type}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    sx={{
                      color: "common.white",
                      borderColor: (t) => alpha(t.palette.common.white, 0.8),
                      borderRadius: "50px",
                      px: 3,
                      py: 1,
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      textTransform: "none",
                    }}
                  >
                    {pdf.downloadText}
                  </Button>
                </Box>

                {/* Right Content - PDF Icon */}
                <Box
                  sx={{
                    position: "absolute",
                    right: { xs: 20, md: 40 },
                    bottom: -10,
                    opacity: 0.15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 1,
                  }}
                >
                  {/* PDF Icon Shape */}
                  <Box
                    sx={{
                      width: { xs: 80, md: 110 },
                      height: { xs: 70, md: 90 },
                      border: 5,
                      borderColor: "common.white",
                      borderRadius: "16px",
                      position: "relative",
                      mb: 1,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: -5,
                        left: -5,
                        width: 35,
                        height: 35,
                        background: (t) =>
                          `linear-gradient(135deg, ${t.palette.secondary.dark} 0%, ${t.palette.secondary.main} 100%)`,
                        borderTopLeftRadius: "16px",
                        borderBottomRightRadius: "16px",
                        border: 5,
                        borderColor: "common.white",
                        borderRight: "none",
                        borderBottom: "none",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: "2rem", md: "2.8rem" },
                      fontWeight: 800,
                      color: "common.white",
                      letterSpacing: "6px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    PDF
                  </Typography>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <Box
          className="swiper-button-prev-custom"
          sx={{
            position: "absolute",
            top: "50%",
            left: { xs: -10, md: -20 },
            transform: "translateY(-50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            bgcolor: "common.white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            boxShadow: (t) =>
              `0 4px 12px ${alpha(t.palette.common.black, 0.1)}`,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "secondary.dark",
              color: "common.white",
              transform: "translateY(-50%) scale(1.1)",
              boxShadow: (t) =>
                `0 6px 20px ${alpha(t.palette.secondary.main, 0.4)}`,
            },
            "&::after": {
              content: '"‹"',
              fontSize: "2rem",
              fontWeight: 300,
              color: "inherit",
            },
          }}
        />
        <Box
          className="swiper-button-next-custom"
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: -10, md: -20 },
            transform: "translateY(-50%)",
            width: 44,
            height: 44,
            borderRadius: "50%",
            bgcolor: "common.white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            boxShadow: (t) =>
              `0 4px 12px ${alpha(t.palette.common.black, 0.1)}`,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "secondary.dark",
              color: "common.white",
              transform: "translateY(-50%) scale(1.1)",
              boxShadow: (t) =>
                `0 6px 20px ${alpha(t.palette.secondary.main, 0.4)}`,
            },
            "&::after": {
              content: '"›"',
              fontSize: "2rem",
              fontWeight: 300,
              color: "inherit",
            },
          }}
        />
      </Box>
    </PageSection>
  );
}
