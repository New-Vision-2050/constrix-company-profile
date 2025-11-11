import { Button, ButtonProps } from "@mui/material";
import { CloseCircle } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

export const CancelButton = (props: ButtonProps) => {
  const t = useTranslations("common");
  return (
    <Button
      startIcon={<CloseCircle color="currentColor" />}
      variant="soft"
      color="error"
      children={t("cancel")}
      {...props}
    />
  );
};
