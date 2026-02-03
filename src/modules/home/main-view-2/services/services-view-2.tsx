"use client";

import React from "react";
import { Box, Typography, Card, CardContent, Link } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import PageSection from "@/layouts/main/page-section";
import { BE_WebsiteService } from "@/types/api/base/services";
import { RouterLink } from "@/routes/components";

export default function ServicesView2({ data }: { data: BE_WebsiteService[] }) {
  const t = useTranslations("home");
  const services = data || [];

  return (
    <PageSection sx={{ py: { xs: 8, md: 12 } }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mb: 2,
          fontWeight: 700,
        }}
      >
        {t("servicesTitle")}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 3, md: 4 },
        }}
      >
        {services.map((service) => (
          <Card
            key={service.id}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "66.67%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={service.main_image}
                  alt={service.name}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)",
                  }}
                />
              </Box>

              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link
                  component={RouterLink}
                  href={`/services/${service.id}`}
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    textDecoration: "none",
                    color: "text.primary",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {service.name}
                </Link>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.7,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </Box>
    </PageSection>
  );
}
