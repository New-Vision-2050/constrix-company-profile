import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

import { Logo } from "@/components/logo";
import type { PageWithParamsAndSearch } from "@/types/page";
import { AuthApi } from "@/services/api/base/auth";

// ----------------------------------------------------------------------

type VerificationResult = {
  success: boolean;
  message: string;
};

async function verifyEmailToken(token: string): Promise<VerificationResult> {
  try {
    await AuthApi.verifyEmail(token);
    return {
      success: true,
      message: "Email verified successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Verification failed",
    };
  }
}

export default async function VerifyEmailPage({
  searchParams,
}: PageWithParamsAndSearch) {
  const params = await searchParams;
  const token = params.token as string;

  let verificationResult: VerificationResult;

  if (!token) {
    verificationResult = {
      success: false,
      message: "No verification token provided",
    };
  } else {
    verificationResult = await verifyEmailToken(token);
  }

  const renderContent = () => {
    if (verificationResult.success) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Box
            component="img"
            src="/assets/icons/check-circle.svg"
            alt="Success"
            sx={{
              width: 80,
              height: 80,
              color: "success.main",
            }}
          />
          <Typography variant="h4" color="success.main">
            Email Verified!
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: "center",
              maxWidth: 400,
            }}
          >
            Your email address has been successfully verified. You can now
            access all features of your account.
          </Typography>
          <Button href="/login" variant="contained" size="large" sx={{ mt: 2 }}>
            Sign In
          </Button>
        </Box>
      );
    }

    // Error state
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box
          component="img"
          src="/assets/icons/error-circle.svg"
          alt="Error"
          sx={{
            width: 80,
            height: 80,
            color: "error.main",
          }}
        />
        <Typography variant="h4" color="error.main">
          Verification Failed
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          {verificationResult.message}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button href="/login" variant="outlined" size="large">
            Back to Sign In
          </Button>
          <Button href="/contact" variant="contained" size="large">
            Contact Support
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Logo sx={{ position: "fixed", top: 20, left: 20 }} />

      <Container
        sx={{
          py: 10,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 480,
            width: "100%",
            boxShadow: 3,
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: "center",
            }}
          >
            {renderContent()}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
