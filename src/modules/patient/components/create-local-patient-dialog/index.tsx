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
import PhoneInput from "@/components/shared/fields/phone-input";
import { BE_Patient } from "@/types/api/base/patient";
import { BE_LocalPatient } from "@/types/api/base/patient/local";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  patient: BE_Patient;
  onSuccess?: (localPatient: BE_LocalPatient) => void;
}

const schema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  mobilePhone: z.string().optional(),
  landlinePhone: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  building: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  fullAddress: z.string().optional(),
  allergies: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const GridItem = getGridItem({ xs: 12 });
const GridItemMd4 = getGridItem({ xs: 12, md: 4 });
const GridItemHalf = getGridItem({ xs: 6 });

function CreateLocalPatientDialog({
  onClose,
  open,
  patient,
  onSuccess,
}: Props) {
  const t = useTranslations("patient");
  const isUpdate = !!patient.local;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Populate form with patient data (global or local if exists)
  useEffect(() => {
    const dataSource = patient.local || patient;
    reset({
      firstName: dataSource.firstName || "",
      middleName: dataSource.middleName || "",
      lastName: dataSource.lastName || "",
      gender: dataSource.gender || "",
      dateOfBirth: dataSource.dateOfBirth || "",
      mobilePhone: dataSource.mobilePhone || "",
      landlinePhone: dataSource.landlinePhone || "",
      email: dataSource.email || "",
      country: dataSource.country || "",
      city: dataSource.city || "",
      street: dataSource.street || "",
      building: dataSource.building || "",
      floor: dataSource.floor || "",
      apartment: dataSource.apartment || "",
      fullAddress: dataSource.fullAddress || "",
      allergies: dataSource.allergies || "",
      notes: dataSource.notes || "",
    });
  }, [patient, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        globalPatientId: patient.id,
        firstName: data.firstName || null,
        middleName: data.middleName || null,
        lastName: data.lastName || null,
        gender: data.gender || null,
        dateOfBirth: data.dateOfBirth || null,
        mobilePhone: data.mobilePhone || null,
        landlinePhone: data.landlinePhone || null,
        email: data.email || null,
        country: data.country || null,
        city: data.city || null,
        street: data.street || null,
        building: data.building || null,
        floor: data.floor || null,
        apartment: data.apartment || null,
        fullAddress: data.fullAddress || null,
        allergies: data.allergies || null,
        notes: data.notes || null,
        identificationNumber: null,
        age: patient.age || null,
      };

      let res;
      if (isUpdate) {
        // Update existing local patient
        res = await PatientApi.local.update(patient.id, payload);
      } else {
        // Create new local patient
        res = await PatientApi.local.create(payload);
      }

      onClose();
      // The API returns the local patient data
      if (onSuccess) onSuccess(res.data as any as BE_LocalPatient);
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
      <DialogTitle>{isUpdate ? t("update") : t("local")}</DialogTitle>
      <DialogContent>
        <Box py={2}>
          <Grid container spacing={2}>
            {/* Personal Info */}
            <GridItem>
              <FormSection title={t("form.sections.personalInfo")}>
                <Grid container spacing={2}>
                  <GridItemMd4>
                    <TextField
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
                      label={t("form.lastName")}
                      {...register("lastName")}
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      fullWidth
                    />
                  </GridItemMd4>

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
                          select
                          label={t("form.gender")}
                          {...field}
                          error={!!errors.gender}
                          helperText={errors.gender?.message}
                          fullWidth
                        >
                          <MenuItem value="">None</MenuItem>
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

            {/* Contact Info */}
            <GridItem>
              <FormSection title={t("form.sections.contactInfo")}>
                <Grid container spacing={2}>
                  <GridItem>
                    <Controller
                      control={control}
                      name="mobilePhone"
                      render={({ field }) => (
                        <PhoneInput
                          label={t("form.mobilePhone")}
                          {...field}
                          value={field.value || ""}
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

            {/* Address */}
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

export default CreateLocalPatientDialog;
