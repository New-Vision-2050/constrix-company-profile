import MainPageContent from "@/layouts/main/page-content";
import AboutView from "@/modules/about";
import AboutMainView from "@/modules/about/views/main-view";
import { AboutPageApi } from "@/services/api/about-page";

async function AboutPage() {
  const aboutPageData = await AboutPageApi.getData();
  const payload = aboutPageData.data.payload;

  return <AboutMainView data={payload} />;
}

export default AboutPage;
