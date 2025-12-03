import MainPageContent from "@/layouts/main/page-content";
import AboutView from "@/modules/about";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("pages.about");
    return (
        <MainPageContent title={t("title")} description={t("description")}>
            <AboutView />
        </MainPageContent>
    );
}
