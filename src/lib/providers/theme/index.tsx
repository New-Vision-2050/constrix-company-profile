"use client";
import { ThemeProvider as MuiThemeProvider } from "@/theme";
import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import NotistackProvider from "@/lib/providers/notistack";
import RTLProvider from "@/theme/rtl";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeResponse } from "@/services/api/theme/response";
import { convertBackendTheme } from "@/theme/convert-backend-theme";

function ThemeProvider({
  children,
  direction,
  theme,
}: PropsWithChildren<{
  direction?: "ltr" | "rtl";
  theme?: ThemeResponse["payload"];
}>) {
  // Convert backend theme to MUI theme format
  const themeOverrides = theme
    ? { ...convertBackendTheme(theme), direction }
    : { direction };

  return (
    <NuqsAdapter>
      <AppRouterCacheProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MuiThemeProvider themeOverrides={themeOverrides}>
            <RTLProvider direction={direction || "ltr"}>
              <NotistackProvider>{children}</NotistackProvider>
            </RTLProvider>
          </MuiThemeProvider>
        </LocalizationProvider>
      </AppRouterCacheProvider>
    </NuqsAdapter>
  );
}

export default ThemeProvider;
