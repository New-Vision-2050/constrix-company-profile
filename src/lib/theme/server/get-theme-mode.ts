import { cache } from "react";
import { cookies } from "next/headers";
import { THEME_COOKIE_NAME } from "../constants/cookie-name";

export type ThemeMode = "light" | "dark";

export const getServerThemeMode = cache(async (): Promise<ThemeMode> => {
  try {
    const cookieStore = await cookies();
    const themeMode = cookieStore.get(THEME_COOKIE_NAME)?.value as ThemeMode;

    return themeMode === "dark" ? "dark" : "light";
  } catch (error) {
    console.error("Error getting theme mode:", error);
    return "light";
  }
});

