"use client";

import React from "react";
import { Box, Typography, Card, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import PageSection from "@/layouts/main/page-section";
import { BE_Founder } from "@/types/api/base/home-page";
import Image from "next/image";
import { sliceText } from "@/utils/text-slicer";
import DialogTrigger from "@/components/headless/dialog-trigger";
import FounderDialog from "./founder-dialog";

interface AboutUsView2Props {
  data?: BE_Founder[];
}

export default function AboutUsView2({ data }: AboutUsView2Props) {
  const t = useTranslations("home");
  const founders = data || [];

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
        {t("aboutUsTitle")}
      </Typography>

      <Stack spacing={{ xs: 3, md: 4 }} sx={{ mt: { xs: 4, md: 6 } }}>
        {founders.map((founder, index) => {
          const isEven = index % 2 === 0;
          const descriptionSliced = sliceText(founder.description, 200);

          return (
            <DialogTrigger
              key={founder.id}
              component={FounderDialog}
              dialogProps={{ founder }}
              render={({ onOpen }) => (
                <Card
                  onClick={onOpen}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 48px rgba(0,0,0,0.15)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "2fr 3fr" },
                    }}
                  >
                    <Box
                      sx={{
                        order: { xs: 1, md: isEven ? 1 : 2 },
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: { xs: 300, sm: 350, md: 400 },
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={founder.personal_photo}
                          alt={founder.name}
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
                            background:
                              "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)",
                          }}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        order: { xs: 2, md: isEven ? 2 : 1 },
                      }}
                    >
                      <Stack
                        spacing={2}
                        sx={{
                          p: { xs: 3, md: 4 },
                          height: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: "primary.main",
                              mb: 0.5,
                              fontSize: { xs: "1.25rem", md: "1.5rem" },
                            }}
                          >
                            {founder.name}
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              color: "primary.dark",
                              opacity: 0.8,
                              fontSize: { xs: "0.95rem", md: "1rem" },
                            }}
                          >
                            {founder.job_title}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            width: 50,
                            height: 3,
                            background:
                              "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: 2,
                          }}
                        />

                        <Typography
                          variant="body2"
                          sx={{
                            lineHeight: 1.7,
                            color: "text.secondary",
                            fontSize: { xs: 14, md: 15 },
                          }}
                        >
                          {descriptionSliced.showText}
                        </Typography>

                        {descriptionSliced.isSliced && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: "primary.main",
                              fontWeight: 600,
                              mt: 1,
                              display: "block",
                            }}
                          >
                            {t("clickToReadMore")}
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  </Box>
                </Card>
              )}
            />
          );
        })}
      </Stack>
    </PageSection>
  );
}
