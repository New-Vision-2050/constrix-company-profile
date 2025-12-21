"use client";

import { BE_NewsItem } from "@/types/api/base/news";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Calendar } from "iconsax-reactjs";
import Link from "next/link";

interface NewsCardProps {
  newsItem: BE_NewsItem;
}

function NewsCard({ newsItem }: NewsCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
      component={Link}
      href={`/news/${newsItem.id}`}
    >
      <CardMedia
        component="img"
        height="240"
        image={newsItem.thumbnail}
        alt={newsItem.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Calendar size={16} variant="Bold" />
            <Typography variant="caption" color="text.secondary">
              {newsItem.publish_date}
            </Typography>
          </Stack>
        </Stack>

        {newsItem.category && (
          <Box>
            <Chip
              label={newsItem.category.name}
              size="small"
              sx={{
                bgcolor: "primary.lighter",
                color: "primary.main",
                fontWeight: 600,
              }}
            />
          </Box>
        )}

        <Typography variant="h6" component="h3" fontWeight={600}>
          {newsItem.title}
        </Typography>

        {/* <Stack direction="row" spacing={1.5} alignItems="center" mt="auto">
          <Avatar
            src={author.avatar}
            alt={author.name}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body2" fontWeight={500}>
            {author.name}
          </Typography>
        </Stack> */}
      </CardContent>
    </Card>
  );
}

export default NewsCard;
