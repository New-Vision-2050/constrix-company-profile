import PageSection from "@/layouts/main/page-section";
import NewsCardsList from "./components/NewsCardsList";
import LayoutStack from "@/layouts/main/layout-stack";

export default function NewsModule() {
    return (
        <LayoutStack>
            <PageSection>
                <NewsCardsList />
            </PageSection>
        </LayoutStack>
    );
}