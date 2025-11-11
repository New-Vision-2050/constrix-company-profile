"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "@/routes/hooks";
import { Iconify } from "@/components/iconify";
import { AuthApi } from "@/services/api/base/auth";
import { useSnackbar } from "notistack";
import { isAxiosError } from "axios";
import { axiosStatus } from "@/lib/axios/utils/status-check";
import { handleValidationErrors } from "@/services/api/utils/ensure-validation";

// ----------------------------------------------------------------------
const createResetPasswordSchema = (t: any) =>
  z
    .object({
      password: z.string().min(4, t("validation.passwordMinLength")),
      confirmPassword: z.string().min(4, t("validation.passwordMinLength")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("validation.passwordsMatch"),
      path: ["confirmPassword"],
    });

export function ResetPasswordView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations("auth");
  const searchParams = useSearchParams();

  const resetPasswordSchema = createResetPasswordSchema(t);
  type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      enqueueSnackbar(t("forms.resetPassword.invalidToken"), {
        variant: "error",
      });
      router.push("/login");
    } else {
      setToken(tokenParam);
    }
  }, [searchParams, router, enqueueSnackbar, t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormInputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = handleSubmit(async (data) => {
    if (!token) {
      enqueueSnackbar(t("forms.resetPassword.invalidToken"), {
        variant: "error",
      });
      return;
    }

    try {
      await AuthApi.resetPassword({
        token,
        password: data.password,
      });
      setIsSuccess(true);
      enqueueSnackbar(t("forms.resetPassword.successMessage"), {
        variant: "success",
      });
    } catch (error) {
      console.error("Reset password failed:", error);
      if (isAxiosError(error) && axiosStatus.isBadRequest(error)) {
        handleValidationErrors(error, setError);
        enqueueSnackbar("An unexpected error occurred. Please try again.", {
          variant: "error",
        });
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

  if (isSuccess) {
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
          Password updated successfully!
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 5 }}>
          Your password has been successfully updated. You can now sign in with
          your new password.
        </Typography>

        <Button
          fullWidth
          size="large"
          component={RouterLink}
          href="/login"
          variant="contained"
          color="inherit"
        >
          {t("forms.resetPassword.backToLogin")}
        </Button>
      </Box>
    );
  }

  if (!token) {
    return null; // Will redirect to login
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
      onSubmit={handleResetPassword}
    >
      <TextField
        fullWidth
        label={t("forms.resetPassword.password")}
        type={showPassword ? "text" : "password"}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ mb: 3 }}
        {...register("password")}
      />

      <TextField
        fullWidth
        label={t("forms.resetPassword.confirmPassword")}
        type={showConfirmPassword ? "text" : "password"}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={
                      showConfirmPassword
                        ? "solar:eye-bold"
                        : "solar:eye-closed-bold"
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        sx={{ mb: 3 }}
        {...register("confirmPassword")}
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
        {t("forms.resetPassword.resetPassword")}
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
        <Typography variant="h5">{t("forms.resetPassword.title")}</Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          {t("forms.resetPassword.subtitle")}
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
          {t("forms.resetPassword.backToLogin")}
        </Link>
      </Box>
    </>
  );
}
