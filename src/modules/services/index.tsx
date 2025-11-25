import ServicesSearchBar from "./search-bar";
import ServicesList from "./services-list";
import { Container, Stack } from "@mui/material";

export default function ServicesModule() {
  return (
    <Container maxWidth="xl">
      <Stack padding={4} spacing={4}>
        <ServicesSearchBar />
        <ServicesList />
      </Stack>
    </Container>
  );
}
