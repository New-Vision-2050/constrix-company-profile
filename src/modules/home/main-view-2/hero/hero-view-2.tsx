"use client";

import React from "react";
import { Box, Typography, Stack, Button, Container } from "@mui/material";
import { useTranslations, useLocale } from "next-intl";
import { ArrowCircleLeft, ArrowCircleRight } from "iconsax-reactjs";
import { BE_HomePageSetting } from "@/types/api/base/home-page";
import { useRouter } from "next/navigation";
import { useBE_Theme } from "@/lib/theme/client/theme-provider";
import Image from "next/image";

interface HeroView2Props {
  data?: BE_HomePageSetting;
}

export default function HeroView2({ data }: HeroView2Props) {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const ArrowIcon = isRTL ? ArrowCircleLeft : ArrowCircleRight;
  const router = useRouter();
  const { data: themeData } = useBE_Theme();
  const videoSrc = data?.web_video_link
    ? data?.web_video_link
    : data?.web_video_file;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {videoSrc && (
        <>
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
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 1,
            }}
          />
        </>
      )}

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <Stack
          spacing={4}
          sx={{
            alignItems: "center",
            py: 8,
          }}
        >
          <Box
            sx={{
              width: { xs: 250, sm: 350, md: 450 },
              aspectRatio: "2 / 1",
              position: "relative",
              mb: 2,
            }}
          >
            <Image
              src={themeData?.icon_url}
              alt="Company Logo"
              fill
              priority
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
              }}
            />
          </Box>

          {data?.description && (
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: 500,
                maxWidth: 800,
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                fontSize: { xs: 18, sm: 22, md: 28 },
                lineHeight: 1.6,
              }}
            >
              {data.description}
            </Typography>
          )}

          <Button
            variant="contained"
            endIcon={<ArrowIcon size={24} />}
            onClick={() => router.push("/about")}
            size="large"
            sx={{
              mt: 4,
              px: 6,
              py: 2,
              fontSize: { xs: 16, sm: 18, md: 20 },
              fontWeight: 600,
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {t("more")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
