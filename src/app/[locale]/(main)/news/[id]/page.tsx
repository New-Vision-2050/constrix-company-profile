import MainPageContent from "@/layouts/main/page-content";
import NewsDetailsView from "@/modules/news-details";
import { getNewsData } from "./getNewsData";
import LayoutStack from "@/layouts/main/layout-stack";

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
  const newsData = await getNewsData(id);

  return (
    <MainPageContent title={newsData.title}>
      <LayoutStack>
          <NewsDetailsView newsData={newsData} />
      </LayoutStack>
    </MainPageContent>
  );
}