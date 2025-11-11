"use client";

import { useMutation } from "@tanstack/react-query";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

import { DirectSend } from "iconsax-reactjs";
import { useSnackbar } from "notistack";

import { AuthApi } from "@/services/api/base/auth";

// ----------------------------------------------------------------------

export function EmailVerificationAlert() {
  const { enqueueSnackbar } = useSnackbar();

  const resendMutation = useMutation({
    mutationFn: () => AuthApi.resendVerificationEmail(),
    onSuccess: () => {
      enqueueSnackbar("Verification email sent successfully!", {
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Failed to resend verification email:", error);
      enqueueSnackbar("Failed to send verification email. Please try again.", {
        variant: "error",
      });
    },
  });

  const handleResendEmail = () => {
    resendMutation.mutate();
  };

  return (
    <Alert severity="warning" sx={{ alignItems: "center" }}>
      Your email is not verified. Please check your inbox.
      <Button
        size="small"
        color="inherit"
        sx={{ ml: 3 }}
        variant="outlined"
        startIcon={<DirectSend size={18} />}
        onClick={handleResendEmail}
        disabled={resendMutation.isSuccess}
        loading={resendMutation.isPending}
      >
        {resendMutation.isPending ? "Sending..." : "Resend verification email"}
      </Button>
    </Alert>
  );
}
