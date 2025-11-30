import { Stack } from "@mui/material";
import ServicesSearchField from "./SearchField";
import ServicesCatBtnList from "./ServicesCatBtnList";

export default function ServicesSearchBar() {
  return (
    <Stack gap={2}>
      <ServicesSearchField />
      <ServicesCatBtnList />
    </Stack>
  );
}
