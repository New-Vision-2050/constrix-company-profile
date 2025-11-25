import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import { useTranslations } from "next-intl";

export default function NewsPage() {
  const t = useTranslations("pages.news");
  
  return (
    <MainPageContent title={t("title")}>
      <PageSection>
        News Module
      </PageSection>
    </MainPageContent>
  );
}