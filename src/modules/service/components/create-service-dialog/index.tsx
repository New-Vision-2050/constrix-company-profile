"use client";

import React from "react";
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
  InputAdornment,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceApi } from "@/services/api/base/service";
import { handleValidationErrors } from "@/services/api/utils/ensure-validation";
import { useTranslations } from "next-intl";
import {
  BE_ServiceWithCategory,
  ServiceStatus,
} from "@/types/api/base/service";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import { ServiceCategoryApi } from "@/services/api/base/service-category";
import { ServiceCategoryStatus } from "@/types/api/base/service-category";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: VoidFunction;
  service?: BE_ServiceWithCategory;
}

const schema = z.object({
  name: z.string().min(1, "Service name is required"),
  code: z
    .string()
    .min(1, "Service code is required")
    .regex(
      /^[A-Z0-9_-]+$/,
      "Code must contain only uppercase letters, numbers, underscores, and hyphens"
    ),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  discount: z.coerce
    .number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .optional(),
  durationMinutes: z.coerce
    .number()
    .positive("Duration must be positive")
    .optional()
    .or(z.literal("")),
  status: z.nativeEnum(ServiceStatus),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const GridItem = getGridItem({ xs: 12, sm: 6 });
const GridItemFull = getGridItem({ xs: 12 });

function CreateServiceDialog({ onClose, open, onSuccess, service }: Props) {
  const t = useTranslations("services");
  const { enqueueSnackbar } = useSnackbar();
  const isEdit = !!service;

  // Fetch categories for dropdown
  const {
    data: categoriesRes,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["service-categories-all"],
    queryFn: async () =>
      (
        await ServiceCategoryApi.list({
          page: 1,
          perPage: 100,
        })
      ).data,
    enabled: open, // Only fetch when dialog is open
  });

  const activeCategories =
    categoriesRes?.list.filter(
      (cat) => cat.status === ServiceCategoryStatus.ACTIVE
    ) || [];

  // Show error notification if categories fail to load
  React.useEffect(() => {
    if (categoriesError) {
      enqueueSnackbar("Failed to load categories", { variant: "error" });
    }
  }, [categoriesError, enqueueSnackbar]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: service
      ? {
          name: service.name,
          code: service.code,
          description: service.description || "",
          categoryId: service.categoryId || "",
          price: service.price,
          discount: service.discount || undefined,
          durationMinutes: service.durationMinutes || undefined,
          status: service.status,
          notes: service.notes || "",
        }
      : {
          name: "",
          code: "",
          description: "",
          categoryId: "",
          price: undefined,
          discount: undefined,
          durationMinutes: undefined,
          status: ServiceStatus.ACTIVE,
          notes: "",
        },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        name: data.name,
        code: data.code.toUpperCase(),
        description: data.description || undefined,
        categoryId: data.categoryId || undefined,
        price: Number(data.price),
        discount: data.discount ? Number(data.discount) : undefined,
        durationMinutes: data.durationMinutes
          ? Number(data.durationMinutes)
          : undefined,
        status: data.status,
        notes: data.notes || undefined,
      };

      if (isEdit) {
        await ServiceApi.update(service.id, payload);
        enqueueSnackbar(t("updatedSuccess"), { variant: "success" });
      } else {
        await ServiceApi.create(payload);
        enqueueSnackbar(t("createdSuccess"), { variant: "success" });
      }

      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      const handled = handleValidationErrors(error, setError);
      if (!handled) {
        enqueueSnackbar("An error occurred", { variant: "error" });
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
                  placeholder="CONSULT-GEN"
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                />
              </GridItem>

              <GridItem>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.categoryId}>
                      <InputLabel>{t("category")}</InputLabel>
                      <Select
                        {...field}
                        label={t("category")}
                        value={field.value || ""}
                        disabled={categoriesLoading}
                      >
                        <MenuItem value="">
                          <em>
                            {categoriesLoading
                              ? "Loading categories..."
                              : t("noCategory")}
                          </em>
                        </MenuItem>
                        {activeCategories.map((cat) => (
                          <MenuItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.categoryId && (
                        <FormHelperText>
                          {errors.categoryId.message}
                        </FormHelperText>
                      )}
                      {!categoriesLoading && activeCategories.length === 0 && (
                        <FormHelperText>
                          No active categories available. Create a category
                          first.
                        </FormHelperText>
                      )}
                    </FormControl>
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
                        <MenuItem value={ServiceStatus.ACTIVE}>
                          {t("active")}
                        </MenuItem>
                        <MenuItem value={ServiceStatus.INACTIVE}>
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

              <GridItemFull>
                <TextField
                  label={t("description")}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                  multiline
                  rows={2}
                />
              </GridItemFull>

              <GridItem>
                <TextField
                  {...register("price")}
                  type="number"
                  label={t("price")}
                  fullWidth
                  required
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  inputProps={{ step: "0.01", min: 0 }}
                />
              </GridItem>

              <GridItem>
                <TextField
                  {...register("discount")}
                  type="number"
                  label={t("discount")}
                  fullWidth
                  error={!!errors.discount}
                  helperText={errors.discount?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  inputProps={{ step: "0.1", min: 0, max: 100 }}
                />
              </GridItem>

              <GridItem>
                <TextField
                  {...register("durationMinutes")}
                  type="number"
                  label={t("durationMinutes")}
                  fullWidth
                  error={!!errors.durationMinutes}
                  helperText={errors.durationMinutes?.message}
                  inputProps={{ min: 0 }}
                />
              </GridItem>

              <GridItemFull>
                <TextField
                  label={t("notes")}
                  {...register("notes")}
                  error={!!errors.notes}
                  helperText={errors.notes?.message}
                  fullWidth
                  multiline
                  rows={2}
                />
              </GridItemFull>
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

export default CreateServiceDialog;
