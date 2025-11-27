import MainPageContent from "@/layouts/main/page-content";
import ServicesView from "@/modules/services";
import { useTranslations } from "next-intl";

function ServicesPage() {
  const t = useTranslations("pages.services");
  return (
    <MainPageContent title={t("title")}>
        <ServicesView />
    </MainPageContent>
  );
}

export default ServicesPage;
