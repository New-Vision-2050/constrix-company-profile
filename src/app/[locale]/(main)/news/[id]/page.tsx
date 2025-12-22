import MainPageContent from "@/layouts/main/page-content";
import NewsDetailsView from "@/modules/news-details";
import LayoutStack from "@/layouts/main/layout-stack";
import { NewsApi } from "@/services/api/news";

// enable dynamic params 
export const dynamicParams = true;


/**
 * News detail page - Server component
 * Fetches data on server for better SEO and performance
 */
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
  const newsData = await NewsApi.show(id);
  const newsItem = newsData.data.payload;

  return (
    <MainPageContent title={newsItem.title}>
      <LayoutStack>
          <NewsDetailsView newsData={newsItem} />
      </LayoutStack>
    </MainPageContent>
  );
}