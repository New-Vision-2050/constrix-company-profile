"use client";

import DialogTrigger, {
  DialogTriggerButtonType,
} from "@/components/headless/dialog-trigger";
import CreateWorkspaceDialog from ".";
import { CreateButton } from "@/components/shared/buttons/create";
import { useTranslations } from "next-intl";

const Button: DialogTriggerButtonType = ({ onOpen }) => {
  const t = useTranslations("workspaces");
  return (
    <CreateButton onClick={onOpen} color="inherit">
      {t("add")}
    </CreateButton>
  );
};

type Props = {
  onSuccess?: VoidFunction;
};
export const CreateWorkspaceButton = ({ onSuccess }: Props) => (
  <DialogTrigger<typeof CreateWorkspaceDialog>
    component={CreateWorkspaceDialog}
    dialogProps={{ onSuccess }}
    render={Button}
  />
);
