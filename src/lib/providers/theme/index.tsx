"use client";
import { ThemeProvider as MuiThemeProvider } from "@/theme";
import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import NotistackProvider from "@/lib/providers/notistack";
import RTLProvider from "@/theme/rtl";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";

function ThemeProvider({
  children,
  direction,
}: PropsWithChildren<{ direction?: "ltr" | "rtl" }>) {
  return (
    <NuqsAdapter>
      <AppRouterCacheProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MuiThemeProvider themeOverrides={{ direction }}>
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
