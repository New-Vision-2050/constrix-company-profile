"use client";
import { Container, darken, lighten, Stack, Typography } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import PageSection from "./page-section";

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
          <PageSection>
            <Typography
              variant="h2"
              textAlign="center"
              color="primary.contrastText"
              fontWeight={500}
              {...(typeof title === "string" ? {} : { component: "div" })}
            >
              {title}
            </Typography>
          </PageSection>
        )}
        {description && (
          <Container maxWidth="md">
            <Typography
              variant="body1"
              textAlign="center"
              color="primary.contrastText"
              {...(typeof description === "string" ? {} : { component: "div" })}
            >
              {description}
            </Typography>
          </Container>
        )}
      </Stack>
      {children}
    </Stack>
  );
}

export default MainPageContent;
