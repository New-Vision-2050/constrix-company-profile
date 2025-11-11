import { Box, Divider, Typography } from "@mui/material";
import React from "react";

interface Props {
  title?: string;
  children: React.ReactNode;
  dense?: boolean;
}

export default function FormSection({ title, children, dense }: Props) {
  return (
    <Box mb={dense ? 1 : 2}>
      {title && (
        <Box
          mb={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">{title}</Typography>
        </Box>
      )}
      <Box mb={1}>{children}</Box>
      <Divider />
    </Box>
  );
}
