'use client';
import LayoutStack from "@/layouts/main/layout-stack";
import PageSection from "@/layouts/main/page-section";
import { Box, Typography, alpha } from "@mui/material";
import UsersList from "./users-list";
import PerformanceCard from "./performance-card";
import { useTranslations } from "next-intl";

/**
 * Who We Are section component
 * Displays company description and statistics
 */
export default function WhoWeAre() {
  // Translations
  const t = useTranslations('pages.about.whoWeAre');
  return (
    <Box
      sx={({ palette }) => ({
        bgcolor: alpha(palette.primary.main, 0.1),
        width: "100%",
        py: 8,
      })}
    >
      <PageSection>
        <LayoutStack spacing={4}>
          {/* Section title */}
          <Typography variant="h3" textAlign="center" fontWeight={600}>
            {t('title')}
          </Typography>

          {/* Description text */}
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: "auto", lineHeight: 2 }}
          >
            {t('description')}
          </Typography>

          {/* Statistics cards */}
          <Box position="relative" display="flex" flexDirection="row" gap={0} justifyContent="center" justifyItems="center">
            <PerformanceCard />
            <UsersList />
          </Box>

        </LayoutStack>
      </PageSection>
    </Box>
  );
}

