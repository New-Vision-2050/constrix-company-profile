"use client";

import React from "react";
import { Box, Button, Stack } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PageSection from "@/layouts/main/page-section";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
export default function HeroView() {
  const t = useTranslations("home");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "70vh", md: "100vh" },
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgba(168, 85, 247, 0.8) 0%, rgba(20, 184, 166, 0.8) 50%, rgba(168, 85, 247, 0.7) 100%)",
      }}
    >
      <PageSection>
        {/* Logo and Button Container */}
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

          {/* More Button - Same Width as Image */}
          <Button
            variant="contained"
            fullWidth
            endIcon={<ArrowCircleLeftOutlinedIcon />}
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
