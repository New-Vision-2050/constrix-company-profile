"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import { Iconify } from "@/components/iconify";
import CategoryCard from "../category-card";
import { AboutPageProjectType } from "@/types/api/base/about-page";
import { useTranslations } from "next-intl";
import BaseOnViewDiv from "@/components/motion/on-view";

const categories = [
  { id: 1, title: "Technology", students: 497 },
  { id: 2, title: "Health and Wellness", students: 763 },
  { id: 3, title: "Travel", students: 684 },
  { id: 4, title: "Finance", students: 451 },
  { id: 5, title: "Education", students: 433 },
  { id: 6, title: "Food and Beverage", students: 463 },
  { id: 7, title: "Fashion", students: 951 },
  { id: 8, title: "Home and Garden", students: 194 },
  { id: 9, title: "Sports", students: 425 },
];

type Props = {
  projects: AboutPageProjectType[];
};

function FeaturedCategories({ projects }: Props) {
  const t = useTranslations("about");
  return (
    <Box component={BaseOnViewDiv}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            {projects
              ?.reduce((acc, project) => acc + project.count, 0)
              .toLocaleString()}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
            }}
          >
            {t("totalProjects")}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }} container spacing={3}>
          {projects.map((project) => (
            <Grid
              key={`${project.id}-${project.title}`}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <CategoryCard title={project.title} projects={project.count} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default FeaturedCategories;
