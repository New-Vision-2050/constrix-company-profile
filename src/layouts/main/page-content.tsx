"use client";
import { Container, Stack, Typography } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import PageSection from "./page-section";
import DarkGradiantBgBox from "@/components/ui/others/box/dark-gradiant-bg";

type Props = PropsWithChildren<{
  title?: ReactNode;
  description?: ReactNode;
}>;

function MainPageContent({ title, description, children }: Props) {
  return (
    <Stack>
      <DarkGradiantBgBox
        py={18}
        gap={3}
        alignItems="center"
        display="flex"
        flexDirection="column"
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
              variant="subtitle1"
              textAlign="center"
              color="primary.contrastText"
              {...(typeof description === "string" ? {} : { component: "div" })}
            >
              {description}
            </Typography>
          </Container>
        )}
      </DarkGradiantBgBox>
      {children}
    </Stack>
  );
}

export default MainPageContent;
