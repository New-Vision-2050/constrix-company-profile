"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ContactForm() {
  const t = useTranslations("contactForm");

  const contactSchema = z.object({
    name: z.string().min(3, t("errors.name")),
    phone: z.string().min(6, t("errors.phone")).optional().or(z.literal("")),
    email: z.string().email(t("errors.email")),
    address: z.string().min(3, t("errors.address")),
    message: z.string().min(10, t("errors.message")),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
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
  const phoneValue = watch("phone");

  const onSubmit = async (data: ContactFormValues) => {
    // Replace this with API call
    console.log("submit", data);
    reset();
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

        <MuiTelInput
          fullWidth
          label={t("phone")}
          placeholder={t("placeholders.phone")}
          defaultCountry="SA"
          value={phoneValue}
          onChange={(value) => setValue("phone", value)}
          error={!!errors.phone}
          helperText={errors.phone?.message}
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
