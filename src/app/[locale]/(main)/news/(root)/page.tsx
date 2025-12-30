import NewsV2MainView from "@/modules/news-v2/views/main-view";
import { CategoriesApi } from "@/services/api/categories";

async function NewsV2Page() {
  const categories = await CategoriesApi.newsCategories();
  const categoriesData = categories.data.payload;

  return <NewsV2MainView categories={categoriesData} />;
}

export default NewsV2Page;
