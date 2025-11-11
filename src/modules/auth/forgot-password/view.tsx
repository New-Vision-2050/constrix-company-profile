"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Iconify } from "@/components/iconify";
import { AuthApi } from "@/services/api/base/auth";
import { useSnackbar } from "notistack";
import { isAxiosError } from "axios";
import { axiosStatus } from "@/lib/axios/utils/status-check";
import { handleValidationErrors } from "@/services/api/utils/ensure-validation";

// ----------------------------------------------------------------------
const createForgotPasswordSchema = (t: any) =>
  z.object({
    email: z.string().email(t("validation.emailRequired")).min(1),
  });

export function ForgotPasswordView() {
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations("auth");

  const forgotPasswordSchema = createForgotPasswordSchema(t);
  type ForgotPasswordFormInputs = z.infer<typeof forgotPasswordSchema>;

  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm<ForgotPasswordFormInputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = handleSubmit(async (data) => {
    try {
      await AuthApi.forgotPassword(data);
      setIsEmailSent(true);
      enqueueSnackbar(t("forms.forgotPassword.successMessage"), {
        variant: "success",
      });
    } catch (error) {
      console.error("Forgot password failed:", error);
      if (isAxiosError(error) && axiosStatus.isBadRequest(error)) {
        handleValidationErrors(error, setError);
      } else {
        enqueueSnackbar("An unexpected error occurred. Please try again.", {
          variant: "error",
        });
        setError("root", {
          message: "An unexpected error occurred. Please try again.",
        });
      }
    }
  });

  if (isEmailSent) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            bgcolor: "success.lighter",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Iconify
            icon="eva:checkmark-fill"
            width={48}
            sx={{ color: "success.main" }}
          />
        </Box>

        <Typography variant="h3" sx={{ mb: 2 }}>
          Request sent successfully!
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 5 }}>
          We&apos;ve sent a password reset link to {getValues("email")}
        </Typography>

        <Button
          fullWidth
          size="large"
          component={RouterLink}
          href="/login"
          variant="contained"
          color="inherit"
          startIcon={
            <Iconify
              icon="eva:arrow-ios-forward-fill"
              style={{ transform: "rotate(180deg)" }}
            />
          }
        >
          {t("forms.forgotPassword.backToLogin")}
        </Button>
      </Box>
    );
  }

  const renderForm = (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
      }}
      component="form"
      noValidate
      onSubmit={handleForgotPassword}
    >
      <TextField
        fullWidth
        label={t("forms.forgotPassword.email")}
        sx={{ mb: 3 }}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />

      {errors.root?.message && (
        <Typography variant="body2" color="error" mb={2} textAlign="end">
          {errors.root?.message}
        </Typography>
      )}

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        loading={isSubmitting}
      >
        {t("forms.forgotPassword.sendResetLink")}
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Typography variant="h5">{t("forms.forgotPassword.title")}</Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          {t("forms.forgotPassword.subtitle")}
        </Typography>
      </Box>

      {renderForm}

      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          component={RouterLink}
          href="/login"
          variant="subtitle2"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Iconify
            icon="eva:arrow-ios-forward-fill"
            style={{ transform: "rotate(180deg)" }}
            fontSize="small"
          />
          {t("forms.forgotPassword.backToLogin")}
        </Link>
      </Box>
    </>
  );
}
