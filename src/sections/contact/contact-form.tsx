import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ContactForm() {
  // Contact form validation schema
  const t = useTranslations("contactForm");

  const contactSchema = z.object({
    name: z.string().min(3, t("errors.name")),
    phone: z.string().min(6, t("errors.phone")).optional().or(z.literal("")),
    email: z.string().email(t("errors.email")),
    subject: z.string().optional().or(z.literal("")),
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
      subject: "",
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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={t("name")}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <MuiTelInput
            fullWidth
            label={t("phone")}
            defaultCountry="SA"
            value={phoneValue}
            onChange={(value) => setValue("phone", value)}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={t("email")}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={t("subject")}
            {...register("subject")}
            error={!!errors.subject}
            helperText={errors.subject?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label={t("message")}
            multiline
            minRows={6}
            {...register("message")}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
          >
            {t("submit")}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
