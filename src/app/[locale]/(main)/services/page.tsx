import MainPageContent from "@/layouts/main/page-content";
import ServicesModule from "@/modules/services";
import { useTranslations } from "next-intl";

function ServicesPage() {
  const t = useTranslations("pages.services");
  return (
    <MainPageContent title={t("title")}>
        <ServicesModule />
    </MainPageContent>
  );
}

export default ServicesPage;
