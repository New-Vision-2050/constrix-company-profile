import { Stack } from "@mui/material";
import ServicesSearchField from "./SearchField";
import ServicesCatBtnList from "./ServicesCatBtnList";
import LayoutStack from "@/layouts/main/layout-stack";

export default function ServicesSearchBar() {
  return (
    <LayoutStack width="100%" spacing={0}>
      <ServicesSearchField />
      <ServicesCatBtnList />
    </LayoutStack>
  );
}
