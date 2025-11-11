import { Button, ButtonProps } from "@mui/material";
import { DocumentDownload } from "iconsax-reactjs";
import { useTranslations } from "next-intl";

export const SaveButton = (props: ButtonProps) => {
  const t = useTranslations("common");
  return (
    <Button
      startIcon={<DocumentDownload color="currentColor" />}
      children={t("save")}
      {...props}
    />
  );
};
