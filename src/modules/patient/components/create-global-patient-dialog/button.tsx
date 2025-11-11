"use client";

import DialogTrigger, {
  DialogTriggerButtonType,
} from "@/components/headless/dialog-trigger";
import CreateGlobalPatientDialog from ".";
import { CreateButton } from "@/components/shared/buttons/create";
import { useTranslations } from "next-intl";
import { ComponentProps } from "react";

const Button: DialogTriggerButtonType = ({ onOpen }) => {
  const t = useTranslations("patient");
  return (
    <CreateButton onClick={onOpen} color="inherit">
      {t("add")}
    </CreateButton>
  );
};

type Props = Omit<
  ComponentProps<typeof CreateGlobalPatientDialog>,
  "open" | "onClose"
>;
export const CreateGlobalPatientButton = ({ onSuccess }: Props) => (
  <DialogTrigger
    component={CreateGlobalPatientDialog}
    dialogProps={{ onSuccess }}
    render={Button}
  />
);
