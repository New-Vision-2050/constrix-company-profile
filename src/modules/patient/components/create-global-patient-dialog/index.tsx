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
import { PatientApi } from "@/services/api/base/patient";
import MenuItem from "@mui/material/MenuItem";
import { handleValidationErrors } from "@/services/api/utils/ensure-validation";
import DatePicker from "@/components/shared/fields/date-picker";
import FormSection from "@/components/shared/form-section";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import PhoneInput from "@/components/shared/fields/phone-input";
import { BE_Patient } from "@/types/api/base/patient";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: (patient: BE_Patient) => void;
}

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional().or(z.literal("")),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  mobilePhone: z.string().min(1, "Mobile phone is required"),
  landlinePhone: z.string().optional().or(z.literal("")),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  street: z.string().optional().or(z.literal("")),
  building: z.string().optional().or(z.literal("")),
  floor: z.string().optional().or(z.literal("")),
  apartment: z.string().optional().or(z.literal("")),
  fullAddress: z.string().optional().or(z.literal("")),
  allergies: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
  identificationNumber: z.string().optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const GridItem = getGridItem({ xs: 12 });
const GridItemMd4 = getGridItem({ xs: 12, md: 4 });
const GridItemHalf = getGridItem({ xs: 6 });

const defaultValues: Partial<FormValues> = {
  firstName: "",
  lastName: "",
  dateOfBirth: dayjs().subtract(16, "year").format("YYYY-MM-DD"),
  gender: "male",
};

