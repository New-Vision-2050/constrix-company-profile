import LayoutStack from "@/layouts/main/layout-stack";
import { Box, Stack, Typography } from "@mui/material";

interface NewsContentProps {
  content: string;
}

/**
 * Displays the main news content
 * Handles text formatting and RTL layout
 */
export default function NewsContent({ content }: NewsContentProps) {
  return (
    <LayoutStack alignItems={'start'} spacing={2}>
      {/* Section title */}
      <Typography
        variant="h5"
        component="h3"
        fontWeight={600}
      >
        محتوي الخبر
      </Typography>

      {/* Content text */}
      <Typography
        variant="body1"
        sx={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {content}
      </Typography>
    </LayoutStack>
  );
}


