import { Button } from "@mui/material";

interface ServicesCategoryBtnProps {
  text: string;
  isActive?: boolean;
}

export default function ServicesCategoryBtn({
  text,
  isActive,
}: ServicesCategoryBtnProps) {
  return <Button
    color={isActive ? "primary" : "inherit"}
    variant={isActive ? "contained" : "text"}
    sx={{ textTransform: "none" }}>
    {text}
  </Button>;
}
