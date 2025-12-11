import PageSection from "@/layouts/main/page-section";
import NewsHeader from "./components/NewsHeader";
import NewsTitle from "./components/NewsTitle";
import NewsImage from "./components/NewsImage";
import NewsContent from "./components/NewsContent";
import { Stack } from "@mui/material";
import { BE_NewsItem } from "@/types/api/base/news";

interface NewsDetailsModuleProps {
  newsData: BE_NewsItem;
}

/**
 * Main news details module
 * Composes all news detail components
 * Server component by default for better performance
 */
export default function NewsDetailsView({ newsData }: NewsDetailsModuleProps) {
  
  return (
    <>
      <PageSection>
        <Stack spacing={2}>
          <NewsTitle title={newsData.title} />
          <NewsHeader
            publishDate={newsData.publish_date}
            updateDate={newsData.updated_at}
            category={newsData.category?.name || ""}
          />
        </Stack>
      </PageSection>
      <PageSection>
        <NewsImage src={newsData.main_image || ""} alt={newsData.title || ""} />
      </PageSection>
      <PageSection>
        <NewsContent content={newsData.content} />
      </PageSection>
    </>
  );
}