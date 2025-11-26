import MainPageContent from "@/layouts/main/page-content";
import NewsDetailsModule from "@/modules/news-details";
import { getNewsData } from "./getNewsData";

/**
 * News detail page - Server component
 * Fetches data on server for better SEO and performance
 */
export default async function NewsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const newsData = await getNewsData(params.id);

  return (
    <MainPageContent title={newsData.title}>
      <NewsDetailsModule newsData={newsData} />
    </MainPageContent>
  );
}