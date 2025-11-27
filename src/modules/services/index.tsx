import PageSection from "@/layouts/main/page-section";
import ServicesSearchBar from "./search-bar";
import ServicesList from "./services-list";
import { Container, Stack } from "@mui/material";
import LayoutStack from "@/layouts/main/layout-stack";

export default function ServicesView() {
  return (
    <PageSection>
      <LayoutStack>
        <ServicesSearchBar />
        <ServicesList />
      </LayoutStack>
    </PageSection>
  );
}
