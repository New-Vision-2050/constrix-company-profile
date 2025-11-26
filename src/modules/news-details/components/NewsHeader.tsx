import LayoutStack from "@/layouts/main/layout-stack";
import { Box, Stack, Typography } from "@mui/material";

interface NewsHeaderProps {
  publishDate: string;
  updateDate: string;
  category: string;
}

const NewsHeaderInfoItem = ({ label, value }: { label: string, value: string }) => (
  <LayoutStack direction="row" spacing={1} omitPadding={true}>
    <Typography variant="body1" fontWeight={500}>
      {label}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {value}
    </Typography>
  </LayoutStack>
);

/**
 * Displays news metadata including publish date, update date, and category
 * Server component - no client-side interactivity needed
 */
export default function NewsHeader({
  publishDate,
  updateDate,
  category,
}: NewsHeaderProps) {
  return (
    <LayoutStack alignItems={'start'} spacing={1} omitPadding={true}>
      {/* Dates section */}
      <LayoutStack direction="row" spacing={1} omitPadding={true}>
        <NewsHeaderInfoItem
          label="تاريخ النشر:"
          value={publishDate}
        />
        <NewsHeaderInfoItem
          label="تاريخ الإنتهاء:"
          value={updateDate}
        />
      </LayoutStack>

      {/* Category section */}
      <NewsHeaderInfoItem
        label="الفئة:"
        value={category}
      />
    </LayoutStack>
  );
}


