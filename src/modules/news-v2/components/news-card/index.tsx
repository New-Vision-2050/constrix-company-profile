"use client";

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
import { Calendar, Clock } from "iconsax-reactjs";

interface NewsCardProps {
  image: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  category?: string;
}

function NewsCard({
  image,
  date,
  readTime,
  title,
  excerpt,
  author,
  category,
}: NewsCardProps) {
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
    >
      <CardMedia
        component="img"
        height="240"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Calendar size={16} variant="Bold" />
            <Typography variant="caption" color="text.secondary">
              {date}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <Clock size={16} variant="Bold" />
            <Typography variant="caption" color="text.secondary">
              {readTime}
            </Typography>
          </Stack>
        </Stack>

        {category && (
          <Box>
            <Chip
              label={category}
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
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          {excerpt}
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
