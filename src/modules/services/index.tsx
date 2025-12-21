import MainPageContent from "@/layouts/main/page-content";
import ServicesSearchBar from "./search-bar";
import ServicesList from "./services-list";
import { Stack } from "@mui/material";
import LayoutStack from "@/layouts/main/layout-stack";
import PageSection from "@/layouts/main/page-section";
import RhomusCards from "./services-viewers/rhomus-cards";

export default function ServicesView() {
  return (
    <MainPageContent title="Services">
      <LayoutStack>
        <PageSection>
          <Stack gap={4}>
            <ServicesSearchBar />
            <ServicesList />
          </Stack>
        </PageSection>
        <PageSection>
          <RhomusCards />
        </PageSection>
      </LayoutStack>
    </MainPageContent>
  );
}
