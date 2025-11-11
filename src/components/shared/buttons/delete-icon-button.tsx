"use client";

import { IconButton, IconButtonProps } from "@mui/material";
import { Trash } from "iconsax-reactjs";
import DialogTrigger from "@/components/headless/dialog-trigger";
import ConfirmDeleteDialog from "@/components/ui/interactions/confirm-delete-dialog";

interface Props extends Omit<IconButtonProps, "onClick"> {
  onDelete: () => Promise<void> | void;
  onSuccess?: () => void;
  moduleName?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  itemName?: string;
}

/**
 * Delete icon button with confirmation dialog
 *
 * @example
 * ```tsx
 * <DeleteIconButton
 *   onDelete={async () => await ServiceApi.delete(id)}
 *   onSuccess={() => refetch()}
 *   moduleName="service"
 *   itemName={service.name}
 * />
 * ```
 */
function DeleteIconButton({
  onDelete,
  onSuccess,
  moduleName = "item",
  title,
  subtitle,
  description,
  itemName,
  ...iconButtonProps
}: Props) {
  return (
    <DialogTrigger
      component={ConfirmDeleteDialog}
      dialogProps={{
        onDelete,
        onSuccess,
        moduleName,
        title,
        subtitle:
          subtitle ||
          (itemName
            ? `Are you sure you want to delete "${itemName}"?`
            : undefined),
        description,
      }}
      render={({ onOpen }) => (
        <IconButton
          {...iconButtonProps}
          onClick={onOpen}
          sx={{ color: "error.main", ...iconButtonProps.sx }}
        >
          <Trash size={20} />
        </IconButton>
      )}
    />
  );
}

export default DeleteIconButton;
