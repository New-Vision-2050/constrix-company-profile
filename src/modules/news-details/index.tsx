import LayoutStack from "@/layouts/main/layout-stack";
import PageSection from "@/layouts/main/page-section";
import NewsHeader from "./components/NewsHeader";
import NewsTitle from "./components/NewsTitle";
import NewsImage from "./components/NewsImage";
import NewsContent from "./components/NewsContent";
import { NewsDetail } from "./types/news-details";

interface NewsDetailsModuleProps {
  newsData: NewsDetail;
}

/**
 * Main news details module
 * Composes all news detail components
 * Server component by default for better performance
 */
export default function NewsDetailsModule({ newsData }: NewsDetailsModuleProps) {
  return (
    <PageSection>
      <LayoutStack alignItems={'start'}>
        <NewsTitle title={newsData.title} />
        <NewsHeader
          publishDate={newsData.publishDate}
          updateDate={newsData.updateDate}
          category={newsData.category}
        />
        <NewsImage src={newsData.imageUrl} alt={newsData.imageAlt} />
        <NewsContent content={newsData.content} />
      </LayoutStack>
    </PageSection>
  );
}