import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";
import { Iconify } from "@/components/iconify";

export interface ErrorStateProps {
  /** Main title shown in the error state */
  title?: React.ReactNode;
  /** Secondary text/subtitle shown below the title */
  subtitle?: React.ReactNode;
  /** Optional action nodes (buttons, links) rendered below the subtitle */
  actions?: React.ReactNode;
  /** Optional image url. If omitted, a default error illustration will be used */
  image?: string;
  /** Show retry button */
  showRetry?: boolean;
  /** Retry callback function */
  onRetry?: () => void;
  /** sx for the root wrapper */
  sx?: SxProps<Theme>;
}

const DEFAULT_IMAGE = "/assets/illustrations/illustration-404.svg";

/**
 * Error state component with beautiful design.
 *
 * Displays error messages with optional retry functionality.
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  subtitle = "We encountered an error while loading the data. Please try again.",
  actions,
  image,
  showRetry = true,
  onRetry,
  sx,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: { xs: 8, md: 12 },
        px: 2,
        minHeight: 400,
        ...((sx as any) || {}),
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image || DEFAULT_IMAGE}
        alt="error"
        sx={{
          width: 320,
          maxWidth: "80%",
          height: "auto",
          mb: 3,
          pointerEvents: "none",
          userSelect: "none",
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.1))",
        }}
      />

      {/* Content */}
      <Stack spacing={2} alignItems="center" sx={{ maxWidth: 600 }}>
        {title && (
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              maxWidth: 480,
              lineHeight: 1.8,
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Actions */}
        {(showRetry || actions) && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 3 }}
          >
            {showRetry && (
              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<Iconify icon="solar:restart-bold" />}
                onClick={onRetry}
                sx={{
                  minWidth: 160,
                  px: 3,
                }}
              >
                Try Again
              </Button>
            )}
            {actions}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default ErrorState;

/*
Usage examples:

// Basic error state
<ErrorState />

// Custom error state with retry
<ErrorState
  title="Failed to load projects"
  subtitle="Unable to fetch projects from the server. Please check your connection and try again."
  onRetry={() => refetch()}
/>

// Error state with custom actions
<ErrorState
  title="Access Denied"
  subtitle="You don't have permission to view this content."
  showRetry={false}
  actions={
    <Button variant="outlined" onClick={() => router.push('/')}>
      Go Home
    </Button>
  }
/>

// Error state with custom image
<ErrorState
  image="/assets/illustrations/error-500.svg"
  title="Server Error"
  subtitle="Our servers are experiencing issues. Please try again later."
/>

// Error state without retry button
<ErrorState
  title="Page Not Found"
  subtitle="The page you're looking for doesn't exist."
  showRetry={false}
/>
*/

