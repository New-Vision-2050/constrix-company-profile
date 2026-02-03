"use client";

import React from "react";
import { Box, Typography, Card, Stack, Link } from "@mui/material";
import { useTranslations } from "next-intl";
import PageSection from "@/layouts/main/page-section";
import { BE_FeaturedProject } from "@/types/api/base/project";
import { RouterLink } from "@/routes/components";
import Image from "next/image";

interface ProjectsView2Props {
  data?: BE_FeaturedProject[];
}

export default function ProjectsView2({ data }: ProjectsView2Props) {
  const t = useTranslations("home");
  const projects = data || [];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
      }}
    >
      <PageSection>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: 700,
          }}
        >
          {t("projectsTitle")}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(12, 1fr)",
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          {projects.map((project, index) => {
            const isLarge = index % 5 === 0;
            
            return (
              <Card
                key={project.id}
                sx={{
                  gridColumn: {
                    xs: "span 1",
                    md: isLarge ? "span 8" : "span 4",
                  },
                  height: isLarge ? { xs: 400, md: 500 } : { xs: 350, md: 400 },
                  borderRadius: 3,
                  overflow: "hidden",
                  position: "relative",
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                    "& .project-overlay": {
                      background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)",
                    },
                  },
                }}
              >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image
                      src={project.main_image}
                      alt={project.name}
                      fill
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  <Box
                    className="project-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)",
                      transition: "all 0.4s ease",
                    }}
                  />

                  <Stack
                    spacing={1.5}
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: { xs: 3, md: 4 },
                      color: "#fff",
                      zIndex: 2,
                    }}
                  >
                    <Typography
                      variant={isLarge ? "h4" : "h5"}
                      fontWeight={700}
                      sx={{ 
                        mb: 0.5,
                        textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      {project.name}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.95,
                        display: "-webkit-box",
                        WebkitLineClamp: isLarge ? 3 : 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.description}
                    </Typography>

                    <Link
                      component={RouterLink}
                      href={`/projects/${project.id}`}
                      sx={{
                        color: "primary.light",
                        fontWeight: 600,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 1,
                        "&:hover": {
                          color: "primary.lighter",
                        },
                      }}
                    >
                      {t("showMore")} →
                    </Link>
                  </Stack>
                </Card>
            );
          })}
        </Box>
      </PageSection>
    </Box>
  );
}
