"use client";

import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import { useTranslations } from "next-intl";

interface AdBannerProps {
  title?: string;
  description?: string;
  buttonText?: string;
  image?: string;
  onButtonClick?: () => void;
}

function AdBanner({
  title,
  description,
  buttonText,
  image,
  onButtonClick,
}: AdBannerProps) {
  const t = useTranslations("newsV2");
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        position: "relative",
        overflow: "hidden",
        background: image
          ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: 300,
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <Stack spacing={2} zIndex={1}>
        <Typography variant="h5" fontWeight={700} color="white">
          {title || t("advertisement")}
        </Typography>
        <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
          {description || t("adDescription")}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={onButtonClick}
            sx={{
              borderRadius: 1.5,
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {buttonText || t("adButton")}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default AdBanner;
