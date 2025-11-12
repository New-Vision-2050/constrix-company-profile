import { alpha, Box, Typography } from "@mui/material";

export function FooterSection() {
  return (
    <Box
      sx={({ palette }) => ({
        bgcolor: alpha(palette.primary.main, 0.1),
        width: "100%",
        py: 8,
      })}
    >
      <Typography variant="h3" textAlign="center">
        This is Footer Placeholder
      </Typography>
    </Box>
  );
}
