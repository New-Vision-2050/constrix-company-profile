import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import TermsAndConditionsView from "@/modules/terms";
import { TermsApi } from "@/services/api/terms";
import { getTranslations } from "next-intl/server";


async function TermsAndConditionsPage() {
    // translations
    const t = await getTranslations("pages.terms");
    // get terms and conditions data
    const termsResponse = await TermsApi.getTerms();
    const termsData = termsResponse.data.payload;

    return (
        <MainPageContent title={t('title')}>
            <LayoutStack>
                <TermsAndConditionsView termsData={termsData} />
            </LayoutStack>
        </MainPageContent>
    );
}

export default TermsAndConditionsPage;
