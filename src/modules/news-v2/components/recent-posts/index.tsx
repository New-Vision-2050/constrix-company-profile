"use client";

import { Box, Paper, Stack, Typography } from "@mui/material";
import { Calendar, Clock } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

interface RecentPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
}

interface RecentPostsProps {
  posts: RecentPost[];
}

function RecentPosts({ posts }: RecentPostsProps) {
  const t = useTranslations("newsV2");
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        {t("recentPosts")}
      </Typography>
      <Stack spacing={2.5}>
        {posts.map((post) => (
          <Stack
            key={post.id}
            direction="row"
            spacing={2}
            sx={{
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "translateX(4px)",
              },
            }}
          >
            <Box
              component="img"
              src={post.image}
              alt={post.title}
              sx={{
                width: 80,
                height: 80,
                borderRadius: 2,
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <Stack spacing={1} flex={1}>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {post.title}
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Calendar size={14} variant="Bold" />
                  <Typography variant="caption" color="text.secondary">
                    {post.date}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Clock size={14} variant="Bold" />
                  <Typography variant="caption" color="text.secondary">
                    {post.readTime}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

export default RecentPosts;
