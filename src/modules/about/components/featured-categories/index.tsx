"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import { Iconify } from "@/components/iconify";
import CategoryCard from "../category-card";

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

function FeaturedCategories() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "flex-end" },
          gap: 3,
          mb: 5,
        }}
      >
        <Box sx={{ maxWidth: 480 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Featured category
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              lineHeight: 1.8,
            }}
          >
            Since wire-frame renderings are relatively simple and fast to
            calculate, they are often used in cases
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
          sx={{
            bgcolor: "grey.900",
            color: "common.white",
            px: 3,
            py: 1.5,
            borderRadius: 1,
            "&:hover": {
              bgcolor: "grey.800",
            },
          }}
        >
          Explore more
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <CategoryCard title={category.title} projects={category.students} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FeaturedCategories;
