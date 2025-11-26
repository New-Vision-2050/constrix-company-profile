import LayoutStack from "@/layouts/main/layout-stack";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface NewsContentProps {
  content: string;
}

/**
 * Displays the main news content
 * Handles text formatting and RTL layout
 */
export default function NewsContent({ content }: NewsContentProps) {
  const t = useTranslations("pages.newsDetails");
  return (
    <LayoutStack alignItems={'start'} spacing={2}>
      {/* Section title */}
      <Typography
        variant="h5"
        component="h3"
        fontWeight={600}
      >
        {t("content")}
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


