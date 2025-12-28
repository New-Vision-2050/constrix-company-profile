"use client";
import type { AppBarProps } from "@mui/material/AppBar";
import type { ContainerProps } from "@mui/material/Container";
import type {
  Theme,
  SxProps,
  CSSObject,
  Breakpoint,
} from "@mui/material/styles";

import { useScrollOffsetTop } from "minimal-shared/hooks";
import { varAlpha, mergeClasses } from "minimal-shared/utils";
import { useScrollThreshold } from "@/hooks/use-scroll-threshold";
import { useTranslations } from "next-intl";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

import { layoutClasses } from "./classes";
import { motion } from "framer-motion";
import { Button, Grid, Typography, Stack } from "@mui/material";
import { Call, Sms } from "iconsax-reactjs";
import { useState } from "react";
import BaseMotionDiv from "@/components/motion/base-div";
import { MotionBaseTransition } from "@/components/motion/base-transition";
import PageSection from "../main/page-section";
import { Logo } from "@/components/logo";
import { useBE_Theme } from "@/lib/theme/client/theme-provider";

export const TOP_NAVBAR_HEIGHT = 84;

// ----------------------------------------------------------------------

export type HeaderSectionProps = AppBarProps & {
  layoutQuery?: Breakpoint;
  disableOffset?: boolean;
  disableElevation?: boolean;
  slots?: {
    leftArea?: React.ReactNode;
    rightArea?: React.ReactNode;
    topArea?: React.ReactNode;
    centerArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  slotProps?: {
    container?: ContainerProps;
    centerArea?: React.ComponentProps<"div"> & { sx?: SxProps<Theme> };
  };
};

export function HeaderSection({
  sx,
  slots,
  slotProps,
  className,
  disableOffset,
  disableElevation,
  layoutQuery = "md",
  ...other
}: HeaderSectionProps) {
  const { offsetTop: isOffset } = useScrollOffsetTop();
  const isScrolled = useScrollThreshold(50);
  const theme = useTheme();
  const BE_Theme = useBE_Theme();
  const t = useTranslations("header");
  return (
    <motion.header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100vw",
        maxWidth: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <BaseMotionDiv
        style={{
          width: "100%",
          height: TOP_NAVBAR_HEIGHT,
          display: "flex",
          alignItems: "center",
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${varAlpha(theme.vars.palette.grey["500Channel"], 0.12)}`,
        }}
        animate={{ marginTop: isScrolled ? `-${TOP_NAVBAR_HEIGHT}px` : "0px" }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="center">
            <Grid size={4}>
              <Logo sx={{ height: 46 }} />
            </Grid>
            <Grid size={4}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Call
                  size={36}
                  variant="Bulk"
                  color={theme.palette.primary.main}
                />
                <Stack spacing={0.25}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                    }}
                  >
                    {t("phone")}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {BE_Theme.data.contact_info?.phone}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={4}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Sms
                  size={36}
                  variant="Bulk"
                  color={theme.palette.primary.main}
                />
                <Stack spacing={0.25}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      fontSize: "0.7rem",
                    }}
                  >
                    {t("email")}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {BE_Theme.data.contact_info?.email}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </BaseMotionDiv>
      <BaseMotionDiv
        style={{
          backdropFilter: `blur(6px)`,
          WebkitBackdropFilter: `blur(6px)`,
          backgroundColor: varAlpha(
            theme.vars.palette.background.defaultChannel,
            0.8
          ),
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        }}
        initial={{
          paddingTop: theme.spacing(2.5),
          paddingBottom: theme.spacing(2.5),
          borderRadius: `${theme.shape.borderRadius}px`,
          marginTop: theme.spacing(2),
        }}
        animate={{
          paddingTop: isScrolled ? theme.spacing(2) : theme.spacing(2.5),
          paddingBottom: isScrolled ? theme.spacing(2) : theme.spacing(2.5),
          width: isScrolled ? "100%" : `${theme.breakpoints.values.xl}px`,
          marginTop: isScrolled ? "0px" : theme.spacing(2),
          borderRadius: isScrolled ? "0px" : `${theme.shape.borderRadius}px`,
        }}
      >
        <PageSection>
          <Grid container spacing={2} alignItems="center">
            <Grid size={8}>
              <HeaderCenterArea
                layoutQuery={layoutQuery}
                {...slotProps?.centerArea}
              >
                {slots?.centerArea}
              </HeaderCenterArea>
            </Grid>
            <Grid
              size={4}
              display="flex"
              flexDirection="column"
              alignItems="end"
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {slots?.rightArea}
              </Box>
            </Grid>
          </Grid>
        </PageSection>
      </BaseMotionDiv>
    </motion.header>
  );

  return (
    <HeaderRoot
      position="sticky"
      color="transparent"
      isOffset={isOffset}
      isScrolled={isScrolled}
      disableOffset={disableOffset}
      disableElevation={disableElevation}
      className={mergeClasses([layoutClasses.header, className])}
      sx={[
        (theme) => ({
          ...(isOffset && {
            "--color": `var(--offset-color, ${theme.vars.palette.text.primary})`,
          }),
        }),
        ...(Array.isArray(sx) ? sx : ([sx] as any)),
      ]}
      {...other}
    >
      {slots?.topArea}

      <HeaderContainer layoutQuery={layoutQuery} {...slotProps?.container}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {slots?.leftArea}
        </Box>

        <HeaderCenterArea layoutQuery={layoutQuery} {...slotProps?.centerArea}>
          {slots?.centerArea}
        </HeaderCenterArea>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {slots?.rightArea}
        </Box>
      </HeaderContainer>

      {slots?.bottomArea}
    </HeaderRoot>
  );
}

// ----------------------------------------------------------------------

type HeaderRootProps = Pick<
  HeaderSectionProps,
  "disableOffset" | "disableElevation"
> & {
  isOffset: boolean;
  isScrolled: boolean;
};

const HeaderRoot = styled(AppBar, {
  shouldForwardProp: (prop: string) =>
    ![
      "isOffset",
      "isScrolled",
      "disableOffset",
      "disableElevation",
      "sx",
    ].includes(prop),
})<HeaderRootProps>(({
  isOffset,
  isScrolled,
  disableOffset,
  disableElevation,
  theme,
}) => {
  const pauseZindex = { top: -1, bottom: -2 };

  const pauseStyles: CSSObject = {
    opacity: 0,
    content: '""',
    visibility: "hidden",
    position: "absolute",
    transition: theme.transitions.create(["opacity", "visibility"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
  };

  const bgStyles: CSSObject = {
    ...pauseStyles,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: pauseZindex.top,
    backdropFilter: `blur(6px)`,
    WebkitBackdropFilter: `blur(6px)`,
    backgroundColor: varAlpha(
      theme.vars.palette.background.defaultChannel,
      0.8
    ),
    ...(isOffset && {
      opacity: 1,
      visibility: "visible",
    }),
  };

  const shadowStyles: CSSObject = {
    ...pauseStyles,
    left: 0,
    right: 0,
    bottom: 0,
    height: 24,
    margin: "auto",
    borderRadius: "50%",
    width: `calc(100% - 48px)`,
    zIndex: pauseZindex.bottom,
    boxShadow: theme.vars.customShadows.z8,
    ...(isOffset && { opacity: 0.48, visibility: "visible" }),
  };

  return {
    boxShadow: "none",
    zIndex: "var(--layout-header-zIndex)",
    top: isScrolled ? 16 : 0,
    left: 0,
    right: 0,
    marginLeft: isScrolled ? "auto" : 0,
    marginRight: isScrolled ? "auto" : 0,
    width: isScrolled ? theme.breakpoints.values.xl : "100%",
    // maxWidth: isScrolled ? theme.breakpoints.values.xl : "none",
    borderRadius: isScrolled ? theme.shape.borderRadius : 0,
    overflow: "hidden",

    ...(!disableOffset && { "&::before": bgStyles }),
    ...(!disableElevation && { "&::after": shadowStyles }),
  };
});

const HeaderContainer = styled(Container, {
  shouldForwardProp: (prop: string) => !["layoutQuery", "sx"].includes(prop),
})<Pick<HeaderSectionProps, "layoutQuery">>(
  ({ layoutQuery = "md", theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "var(--color)",
    height: "var(--layout-header-mobile-height)",
    gap: theme.spacing(2),
    [theme.breakpoints.up(layoutQuery)]: {
      height: "var(--layout-header-desktop-height)",
      gap: theme.spacing(3),
    },
  })
);

const HeaderCenterArea = styled("div", {
  shouldForwardProp: (prop: string) => !["layoutQuery", "sx"].includes(prop),
})<Pick<HeaderSectionProps, "layoutQuery">>(
  ({ layoutQuery = "md", theme }) => ({
    display: "none",
    flex: "1 1 auto",
    alignItems: "center",
    [theme.breakpoints.up(layoutQuery)]: {
      display: "flex",
    },
  })
);
