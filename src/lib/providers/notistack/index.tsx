"use client";

import React from "react";
import { SnackbarProvider } from "notistack";
import { styled } from "@mui/material/styles";
import CustomNotification from "./custom-notification";

// ----------------------------------------------------------------------

interface NotistackProviderProps {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

const StyledSnackbarProvider = styled(SnackbarProvider)(() => ({
  "&.SnackbarContent-root": {
    backgroundColor: "transparent !important",
    padding: 0,
    minWidth: "auto",
    flexWrap: "nowrap",
  },
}));

// ----------------------------------------------------------------------

export default function NotistackProvider({
  children,
}: NotistackProviderProps) {
  return (
    <StyledSnackbarProvider
      maxSnack={5}
      autoHideDuration={5000}
      preventDuplicate
      dense={false}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      transitionDuration={{ enter: 400, exit: 200 }}
      Components={{
        success: CustomNotification,
        error: CustomNotification,
        warning: CustomNotification,
        info: CustomNotification,
        default: CustomNotification,
      }}
      // Custom styling for the container
      iconVariant={{
        success: "✓",
        error: "✕",
        warning: "⚠",
        info: "ℹ",
        default: "ℹ",
      }}
    >
      {children}
    </StyledSnackbarProvider>
  );
}
