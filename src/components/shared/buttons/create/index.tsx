import { Button, ButtonProps } from "@mui/material";
import { Add } from "iconsax-reactjs";

export const CreateButton = (props: ButtonProps) => (
  <Button
    startIcon={<Add color="currentColor" />}
    children="Create"
    {...props}
  />
);
