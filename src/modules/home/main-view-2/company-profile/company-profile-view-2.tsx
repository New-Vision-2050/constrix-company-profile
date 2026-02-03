"use client";

import React from "react";
import { Box, Button, Typography, Stack, Container, useTheme, alpha } from "@mui/material";
import { useTranslations } from "next-intl";
import { DocumentDownload } from "iconsax-reactjs";

interface CompanyProfileView2Props {
  data?: string;
}

export default function CompanyProfileView2({ data }: CompanyProfileView2Props) {
  const t = useTranslations("home");
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.palette.common.white} 1px, transparent 1px), radial-gradient(circle at 80% 80%, ${theme.palette.common.white} 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          spacing={4}
          sx={{
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: alpha(theme.palette.common.white, 0.2),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <DocumentDownload size={40} color={theme.palette.common.white} />
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.common.white,
              fontSize: { xs: 24, sm: 32, md: 40 },
            }}
          >
            {t("companyProfileFile")}
          </Typography>

          <Button
            variant="contained"
            endIcon={<DocumentDownload size={24} />}
            onClick={() => window.open(data, "_blank")}
            sx={{
              mt: 2,
              px: 6,
              py: 2,
              fontSize: { xs: 16, md: 18 },
              fontWeight: 600,
              borderRadius: 3,
              background: theme.palette.common.white,
              color: theme.palette.primary.main,
              boxShadow: theme.shadows[8],
              "&:hover": {
                background: theme.palette.grey[50],
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[12],
              },
              transition: "all 0.3s ease",
            }}
          >
            {t("downloadCompanyFile")}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
