import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";

export interface EmptyPlaceholderProps {
  /** Main title shown in the placeholder */
  title?: React.ReactNode;
  /** Secondary text/subtitle shown below the title */
  subtitle?: React.ReactNode;
  /** Optional action nodes (buttons, links) rendered below the subtitle */
  actions?: React.ReactNode;
  /** Optional image url. If omitted a small default illustration will be used (from public folder) */
  image?: string;
  /** sx for the root wrapper */
  sx?: SxProps<Theme>;
}

const DEFAULT_IMAGE = "/assets/illustrations/not-found.webp";

/**
 * Empty placeholder component.
 *
 * Accepts optional `title`, `subtitle`, `actions` and `image` props.
 */
export const StartSearchingPlaceholder: React.FC<EmptyPlaceholderProps> = ({
  title = "No data available",
  subtitle = "There is no data to display here at the moment.",
  actions,
  image,
  sx,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: { xs: 6, md: 10 },
        px: 2,
        ...((sx as any) || {}),
      }}
    >
      <Box
        component="img"
        src={image || DEFAULT_IMAGE}
        alt="empty"
        sx={{
          width: 320,
          maxWidth: "80%",
          height: "auto",
          mb: 3,
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      <Stack spacing={1} alignItems="center" sx={{ maxWidth: 680 }}>
        {title && (
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
        )}

        {subtitle && (
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        )}

        {actions && <Box sx={{ mt: 2 }}>{actions}</Box>}
      </Stack>
    </Box>
  );
};

export default StartSearchingPlaceholder;
