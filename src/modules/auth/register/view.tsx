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
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "@/routes/hooks";

import { Iconify } from "@/components/iconify";
import Grid from "@mui/material/Grid";
import { AxiosError, isAxiosError } from "axios";
import { axiosStatus } from "@/lib/axios/utils/status-check";
import { AuthApi } from "@/services/api/base/auth";
import { UserApi } from "@/services/api/base/user";
import { useSnackbar } from "notistack";
import {
  ensureValidation,
  handleValidationErrors,
} from "@/services/api/utils/ensure-validation";

// ----------------------------------------------------------------------
const createRegisterSchema = (t: any) =>
  z.object({
    firstName: z.string().min(3, t("validation.firstNameRequired")),
    lastName: z.string().min(3, t("validation.lastNameRequired")),
    email: z.email(t("validation.emailRequired")).min(1),
    hash: z.string().min(4, t("validation.passwordMinLength")),
  });

export function RegisterView() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations("auth");

  const registerSchema = createRegisterSchema(t);
  type RegisterFormInputs = z.infer<typeof registerSchema>;
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      hash: "",
    },
  });

  const handleRegister = handleSubmit(async (data) => {
    try {
      const res = await UserApi.create(data);
      enqueueSnackbar(`Welcome aboard ${res.data.firstName}.`, {
        variant: "success",
      });
      router.push("/login");
    } catch (error) {
      console.error("Register failed:", error);
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

  const renderForm = (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
      }}
      component="form"
      noValidate
      onSubmit={handleRegister}
    >
      <div>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              fullWidth
              label={t("forms.register.firstName")}
              sx={{ mb: 3 }}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              {...register("firstName")}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              label={t("forms.register.lastName")}
              sx={{ mb: 3 }}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              {...register("lastName")}
            />
          </Grid>
        </Grid>
      </div>

      <TextField
        fullWidth
        label={t("forms.register.email")}
        sx={{ mb: 3 }}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />

      <TextField
        fullWidth
        label={t("forms.register.password")}
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
        error={!!errors.hash}
        helperText={errors.hash?.message}
        sx={{ mb: 3 }}
        {...register("hash")}
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
        {t("forms.register.register")}
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
        <Typography variant="h5">{t("forms.register.title")}</Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          {t("forms.register.alreadyHaveAccount")}
          <Link
            component={RouterLink}
            href={"/login"}
            passHref
            variant="subtitle2"
            sx={{ ml: 0.5 }}
          >
            {t("forms.register.loginInstead")}
          </Link>
        </Typography>
      </Box>
      {renderForm}
      <Divider
        sx={{ my: 3, "&::before, &::after": { borderTopStyle: "dashed" } }}
      >
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", fontWeight: "fontWeightMedium" }}
        >
          {t("forms.register.or")}
        </Typography>
      </Divider>
      <Box
        sx={{
          gap: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:google" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>
    </>
  );
}
