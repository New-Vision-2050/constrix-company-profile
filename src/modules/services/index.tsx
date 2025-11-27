import ServicesSearchBar from "./search-bar";
import ServicesList from "./services-list";
import {  Stack } from "@mui/material";

export default function ServicesView() {
  return (
    <Stack gap={4}>
        <ServicesSearchBar />
        <ServicesList />
    </Stack>
  );
}
