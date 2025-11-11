"use client";

import getGridItem from "@/components/headless/get-grid-item";
import { CancelButton } from "@/components/shared/buttons/cancel";
import { SaveButton } from "@/components/shared/buttons/save";
import { Box, DialogActions, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkspaceApi } from "@/services/api/base/workspace";
import EntityImageUpload from "@/components/ui/inputs/entity-image-upload";
import { handleValidationErrors } from "@/services/api/utils/ensure-validation";
import { useTranslations } from "next-intl";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: VoidFunction;
}

const schema = z.object({
  name: z.string().min(1, "Workspace name is required"),
  description: z.string().optional(),
  logo: z.instanceof(File).nullable().optional(),
});

type FormValues = z.infer<typeof schema>;

const GridItem = getGridItem({ xs: 12 });

function CreateWorkspaceDialog({ onClose, open, onSuccess }: Props) {
  const t = useTranslations("workspaces");
  const tf = useTranslations("form");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await WorkspaceApi.create({
        name: data.name,
        description: data.description ?? "",
        logo: data.logo,
      });
      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      handleValidationErrors(error, setError);
      // Optionally handle error (e.g., show notification)
    }
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{t("add")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box py={2}>
            <Grid container spacing={2}>
              <GridItem>
                <Controller
                  control={control}
                  name="logo"
                  render={({ field }) => (
                    <EntityImageUpload
                      value={field.value}
                      onChange={(file) => field.onChange(file)}
                      title={tf("uploadImage")}
                    />
                  )}
                />
              </GridItem>
              <GridItem>
                <TextField
                  label={t("form.name")}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                />
              </GridItem>
              <GridItem>
                <TextField
                  label={t("form.description")}
                  {...register("description")}
                  multiline
                  minRows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                />
              </GridItem>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <SaveButton type="submit" loading={isSubmitting} />
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CreateWorkspaceDialog;
