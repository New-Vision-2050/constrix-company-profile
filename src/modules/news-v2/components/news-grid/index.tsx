import { Grid } from "@mui/material";
import NewsCard from "../news-card";
import { BE_NewsItem } from "@/types/api/base/news";
import { GridCardsSkeleton } from "@/components/ui/interactions";
import { ErrorState, NoDataState } from "@/components/shared/states";
import { useTranslations } from "next-intl";

type PropsT = {
  news: BE_NewsItem[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
};

export default function NewsGrid({
  news,
  isLoading,
  isError,
  onRetry,
}: PropsT) {
  const t = useTranslations("newsV2");

  if (isLoading)
    return <GridCardsSkeleton items={8} size={{ xs: 12, sm: 6 }} />;

  if (isError)
    return (
      <ErrorState
        title={t("error.title")}
        subtitle={t("error.subtitle")}
        onRetry={onRetry}
      />
    );

  if (!isLoading && !isError && (!news || news.length === 0))
    return (
      <NoDataState
        title={t("noNewsFound")}
        subtitle={t("noNewsFoundDescription")}
      />
    );

  return (
    <Grid container spacing={3}>
      {news?.map((newsItem) => (
        <Grid key={newsItem.id} size={{ xs: 12, sm: 6 }}>
          <NewsCard newsItem={newsItem} />
        </Grid>
      ))}
    </Grid>
  );
}
