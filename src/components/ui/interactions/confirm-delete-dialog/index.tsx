"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { Danger } from "iconsax-reactjs";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

interface Props {
  open: boolean;
  onClose: () => void;
  onDelete: () => Promise<void> | void;
  title?: string;
  subtitle?: string;
  description?: string;
  moduleName?: string;
  onSuccess?: () => void;
}

/**
 * Generic confirmation dialog for delete operations
 *
 * @param title - Main title (default: "Confirm Deletion")
 * @param subtitle - Subtitle text (default: "Are you sure you want to delete this {moduleName}?")
 * @param description - Description text (default: "This action cannot be undone.")
 * @param moduleName - Module name for default subtitle (e.g., "service", "category")
 * @param onDelete - Async function to execute deletion
 * @param onSuccess - Callback after successful deletion
 *
 * @example
 * ```tsx
 * <DialogTrigger
 *   component={ConfirmDeleteDialog}
 *   dialogProps={{
 *     moduleName: "service",
 *     onDelete: async () => await ServiceApi.delete(id),
 *     onSuccess: () => refetch(),
 *   }}
 *   render={({ onOpen }) => (
 *     <IconButton onClick={onOpen}>
 *       <Trash />
 *     </IconButton>
 *   )}
 * />
 * ```
 */
function ConfirmDeleteDialog({
  open,
  onClose,
  onDelete,
  title,
  subtitle,
  description,
  moduleName = "item",
  onSuccess,
}: Props) {
  const t = useTranslations("common");
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: async () => {
      await onDelete();
    },
    onSuccess: () => {
      enqueueSnackbar(t("deleteSuccess", { item: moduleName }), {
        variant: "success",
      });
      onClose();
      onSuccess?.();
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || t("deleteError");
      enqueueSnackbar(errorMessage, { variant: "error" });
    },
  });

  const handleConfirm = () => {
    handleDelete();
  };

  const defaultTitle = title || t("confirmDeletion");
  const defaultSubtitle =
    subtitle || t("deleteConfirmSubtitle", { item: moduleName });
  const defaultDescription = description || t("deleteWarning");

  return (
    <Dialog
      open={open}
      onClose={isPending ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              borderRadius: 1,
              bgcolor: "error.lighter",
              color: "error.main",
            }}
          >
            <Danger size={24} variant="Bold" />
          </Box>
          <Typography variant="h6">{defaultTitle}</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Typography variant="body1" color="text.primary" gutterBottom>
            {defaultSubtitle}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {defaultDescription}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          disabled={isPending}
          variant="outlined"
          color="inherit"
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isPending}
          variant="contained"
          color="error"
          startIcon={
            isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <Danger size={20} />
            )
          }
        >
          {isPending ? t("deleting") : t("delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
