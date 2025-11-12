import ServicesSearchBar from "./search-bar";
import ServicesList from "./services-list";
import { Stack } from "@mui/material";

export default function ServicesModule() {
  return (
    <Stack padding={4} spacing={4}>
      <ServicesSearchBar />
      <ServicesList />
    </Stack>
  );
}
