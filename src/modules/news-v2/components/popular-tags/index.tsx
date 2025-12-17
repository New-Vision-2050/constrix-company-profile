"use client";

import { Chip, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface PopularTagsProps {
  tags: string[];
}

function PopularTags({ tags }: PopularTagsProps) {
  const t = useTranslations("newsV2");
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        {t("popularTags")}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            clickable
            sx={{
              borderRadius: 1.5,
              fontWeight: 500,
              "&:hover": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
              },
            }}
          />
        ))}
      </Stack>
    </Paper>
  );
}

export default PopularTags;
