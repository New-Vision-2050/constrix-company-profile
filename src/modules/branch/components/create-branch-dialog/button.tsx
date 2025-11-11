"use client";

import DialogTrigger, {
  DialogTriggerButtonType,
} from "@/components/headless/dialog-trigger";
import CreateBranchDialog from ".";
import { CreateButton } from "@/components/shared/buttons/create";
import { useTranslations } from "next-intl";

const Button: DialogTriggerButtonType = ({ onOpen }) => {
  const t = useTranslations("branches");
  return (
    <CreateButton onClick={onOpen} color="inherit">
      {t("add")}
    </CreateButton>
  );
};

type Props = {
  onSuccess?: VoidFunction;
};
export const CreateBranchButton = ({ onSuccess }: Props) => (
  <DialogTrigger<typeof CreateBranchDialog>
    component={CreateBranchDialog}
    dialogProps={{ onSuccess }}
    render={Button}
  />
);
