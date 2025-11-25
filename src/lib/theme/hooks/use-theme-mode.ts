"use client";

import { useColorScheme } from "@mui/material/styles";
import { useCallback, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";
import { THEME_COOKIE_NAME } from "../constants/cookie-name";
import type { ThemeMode } from "../server/get-theme-mode";

export function useThemeMode() {
  const { mode, setMode, systemMode } = useColorScheme();

  // Sync with cookie on mount
  useEffect(() => {
    const savedMode = getCookie(THEME_COOKIE_NAME) as ThemeMode | undefined;
    if (savedMode && savedMode !== mode) {
      setMode(savedMode);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newMode: ThemeMode = mode === "dark" ? "light" : "dark";
    
    setMode(newMode);
    
    // Save to cookie
    setCookie(THEME_COOKIE_NAME, newMode, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }, [mode, setMode]);

  const setThemeMode = useCallback(
    (newMode: ThemeMode) => {
      setMode(newMode);
      
      // Save to cookie
      setCookie(THEME_COOKIE_NAME, newMode, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
    },
    [setMode]
  );

  return {
    mode: (mode || "light") as ThemeMode,
    systemMode: systemMode as ThemeMode | undefined,
    toggleTheme,
    setThemeMode,
  };
}

