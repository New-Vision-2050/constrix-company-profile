"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { ContactApi } from "@/services/api/contact";
import { TickCircle } from "iconsax-reactjs";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      setIsSubmitted(true);
      reset();
    } catch (error) {
      enqueueSnackbar(t("error"), { variant: "error" });
    }
  };

  const handleNewMessage = () => {
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <Box sx={{ width: "100%" }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "success.lighter",
            border: 1,
            borderColor: "success.main",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "success.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <TickCircle size={40} variant="Bold" />
            </Box>

            <Stack spacing={2} alignItems="center">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "success.dark",
                }}
              >
                {t("successMessage.title")}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "success.dark",
                  maxWidth: 400,
                  lineHeight: 1.6,
                }}
              >
                {t("successMessage.description")}
              </Typography>
            </Stack>

            <Button
              variant="contained"
              color="success"
              onClick={handleNewMessage}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 1,
              }}
            >
              {t("successMessage.newMessageButton")}
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ width: "100%" }}
    >
      <Stack spacing={3}>
        <TextField
          disabled={isSubmitting}
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
              disabled={isSubmitting}
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
          disabled={isSubmitting}
          fullWidth
          type="email"
          label={t("email")}
          placeholder={t("placeholders.email")}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          disabled={isSubmitting}
          fullWidth
          label={t("address")}
          placeholder={t("placeholders.address")}
          {...register("address")}
          error={!!errors.address}
          helperText={errors.address?.message}
        />

        <TextField
          disabled={isSubmitting}
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
          loading={isSubmitting}
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
