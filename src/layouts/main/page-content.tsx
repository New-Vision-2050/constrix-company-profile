"use client";
import { Box, darken, lighten, Stack, Typography } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  title?: ReactNode;
  description?: ReactNode;
}>;

function MainPageContent({ title, description, children }: Props) {
  return (
    <Stack>
      <Stack
        py={14}
        spacing={4}
        alignItems="center"
        sx={({ palette }) => ({
          background: `linear-gradient(90deg,${lighten(palette.primary.dark, 0.1)} 0%, ${darken(palette.primary.dark, 0.3)} 100%)`,
        })}
      >
        {title && (
          <Typography
            variant="h2"
            textAlign="center"
            color="primary.contrastText"
            fontWeight={500}
          >
            {title}
          </Typography>
        )}
        {description && (
          <Typography
            variant="body1"
            textAlign="center"
            color="primary.contrastText"
          >
            {description}
          </Typography>
        )}
      </Stack>
      {children}
    </Stack>
  );
}

export default MainPageContent;
