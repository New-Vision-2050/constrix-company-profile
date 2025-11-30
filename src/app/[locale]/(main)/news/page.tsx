import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import NewsPageView from "@/modules/news";
import { useTranslations } from "next-intl";

export default function NewsPage() {
  const t = useTranslations("pages.news");

  return (
    <MainPageContent title={t("title")}>
      <LayoutStack>
        <PageSection>
          <NewsPageView />
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}