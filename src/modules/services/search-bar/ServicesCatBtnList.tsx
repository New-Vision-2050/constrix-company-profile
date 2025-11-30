import { Stack } from "@mui/material";
import ServicesCategoryBtn from "./ServicesCategoryBtn";

export default function ServicesCatBtnList() {
  return (
    <Stack direction="row"  flexWrap="wrap" width="100%">
      <ServicesCategoryBtn text="All" isActive />
      <ServicesCategoryBtn text="Web Design" />
      <ServicesCategoryBtn text="Web Development" />
      <ServicesCategoryBtn text="App Development" />
      <ServicesCategoryBtn text="SEO" />
      <ServicesCategoryBtn text="Digital Marketing" />
    </Stack>
  );
}
