import { Stack } from "@mui/material";
import ServicesCategoryBtn from "./ServicesCategoryBtn";
import LayoutStack from "@/layouts/main/layout-stack";

export default function ServicesCatBtnList() {
  return (
    <LayoutStack direction="row"  flexWrap="wrap" width="100%">
      <ServicesCategoryBtn text="All" isActive />
      <ServicesCategoryBtn text="Web Design" />
      <ServicesCategoryBtn text="Web Development" />
      <ServicesCategoryBtn text="App Development" />
      <ServicesCategoryBtn text="SEO" />
      <ServicesCategoryBtn text="Digital Marketing" />
    </LayoutStack>
  );
}
