"use client";

import DialogTrigger, {
  DialogTriggerButtonType,
} from "@/components/headless/dialog-trigger";
import CreateLocalPatientDialog from ".";
import { useTranslations } from "next-intl";
import { ComponentProps } from "react";
import { Button } from "@mui/material";
import { Edit } from "iconsax-reactjs";

const TriggerButton: DialogTriggerButtonType = ({ onOpen }) => {
  const t = useTranslations("patient");
  return (
    <Button
      onClick={onOpen}
      variant="contained"
      color="primary"
      startIcon={<Edit />}
    >
      {t("update")}
    </Button>
  );
};

type Props = Omit<
  ComponentProps<typeof CreateLocalPatientDialog>,
  "open" | "onClose"
>;

export const CreateLocalPatientButton = ({ patient, onSuccess }: Props) => (
  <DialogTrigger
    component={CreateLocalPatientDialog}
    dialogProps={{ patient, onSuccess }}
    render={TriggerButton}
  />
);
