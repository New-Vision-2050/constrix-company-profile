"use client";

import type { ThemeProviderProps as MuiThemeProviderProps } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as ThemeVarsProvider } from "@mui/material/styles";

import { createTheme } from "./create-theme";

import type {} from "./extend-theme-types";
import type { ThemeOptions, ThemeColorScheme } from "./types";

// ----------------------------------------------------------------------

export type ThemeProviderProps = Partial<MuiThemeProviderProps> & {
  themeOverrides?: ThemeOptions;
  defaultMode?: ThemeColorScheme;
};

export function ThemeProvider({
  themeOverrides,
  defaultMode = "light",
  children,
  ...other
}: ThemeProviderProps) {
  const theme = createTheme({
    themeOverrides: {
      ...themeOverrides,
      defaultColorScheme: defaultMode,
    },
  });

  return (
    <ThemeVarsProvider
      disableTransitionOnChange
      theme={theme}
      defaultMode={defaultMode}
      {...other}
    >
      <CssBaseline />
      {children}
    </ThemeVarsProvider>
  );
}
