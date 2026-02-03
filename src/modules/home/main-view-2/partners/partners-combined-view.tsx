"use client";

import React from "react";
import { Box, Typography, useTheme, Container } from "@mui/material";
import { useTranslations } from "next-intl";
import { BE_WebsiteIcon } from "@/types/api/base/icon";
import Image from "next/image";

interface PartnersCombinedViewProps {
  partners?: Pick<BE_WebsiteIcon, "icon" | "id" | "name">[];
  certificates?: Pick<BE_WebsiteIcon, "icon" | "id" | "name">[];
  approvals?: Pick<BE_WebsiteIcon, "icon" | "id" | "name">[];
}

export default function PartnersCombinedView({
  partners = [],
  certificates = [],
  approvals = [],
}: PartnersCombinedViewProps) {
  const t = useTranslations("home");
  const theme = useTheme();

  const sections = [
    { data: partners, titleKey: "partners" as const, id: "partners" },
    { data: certificates, titleKey: "certificates" as const, id: "certificates" },
    { data: approvals, titleKey: "approvals" as const, id: "approvals" },
  ].filter((section) => section.data.length > 0);

  if (sections.length === 0) return null;

  return (
    <Box>
      {sections.map((section, index) => {
        const isReversed = index % 2 !== 0;

        return (
          <Box
            key={section.id}
            sx={{
              py: { xs: 8, md: 12 },
              background:
                index % 2 === 0
                  ? theme.palette.background.default
                  : theme.palette.background.paper,
            }}
          >
            <Container maxWidth="lg">
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: { xs: 6, md: 8 },
                  alignItems: "center",
                }}
              >
                {/* Text Section */}
                <Box
                  sx={{
                    order: { xs: 1, md: isReversed ? 2 : 1 },
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      letterSpacing: 1.5,
                      mb: 2,
                      display: "block",
                    }}
                  >
                    {section.titleKey.toUpperCase()}
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {t(section.titleKey)}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.text.secondary,
                      lineHeight: 1.8,
                      maxWidth: 500,
                    }}
                  >
                    {section.titleKey === "partners" && t("partnersDescription")}
                    {section.titleKey === "certificates" && t("certificatesDescription")}
                    {section.titleKey === "approvals" && t("approvalsDescription")}
                  </Typography>
                </Box>

                {/* Icons Grid Section */}
                <Box
                  sx={{
                    order: { xs: 2, md: isReversed ? 1 : 2 },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(3, 1fr)",
                      },
                      gap: { xs: 2, md: 3 },
                    }}
                  >
                    {section.data.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          background: theme.palette.background.paper,
                          borderRadius: 2,
                          p: 3,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: `1px solid ${theme.palette.divider}`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: theme.shadows[4],
                            borderColor: theme.palette.primary.main,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: 80,
                          }}
                        >
                          <Image
                            src={item.icon}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                            style={{
                              objectFit: "contain",
                              filter: "grayscale(80%)",
                              transition: "filter 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.filter = "grayscale(0%)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.filter = "grayscale(80%)";
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        );
      })}
    </Box>
  );
}