function CreateGlobalPatientDialog({ onClose, open, onSuccess }: Props) {
  const t = useTranslations("patient");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Convert to the shape expected by the API
      const res = await PatientApi.global.create({
        firstName: data.firstName,
        middleName: data.middleName ?? "",
        lastName: data.lastName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        mobilePhone: data.mobilePhone,
        landlinePhone: data.landlinePhone ?? "",
        email: data.email ?? "",
        country: data.country ?? "",
        city: data.city ?? "",
        street: data.street ?? "",
        building: data.building ?? "",
        floor: data.floor ?? "",
        apartment: data.apartment ?? "",
        fullAddress: data.fullAddress ?? "",
        allergies: data.allergies ?? "",
        notes: data.notes ?? "",
        identificationNumber: data.identificationNumber ?? "",
        age: 18,
      });
      reset();
      onClose();
      if (onSuccess) onSuccess(res.data);
    } catch (error) {
      handleValidationErrors(error, setError);
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          component: "form",
          onSubmit: handleSubmit(onSubmit),
          ["noValidate" as any]: true,
        },
      }}
    >
      <DialogTitle>{t("add")}</DialogTitle>
      <DialogContent>
        <Box py={2}>
          <Grid container spacing={2}>
            {/* Personal Info: name + main details (date of birth, gender, age) */}
            <GridItem>
              <FormSection title={t("form.sections.personalInfo")}>
                <Grid container spacing={2}>
                  <GridItemMd4>
                    <TextField
                      required
                      label={t("form.firstName")}
                      {...register("firstName")}
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      fullWidth
                    />
                  </GridItemMd4>
                  <GridItemMd4>
                    <TextField
                      label={t("form.middleName")}
                      {...register("middleName")}
                      error={!!errors.middleName}
                      helperText={errors.middleName?.message}
                      fullWidth
                    />
                  </GridItemMd4>
                  <GridItemMd4>
                    <TextField
                      required
                      label={t("form.lastName")}
                      {...register("lastName")}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      fullWidth
                    />
                  </GridItemMd4>

                  {/* Main details: required first */}
                  <GridItemHalf>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label={t("form.dateOfBirth")}
                          value={field.value ?? null}
                          onChange={(value) => field.onChange(value)}
                        />
                      )}
                    />
                  </GridItemHalf>

                  <GridItemHalf>
                    <Controller
                      control={control}
                      name="gender"
                      render={({ field }) => (
                        <TextField
                          required
                          select
                          label={t("form.gender")}
                          {...field}
                          error={!!errors.gender}
                          helperText={errors.gender?.message}
                          fullWidth
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </TextField>
                      )}
                    />
                  </GridItemHalf>
                </Grid>
              </FormSection>
            </GridItem>

            {/* Contact Info: required first */}
            <GridItem>
              <FormSection title={t("form.sections.contactInfo")}>
                <Grid container spacing={2}>
                  <GridItem>
                    <Controller
                      control={control}
                      name="mobilePhone"
                      render={({ field }) => (
                        <PhoneInput
                          required
                          label={t("form.mobilePhone")}
                          {...field}
                          error={!!errors.mobilePhone}
                          helperText={errors.mobilePhone?.message}
                          fullWidth
                        />
                      )}
                    />
                  </GridItem>

                  <GridItem>
                    <TextField
                      label={t("form.landlinePhone")}
                      {...register("landlinePhone")}
                      error={!!errors.landlinePhone}
                      helperText={errors.landlinePhone?.message}
                      fullWidth
                    />
                  </GridItem>

                  <GridItem>
                    <TextField
                      label={t("form.email")}
                      {...register("email")}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      fullWidth
                    />
                  </GridItem>
                </Grid>
              </FormSection>
            </GridItem>
            {/* Address (full width) */}
            <GridItem>
              <FormSection title={t("form.sections.address")}>
                <Grid container spacing={2}>
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
                      label={t("form.city")}
                      {...register("city")}
                      error={!!errors.city}
                      helperText={errors.city?.message}
                      fullWidth
                    />
                  </GridItem>

                  <GridItem>
                    <TextField
                      label={t("form.street")}
                      {...register("street")}
                      error={!!errors.street}
                      helperText={errors.street?.message}
                      fullWidth
                    />
                  </GridItem>

                  <GridItemHalf>
                    <TextField
                      label={t("form.building")}
                      {...register("building")}
                      error={!!errors.building}
                      helperText={errors.building?.message}
                      fullWidth
                    />
                  </GridItemHalf>

                  <GridItemHalf>
                    <TextField
                      label={t("form.floor")}
                      {...register("floor")}
                      error={!!errors.floor}
                      helperText={errors.floor?.message}
                      fullWidth
                    />
                  </GridItemHalf>

                  <GridItem>
                    <TextField
                      label={t("form.apartment")}
                      {...register("apartment")}
                      error={!!errors.apartment}
                      helperText={errors.apartment?.message}
                      fullWidth
                    />
                  </GridItem>

                  <GridItem>
                    <TextField
                      label={t("form.fullAddress")}
                      {...register("fullAddress")}
                      error={!!errors.fullAddress}
                      helperText={errors.fullAddress?.message}
                      fullWidth
                    />
                  </GridItem>
                </Grid>
              </FormSection>
            </GridItem>
            {/* Medical Info */}
            <GridItem>
              <FormSection title={t("form.sections.medicalInfo")}>
                <Grid container spacing={2}>
                  <GridItem>
                    <TextField
                      label={t("form.allergies")}
                      {...register("allergies")}
                      error={!!errors.allergies}
                      helperText={errors.allergies?.message}
                      fullWidth
                    />
                  </GridItem>

                  <GridItem>
                    <TextField
                      label={t("form.notes")}
                      {...register("notes")}
                      multiline
                      minRows={3}
                      error={!!errors.notes}
                      helperText={errors.notes?.message}
                      fullWidth
                    />
                  </GridItem>
                </Grid>
              </FormSection>
            </GridItem>
            {/* Identity */}

            <GridItem>
              <FormSection title={t("form.sections.identity")} dense>
                <Grid container spacing={2}>
                  <GridItem>
                    <TextField
                      label={t("form.identificationNumber")}
                      {...register("identificationNumber")}
                      error={!!errors.identificationNumber}
                      helperText={errors.identificationNumber?.message}
                      fullWidth
                    />
                  </GridItem>
                </Grid>
              </FormSection>
            </GridItem>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <SaveButton type="submit" loading={isSubmitting} />
      </DialogActions>
    </Dialog>
  );
}

export default CreateGlobalPatientDialog;
