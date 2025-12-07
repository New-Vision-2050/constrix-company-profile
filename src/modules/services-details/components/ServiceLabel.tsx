'use client';
import { Typography, darken } from "@mui/material";

interface ServiceLabelProps {
  label: string;
}

/**
 * Service Label Component
 * Displays the main service label with proper typography
 * Supports RTL/LTR and responsive sizing
 */
export default function ServiceLabel({ label }: ServiceLabelProps) {
  return (
    <Typography
      variant="subtitle1"
      sx={({ palette }) => ({
        fontWeight: 500,
        mb: 2,
        fontSize: "1.5rem",
        color: darken(palette.primary.main, 0.4),
        textAlign: { xs: "center", md: "start" },
      })}
    >
      {label}
    </Typography>
  );
}

