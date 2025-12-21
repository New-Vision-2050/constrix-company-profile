import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import TermsAndConditionsView from "@/modules/terms";
import { useTranslations } from "next-intl";


function TermsAndConditionsPage() {
    // translations
    const t = useTranslations("pages.terms");
    return (
        <MainPageContent title={t('title')}>
            <LayoutStack>
                <TermsAndConditionsView />
            </LayoutStack>
        </MainPageContent>
    );
}

export default TermsAndConditionsPage;
