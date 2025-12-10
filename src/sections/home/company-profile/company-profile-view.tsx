"use client";

import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import PageSection from "@/layouts/main/page-section";
import { DocumentDownload } from "iconsax-reactjs";

interface CompanyProfileViewProps {
  data?: string;
}

export default function CompanyProfileView({ data }: CompanyProfileViewProps) {
  const t = useTranslations("home");
  return (
    <Box
      sx={{
        background: "#8B1F7A",
        py: { xs: 4, md: 8 },
      }}
    >
      <PageSection>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 6 }}
          sx={{
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
          }}
        >
          {/* Company Profile Text - Right Side */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              textAlign: { xs: "center", md: "right" },
              fontSize: { xs: 18, md: 24 },
              color: "white",
            }}
          >
            {t("companyProfileFile")}
          </Typography>
          {/* Download Button - Left Side */}
          <Box>
            <Button
              variant="contained"
              endIcon={<DocumentDownload size={24} />}
              onClick={() => window.open(data, "_blank")}
              fullWidth={true}
              sx={{
                px: { xs: 3, md: 6 },
                py: { xs: 1.25, md: 2 },
                fontSize: { xs: 14, md: 18 },
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              {t("downloadCompanyFile")}
            </Button>
          </Box>
        </Stack>
      </PageSection>
    </Box>
  );
}
