"use client";
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Box } from "@mui/material";

export default function ServiceCardHeader() {
  const theme = useTheme();

  const TypoSubText = ({ text }: { text: string }) => (
    <Typography variant="body2" color={theme.palette.grey[500]}>
      {text}
    </Typography>
  );

  return (
    <Stack spacing={1} direction={"row"} alignItems={"center"}>
      <TypoSubText text="12 Aug 2025" />
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: theme.palette.grey[500],
        }}
      />
      <TypoSubText text="8 min read" />
    </Stack>
  );
}
