"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useSnackbar } from "notistack";
import { ContactApi } from "@/services/api/contact";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const { enqueueSnackbar } = useSnackbar();

  const contactSchema = z.object({
    name: z.string().min(3, t("errors.name")),
    phone: z.string().refine(
      (value) => {
        // Allow empty string (optional field)
        if (!value || value.trim() === "") return true;
        // Validate phone number format
        return isValidPhoneNumber(value);
      },
      {
        message: t("errors.phone"),
      }
    ),
    email: z.string().email(t("errors.email")),
    address: z.string().min(3, t("errors.address")),
    message: z.string().min(10, t("errors.message")),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await ContactApi.create(data);
      enqueueSnackbar(t("success"), { variant: "success" });
      reset();
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      enqueueSnackbar(t("error"), { variant: "error" });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
    >
      <Stack spacing={3}>
        <TextField
          fullWidth
          label={t("name")}
          placeholder={t("placeholders.name")}
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <MuiTelInput
              fullWidth
              label={t("phone")}
              placeholder={t("placeholders.phone")}
              defaultCountry="SA"
              value={field.value}
              onChange={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <TextField
          fullWidth
          type="email"
          label={t("email")}
          placeholder={t("placeholders.email")}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label={t("address")}
          placeholder={t("placeholders.address")}
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
        />

        <TextField
          fullWidth
          label={t("message")}
          placeholder={t("placeholders.message")}
          multiline
          rows={6}
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={isSubmitting}
          sx={{
            py: 1.75,
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "none",
            borderRadius: 1,
          }}
        >
          {t("submit")}
        </Button>
      </Stack>
    </Box>
  );
}
