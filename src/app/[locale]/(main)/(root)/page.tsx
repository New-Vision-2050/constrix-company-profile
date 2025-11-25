import LayoutStack from "@/layouts/main/layout-stack";
import MainPageContent from "@/layouts/main/page-content";
import PageSection from "@/layouts/main/page-section";

function HomePage() {
  return (
    <MainPageContent title="Home Page">
      <LayoutStack>
        <PageSection>Test</PageSection>
        <PageSection>Test</PageSection>
        <PageSection>Test</PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}

export default HomePage;
