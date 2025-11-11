"use client";

import getGridItem from "@/components/headless/get-grid-item";
import { CancelButton } from "@/components/shared/buttons/cancel";
import { SaveButton } from "@/components/shared/buttons/save";
import {
  Box,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceCategoryApi } from "@/services/api/base/service-category";
import { handleValidationErrors } from "@/services/api/utils/ensure-validation";
import { useTranslations } from "next-intl";
import {
  BE_ServiceCategory,
  ServiceCategoryStatus,
} from "@/types/api/base/service-category";
import { useSnackbar } from "notistack";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: VoidFunction;
  category?: BE_ServiceCategory;
}

const schema = z.object({
  name: z.string().min(1, "Category name is required"),
  code: z.string().min(1, "Category code is required"),
  description: z.string(),
  color: z.string(),
  status: z.nativeEnum(ServiceCategoryStatus),
});

type FormValues = z.infer<typeof schema>;

const GridItem = getGridItem({ xs: 12, sm: 6 });
const GridItemFull = getGridItem({ xs: 12 });

function CreateServiceCategoryDialog({
  onClose,
  open,
  onSuccess,
  category,
}: Props) {
  const t = useTranslations("serviceCategories");
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = !!category;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: category
      ? {
          name: category.name,
          code: category.code,
          description: category.description || "",
          color: category.color || "#1976d2",
          status: category.status,
        }
      : {
          name: "",
          code: "",
          description: "",
          color: "#1976d2",
          status: ServiceCategoryStatus.ACTIVE,
        },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Transform and clean the data for the backend
      const payload: any = {
        name: data.name.trim(),
        code: data.code.toUpperCase().trim(),
      };

      // Only add optional fields if they have values
      if (data.description && data.description.trim()) {
        payload.description = data.description.trim();
      }

      if (data.color && data.color.trim()) {
        payload.color = data.color.trim();
      }

      // Always include status
      payload.status = data.status;

      console.log("Submitting payload:", payload);

      if (isEdit) {
        await ServiceCategoryApi.update(category.id, payload);
        enqueueSnackbar(t("updatedSuccess"), { variant: "success" });
      } else {
        await ServiceCategoryApi.create(payload);
        enqueueSnackbar(t("createdSuccess"), { variant: "success" });
      }

      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
      console.error("Error response:", (error as any)?.response?.data);

      const handled = handleValidationErrors(error, setError);

      console.log("Was error handled?", handled);

      if (!handled) {
        const errorMessage =
          (error as any)?.response?.data?.message || "An error occurred";
        enqueueSnackbar(errorMessage, { variant: "error" });
      }
    }
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? t("edit") : t("create")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box py={2}>
            <Grid container spacing={2}>
              <GridItem>
                <TextField
                  label={t("name")}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  required
                />
              </GridItem>

              <GridItem>
                <TextField
                  label={t("code")}
                  {...register("code")}
                  error={!!errors.code}
                  helperText={
                    errors.code?.message ||
                    "Use uppercase letters, numbers, underscores, and hyphens"
                  }
                  fullWidth
                  required
                  placeholder="CONSULT"
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                />
              </GridItem>

              <GridItemFull>
                <TextField
                  label={t("description")}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                  multiline
                  rows={3}
                />
              </GridItemFull>

              <GridItem>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="color"
                      label={t("color")}
                      fullWidth
                      error={!!errors.color}
                      helperText={errors.color?.message}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </GridItem>

              <GridItem>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.status}>
                      <InputLabel>{t("status")}</InputLabel>
                      <Select {...field} label={t("status")}>
                        <MenuItem value={ServiceCategoryStatus.ACTIVE}>
                          {t("active")}
                        </MenuItem>
                        <MenuItem value={ServiceCategoryStatus.INACTIVE}>
                          {t("inactive")}
                        </MenuItem>
                      </Select>
                      {errors.status && (
                        <FormHelperText>{errors.status.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
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

export default CreateServiceCategoryDialog;
