import { HomePageApi } from "@/services/api/home-page";
import HomePageView2 from "@/modules/home/main-view-2";

async function HomePage() {
  const homePageData = await HomePageApi.getData();
  const payload = homePageData.data.payload;

  return (
    <HomePageView2 data={payload} />
  );
}

export default HomePage;
