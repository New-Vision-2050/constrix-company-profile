"use client";
import { ThemeProvider as MuiThemeProvider } from "@/theme";
import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import NotistackProvider from "@/lib/providers/notistack";
import RTLProvider from "@/theme/rtl";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ThemeColorScheme } from "@/theme/types";

function ThemeProvider({
  children,
  direction,
  defaultMode = "light",
}: PropsWithChildren<{ direction?: "ltr" | "rtl"; defaultMode?: ThemeColorScheme }>) {
  return (
    <NuqsAdapter>
      <AppRouterCacheProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MuiThemeProvider themeOverrides={{ direction }} defaultMode={defaultMode}>
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
