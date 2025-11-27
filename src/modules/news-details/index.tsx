import PageSection from "@/layouts/main/page-section";
import NewsHeader from "./components/NewsHeader";
import NewsTitle from "./components/NewsTitle";
import NewsImage from "./components/NewsImage";
import NewsContent from "./components/NewsContent";
import { NewsDetail } from "./types/news-details";
import { Stack } from "@mui/material";

interface NewsDetailsModuleProps {
  newsData: NewsDetail;
}

/**
 * Main news details module
 * Composes all news detail components
 * Server component by default for better performance
 */
export default function NewsDetailsView({ newsData }: NewsDetailsModuleProps) {
  return (
    <Stack spacing={2}>
      <PageSection>
        <Stack spacing={2}>
          <NewsTitle title={newsData.title} />
          <NewsHeader
            publishDate={newsData.publishDate}
            updateDate={newsData.updateDate}
            category={newsData.category}
          />
        </Stack>
      </PageSection>
      <PageSection>
        <NewsImage src={newsData.imageUrl} alt={newsData.imageAlt} />
      </PageSection>
      <PageSection>
        <NewsContent content={newsData.content} />
      </PageSection>
    </Stack>
  );
}