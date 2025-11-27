import { Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface NewsHeaderProps {
  publishDate: string;
  updateDate: string;
  category: string;
}

const NewsHeaderInfoItem = ({ label, value }: { label: string, value: string }) => (
  <Stack direction="row" spacing={1}>
    <Typography variant="body1" fontWeight={500}>
      {label} :
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {value}
    </Typography>
  </Stack>
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
  const t = useTranslations("pages.newsDetails");
  return (
    <Stack alignItems={'start'} spacing={1}>
      {/* Dates section */}
      <Stack direction="row" spacing={1}>
        <NewsHeaderInfoItem
          label={t("publishDate")}
          value={publishDate}
        />
        <NewsHeaderInfoItem
          label={t("updateDate")}
          value={updateDate}
        />
      </Stack>

      {/* Category section */}
      <NewsHeaderInfoItem
        label={t("category")}
        value={category}
      />
    </Stack>
  );
}


