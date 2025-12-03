import MainPageContent from "@/layouts/main/page-content";
import AboutView from "@/modules/about";
import AboutMainView from "@/modules/about/views/main-view";
import { useTranslations } from "next-intl";

export default function AboutPage() {
    const t = useTranslations("pages.about");
    return (
        <MainPageContent title={t("title")} description={t("description")}>
            <AboutView />
            <AboutMainView />
        </MainPageContent>
    );
}
