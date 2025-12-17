"use client";

import React from "react";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import PageSection from "@/layouts/main/page-section";
import { ArrowCircleLeft, ArrowCircleRight } from "iconsax-reactjs";
import { BE_HomePageSetting } from "@/types/api/base/home-page";
import { useRouter } from "next/navigation";

interface HeroViewProps {
  data?: BE_HomePageSetting;
}

export default function HeroView({ data }: HeroViewProps) {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowCircleLeft : ArrowCircleRight;
  const router = useRouter();
  const videoSrc = data?.web_video_link
    ? data?.web_video_link
    : data?.web_video_file;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "70vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      {videoSrc && (
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </Box>
      )}

      {/* Content */}
      <PageSection sx={{ position: "relative", zIndex: 2 }}>
        <Stack
          spacing={5}
          sx={{
            width: { xs: 200, md: 400 },
          }}
        >
          {/* Logo Container */}
          <Box
            sx={{
              width: "100%",
              aspectRatio: "2 / 1",
              position: "relative",
            }}
          >
            <Image
              src="/assets/logos/base/image.png"
              alt="CONSTRIX Logo"
              fill
              priority
              style={{
                objectFit: "contain",
              }}
            />
          </Box>

          {/* More Button */}
          <Button
            variant="contained"
            fullWidth
            endIcon={<ArrowIcon size={24} />}
            onClick={() => router.push("/about")}
            sx={{
              py: { xs: 0.75, md: 1 },
              fontSize: { xs: 14, sm: 15, md: 16 },
              fontWeight: 600,
            }}
          >
            {t("more")}
          </Button>
        </Stack>
      </PageSection>
    </Box>
  );
}
