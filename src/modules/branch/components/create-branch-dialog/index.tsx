"use client";

import getGridItem from "@/components/headless/get-grid-item";
import { CancelButton } from "@/components/shared/buttons/cancel";
import { SaveButton } from "@/components/shared/buttons/save";
import { Box, DialogActions, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BranchApi } from "@/services/api/base/branch";
import { handleValidationErrors } from "@/services/api/utils/ensure-validation";
import { useTranslations } from "next-intl";
import { BE_Branch } from "@/types/api/base/branch";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: VoidFunction;
  branch?: BE_Branch; // For edit mode
}

const schema = z.object({
  name: z.string().min(1, "Branch name is required"),
  slug: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().optional(),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  logoUrl: z.string().url("Invalid logo URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const GridItem = getGridItem({ xs: 12, sm: 6 });
const GridItemFull = getGridItem({ xs: 12 });

function CreateBranchDialog({ onClose, open, onSuccess, branch }: Props) {
  const t = useTranslations("branches");
  const isEdit = !!branch;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: branch
      ? {
          name: branch.name,
          slug: branch.slug || "",
          address: branch.address,
          city: branch.city,
          country: branch.country || "",
          phone: branch.phone,
          email: branch.email || "",
          logoUrl: branch.logoUrl || "",
        }
      : {
          name: "",
          slug: "",
          address: "",
          city: "",
          country: "",
          phone: "",
          email: "",
          logoUrl: "",
        },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        name: data.name,
        slug: data.slug || undefined,
        address: data.address,
        city: data.city,
        country: data.country || undefined,
        phone: data.phone,
        email: data.email || undefined,
        logoUrl: data.logoUrl || undefined,
      };

      if (isEdit) {
        await BranchApi.update(branch.id, payload);
      } else {
        await BranchApi.create(payload);
      }

      reset();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      handleValidationErrors(error, setError);
    }
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>{isEdit ? t("edit") : t("add")}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box py={2}>
            <Grid container spacing={2}>
              <GridItem>
                <TextField
                  label={t("form.name")}
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  required
                />
              </GridItem>
              <GridItem>
                <TextField
                  label={t("form.slug")}
                  {...register("slug")}
                  error={!!errors.slug}
                  helperText={errors.slug?.message}
                  fullWidth
                />
              </GridItem>
              <GridItemFull>
                <TextField
                  label={t("form.address")}
                  {...register("address")}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  fullWidth
                  required
                />
              </GridItemFull>
              <GridItem>
                <TextField
                  label={t("form.city")}
                  {...register("city")}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  fullWidth
                  required
                />
              </GridItem>
              <GridItem>
                <TextField
                  label={t("form.country")}
                  {...register("country")}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  fullWidth
                />
              </GridItem>
              <GridItem>
                <TextField
                  label={t("form.phone")}
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  fullWidth
                  required
                />
              </GridItem>
              <GridItem>
                <TextField
                  label={t("form.email")}
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  type="email"
                />
              </GridItem>
              <GridItemFull>
                <TextField
                  label={t("form.logoUrl")}
                  {...register("logoUrl")}
                  error={!!errors.logoUrl}
                  helperText={errors.logoUrl?.message}
                  fullWidth
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

export default CreateBranchDialog;
