"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link as RouterLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useAuth } from "@/lib/auth/hooks/use-auth";
import { handleValidationErrors } from "@/services/api/utils/ensure-validation";

// ----------------------------------------------------------------------
const createLoginSchema = (t: any) =>
  z.object({
    email: z.string().email(t("validation.emailRequired")).min(1),
    password: z.string().min(4, t("validation.passwordMinLength")),
  });

export function LoginView() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const t = useTranslations("auth");

  const loginSchema = createLoginSchema(t);
  type LoginFormInputs = z.infer<typeof loginSchema>;

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = handleSubmit(async (data) => {
    const result = await login(data);

    if (result.success) {
      router.replace("/");
    } else {
      // Handle validation errors if they exist
      const handled = handleValidationErrors(result.error, setError);

      // If no validation errors were handled, show general error
      if (!handled) {
        setError("email", {
          message: result.error || "Login failed",
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
      onSubmit={handleSignIn}
    >
      <TextField
        fullWidth
        label={t("forms.login.email")}
        defaultValue="hello@gmail.com"
        sx={{ mb: 3 }}
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />

      <Link
        variant="body2"
        color="inherit"
        sx={{ mb: 1.5 }}
        component={RouterLink}
        href="/forgot-password"
      >
        {t("forms.login.forgotPassword")}
      </Link>

      <TextField
        fullWidth
        label={t("forms.login.password")}
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

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        loading={isLoading}
      >
        {t("forms.login.signIn")}
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
        <Typography variant="h5">{t("forms.login.title")}</Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          {t("forms.login.dontHaveAccount")}
          <Link
            component={RouterLink}
            href="/register"
            variant="subtitle2"
            sx={{ ml: 0.5 }}
          >
            {t("forms.login.getStarted")}
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
          {t("forms.login.or")}
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
