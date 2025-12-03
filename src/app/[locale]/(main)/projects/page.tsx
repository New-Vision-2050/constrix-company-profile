import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";
import ServicesView from "@/modules/services";
import { useTranslations } from "next-intl";

function ServicesPage() {
  const t = useTranslations("pages.services");
  return (
    <MainPageContent title={t("title")}>
      <LayoutStack>
        <PageSection>
          <ServicesView />
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}

export default ServicesPage;
